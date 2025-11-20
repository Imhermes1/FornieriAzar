import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Real Estate Services East & South East Melbourne | Fornieri & Azar',
  description: 'Comprehensive real estate services including property sales, buyer advocacy, rentals, and project marketing across East and South East Melbourne.',
};

export default function ServicesPage() {
  return (
    <div data-page="services">
      <Header />
      <main>
        {/* Hero */}
        <section className="minimal-hero">
          <h1 className="minimal-hero__title">Expertise across every stage</h1>
          <p className="minimal-hero__text">
            From strategic sales campaigns to advocacy and development, we provide clear, honest advice to guide your property decisions.
          </p>
        </section>

        {/* Core Services */}
        <section className="minimal-section">
          <div className="minimal-container">
            <div className="minimal-services">
              <article className="minimal-service-card" id="sales">
                <h3>Sales Strategy</h3>
                <p className="minimal-text">
                  Comprehensive campaigns designed to maximise value through precision marketing and negotiation. We manage every detail from presentation to settlement.
                </p>
                <ul className="minimal-list">
                  <li>Professional photography & video production</li>
                  <li>Private sale & auction campaign management</li>
                  <li>Strategic negotiation & settlement coordination</li>
                </ul>
              </article>

              <article className="minimal-service-card" id="advocacy">
                <h3>Advocacy</h3>
                <p className="minimal-text">
                  Strategic sourcing, expert negotiation, and bidding for homebuyers and investors. We provide the market insight you need to buy with confidence.
                </p>
                <ul className="minimal-list">
                  <li>Off-market property sourcing & research</li>
                  <li>Auction bidding & private negotiation</li>
                  <li>Contract review & due diligence support</li>
                </ul>
              </article>

              <article className="minimal-service-card" id="projects">
                <h3>Projects</h3>
                <p className="minimal-text">
                  End-to-end sales and marketing solutions for developments of all scales, from initial floorplan advisory to final sell-through.
                </p>
                <ul className="minimal-list">
                  <li>Market positioning & pricing strategy</li>
                  <li>Campaign development & launch coordination</li>
                  <li>Sales team support & settlement management</li>
                </ul>
              </article>

              <article className="minimal-service-card" id="rentals">
                <h3>Rentals</h3>
                <p className="minimal-text">
                  Premium property management and leasing services designed to maximise returns and secure high-quality tenants for your investment.
                </p>
                <ul className="minimal-list">
                  <li>Tenant sourcing & placement</li>
                  <li>Property maintenance & inspections</li>
                  <li>Rent collection & financial reporting</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Feature 1: Marketing */}
        <section className="minimal-section" style={{ paddingTop: 0 }}>
          <div className="minimal-container">
            <div className="minimal-grid">
              <div className="minimal-grid__media">
                <img
                  src="/images/image.jpg"
                  alt="Editorial quality presentation"
                  loading="lazy"
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">Presentation</p>
                <h2 className="minimal-heading">The art of presentation</h2>
                <p className="minimal-text">
                  We believe in the power of first impressions. Our marketing combines editorial-quality photography with targeted digital reach to ensure your property stands out in a crowded market.
                </p>
                <ul className="minimal-list">
                  <li>Professional photography & videography</li>
                  <li>Curated styling advice</li>
                  <li>Targeted digital campaigns</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Approach */}
        <section className="minimal-section">
          <div className="minimal-container">
            <div className="minimal-grid">
              <div className="minimal-grid__content">
                <p className="eyebrow">Approach</p>
                <h2 className="minimal-heading">A considered approach</h2>
                <p className="minimal-text">
                  We don't rely on volume. We focus on a select number of clients to ensure every campaign receives the attention it deserves. This allows us to be agile, responsive, and completely dedicated to your result.
                </p>
              </div>
              <div className="minimal-grid__media">
                <img
                  src="/images/LowRes_2k_08.jpg"
                  alt="Strategic approach"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Next Steps</p>
              <h2>Start the conversation</h2>
              <p>Whether you're selling, buying, or developing, we're ready to provide the advice you need.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Get in touch</Link>
              <a className="btn btn--ghost" href="mailto:hello@fornieriazar.com.au">Email us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
