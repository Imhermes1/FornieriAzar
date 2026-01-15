import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Our Team | Fornieri & Azar',
  description: 'Meet the experienced property professionals at Fornieri & Azar, led by founders Luke Fornieri and Chris Azar.',
};

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
              <img src="/images/lukeprofile.png?v=3" alt="Luke Fornieri" loading="lazy" style={{ objectPosition: 'top' }} />
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


      </main>
      <Footer />
    </div>
  );
}
