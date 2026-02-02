import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import ListingFilters from '../components/ListingFilters';
import { getFilteredListings } from '@/lib/rexsoftware-helper';

export const metadata = {
    title: 'Properties for Sale | East & South East Melbourne | Fornieri & Azar',
    description: 'Browse our exclusive collection of properties for sale in East and South East Melbourne.',
    openGraph: {
        title: 'Properties for Sale | East & South East Melbourne',
        description: 'Browse our exclusive collection of properties for sale in East and South East Melbourne.',
        images: [{ url: '/images/LowRes_2k_18.jpg', width: 1200, height: 630, alt: 'Properties for Sale' }],
    },
};

export const dynamic = 'force-dynamic';

export default async function BuyPage(props) {
    const searchParams = await props.searchParams;

    const { listings, total, suburbs } = await getFilteredListings({
        status: searchParams.status,
        type: 'sale', // Only show sale properties
        filter: searchParams.filter, // 'auctions' or 'inspections'
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
        bedrooms: searchParams.bedrooms,
        suburb: searchParams.suburb,
        limit: 50
    });

    const hasListings = listings && listings.length > 0;

    return (
        <div data-page="buy">
            <Header />
            <main className="listings-page">
                {/* Hero Section */}
                <section className="listings-hero">
                    <div className="listings-hero__content">
                        <h1><strong>Fornieri & Azar</strong>. Connecting People to Property.</h1>
                    </div>
                </section>

                {/* Search Filters */}
                <ListingFilters suburbs={suburbs} searchParams={searchParams} />

                {/* Results Header */}
                <section className="listings-results">
                    <div className="listings-results__header">
                        <p className="listings-results__count">{total} RESULTS</p>
                        <div className="listings-results__sort">
                            <span>SORT</span>
                            <select className="sort-select">
                                <option value="recent">Recently Listed</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    {/* Property Grid */}
                    <div className="property-grid">
                        {hasListings ? (
                            listings.map(listing => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))
                        ) : (
                            <div className="no-results">
                                <h3>No properties found</h3>
                                <p>Check back later for new listings or adjust your filters.</p>
                                <Link href="/buy" className="btn btn--primary">Clear Filters</Link>
                            </div>
                        )}
                    </div>
                </section>


            </main>
            <Footer />
        </div>
    );
}
