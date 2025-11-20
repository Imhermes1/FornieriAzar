'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TeamPage() {
  return (
    <div data-page="team">
      <Header />
      <main>
        <section className="simple-hero" aria-labelledby="team-title">
          <div className="simple-hero__content">
            <p className="eyebrow">Our Team</p>
            <h1 className="simple-hero__title" id="team-title">Experienced property professionals</h1>
            <p className="simple-hero__description">Our team brings decades of combined expertise in Melbourne's premium property market, delivering results through strategic insight and market knowledge.</p>
          </div>
        </section>

        <section className="team" aria-label="Leadership profile">
          <div className="team-card" style={{ marginBottom: '40px' }}>
            <div className="team-card__media">
              <img src="/images/Luke_010_HiRes.jpg" alt="Luke Fornieri" loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="eyebrow">Founder</p>
              <h2>Luke Fornieri</h2>
              <p>Luke has established a remarkable track record, known for closing deals and fostering enduring relationships. His personalised approach serves a diverse clientele, including high-profile individuals.</p>
              <ul className="team-card__credentials">
                <li>Licensed Estate Agent</li>
                <li>Strategic Advisor</li>
                <li>Market Analyst</li>
              </ul>
              <div className="cta-actions">
                <a className="btn btn--primary" href="mailto:hello@fornieriazar.com.au">Get in touch with Luke</a>
                <Link className="btn btn--ghost" href="/services">Our services</Link>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-card__media">
              <img src="/images/chris_bigger.png" alt="Chris Azar" loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="eyebrow">Founder / Auctioneer</p>
              <h2>Chris Azar</h2>
              <p>Chris combines deep market knowledge with an unwavering commitment to client success. His approachable style and attention to detail ensure a seamless property journey.</p>
              <ul className="team-card__credentials">
                <li>Senior Auctioneer</li>
                <li>Client Relations</li>
                <li>Campaign Strategist</li>
              </ul>
              <div className="cta-actions">
                <a className="btn btn--primary" href="mailto:chris@fornieriazar.com.au">Get in touch with Chris</a>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Team metrics">
          <div className="metric-card">
            <p className="metric-card__value">$200M+</p>
            <p className="metric-card__label">Worth of property sold</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">13+</p>
            <p className="metric-card__label">Years of experience</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">100+</p>
            <p className="metric-card__label">Properties sold</p>
          </div>
        </section>

        <section className="testimonials" aria-label="Partner testimonials">
          <div className="section-heading">
            <p className="eyebrow">Working together</p>
            <h2>What our partners say</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "The team works seamlessly with our development timelines and makes every property launch look amazing."
              </blockquote>
              <figcaption>David, Local Developer</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "They're always on top of every detail, and inspections are always perfectly organised and welcoming."
              </blockquote>
              <figcaption>Rachel, Interior Stylist</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "Their market knowledge and negotiation skills are excellent - my clients always feel well looked after."
              </blockquote>
              <figcaption>Tom, Financial Adviser</figcaption>
            </figure>
          </div>
        </section>

        <section className="cta" aria-labelledby="team-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Get started</p>
              <h2 id="team-cta-title">Ready to work with us?</h2>
              <p>Contact us to discuss your property objectives and explore how our expertise can deliver results for your specific situation.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Arrange a meeting</Link>
              <a className="btn btn--ghost" href="mailto:hello@fornieriazar.com.au">Send us an email</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
