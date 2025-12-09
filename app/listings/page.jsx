
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { getFilteredListings } from '@/lib/rexsoftware-helper';

export const metadata = {
  title: 'Properties for Sale & Rent | East & South East Melbourne',
  description: 'Browse our exclusive collection of properties for sale and rent in East and South East Melbourne.',
};

// Force dynamic since searchParams can change and we want fresh data
export const dynamic = 'force-dynamic';

export default async function ListingsPage(props) {
  // Await searchParams in Next.js 15+ (or 13+ generally recommended)
  const searchParams = await props.searchParams;

  const { listings, total } = await getFilteredListings({
    status: searchParams.status,
    type: searchParams.type,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    bedrooms: searchParams.bedrooms,
    suburb: searchParams.suburb,
    limit: 50 // Show more per page
  });

  const hasListings = listings && listings.length > 0;

  return (
    <div data-page="listings">
      <Header />
      <main>
        <section className="simple-hero" aria-labelledby="listings-title">
          <div className="simple-hero__content">
            <p className="eyebrow">Available Properties</p>
            <h1 className="simple-hero__title" id="listings-title">Find your perfect home</h1>
            <p className="simple-hero__description">Browse our current properties for sale and rent across Melbourne.</p>
          </div>
        </section>

        <section className="listings" aria-label="Featured properties">
          {/* Filter Info Bar */}
          <div className="filter-summary">
            <p>{total} properties found</p>
            {/* Could add active filters display here */}
          </div>

          <div className="listing-grid">
            {hasListings ? (
              listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search filters or check back later.</p>
                <Link href="/listings" className="btn btn--secondary">Clear Filters</Link>
              </div>
            )}
          </div>
        </section>

        <section className="cta" aria-labelledby="listings-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Looking for something specific?</p>
              <h2 id="listings-cta-title">Can't find what you're looking for?</h2>
              <p>We often have properties available that aren't listed online yet. Let us know what you're after and we'll keep an eye out for you.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Tell us what you want</Link>
              <Link className="btn btn--ghost" href="/services">Learn about our buyer service</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
