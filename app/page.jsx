import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSearch from './components/HomeSearch';
import HeroVideo from './components/HeroVideo';

export const metadata = {
  title: 'Fornieri & Azar | Real Estate Agents East & South East Melbourne',
  description: 'Leading boutique real estate agency in East and South East Melbourne. We offer premium sales campaigns, expert buyer advocacy, and dedicated property management.',
};

export default function Home() {
  return (
    <div>
      <Header />

      {/* Hero section with background video */}
      <section style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <HeroVideo />

        {/* Frosted blur overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none',
          zIndex: 2
        }} />

        {/* Glow effect behind logo - Made responsive */}
        <div style={{
          position: 'absolute',
          width: 'clamp(300px, 80vw, 800px)',
          height: 'clamp(300px, 80vw, 800px)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0) 80%)',
          borderRadius: '50%',
          filter: 'blur(clamp(30px, 10vw, 60px))',
          zIndex: 9
        }} />

        {/* Centered Logo - Matching Header Look but HUGE */}
        <h1 className="hero-logo-text">
          <span>FORNIERI</span> <span className="ampersand">&</span> <span>AZAR</span>
        </h1>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Fornieri & Azar",
              "image": "https://fornieriazar.com.au/images/LowRes_2k_18.jpg",
              "@id": "https://fornieriazar.com.au",
              "url": "https://fornieriazar.com.au",
              "telephone": "0423 633 740",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Suite 5028, 165 Waverley Road",
                "addressLocality": "Malvern East",
                "addressRegion": "VIC",
                "postalCode": "3145",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -37.877,
                "longitude": 145.044
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://www.instagram.com/fornieri.azar/",
                "https://www.linkedin.com/in/lukefornieri/"
              ]
            })
          }}
        />

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.6,
          zIndex: 10,
          animation: 'bounce 2s ease-in-out infinite'
        }} className="scroll-indicator">
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#000',
            fontWeight: '800'
          }}>Explore</span>
          <svg width="10" height="16" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0V18M6 18L1 13M6 18L11 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Main content that scrolls over hero */}
      <main style={{ position: 'relative', zIndex: 10, backgroundColor: 'white' }}>

        {/* Services Section */}
        <section style={{
          padding: 'clamp(60px, 10vh, 100px) max(5vw, 20px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            marginBottom: 'clamp(40px, 8vh, 60px)',
            color: '#000',
            fontFamily: 'inherit',
            fontWeight: '600',
            letterSpacing: '-0.5px',
            textAlign: 'center'
          }}>
            Our Services
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(30px, 5vw, 60px)'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '600'
              }}>
                Sales
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '400'
              }}>
                Strategic marketing and expert negotiation to maximise your property's value and market reach.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '600'
              }}>
                Buying
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '400'
              }}>
                Discreet acquisition support with access to exclusive properties and comprehensive due diligence.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px',
                color: '#000',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '600'
              }}>
                Rentals
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#666',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '400'
              }}>
                Premium rental management and tenant placement for residential and commercial properties.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <HomeSearch />

        {/* Why Choose Us Section */}
        <section style={{
          padding: 'clamp(60px, 12vh, 100px) max(5vw, 20px)',
          backgroundColor: '#f8f8f8',
          maxWidth: '100%'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              marginBottom: 'clamp(40px, 8vh, 60px)',
              color: '#000',
              fontFamily: 'inherit',
              fontWeight: '600',
              letterSpacing: '-0.5px',
              textAlign: 'center'
            }}>
              Why Choose Us
            </h2>

            <div className="why-choose-grid">
              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  $200M+
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Total sales to date
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  $1.6M
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Average sales price
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  28
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Average days on market
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  10,000+
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Contacts in database
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  100+
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Properties sold
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}>
                  106%
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Average sale vs reserve
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: 'clamp(60px, 12vh, 100px) max(5vw, 20px)',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            marginBottom: '20px',
            color: '#000',
            fontFamily: 'inherit',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '40px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            lineHeight: '1.8'
          }}>
            Contact us today for a consultation about your real estate needs.
          </p>
          <a href="/contact" style={{
            display: 'inline-block',
            padding: '14px 40px',
            backgroundColor: '#000',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: '500',
            borderRadius: '2px',
            transition: 'opacity 0.3s'
          }}>
            Get In Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
