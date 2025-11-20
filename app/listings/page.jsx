'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ListingsPage() {
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
          <div className="listing-grid">
            <div style={{
              gridColumn: '1 / -1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              textAlign: 'center',
              background: 'var(--white)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(5, 6, 8, 0.1)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                marginBottom: '16px',
                color: 'var(--off-black)'
              }}>View Our Current Collection</h3>
              <p style={{
                maxWidth: '500px',
                marginBottom: '32px',
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Explore our complete portfolio of premium properties on realestate.com.au while we update our website listings.
              </p>
              <a
                href="https://www.realestate.com.au/agency/fornieri-azar-XWHDYV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                View All Listings
              </a>
            </div>
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
