import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'About Us | Top Real Estate Agents East & South East Melbourne',
  description: 'Meet the team at Fornieri & Azar. We are experienced real estate professionals dedicated to achieving exceptional results in East and South East Melbourne.',
};

export default function AboutPage() {
  return (
    <div data-page="about">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="minimal-hero" aria-labelledby="about-title">
          <p className="eyebrow">Our Story</p>
          <h1 className="minimal-hero__title" id="about-title">
            A boutique agency built on results
          </h1>
          <p className="minimal-hero__text">
            We combine years of market experience with strategic expertise to deliver exceptional outcomes for our clients.
          </p>
        </section>

        {/* Intro Section */}
        <section className="minimal-section">
          <div className="minimal-container">
            <div className="minimal-grid">
              <div className="minimal-grid__media">
                <img
                  src="/images/HighRes_6k_18.jpg"
                  alt="Luxury property marketing"
                  loading="lazy"
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">How we work</p>
                <h2 className="minimal-heading">Strategic approach, expert advice</h2>
                <p className="minimal-text">
                  We maintain a selective client base to ensure every property receives dedicated attention. Our focus is on delivering results through market expertise and proven negotiation skills.
                </p>
                <ul className="minimal-list">
                  <li>Targeted marketing strategies</li>
                  <li>Market data and buyer insights</li>
                  <li>Qualified buyer network</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="minimal-section minimal-section--gray">
          <div className="minimal-container">
            <div className="minimal-stats">
              <div className="minimal-stat">
                <span className="minimal-stat__value">$200M+</span>
                <span className="minimal-stat__label">Property Sold</span>
              </div>
              <div className="minimal-stat">
                <span className="minimal-stat__value">13+</span>
                <span className="minimal-stat__label">Years Experience</span>
              </div>
              <div className="minimal-stat">
                <span className="minimal-stat__value">100+</span>
                <span className="minimal-stat__label">Happy Clients</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="minimal-section" id="services">
          <div className="minimal-container">
            <div className="section-heading">
              <p className="eyebrow">What we do</p>
              <h2 className="minimal-heading">Comprehensive property services</h2>
            </div>

            <div className="minimal-services">
              <article className="minimal-service-card">
                <h3>Sales</h3>
                <p className="minimal-text">
                  Comprehensive marketing campaigns and strategic negotiation designed to maximise your sale price and deliver exceptional results.
                </p>
              </article>

              <article className="minimal-service-card">
                <h3>Advocacy</h3>
                <p className="minimal-text">
                  Strategic sourcing, expert negotiation, and bidding services to help you secure the right property at the right price.
                </p>
              </article>

              <article className="minimal-service-card">
                <h3>Rentals</h3>
                <p className="minimal-text">
                  Premium property management and leasing services designed to maximise returns and secure high-quality tenants.
                </p>
              </article>

              <article className="minimal-service-card">
                <h3>Projects</h3>
                <p className="minimal-text">
                  Strategic market positioning and sales campaign management for developments of all scales.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="minimal-section minimal-section--gray">
          <div className="minimal-container">
            <div className="minimal-grid minimal-grid--reverse">
              <div className="minimal-grid__media">
                <img
                  src="/images/0361.01 5 Princely Tce, Templestowe-3.jpg"
                  alt="Premium property interior"
                  loading="lazy"
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">Our Marketing</p>
                <h2 className="minimal-heading">Marketing that delivers</h2>
                <p className="minimal-text">
                  Our campaigns combine professional photography, video content, and targeted digital advertising to reach qualified buyers. We provide regular performance analytics to keep you informed.
                </p>

              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="minimal-section">
          <div className="minimal-container">
            <div className="minimal-grid">
              <div className="minimal-grid__content">
                <p className="eyebrow">Our Philosophy</p>
                <h2 className="minimal-heading">Values that define us</h2>

                <div style={{ display: 'grid', gap: '32px', marginTop: '32px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Discretion</h3>
                    <p className="minimal-text" style={{ marginBottom: 0 }}>
                      We understand the value of privacy. Our off-market strategies and confidential approach ensure your business remains yours.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Excellence</h3>
                    <p className="minimal-text" style={{ marginBottom: 0 }}>
                      From marketing materials to property presentation, we believe that every detail matters in achieving a premium result.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Integrity</h3>
                    <p className="minimal-text" style={{ marginBottom: 0 }}>
                      We build long-term relationships based on honest advice, transparency, and an unwavering commitment to your best interests.
                    </p>
                  </div>
                </div>
              </div>
              <div className="minimal-grid__media">
                <img
                  src="/images/image (1).jpg"
                  alt="Our Philosophy"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="minimal-section">
          <div className="minimal-container">
            <div className="minimal-testimonial">
              <blockquote>
                "Luke helped us sell our family home quickly and privately. He kept everything confidential and got us a fantastic result."
              </blockquote>
              <cite>Sarah & James, Toorak</cite>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="minimal-section minimal-section--gray" id="team">
          <div className="minimal-container">
            {/* Luke */}
            <div className="minimal-grid" style={{ marginBottom: '80px' }}>
              <div className="minimal-grid__media">
                <img
                  src="/images/lukeprofile.png"
                  alt="Luke Fornieri"
                  loading="lazy"
                  style={{ objectPosition: 'top' }}
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">Founder / OIEC</p>
                <h2 className="minimal-heading">Luke Fornieri</h2>
                <p className="minimal-text">
                  Luke has established a remarkable track record, known for closing deals and fostering enduring relationships. His personalised approach serves a diverse clientele, including high-profile individuals.
                </p>
                <ul className="minimal-list">
                  <li>Licensed Estate Agent</li>
                  <li>Strategic Advisor</li>
                  <li>Market Analyst</li>
                </ul>
                <div style={{ marginTop: '16px' }}>
                  <a className="btn btn--primary" href="mailto:luke@fornieriazar.com.au?subject=Enquiry for Luke Fornieri">Work with Luke</a>
                </div>
              </div>
            </div>

            {/* Chris */}
            <div className="minimal-grid minimal-grid--reverse">
              <div className="minimal-grid__media">
                <img
                  src="/images/chris_bigger.png"
                  alt="Chris Azar"
                  loading="lazy"
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">Founder / Auctioneer</p>
                <h2 className="minimal-heading">Chris Azar</h2>
                <p className="minimal-text">
                  Chris combines deep market knowledge with an unwavering commitment to client success. His approachable style and attention to detail ensure a seamless property journey.
                </p>
                <ul className="minimal-list">
                  <li>Senior Auctioneer</li>
                  <li>Client Relations</li>
                  <li>Campaign Strategist</li>
                </ul>
                <div style={{ marginTop: '16px' }}>
                  <a className="btn btn--primary" href="mailto:chris@fornieriazar.com.au?subject=Enquiry for Chris Azar">Work with Chris</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Get started</p>
              <h2>Ready to discuss your property?</h2>
              <p>Whether you're selling, buying, or need advice, we're here to help.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Get in touch</Link>
              <Link className="btn btn--ghost" href="/services">View Services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
