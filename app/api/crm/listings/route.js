import { NextResponse } from 'next/server';

/**
 * LockedOn CRM Listings API Endpoint
 *
 * GET /api/crm/listings
 *
 * Fetches property listings from LockedOn CRM using their Query API
 * Documentation: https://gist.github.com/karlmikko/66b7b68401826e4281093692ef5868cc
 *
 * Query Parameters:
 * - status: 'available' | 'sold' | 'rented' | 'all' (optional, default: 'available')
 * - propertyType: 'residential' | 'commercial' | 'land' (optional)
 * - limit: number of results (optional, default: 20, max: 100)
 * - offset: pagination offset (optional, default: 0)
 * - minPrice: minimum price filter (optional)
 * - maxPrice: maximum price filter (optional)
 * - bedrooms: number of bedrooms (optional)
 * - suburb: suburb name filter (optional)
 *
 * SETUP INSTRUCTIONS:
 * 1. Obtain API key from LockedOn Support for your office
 * 2. Update LOCKEDON_API_KEY in .env.local
 * 3. Update LOCKEDON_OFFICE_UUID with your office UUID
 * 4. Install EDN parser: npm install jsedn (if using EDN format)
 * 5. Test with: GET /api/crm/listings?status=available&limit=10
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const status = searchParams.get('status') || 'available';
  const propertyType = searchParams.get('propertyType');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const offset = parseInt(searchParams.get('offset') || '0');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const suburb = searchParams.get('suburb');

  // Check if API is configured
  const apiKey = process.env.LOCKEDON_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;
  const officeUuid = process.env.LOCKEDON_OFFICE_UUID;

  if (!apiKey || apiKey === 'your_api_key_here') {
    return NextResponse.json(
      {
        message: 'LockedOn API not yet configured',
        status: 'awaiting_api_credentials',
        placeholder: true,
        mockListings: getMockListings(limit, offset),
        instructions: {
          step1: 'Contact LockedOn Support to request API access for your office',
          step2: 'Obtain your JWT API key and office UUID',
          step3: 'Update LOCKEDON_API_KEY and LOCKEDON_OFFICE_UUID in .env.local',
          step4: 'Restart the development server',
          apiEndpoint: 'https://newapi.lockedoncloud.com/api/query',
          documentation: 'https://gist.github.com/karlmikko/66b7b68401826e4281093692ef5868cc'
        }
      },
      { status: 200 }
    );
  }

  try {
    // Build LockedOn Query API request
    // The API uses EDN (Extensible Data Notation) format
    // For simplicity, we'll request JSON response format

    const queryBody = buildLockedOnQuery({
      officeUuid,
      status,
      propertyType,
      limit,
      offset,
      minPrice,
      maxPrice,
      bedrooms,
      suburb
    });

    const response = await fetch(`${apiUrl}/api/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryBody)
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('LockedOn API rate limit exceeded. Please try again shortly.');
      }
      throw new Error(`LockedOn API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      listings: transformLockedOnData(data),
      meta: {
        total: data.stats?.total || 0,
        limit,
        offset,
        hasMore: (data.stats?.total || 0) > (offset + limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error('LockedOn API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch listings from LockedOn CRM',
        message: error.message,
        placeholder: true,
        mockListings: getMockListings(limit, offset)
      },
      { status: 500 }
    );
  }
}

/**
 * Build LockedOn Query API request body
 * This is a simplified version - adjust based on actual schema
 */
function buildLockedOnQuery({ officeUuid, status, propertyType, limit, offset, minPrice, maxPrice, bedrooms, suburb }) {
  // This is a placeholder structure
  // Actual implementation will need to match LockedOn's schema
  // See: GET https://newapi.lockedoncloud.com/api/schema

  const filters = {};

  if (status && status !== 'all') {
    filters.status = status;
  }

  if (propertyType) {
    filters.propertyType = propertyType;
  }

  if (minPrice) {
    filters.minPrice = parseInt(minPrice);
  }

  if (maxPrice) {
    filters.maxPrice = parseInt(maxPrice);
  }

  if (bedrooms) {
    filters.bedrooms = parseInt(bedrooms);
  }

  if (suburb) {
    filters.suburb = suburb;
  }

  return {
    office: officeUuid,
    entity: 'properties',
    filters,
    limit,
    offset,
    sort: [{ field: 'created', direction: 'desc' }]
  };
}

/**
 * Transform LockedOn API response to our frontend format
 */
function transformLockedOnData(data) {
  // This will need to be adjusted based on actual LockedOn response structure
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(property => ({
    id: property.id || property.uuid,
    address: property.address,
    suburb: property.suburb,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    carSpaces: property.carSpaces,
    propertyType: property.propertyType,
    status: property.status,
    images: property.images || [],
    description: property.description,
    features: property.features || [],
    landSize: property.landSize,
    floorArea: property.floorArea,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt
  }));
}

/**
 * Mock listings for development/testing
 */
function getMockListings(limit, offset) {
  const allMockListings = [
    {
      id: 'mock-1',
      address: '27 Cambridge Drive',
      suburb: 'Brighton',
      state: 'VIC',
      postcode: '3186',
      price: 'Contact Agent',
      bedrooms: 5,
      bathrooms: 6,
      carSpaces: 4,
      propertyType: 'Residential',
      status: 'Available',
      images: ['/images/main.jpg'],
      description: 'Bayfront sanctuary with panoramic water vistas. Private jetty and infinity pool.',
      features: ['Waterfront', 'Pool', 'Private Jetty', 'Wine Cellar'],
      landSize: 1850,
      floorArea: 620,
      placeholder: true
    },
    {
      id: 'mock-2',
      address: '14 Hopetoun Road',
      suburb: 'Toorak',
      state: 'VIC',
      postcode: '3142',
      price: 'Contact Agent',
      bedrooms: 6,
      bathrooms: 7,
      carSpaces: 6,
      propertyType: 'Residential',
      status: 'Available',
      images: ['/images/main.jpg'],
      description: 'Grand Victorian estate on elevated grounds. Tennis court and guest pavilion.',
      features: ['Tennis Court', 'Pool', 'Guest House', 'Heritage Listed'],
      landSize: 2400,
      floorArea: 780,
      placeholder: true
    },
    {
      id: 'mock-3',
      address: '8 St Georges Road',
      suburb: 'Kew',
      state: 'VIC',
      postcode: '3101',
      price: 'Contact Agent',
      bedrooms: 4,
      bathrooms: 5,
      carSpaces: 3,
      propertyType: 'Residential',
      status: 'Available',
      images: ['/images/main.jpg'],
      description: 'Contemporary architectural masterpiece surrounded by mature gardens.',
      features: ['Award Winning Design', 'Climate Control', 'Smart Home'],
      landSize: 1200,
      floorArea: 450,
      placeholder: true
    }
  ];

  return allMockListings.slice(offset, offset + limit);
}
