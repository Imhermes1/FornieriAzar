import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { getFilteredListings } from '@/lib/rexsoftware-helper';

export const metadata = {
    title: 'Properties for Rent | East & South East Melbourne | Fornieri & Azar',
    description: 'Browse our exclusive collection of rental properties in East and South East Melbourne.',
};

export const dynamic = 'force-dynamic';

export default async function RentPage(props) {
    const searchParams = await props.searchParams;

    const { listings, total } = await getFilteredListings({
        status: searchParams.status,
        type: 'rent', // Only show rental properties
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
        bedrooms: searchParams.bedrooms,
        suburb: searchParams.suburb,
        limit: 50
    });

    const hasListings = listings && listings.length > 0;

    return (
        <div data-page="rent">
            <Header />
            <main className="listings-page">
                {/* Hero Section */}
                <section className="listings-hero">
                    <div className="listings-hero__content">
                        <h1><strong>Fornieri & Azar</strong>. Connecting People to Property.</h1>
                    </div>
                </section>

                {/* Search Filters */}
                <section className="listings-filters">
                    <div className="listings-filters__bar">
                        <div className="listings-filters__search">
                            <input
                                type="text"
                                placeholder="Search properties"
                                className="filter-input filter-input--search"
                            />
                        </div>
                        <div className="listings-filters__selects">
                            <select className="filter-select">
                                <option value="">Location</option>
                                <option value="clarinda">Clarinda</option>
                                <option value="cheltenham">Cheltenham</option>
                                <option value="mentone">Mentone</option>
                            </select>
                            <select className="filter-select">
                                <option value="">Min Price</option>
                                <option value="400">$400/wk</option>
                                <option value="500">$500/wk</option>
                                <option value="600">$600/wk</option>
                            </select>
                            <select className="filter-select">
                                <option value="">Max Price</option>
                                <option value="600">$600/wk</option>
                                <option value="800">$800/wk</option>
                                <option value="1000">$1,000/wk</option>
                            </select>
                            <select className="filter-select">
                                <option value="">Bed</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                            <select className="filter-select">
                                <option value="">Bath</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                            </select>
                        </div>
                    </div>

                    {/* Type Pills */}
                    <div className="listings-filters__pills">
                        <Link href="/buy" className="filter-pill">Buy</Link>
                        <Link href="/rent" className="filter-pill filter-pill--active">Rent</Link>
                    </div>
                </section>

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
                                <h3>No rental properties found</h3>
                                <p>Check back later for new listings or adjust your filters.</p>
                                <Link href="/rent" className="btn btn--primary">Clear Filters</Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="cta">
                    <div className="cta-inner">
                        <div className="cta-copy">
                            <p className="eyebrow">Need help finding a rental?</p>
                            <h2>Let us find the perfect place for you</h2>
                            <p>Tell us your requirements and we'll match you with suitable properties.</p>
                        </div>
                        <div className="cta-actions">
                            <Link className="btn btn--primary" href="/contact">Get in Touch</Link>
                            <Link className="btn btn--ghost" href="/services">Our Rental Services</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
