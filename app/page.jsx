'use client';

import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div data-page="home">
      <Header />
      <main>
        <section className="hero" style={{ backgroundImage: 'url(/images/pat-whelen-4QhSpFP0yWI-unsplash.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', position: 'relative' }}>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '60px 20px', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '700' }}>FORNIERI & AZAR</h1>
            <p style={{ fontSize: '1.3rem', marginBottom: '40px', fontWeight: '300' }}>Luxury real estate advisory in Melbourne</p>
          </div>
          <Link href="/contact" style={{ position: 'absolute', bottom: '30px', right: '30px', padding: '12px 25px', backgroundColor: '#1e3a5f', color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Get in touch</Link>
        </section>

        <section style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#1e3a5f' }}>Boutique Real Estate Services</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '50px' }}>We provide sophisticated, personal real estate advisory tailored for your unique goals. Trust is the cornerstone of every great result.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
              <h3 style={{ color: '#1e3a5f', marginBottom: '15px' }}>Selling</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Strategic marketing and negotiation to maximize your property's value.</p>
            </div>
            <div>
              <h3 style={{ color: '#1e3a5f', marginBottom: '15px' }}>Buying</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Discreet acquisition support with access to exclusive properties.</p>
            </div>
            <div>
              <h3 style={{ color: '#1e3a5f', marginBottom: '15px' }}>Advisory</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Expert guidance on portfolio strategy and market opportunities.</p>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f5f5f5', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#1e3a5f' }}>Ready to discuss your property goals?</h2>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>Contact us for a confidential consultation.</p>
            <Link href="/contact" style={{ display: 'inline-block', padding: '12px 35px', backgroundColor: '#1e3a5f', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', borderRadius: '4px' }}>Book a consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
