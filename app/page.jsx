'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState('');
  const [articlesPlaceholder, setArticlesPlaceholder] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true);
        const response = await fetch('/api/crm/articles?limit=3');
        const payload = await response.json();
        if (!active) return;
        setArticlesPlaceholder(Boolean(payload?.placeholder));
        const fetchedArticles = payload?.articles ?? payload?.mockArticles ?? [];
        setArticles(fetchedArticles);
        if (!response.ok && !payload?.articles) {
          setArticlesError(payload?.message || 'Unable to load articles right now.');
        }
      } catch (error) {
        if (!active) return;
        setArticlesError('Unable to load articles right now.');
      } finally {
        if (active) setArticlesLoading(false);
      }
    };
    fetchArticles();
    return () => {
      active = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (propertyType) params.append('type', propertyType);
    window.location.href = `/listings?${params.toString()}`;
  };

  return (
    <div>
      <Header />

      {/* Hero section with background video */}
      <section style={{
        position: 'relative',
        height: '75vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        >
          <source src="/video/8284679-uhd_3840_2160_24fps.mp4" type="video/mp4" />
        </video>

        {/* Frosted blur overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 2
        }} />

        {/* Glow effect behind logo */}
        <div style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 80%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
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
            maxWidth: '68vw',
            height: 'auto',
            position: 'relative',
            zIndex: 10
          }}
        />

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          opacity: 0.6,
          zIndex: 10
        }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#000',
            fontWeight: '800'
          }}>Explore</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0V18M6 18L1 13M6 18L11 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Video attribution */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '20px',
          fontSize: '0.85rem',
          color: '#000',
          letterSpacing: '0.05em',
          zIndex: 10,
          fontWeight: '500'
        }}>
          Video from Josh
        </div>
      </section>

      {/* Main content that scrolls over hero */}
      <main style={{ position: 'relative', zIndex: 10, backgroundColor: 'white' }}>

        {/* Services Section */}
        <section style={{
          padding: '40px 30px 80px',
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

        {/* Articles Section */}
        <section style={{
          padding: '40px 30px 80px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <p style={{
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontSize: '0.85rem',
              color: '#777',
              margin: 0
            }}>Insights</p>
            <h2 style={{
              fontSize: '2.25rem',
              margin: 0,
              color: '#000',
              fontWeight: '600',
              letterSpacing: '-0.4px'
            }}>
              Articles from LockedOn CRM
            </h2>
            <p style={{
              maxWidth: '560px',
              lineHeight: '1.7',
              color: '#555',
              margin: 0
            }}>
              Real estate market insights, advice and suburb profiles written in LockedOn and served directly to this site.
            </p>
          </div>

          {articlesLoading ? (
            <p style={{ color: '#444' }}>Loading articles...</p>
          ) : articlesError ? (
            <p style={{ color: '#c0392b' }}>{articlesError}</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px'
            }}>
              {articles.map((article) => (
                <article key={article.id || article.slug} style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '24px',
                  background: '#fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#777'
                  }}>
                    {article.category ?? 'Market Insight'}
                  </div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    color: '#111',
                    lineHeight: '1.35'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: '#555',
                    lineHeight: '1.6'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#777'
                  }}>
                    <span>{article.author?.name ?? 'Fornieri & Azar'}</span>
                    <span>{article.readTime ? `${article.readTime} min read` : '—'}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#999'
                  }}>
                    <span>{article.publishedDate ? new Date(article.publishedDate).toLocaleDateString('en-AU') : 'TBA'}</span>
                    <span>{articlesPlaceholder ? 'Draft / Placeholder' : 'LockedOn API'}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </section>

        {/* Search Section */}
        <section className="home-search-section">
          <div className="home-search-container">
            <p className="footer-search-eyebrow">Looking for a home?</p>
            <form className="footer-search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="footer-search-input"
                placeholder="Search by suburb, street, or property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search properties"
              />
              <select
                className="footer-search-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                aria-label="Property type filter"
              >
                <option value="">All types</option>
                <option value="sale">For sale</option>
                <option value="rent">For rent</option>
              </select>
              <button type="submit" className="footer-search-btn">
                Search
              </button>
            </form>
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
                  $200M+
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Worth of property sold
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
                  13+
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Years of experience
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
                  100+
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  Properties sold
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
