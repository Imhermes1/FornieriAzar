import { XMLParser } from 'fast-xml-parser';

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
    const feedUrl = process.env.REX_XML_FEED_URL;

    if (!feedUrl) {
        console.warn('REX_XML_FEED_URL not configured');
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

        // Suburb filter
        if (suburb && !item.suburb?.toLowerCase().includes(suburb.toLowerCase())) return false;

        return true;
    });

    return {
        listings: filtered.slice(offset, offset + limit),
        total: filtered.length
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

function parsePrice(priceField) {
    if (!priceField) return 0;
    // If object with #text (common in XML parsers)
    const val = typeof priceField === 'object' ? priceField['#text'] : priceField;
    // remove non-numeric
    return parseInt(String(val).replace(/[^0-9]/g, '')) || 0;
}
