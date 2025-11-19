/**
 * LockedOn CRM Integration Helper Utilities
 *
 * This file contains helper functions for working with the LockedOn Query API.
 * Documentation: https://gist.github.com/karlmikko/66b7b68401826e4281093692ef5868cc
 *
 * Key Concepts:
 * - LockedOn uses EDN (Extensible Data Notation) format
 * - Queries are expressed as data structures
 * - The API supports JSON, EDN, Transit+JSON, and Transit+MessagePack formats
 * - Authentication uses JWT tokens with "Token" prefix in Authorization header
 */

/**
 * Build a basic property query for LockedOn API
 *
 * @param {Object} params - Query parameters
 * @param {string} params.officeUuid - Your office UUID (use 'API_OFFICE' as placeholder)
 * @param {Object} params.filters - Property filters (status, price, bedrooms, etc.)
 * @param {number} params.limit - Number of results to return
 * @param {number} params.offset - Pagination offset
 * @param {Array} params.sort - Sort configuration
 * @returns {Object} Query object for LockedOn API
 */
export function buildPropertyQuery({ officeUuid, filters = {}, limit = 20, offset = 0, sort = [] }) {
  // This is a simplified structure - actual LockedOn queries may use EDN format
  // Example EDN query structure:
  // [{(API_OFFICE :office/uuid)
  //   [:office/name
  //    {:office/properties
  //     [*
  //      {:property/images [*]}]}]}]

  const query = {
    // Office context
    office: officeUuid || 'API_OFFICE',

    // Entity to query
    entity: 'properties',

    // Attributes to return (wildcard * returns all)
    attributes: [
      'uuid',
      'address',
      'suburb',
      'state',
      'postcode',
      'price',
      'bedrooms',
      'bathrooms',
      'carSpaces',
      'propertyType',
      'status',
      'description',
      'features',
      'landSize',
      'floorArea',
      'images',
      'createdAt',
      'updatedAt'
    ],

    // Filters
    filters,

    // Pagination
    limit,
    offset,

    // Sorting
    sort: sort.length > 0 ? sort : [{ field: 'createdAt', direction: 'desc' }],

    // Request stats (total count, etc.)
    includeStats: true
  };

  return query;
}

/**
 * Build an article/blog query for LockedOn API
 */
export function buildArticleQuery({ officeUuid, filters = {}, limit = 10, offset = 0 }) {
  return {
    office: officeUuid || 'API_OFFICE',
    entity: 'articles',
    attributes: [
      'uuid',
      'title',
      'slug',
      'excerpt',
      'content',
      'category',
      'author',
      'publishedDate',
      'featured',
      'featuredImage',
      'tags'
    ],
    filters: {
      published: true,
      ...filters
    },
    limit,
    offset,
    sort: [{ field: 'publishedDate', direction: 'desc' }],
    includeStats: true
  };
}

/**
 * Make an authenticated request to LockedOn API
 *
 * @param {string} apiUrl - LockedOn API base URL
 * @param {string} apiKey - JWT API token
 * @param {Object} query - Query object
 * @param {string} format - Response format: 'json', 'edn', 'transit+json', 'transit+msgpack'
 * @returns {Promise<Object>} API response
 */
export async function queryLockedOnAPI(apiUrl, apiKey, query, format = 'json') {
  const contentTypeMap = {
    json: 'application/json',
    edn: 'application/edn',
    'transit+json': 'application/transit+json',
    'transit+msgpack': 'application/transit+msgpack'
  };

  const response = await fetch(`${apiUrl}/api/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': contentTypeMap[format],
      'Accept': contentTypeMap[format]
    },
    body: format === 'json' ? JSON.stringify(query) : query
  });

  if (!response.ok) {
    if (response.status === 503) {
      throw new Error('LockedOn API rate limit exceeded (503). Please retry after a short delay.');
    }
    const errorText = await response.text();
    throw new Error(`LockedOn API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get the LockedOn API schema
 * This returns all available entities, attributes, and their types
 *
 * @param {string} apiUrl - LockedOn API base URL
 * @param {string} apiKey - JWT API token
 * @returns {Promise<Object>} Schema definition
 */
export async function getLockedOnSchema(apiUrl, apiKey) {
  const response = await fetch(`${apiUrl}/api/schema`, {
    headers: {
      'Authorization': `Token ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.status}`);
  }

  return response.json();
}

/**
 * Retry wrapper for LockedOn API calls (handles rate limiting)
 *
 * @param {Function} apiCall - Async function to execute
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in milliseconds (will be exponentially increased)
 * @returns {Promise<any>} Result of API call
 */
export async function withRetry(apiCall, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Don't retry if it's not a rate limit error
      if (!error.message.includes('503') && !error.message.includes('rate limit')) {
        throw error;
      }

      // Don't retry if we've exhausted attempts
      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      console.warn(`LockedOn API rate limited. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Example: Fetch properties with retry logic
 */
export async function fetchProperties(filters = {}, limit = 20, offset = 0) {
  const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;
  const apiKey = process.env.LOCKEDON_API_KEY;
  const officeUuid = process.env.LOCKEDON_OFFICE_UUID;

  if (!apiKey || !apiUrl) {
    throw new Error('LockedOn API credentials not configured');
  }

  const query = buildPropertyQuery({ officeUuid, filters, limit, offset });

  return withRetry(async () => {
    return await queryLockedOnAPI(apiUrl, apiKey, query);
  });
}

/**
 * Example: Fetch a single property by UUID
 */
export async function fetchPropertyByUuid(uuid) {
  const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;
  const apiKey = process.env.LOCKEDON_API_KEY;

  const query = {
    entity: 'property',
    uuid,
    attributes: '*' // Get all attributes
  };

  return queryLockedOnAPI(apiUrl, apiKey, query);
}

/**
 * Parse LockedOn date format
 * LockedOn may return dates in various formats - adjust as needed
 */
export function parseLockedOnDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString);
}

/**
 * Format price for display
 */
export function formatPrice(price) {
  if (!price) return 'Contact Agent';
  if (typeof price === 'string') return price;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Build property feature summary
 */
export function buildPropertySummary(property) {
  const parts = [];

  if (property.bedrooms) parts.push(`${property.bedrooms} bed`);
  if (property.bathrooms) parts.push(`${property.bathrooms} bath`);
  if (property.carSpaces) parts.push(`${property.carSpaces} car`);
  if (property.landSize) parts.push(`${property.landSize}m²`);

  return parts.join(' • ');
}

/**
 * IMPORTANT NOTES FOR API INTEGRATION:
 *
 * 1. EDN Format:
 *    - LockedOn's native format is EDN (Extensible Data Notation)
 *    - If using EDN, install: npm install jsedn
 *    - JSON format is supported and easier to work with
 *
 * 2. Authentication:
 *    - JWT token must be prefixed with "Token " (not "Bearer ")
 *    - Format: Authorization: Token <your_jwt_token>
 *
 * 3. Rate Limiting:
 *    - HTTP 503 indicates rate limit exceeded
 *    - Implement exponential backoff retry logic
 *    - Limits are per-server and may change
 *
 * 4. Query Structure:
 *    - Use API_OFFICE symbol to reference your office
 *    - Wildcards (*) expand to all value attributes
 *    - Check schema endpoint for all available entities and attributes
 *
 * 5. Time Travel Queries:
 *    - :as-of parameter allows querying historical data
 *    - Useful for "what did this property look like on X date?"
 *
 * 6. Schema Exploration:
 *    - GET https://newapi.lockedoncloud.com/api/schema
 *    - Returns all available entities, attributes, and types
 *    - Essential for building correct queries
 */
