'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div data-page="services">
      <Header />
      <main>
        <section className="page-hero" aria-labelledby="services-title">
          <img className="page-hero__media" src="/images/images.jpeg" alt="Luxury real estate consultation" />
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">Advisory services</p>
            <h1 className="page-hero__title" id="services-title">End-to-end stewardship for prestige assets</h1>
            <p className="page-hero__meta">From market entry strategy to settlement, our team orchestrates every detail for vendors, buyers, and partners seeking standout outcomes.</p>
          </div>
        </section>

        <section className="services">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>Integrated solutions tailored to each mandate</h2>
            <p>We operate as your private advisory desk, guiding every stage with discretion, data, and design-led storytelling.</p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Vendor advocacy</h3>
              <p>Strategic campaign curation, global media placement, and on-brand presentation to maximise visibility and competition across high-net-worth audiences.</p>
              <ul>
                <li>Campaign blueprinting & styling</li>
                <li>Off-market introductions</li>
                <li>Auction & private treaty management</li>
                <li>Negotiation & settlement oversight</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Buyer representation</h3>
              <p>Discreet acquisition support leveraging exclusive channels, forensic due diligence, and confident negotiation to secure rare assets.</p>
              <ul>
                <li>Portfolio curation</li>
                <li>Pricing and appraisal modelling</li>
                <li>Contract & compliance review</li>
                <li>Relocation concierge services</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Project collaboration</h3>
              <p>Partnerships with developers, architects, and financiers to launch prestige projects with clarity on positioning, pricing, and channel strategy.</p>
              <ul>
                <li>Product & brand positioning</li>
                <li>Sales suite & display concepts</li>
                <li>Release sequencing</li>
                <li>Agency alignment and training</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="experience" aria-labelledby="services-experience-title">
          <div className="experience-media">
            <img src="/images/main.jpg" alt="Campaign planning session" loading="lazy" />
          </div>
          <div className="experience-copy">
            <p className="eyebrow">Campaign methodology</p>
            <h2 id="services-experience-title">Story-driven marketing engineered to convert</h2>
            <p>Dedicated strategists, editorial storytellers, and production partners collaborate to deliver cinematic visuals, immersive digital experiences, and data-backed reporting dashboards across every campaign.</p>
            <div className="experience-highlights">
              <div>
                <p className="experience-highlights__label">Custom content</p>
                <p className="experience-highlights__value">In-house creative studio</p>
              </div>
              <div>
                <p className="experience-highlights__label">Market reach</p>
                <p className="experience-highlights__value">18+ prestige networks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">Client reflections</p>
            <h2>Testimonials from recent mandates</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Fornieri orchestrated a private sale that exceeded our expectations within a fortnight while keeping our family's privacy paramount."
              </blockquote>
              <figcaption>Private vendor, Toorak</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "Their buyer advocacy secured an off-market estate we'd chased for years. The due diligence pack was forensic."
              </blockquote>
              <figcaption>Corporate executive, Brighton</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "From video storytelling to international syndication, every campaign element was flawless and on-brand."
              </blockquote>
              <figcaption>Developer partner, South Yarra</figcaption>
            </figure>
          </div>
        </section>

        <section className="cta" aria-labelledby="services-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Consultation</p>
              <h2 id="services-cta-title">Discuss a bespoke strategy</h2>
              <p>Share your timeframe and objectives to receive a tailored blueprint across pricing, presentation, and negotiation.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Start a conversation</Link>
              <a className="btn btn--ghost" href="mailto:hello@fornieriazar.com.au">Email our advisors</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
