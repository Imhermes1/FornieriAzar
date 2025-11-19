'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div data-page="services">
      <Header />
      <main>
        <section className="simple-hero" aria-labelledby="services-title">
          <div className="simple-hero__content">
            <p className="eyebrow">Our Services</p>
            <h1 className="simple-hero__title" id="services-title">We're here to help every step of the way</h1>
            <p className="simple-hero__description">From getting your home ready to sell, to finding the perfect property, to settling into your new place - we've got you covered.</p>
          </div>
        </section>

        <section className="services">
          <div className="section-heading">
            <p className="eyebrow">How we help</p>
            <h2>Tailored strategies for optimal outcomes</h2>
            <p>Every property requires a customized approach. We develop strategic plans based on market analysis, buyer profiles, and your specific objectives.</p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Property sales</h3>
              <p>We deliver comprehensive marketing campaigns, professional presentation, and strategic negotiation to maximize your sale price.</p>
              <ul>
                <li>Professional photos & video tours</li>
                <li>Private sales & auction options</li>
                <li>Expert negotiation</li>
                <li>Support through settlement</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Buyer services</h3>
              <p>We identify opportunities, conduct due diligence, provide market analysis, and negotiate optimal terms on your behalf.</p>
              <ul>
                <li>Property identification & research</li>
                <li>Market analysis & pricing advice</li>
                <li>Contract review & due diligence</li>
                <li>Strategic negotiation</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Development projects</h3>
              <p>We provide market positioning, sales strategy, and buyer acquisition for development projects of all scales.</p>
              <ul>
                <li>Market positioning advice</li>
                <li>Sales presentation & display</li>
                <li>Launch strategy</li>
                <li>Sales team support</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="experience" aria-labelledby="services-experience-title">
          <div className="experience-media">
            <img src="/images/LowRes_2k_07.jpg" alt="Premium property" loading="lazy" />
          </div>
          <div className="experience-copy">
            <p className="eyebrow">Our marketing approach</p>
            <h2 id="services-experience-title">Strategic marketing campaigns</h2>
            <p>Professional photography, video content, and targeted digital advertising ensure your property reaches qualified buyers. We provide regular performance analytics and market feedback throughout the campaign.</p>
            <div className="experience-highlights">
              <div>
                <p className="experience-highlights__label">Quality content</p>
                <p className="experience-highlights__value">Professional photography & video</p>
              </div>
              <div>
                <p className="experience-highlights__label">Wide reach</p>
                <p className="experience-highlights__value">18+ property platforms</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">Happy clients</p>
            <h2>Hear from people we've helped</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Luke helped us sell our home privately in just two weeks and got us more than we expected. He was professional and kept everything confidential."
              </blockquote>
              <figcaption>Sophie, Toorak</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "After searching for years, they found us a home we never would have known was for sale. Their research was thorough and the advice was spot-on."
              </blockquote>
              <figcaption>Robert, Brighton</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "The marketing for our property was beautiful - professional videos, stunning photos, and it was everywhere online. Very impressive."
              </blockquote>
              <figcaption>James, South Yarra</figcaption>
            </figure>
          </div>
        </section>

        <section className="cta" aria-labelledby="services-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Get started</p>
              <h2 id="services-cta-title">Ready to develop your property strategy?</h2>
              <p>Contact us to discuss your objectives and timeline. We'll develop a customized approach to achieve your goals.</p>
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
