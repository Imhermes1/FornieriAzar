'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                <h3>Selling</h3>
                <p className="minimal-text">
                  We deliver comprehensive marketing campaigns and strategic negotiation to maximize your sale price.
                </p>
                <ul className="minimal-list">
                  <li>Professional photography</li>
                  <li>Auction guidance</li>
                  <li>Expert negotiation</li>
                </ul>
              </article>

              <article className="minimal-service-card">
                <h3>Buying</h3>
                <p className="minimal-text">
                  We identify opportunities, conduct due diligence, and provide expert negotiation to secure the best terms.
                </p>
                <ul className="minimal-list">
                  <li>Property search</li>
                  <li>Contract review</li>
                  <li>Settlement support</li>
                </ul>
              </article>

              <article className="minimal-service-card">
                <h3>Property Management</h3>
                <p className="minimal-text">
                  We provide premium management services, ensuring your investment is well-maintained and yielding maximum returns.
                </p>
                <ul className="minimal-list">
                  <li>Tenant selection</li>
                  <li>Maintenance management</li>
                  <li>Rent collection</li>
                </ul>
              </article>

              <article className="minimal-service-card">
                <h3>Projects</h3>
                <p className="minimal-text">
                  We partner with developers to deliver strategic market positioning and sales campaign management.
                </p>
                <ul className="minimal-list">
                  <li>Market positioning</li>
                  <li>Pricing strategy</li>
                  <li>Campaign management</li>
                </ul>
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
                  src="/images/LowRes_2k_08.jpg"
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
                <div className="minimal-stats" style={{ border: 'none', padding: '20px 0', margin: 0, gap: '20px' }}>
                  <div className="minimal-stat" style={{ textAlign: 'left' }}>
                    <span className="minimal-stat__value" style={{ fontSize: '24px' }}>18+</span>
                    <span className="minimal-stat__label">Platforms</span>
                  </div>
                  <div className="minimal-stat" style={{ textAlign: 'left' }}>
                    <span className="minimal-stat__value" style={{ fontSize: '24px' }}>12.6%</span>
                    <span className="minimal-stat__label">Above Reserve</span>
                  </div>
                </div>
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
                  src="/images/luke_big.png?v=2"
                  alt="Luke Fornieri"
                  loading="lazy"
                />
              </div>
              <div className="minimal-grid__content">
                <p className="eyebrow">Founder / OIEC</p>
                <h2 className="minimal-heading">Luke Fornieri</h2>
                <p className="minimal-text">
                  Luke brings over two decades of experience in Melbourne's premium property market. Known for strategic negotiation and a results-driven approach.
                </p>
                <ul className="minimal-list">
                  <li>Certified Estate Agent</li>
                  <li>REIV Member</li>
                  <li>Top Agent 2024</li>
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
                <p className="eyebrow">Director / Auctioneer</p>
                <h2 className="minimal-heading">Chris Azar</h2>
                <p className="minimal-text">
                  Chris combines deep market knowledge with an unwavering commitment to client success. His approachable style and attention to detail ensure a seamless property journey.
                </p>
                <ul className="minimal-list">
                  <li>Licensed Estate Agent</li>
                  <li>Property Management Specialist</li>
                  <li>Market Analyst</li>
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
