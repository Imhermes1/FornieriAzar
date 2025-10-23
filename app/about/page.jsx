'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div data-page="about">
      <Header />
      <main>
        <section className="page-hero" aria-labelledby="about-title">
          <img className="page-hero__media" src="/images/main.jpg" alt="Melbourne skyline at dusk" />
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">Our Story</p>
            <h1 className="page-hero__title" id="about-title">Boutique stewardship for remarkable properties</h1>
            <p className="page-hero__meta">Fornieri blends decades of negotiation experience, deep market intelligence, and bespoke marketing to elevate every prestige transaction.</p>
          </div>
        </section>

        <section className="intro">
          <div className="section-heading">
            <p className="eyebrow">Philosophy</p>
            <h2>Discretion, data, and design-led campaigns</h2>
            <p>Our advisory model is anchored by rigorously researched pricing strategies, curated presentation, and concierge-level client service. We engage only a select portfolio of listings to ensure unwavering focus and confidentiality.</p>
          </div>
          <div className="intro-grid">
            <div className="intro-card">
              <img src="/images/images.jpeg" alt="Fornieri bespoke marketing materials" loading="lazy" />
              <div className="intro-card__content">
                <h3>Our philosophy</h3>
                <p>We approach every mandate with a boutique mindset, crafting bespoke strategies that protect privacy, maximise visibility, and put our clients a step ahead.</p>
              </div>
            </div>
            <div className="intro-card">
              <img src="/images/main.jpg" alt="Designer living space in Melbourne" loading="lazy" />
              <div className="intro-card__content">
                <h3>Our reach</h3>
                <p>In-house research, elite buyer networks, and international syndication ensure global exposure for Melbourne's most coveted addresses.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Fornieri achievements">
          <div className="metric-card">
            <p className="metric-card__value">$2.4B+</p>
            <p className="metric-card__label">Prestige transactions facilitated</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">28</p>
            <p className="metric-card__label">Years of combined market expertise</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">92%</p>
            <p className="metric-card__label">Repeat and referral clientele</p>
          </div>
          <div className="metric-card">
            <p className="metric-card__value">7 days</p>
            <p className="metric-card__label">Average time to bespoke marketing launch</p>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-heading">
            <p className="eyebrow">Advisory services</p>
            <h2>End-to-end stewardship for premium assets</h2>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Vendor advocacy</h3>
              <p>Strategic campaign direction, curated styling, and global media placement to maximise momentum, engagement, and final price.</p>
              <ul>
                <li>Off-market introductions</li>
                <li>Auction and private treaty strategy</li>
                <li>Negotiation and settlement oversight</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Buyer representation</h3>
              <p>Discreet acquisition support leveraging exclusive pipelines, precision due diligence, and data-backed appraisal modelling.</p>
              <ul>
                <li>Portfolio curation</li>
                <li>Contract and compliance review</li>
                <li>Relocation concierge</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Project collaboration</h3>
              <p>Partnerships with developers, architects, and financiers to future-proof prestige projects from launch to sell-down.</p>
              <ul>
                <li>Product positioning</li>
                <li>Pricing strategy</li>
                <li>Agent alignment</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="experience" aria-label="Why clients choose Fornieri">
          <div className="experience-media">
            <img src="/images/main.jpg" alt="Architectural detail of luxury residence" loading="lazy" />
          </div>
          <div className="experience-copy">
            <p className="eyebrow">Marketing difference</p>
            <h2>Story-driven campaigns crafted to convert</h2>
            <p>Dedicated strategists, editorial storytellers, and premium production partners create campaigns that resonate with UHNW buyers. Every launch receives bespoke videography, immersive virtual inspections, and targeted digital placements supported by market intelligence dashboards.</p>
            <div className="experience-highlights">
              <div>
                <p className="experience-highlights__label">Global syndication</p>
                <p className="experience-highlights__value">18+ prestige networks</p>
              </div>
              <div>
                <p className="experience-highlights__label">Average uplift</p>
                <p className="experience-highlights__value">12.6% over guide</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">Client reflections</p>
            <h2>Discretion, diligence, delivery</h2>
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

        <section className="team" id="team" aria-labelledby="team-title">
          <div className="team-card">
            <div className="team-card__media">
              <img src="/images/Luke_010_HiRes.jpg" alt="Luke Fornieri, Founder of Fornieri" loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="eyebrow">Leadership</p>
              <h2 id="team-title">Meet Luke Fornieri</h2>
              <p>Founder and principal advisor Luke Fornieri is recognised for his data-informed strategies, confident deal management, and an extensive network cultivated over two decades in Melbourne's prestige market.</p>
              <ul className="team-card__credentials">
                <li>Certified Estate Agent & Auctioneer</li>
                <li>Member, Real Estate Institute of Victoria</li>
                <li>Featured in Financial Review Top Agents 2024</li>
              </ul>
              <Link className="btn btn--ghost" href="/team">Discover the advisory collective</Link>
            </div>
          </div>
        </section>

        <section className="cta" aria-labelledby="about-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Next steps</p>
              <h2 id="about-cta-title">Partner with a prestige specialist</h2>
              <p>Whether selling discreetly or sourcing a signature residence, we curate every touchpoint to protect your time and amplify outcomes.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Arrange a briefing</Link>
              <Link className="btn btn--ghost" href="/services">Explore our services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
