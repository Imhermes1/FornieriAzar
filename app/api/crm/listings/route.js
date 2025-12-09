import { NextResponse } from 'next/server';
import { fetchRexListings } from '@/lib/rexsoftware-helper';

export const dynamic = 'force-dynamic'; // XML feed might change

/**
 * CRM Listings API Endpoint
 * 
 * Fetches properties from Rexsoftware XML feed.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters for client-side filtering
  const statusParam = searchParams.get('status') || 'available'; // 'available', 'sold', 'rented', 'all'
  const typeParam = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Optional filters
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '0');
  const bedrooms = parseInt(searchParams.get('bedrooms') || '0');
  const suburb = searchParams.get('suburb')?.toLowerCase();

  try {
    // 1. Fetch all listings from XML feed
    const allListings = await fetchRexListings();

    if (!allListings || allListings.length === 0) {
      // Return empty or mock if configured, but for now just empty
      return NextResponse.json({
        success: true,
        listings: [],
        meta: { total: 0, limit, offset, hasMore: false }
      });
    }

    // 2. Filter listings in memory
    let filtered = allListings.filter(item => {
      // Status filter
      if (statusParam !== 'all') {
        if (statusParam === 'available') {
          // Include available, under offer, etc.
          if (item.status !== 'available') return false;
        } else {
          if (item.status !== statusParam) return false;
        }
      }

      // Type filter (rent/sale is usually distinguished by property type or status in some feeds, 
      // but here we might need to map 'rental' type to 'rent' mode if needed.
      // For simplicity, we check if propertyType matches or if we need specific logic.)
      if (typeParam) {
        if (typeParam === 'rent' || typeParam === 'rental') {
          if (item.propertyType !== 'rental') return false;
        } else if (typeParam === 'sale') {
          if (item.propertyType === 'rental') return false;
        }
      }

      // Numeric filters
      if (minPrice && item.priceValue < minPrice) return false;
      if (maxPrice && item.priceValue > maxPrice) return false;
      if (bedrooms && item.bedrooms < bedrooms) return false;

      // Suburb filter
      if (suburb && !item.suburb?.toLowerCase().includes(suburb)) return false;

      return true;
    });

    // 3. Paginate
    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      listings: paginated,
      meta: {
        total,
        limit,
        offset,
        hasMore: total > (offset + limit)
      }
    });

  } catch (error) {
    console.error('Listings API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings', details: error.message },
      { status: 500 }
    );
  }
}

