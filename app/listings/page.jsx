'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ListingsPage() {
  return (
    <div data-page="listings">
      <Header />
      <main>
        <section className="page-hero" aria-labelledby="listings-title">
          <img className="page-hero__media" src="/images/main.jpg" alt="Luxury Melbourne residence exterior" />
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">Signature portfolio</p>
            <h1 className="page-hero__title" id="listings-title">Curated residences redefining luxury living</h1>
            <p className="page-hero__meta">Private opportunities, signature campaigns, and discreet acquisitions spanning Brighton, Toorak, the CBD Paris end, and beyond.</p>
          </div>
        </section>

        <section className="listings" aria-label="Featured prestige properties">
          <div className="section-heading">
            <p className="eyebrow">Exclusive releases</p>
            <h2>Available to qualified buyers</h2>
            <p>Each residence is available for private inspection via appointment. Contact our advisory desk for full disclosure packs and off-market opportunities.</p>
          </div>
          <div className="listing-grid">
            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/main.jpg" alt="Brighton waterfront estate" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">Brighton</p>
                <h3>27 Cambridge Drive</h3>
                <ul className="listing-card__facts">
                  <li>5 bedrooms</li>
                  <li>6 bathrooms</li>
                  <li>Private jetty</li>
                </ul>
                <p>Bayfront sanctuary with panoramic water vistas, wellness pavilion, and entertainer's terraces framed by coastal landscaping.</p>
                <Link className="listing-card__cta" href="/contact">Request confidential brief</Link>
              </div>
            </article>

            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/images.jpeg" alt="Collins Street penthouse" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">Melbourne CBD</p>
                <h3>88 Collins Street Residences</h3>
                <ul className="listing-card__facts">
                  <li>Whole-floor penthouse</li>
                  <li>Concierge</li>
                  <li>Private cellar</li>
                </ul>
                <p>Paris end penthouse with bespoke interiors, floor-to-ceiling glazing, and exclusive amenity including wellness lounge and chauffeur access.</p>
                <Link className="listing-card__cta" href="/contact">Discover availability</Link>
              </div>
            </article>

            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/main.jpg" alt="Toorak heritage estate" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">Toorak</p>
                <h3>11 Kensington Road Estate</h3>
                <ul className="listing-card__facts">
                  <li>Heritage wing</li>
                  <li>Infinity pool</li>
                  <li>Car gallery</li>
                </ul>
                <p>Grand estate merging architectural heritage with contemporary luxury, set within botanical grounds and secure gated access.</p>
                <Link className="listing-card__cta" href="/contact">Arrange dossier</Link>
              </div>
            </article>

            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/main.jpg" alt="Armadale architectural residence" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">Armadale</p>
                <h3>156 High Street Pavilion</h3>
                <ul className="listing-card__facts">
                  <li>4 bedrooms</li>
                  <li>Sky courtyard</li>
                  <li>Designer atelier</li>
                </ul>
                <p>Award-winning residence with floating staircases, sculptural gardens, and dual living wings separated for privacy.</p>
                <Link className="listing-card__cta" href="/contact">Secure inspection</Link>
              </div>
            </article>

            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/images.jpeg" alt="South Yarra residence" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">South Yarra</p>
                <h3>23 Domain Road Manor</h3>
                <ul className="listing-card__facts">
                  <li>6 bedrooms</li>
                  <li>Private cinema</li>
                  <li>Terraced gardens</li>
                </ul>
                <p>Elevated manor moments from the Botanic Gardens with European-inspired interiors and expansive entertainment levels.</p>
                <Link className="listing-card__cta" href="/contact">Request private tour</Link>
              </div>
            </article>

            <article className="listing-card">
              <figure className="listing-card__media">
                <img src="/images/main.jpg" alt="Canterbury residence" loading="lazy" />
              </figure>
              <div className="listing-card__body">
                <p className="listing-card__suburb">Canterbury</p>
                <h3>91 Canterbury Road Residences</h3>
                <ul className="listing-card__facts">
                  <li>Tri-level</li>
                  <li>Wellness suite</li>
                  <li>Wine gallery</li>
                </ul>
                <p>Architectural masterpiece with flexible living zones, a resort-inspired pool, and custom temperature-controlled cellar.</p>
                <Link className="listing-card__cta" href="/contact">Book presentation</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="cta" aria-labelledby="listings-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Off-market access</p>
              <h2 id="listings-cta-title">Tap into Melbourne's private prestige pipeline</h2>
              <p>Many of our transactions are completed discreetly. Share your criteria for priority alerts tailored to your portfolio.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Submit brief</Link>
              <Link className="btn btn--ghost" href="/services">Discover buyer advocacy</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
