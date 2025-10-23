'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TeamPage() {
  return (
    <div data-page="team">
      <Header />
      <main>
        <section className="page-hero" aria-labelledby="team-title">
          <img className="page-hero__media" src="/images/Luke_010_HiRes.jpg" alt="Luke Fornieri speaking with clients" />
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">Leadership</p>
            <h1 className="page-hero__title" id="team-title">A collective of advisors with deep market intelligence</h1>
            <p className="page-hero__meta">Fornieri pairs decades of prestige property experience with specialists across research, marketing, and client service to deliver uncompromising outcomes.</p>
          </div>
        </section>

        <section className="team" aria-label="Leadership profile">
          <div className="team-card">
            <div className="team-card__media">
              <img src="/images/Luke_010_HiRes.jpg" alt="Portrait of Luke Fornieri" loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="eyebrow">Principal advisor</p>
              <h2>Luke Fornieri</h2>
              <p>Luke is recognised for confident deal management, nuanced negotiation, and a global network cultivated over twenty years in Melbourne's prestige market. He leads every mandate and remains the central point of contact for clients.</p>
              <ul className="team-card__credentials">
                <li>Certified Estate Agent & Auctioneer</li>
                <li>Member, Real Estate Institute of Victoria</li>
                <li>Featured in AFR Top Agents 2024</li>
              </ul>
              <div className="cta-actions">
                <a className="btn btn--primary" href="mailto:hello@fornieri.com.au">Connect with Luke</a>
                <Link className="btn btn--ghost" href="/services">View advisory services</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Team metrics">
          <div className="metric-card">
            <p className="metric-card__value">12 specialists</p>
            <p className="metric-card__label">Campaign, research, and client success experts</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">4 languages</p>
            <p className="metric-card__label">Multilingual negotiation across buyer pools</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">48 hrs</p>
            <p className="metric-card__label">Average response time to new briefs</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">100%</p>
            <p className="metric-card__label">Campaigns with bespoke creative production</p>
          </div>
        </section>

        <section className="testimonials" aria-label="Partner testimonials">
          <div className="section-heading">
            <p className="eyebrow">Partner network</p>
            <h2>Industry voices on our collaboration</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Fornieri's marketing and research teams align seamlessly with our development timelines, elevating every launch."
              </blockquote>
              <figcaption>Director, boutique developer partner</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "The client service division anticipates needs before they arise, ensuring every inspection is choreographed perfectly."
              </blockquote>
              <figcaption>Interior stylist collaborator</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "Data insights and negotiation strategy are unmatched—our vendors feel guided and empowered at every decision."
              </blockquote>
              <figcaption>Financial adviser partner</figcaption>
            </figure>
          </div>
        </section>

        <section className="cta" aria-labelledby="team-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Meet the collective</p>
              <h2 id="team-cta-title">Engage the specialists behind each campaign</h2>
              <p>We will coordinate an introduction tailored to your priorities, ensuring you meet the strategists, researchers, and storytellers aligned to your project.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Schedule introductions</Link>
              <a className="btn btn--ghost" href="mailto:hello@fornieri.com.au">Email the leadership desk</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
