'use client';

import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />

      {/* Hero section with background image */}
      <section style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: 'url(/images/pat-whelen-4QhSpFP0yWI-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)'
      }}>
        {/* Frosted blur overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none'
        }} />
        {/* Glow effect behind logo */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 9
        }} />

        {/* Centered Logo */}
        <Image
          src="/images/FnA.svg"
          alt="Fornieri & Azar"
          width={2000}
          height={2000}
          priority
          style={{
            maxWidth: '72vw',
            height: 'auto',
            position: 'relative',
            zIndex: 10
          }}
        />

        {/* Image attribution at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          Photo by <a href="https://unsplash.com/@patwhelen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>Pat Whelen</a> on <a href="https://unsplash.com/photos/aerial-view-of-highway-near-body-of-water-during-daytime-4QhSpFP0yWI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>Unsplash</a>
        </div>
      </section>

      {/* Main content that scrolls over hero */}
      <main style={{ position: 'relative', zIndex: 10, backgroundColor: 'white' }}>

        {/* Services Section */}
        <section style={{
          padding: '100px 30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '60px',
            color: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>
            Our Services
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px'
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
                Strategic marketing and expert negotiation to maximize your property's value and market reach.
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

        {/* Why Choose Us Section */}
        <section style={{
          padding: '100px 30px',
          backgroundColor: '#f8f8f8',
          maxWidth: '100%'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '60px',
              color: '#000',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>
              Why Choose Us
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '60px'
            }}>
              <div>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  marginBottom: '10px'
                }}>
                  20+
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Years of experience in real estate
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  marginBottom: '10px'
                }}>
                  500+
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Successful transactions completed
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  marginBottom: '10px'
                }}>
                  98%
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Client satisfaction rate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '100px 30px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            color: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
