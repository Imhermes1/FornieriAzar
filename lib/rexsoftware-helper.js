import { XMLParser } from 'fast-xml-parser';
import { rexApiClient } from './rex-api-client';

/**
 * Rexsoftware XML Feed Helper
 * 
 * Handles fetching and parsing of Rexsoftware's XML feed (typically REAXML format).
 */

/**
 * Fetch and parse listed properties from Rexsoftware XML feed
 * 
 * @returns {Promise<Array>} Array of normalized property objects
 */
export async function fetchRexListings() {
    // Check if we have Rex API credentials configured
    const hasApiCreds = process.env.REX_API_TOKEN || (process.env.REX_API_EMAIL && process.env.REX_API_PASSWORD);

    if (hasApiCreds) {
        try {
            console.log('Fetching listings via Rex API JSON endpoint...');
            const response = await rexApiClient.searchListings();

            // Rex API returns results in result.rows
            if (response && response.result && Array.isArray(response.result.rows)) {
                // Filter for published houses in relevant states
                const activeListings = response.result.rows.filter(row =>
                    row.system_publication_status === 'published' &&
                    ['current', 'sold', 'exchanged', 'leased', 'under_offer'].includes(row.system_listing_state)
                );

                // Search doesn't return property attributes (beds, baths, etc) or images
                // Fetch full details for each listing via /read endpoint
                const fullListings = await Promise.all(
                    activeListings.map(async (listing) => {
                        try {
                            const readResponse = await rexApiClient.request('/v1/rex/Listings/read', {
                                method: 'POST',
                                body: JSON.stringify({
                                    id: listing.id,
                                    extra_fields: ['advert_internet', 'images', 'agent', 'listing_adverts', 'related']
                                })
                            });
                            return readResponse.result || listing;
                        } catch (err) {
                            console.warn(`Failed to fetch full details for listing ${listing.id}:`, err.message);
                            return listing; // Fall back to search data
                        }
                    })
                );

                return fullListings.map(normalizeRexProperty);
            }
        } catch (error) {
            console.error('Error fetching Rex API JSON listings:', error);
            // Fallback to XML if configured
        }
    }

    // Fallback to XML Feed
    const feedUrl = process.env.REX_XML_FEED_URL;

    if (!feedUrl) {
        if (!hasApiCreds) {
            console.warn('Neither Rex API nor XML Feed configured');
        }
        return [];
    }

    try {
        const response = await fetch(feedUrl, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch XML feed: ${response.status} ${response.statusText}`);
        }

        const xmlData = await response.text();
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });

        const parsed = parser.parse(xmlData);

        // Handle REAXML structure variations
        // Usually root is <propertyList> containing <residential>, <rental>, <land>, etc.
        const propertyList = parsed.propertyList || parsed.PropertyList || {};

        // normalize to array of all types
        let allProperties = [];

        // Helper to push items to array whether single object or array
        const collect = (items, type) => {
            if (!items) return;
            if (Array.isArray(items)) {
                items.forEach(item => allProperties.push({ ...item, _type: type }));
            } else {
                allProperties.push({ ...items, _type: type });
            }
        };

        collect(propertyList.residential, 'residential');
        collect(propertyList.commercial, 'commercial');
        collect(propertyList.land, 'land');
        collect(propertyList.rental, 'rental');
        collect(propertyList.holidayRental, 'holidayRental');
        collect(propertyList.rural, 'rural');

        return allProperties.map(normalizeProperty);

    } catch (error) {
        console.error('Error fetching Rexsoftware feed:', error);
        // return empty array instead of throwing to prevent page crash
        return [];
    }
}

/**
 * Get filtered listings (for use in Server Components and API)
 * 
 * @param {Object} filters
 * @returns {Promise<Object>} { listings: Array, total: Number }
 */
export async function getFilteredListings(filters = {}) {
    const {
        status = 'available',
        type,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        cars,
        suburb,
        limit = 20,
        offset = 0
    } = filters;

    const allListings = await fetchRexListings();

    let filtered = allListings.filter(item => {
        // Status filter
        if (status !== 'all') {
            if (status === 'available') {
                if (item.status !== 'available') return false;
            } else {
                if (item.status !== status) return false;
            }
        }

        // Type filter
        if (type) {
            if (type === 'rent' || type === 'rental') {
                if (item.propertyType !== 'rental') return false;
            } else if (type === 'sale') {
                if (item.propertyType === 'rental') return false;
            }
        }

        // Numeric filters
        if (minPrice && item.priceValue < minPrice) return false;
        if (maxPrice && item.priceValue > maxPrice) return false;
        if (bedrooms && item.bedrooms < bedrooms) return false;
        if (bathrooms && item.bathrooms < bathrooms) return false;
        if (cars && item.cars < cars) return false;

        return true;
    });

    // Extract unique suburbs for the available set (before final suburb filter)
    const availableSuburbs = [...new Set(filtered.map(item => item.suburb).filter(Boolean))].sort();

    // Final suburb filter
    if (suburb) {
        filtered = filtered.filter(item => item.suburb?.toLowerCase().includes(suburb.toLowerCase()));
    }

    return {
        listings: filtered.slice(offset, offset + limit),
        total: filtered.length,
        suburbs: availableSuburbs
    };
}

/**
 * Normalize REAXML property object to our internal Listing interface
 */
function normalizeProperty(p) {
    const address = p.address || {};
    const features = p.features || {};

    // Extract images
    let images = [];
    if (p.objects && p.objects.img) {
        const imgs = Array.isArray(p.objects.img) ? p.objects.img : [p.objects.img];
        images = imgs.map(i => i['#text'] || i.url || i);
    }

    // Determine status (REAXML uses 'status' field: current, sold, leased, withdrawn, offmarket)
    // We map to: 'available', 'sold', 'rented'
    let mappedStatus = 'available';
    const statusLower = (p.status || '').toLowerCase();

    if (statusLower === 'sold') mappedStatus = 'sold';
    else if (statusLower === 'leased') mappedStatus = 'rented';
    else if (statusLower === 'withdrawn' || statusLower === 'offmarket') mappedStatus = 'archived';
    // Note: 'underOffer' is usually considered available but marked

    return {
        id: p.uniqueID || p['@_uniqueID'],
        agentId: p.agentID,

        // Address
        address: [
            address.subNumber,
            address.streetNumber,
            address.street,
            address.streetType
        ].filter(Boolean).join(' '),
        suburb: address.suburb,
        state: address.state,
        postcode: address.postcode,

        // Details
        price: p.priceView || p.price, // Display price
        priceValue: parsePrice(p.price), // Numeric for sorting/filtering

        bedrooms: parseInt(features.bedrooms || 0),
        bathrooms: parseInt(features.bathrooms || 0),
        carSpaces: parseInt(features.garages || 0) + parseInt(features.carports || 0),
        landSize: p.landDetails?.area?.['#text'] || p.landDetails?.area,

        // Meta
        propertyType: p._type, // e.g., 'residential'
        status: mappedStatus,
        originalStatus: statusLower,

        description: p.description,
        headline: p.headline,

        images: images,

        createdAt: p.modTime // REAXML uses modTime for last update
    };
}

/**
 * Normalize Rex API JSON property object to our internal Listing interface
 */
export function normalizeRexProperty(p) {
    // Property details are nested under p.property
    const prop = p.property || {};

    // Extract images - PRIORITY: property_image > images > related.images
    let images = [];

    const ensureProtocol = (url) => {
        if (!url) return null;
        if (typeof url !== 'string') return null;
        if (url.startsWith('//')) return `https:${url}`;
        if (url.startsWith('rexlive:')) return url.replace('rexlive:', 'https:'); // Rex URI format
        return url;
    };

    // Extract images - PRIORITY: property_image > images > related.listing_images > related.images
    let rawImages = [];
    if (p.property_image && (Array.isArray(p.property_image) ? p.property_image.length > 0 : true)) {
        rawImages = p.property_image;
    } else if (p.images && (Array.isArray(p.images) ? p.images.length > 0 : true)) {
        rawImages = p.images;
    } else if (p.related?.listing_images && p.related.listing_images.length > 0) {
        rawImages = p.related.listing_images;
    } else if (p.related?.images && p.related.images.length > 0) {
        rawImages = p.related.images;
    }

    const imageArray = Array.isArray(rawImages) ? rawImages : (rawImages ? [rawImages] : []);

    images = imageArray
        .filter(img => img && (img.url || img.uri || (typeof img === 'string')))
        .sort((a, b) => (a.priority || a.order || a.rank || 0) - (b.priority || b.order || b.rank || 0))
        .map(img => {
            // Prioritize full-resolution URL, then largest thumbs as fallback
            const fullUrl = img.url || img.uri || (typeof img === 'string' ? img : null);
            return ensureProtocol(fullUrl || img.thumbs?.['1200x800']?.url || img.thumbs?.['800x600']?.url);
        })
        .filter(Boolean);

    // Only use listing_primary_image if we have NO property photos, or push it to end
    if (p.listing_primary_image?.url) {
        const url = ensureProtocol(p.listing_primary_image.url);
        if (url && !images.includes(url)) {
            if (images.length === 0) images.push(url);
            else images.push(url);
        }
    }

    // Determine status
    let mappedStatus = 'available';
    const state = (p.system_listing_state || '').toLowerCase();

    if (state === 'sold' || state === 'exchanged') mappedStatus = 'sold';
    else if (state === 'leased') mappedStatus = 'rented';
    else if (state === 'withdrawn' || state === 'off_market') mappedStatus = 'archived';

    // Address - try property nested fields first, then top-level
    // Note: adr_street_name often includes the street type in Rex API
    const addressElements = [
        prop.adr_unit_number,
        prop.adr_street_number,
        prop.adr_street_name
    ].filter(Boolean);

    // Add street type ONLY if not already in street name
    if (prop.adr_street_type && !prop.adr_street_name?.toLowerCase().includes(prop.adr_street_type.toLowerCase())) {
        addressElements.push(prop.adr_street_type);
    }

    const address = addressElements.join(' ') || p.legal_prop_address;

    // Suburb from property object
    const suburb = prop.adr_suburb_or_town || prop.adr_locality;

    // Determine property type from listing_category
    let propertyType = p.listing_category?.text || 'residential';
    if (propertyType.toLowerCase().includes('rent') || propertyType.toLowerCase().includes('lease')) {
        propertyType = 'rental';
    }

    const agent = p.listing_agent_1 || {};
    const agentName = agent.text || agent.name;
    const agentEmail = agent.email_address || agent.email;
    const agentPhone = agent.phone_mobile || agent.phone_direct;
    const agentImage = ensureProtocol(agent.profile_image?.url || agent.profile_image);

    // Search for description in various locations
    const adverts = p.listing_adverts || p.related?.listing_adverts || p.adverts || [];
    const internetAdvert = adverts.find(a => a.advert_type === 'internet' || a.advert_type === 'Internet') || {};

    // Also check for direct advert_internet shortcut
    const directAdvert = p.advert_internet || p.related?.advert_internet || {};

    return {
        id: p.id,
        agentId: agent.id,
        agentName,
        agentEmail,
        agentPhone,
        agentImage,

        // Address
        address: address,
        suburb: suburb,
        state: prop.adr_state_or_region,
        postcode: prop.adr_postcode,

        // Details
        price: p.price_advertise_as || 'Contact Agent',
        priceValue: parseInt(p.price_match || 0),

        bedrooms: parseInt(prop.attr_bedrooms || p.listing_bedrooms || 0),
        bathrooms: parseInt(prop.attr_bathrooms || p.listing_bathrooms || 0),
        carSpaces: parseInt(prop.attr_garages || 0) + parseInt(prop.attr_carports || 0) || parseInt(p.listing_garages || 0),
        landSize: prop.attr_land_area || p.land_details?.area?.['#text'] || p.land_details?.area || '',

        // Meta
        propertyType: propertyType,
        status: mappedStatus,
        originalStatus: state,

        description: internetAdvert.advert_body || directAdvert.body || p.description || '',
        headline: internetAdvert.advert_heading || directAdvert.heading || p.headline || '',

        images: images,

        // Documents - extract public documents and SOI
        documents: (p.related?.listing_documents || [])
            .filter(doc => doc.privacy?.id === 'public' && doc.url)
            .map(doc => ({
                id: doc.id,
                name: doc.description,
                type: doc.type?.text || 'Document',
                typeId: doc.type?.id,
                url: ensureProtocol(doc.url)
            })),

        // Statement of Information - find specifically typed SOI document
        statementOfInformation: (() => {
            const soi = (p.related?.listing_documents || []).find(
                doc => doc.type?.id === 'statement_of_info' && doc.privacy?.id === 'public' && doc.url
            );
            return soi ? ensureProtocol(soi.url) : null;
        })(),

        createdAt: p.system_ctime,
        updatedAt: p.system_modtime
    };
}


function parsePrice(priceField) {
    if (!priceField) return 0;
    // If object with #text (common in XML parsers)
    const val = typeof priceField === 'object' ? priceField['#text'] : priceField;
    // remove non-numeric
    return parseInt(String(val).replace(/[^0-9]/g, '')) || 0;
}
