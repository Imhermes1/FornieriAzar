'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div data-page="about">
      <Header />
      <main>
        <section className="simple-hero" aria-labelledby="about-title">
          <div className="simple-hero__content">
            <p className="eyebrow">Our Story</p>
            <h1 className="simple-hero__title" id="about-title">A boutique real estate agency built on results</h1>
            <p className="simple-hero__description">We're a focused boutique agency that combines years of market experience with strategic expertise to deliver exceptional outcomes for our clients.</p>
          </div>
        </section>

        <section className="intro">
          <div className="section-heading">
            <p className="eyebrow">How we work</p>
            <h2>Strategic approach, expert advice, exceptional results</h2>
            <p>We maintain a selective client base to ensure every property receives dedicated attention and a tailored marketing strategy. Our focus is on delivering results through market expertise and proven negotiation skills.</p>
          </div>
          <div className="intro-grid">
            <div className="intro-card">
              <img src="/images/HighRes_6k_18.jpg" alt="Luxury property marketing" loading="lazy" />
              <div className="intro-card__content">
                <h3>Our approach</h3>
                <p>We develop targeted marketing strategies for each property, leveraging market data and buyer insights to achieve optimal results in the shortest timeframe.</p>
              </div>
            </div>
            <div className="intro-card">
              <img src="/images/LowRes_2k_17.jpg" alt="Premium Melbourne property" loading="lazy" />
              <div className="intro-card__content">
                <h3>Our network</h3>
                <p>Through years of establishing relationships in Melbourne's premium property market, we've built a network of qualified buyers, investors, and industry partners.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Fornieri & Azar achievements">
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

        <section className="services" id="services">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>We're here to help with your property needs</h2>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <h3>Selling your property</h3>
              <p>We deliver comprehensive marketing campaigns, targeted buyer engagement, and strategic negotiation to maximize your sale price.</p>
              <ul>
                <li>Professional photography & marketing</li>
                <li>Auction or private sale guidance</li>
                <li>Expert negotiation support</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Buyer representation</h3>
              <p>We identify off-market opportunities, conduct thorough due diligence, and provide expert negotiation to secure the best terms.</p>
              <ul>
                <li>Finding the perfect property</li>
                <li>Contract review & advice</li>
                <li>Support with moving & settling in</li>
              </ul>
            </article>
            <article className="service-card">
              <h3>Development sales</h3>
              <p>We partner with developers to deliver strategic market positioning, sales campaign management, and qualified buyer acquisition.</p>
              <ul>
                <li>Market positioning advice</li>
                <li>Pricing strategy</li>
                <li>Sales campaign management</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="experience" aria-label="Why clients choose Fornieri & Azar">
          <div className="experience-media">
            <img src="/images/LowRes_2k_08.jpg" alt="Premium property interior" loading="lazy" />
          </div>
          <div className="experience-copy">
            <p className="eyebrow">Our marketing</p>
            <h2>Strategic marketing that delivers results</h2>
            <p>Our marketing campaigns combine professional photography, video content, and targeted digital advertising to reach qualified buyers. We provide regular performance analytics and market feedback to keep you informed throughout the process.</p>
            <div className="experience-highlights">
              <div>
                <p className="experience-highlights__label">Marketing reach</p>
                <p className="experience-highlights__value">18+ property platforms</p>
              </div>
              <div>
                <p className="experience-highlights__label">Average result</p>
                <p className="experience-highlights__value">12.6% above expectations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">What our clients say</p>
            <h2>Real feedback from real people</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Luke helped us sell our family home quickly and privately, which was exactly what we needed. He kept everything confidential and got us a fantastic result."
              </blockquote>
              <figcaption>Sarah & James, Toorak</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "After years of looking, Luke found us a beautiful home we never would have known was available. His research and attention to detail was incredible."
              </blockquote>
              <figcaption>Michael, Brighton</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "The marketing for our property was absolutely stunning. Professional videos, beautiful photos, and it reached buyers everywhere."
              </blockquote>
              <figcaption>David & Partners, South Yarra</figcaption>
            </figure>
          </div>
        </section>

        <section className="team" id="team" aria-labelledby="team-title">
          <div className="team-card">
            <div className="team-card__media">
              <img src="/images/Luke_010_HiRes.jpg" alt="Luke Fornieri, Founder" loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="eyebrow">Meet Luke</p>
              <h2 id="team-title">Luke Fornieri, Founder</h2>
              <p>Luke brings over two decades of experience in Melbourne's premium property market. Known for strategic negotiation, market expertise, and a results-driven approach, he focuses on delivering exceptional outcomes for every client.</p>
              <ul className="team-card__credentials">
                <li>Certified Estate Agent & Auctioneer</li>
                <li>Member, Real Estate Institute of Victoria</li>
                <li>Featured in Financial Review Top Agents 2024</li>
              </ul>
              <Link className="btn btn--ghost" href="/team">Meet the full team</Link>
            </div>
          </div>
        </section>

        <section className="cta" aria-labelledby="about-cta-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Get started</p>
              <h2 id="about-cta-title">Ready to discuss your property strategy?</h2>
              <p>Whether you're considering selling, seeking investment opportunities, or need market analysis, we're here to provide expert guidance.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--primary" href="/contact">Get in touch</Link>
              <Link className="btn btn--ghost" href="/services">Learn about our services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
