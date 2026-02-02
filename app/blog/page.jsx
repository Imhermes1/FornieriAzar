import { getBlogPosts } from '@/lib/craft-api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Fornieri & Azar',
  description: 'Latest real estate insights, market updates, and expert advice from the Fornieri & Azar team.',
  openGraph: {
    title: 'Blog | Fornieri & Azar',
    description: 'Latest real estate insights and market updates.',
    images: [{ url: '/images/LowRes_2k_18.jpg', width: 1200, height: 630, alt: 'Fornieri & Azar Blog' }],
  },
};

// FAQ slugs - these get featured card treatment
const FAQ_SLUGS = [
  'how-to-buy-your-first-home-in-melbourne-2026-ultimate-guide',
  'first-time-buyer-programs-grants-complete-2026-guide',
  'how-much-does-it-cost-to-sell-a-house-in-victoria-2026-guide',
  'auction-vs-private-sale-which-gets-you-more-money-2026-guide',
  'how-to-prepare-your-home-for-sale-room-by-room-checklist-2026-guide',
  'understanding-property-valuations-what-agents-wont-tell-you-2026-guide',
];


export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  // All current posts are FAQs - future regular posts will go to the feed
  // To add a regular post, just make sure its slug is NOT in FAQ_SLUGS
  const faqs = allPosts.filter(post => FAQ_SLUGS.includes(post.slug));
  const recentPosts = allPosts
    .filter(post => !FAQ_SLUGS.includes(post.slug))
    .slice(0, 5);


  return (
    <div>
      <Header />

      <main style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        {/* Hero */}
        <section style={{
          padding: 'clamp(80px, 12vh, 100px) max(5vw, 20px) clamp(40px, 6vh, 60px)',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: '600',
            color: '#000',
            letterSpacing: '-1px',
            marginBottom: '16px',
            lineHeight: '1.1',
          }}>
            Guides & Insights
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#666',
            lineHeight: '1.6',
            maxWidth: '550px',
          }}>
            Expert advice on buying, selling, and understanding the Melbourne property market.
          </p>
        </section>

        {/* FAQ Cards */}
        {faqs.length > 0 && (
          <section style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 max(5vw, 20px) clamp(60px, 8vh, 80px)',
          }}>
            <h2 style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
            }}>
              Frequently Asked Questions
            </h2>

            <div className="faq-grid">
              {faqs.map((faq) => (
                <Link
                  key={faq.id}
                  href={`/blog/${faq.slug}`}
                  style={{
                    display: 'block',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  className="hover:shadow-lg hover:border-gray-300"
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    backgroundColor: '#f0f0f0',
                    backgroundImage: faq.ogImage ? `url(${faq.ogImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}>
                    {/* FAQ badge */}
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '6px 12px',
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      color: '#fff',
                      backgroundColor: '#000',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      FAQ
                    </span>

                    {/* Placeholder icon if no image */}
                    {!faq.ogImage && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    {/* Title */}
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#000',
                      lineHeight: '1.4',
                      marginBottom: '8px',
                    }}>
                      {faq.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      lineHeight: '1.55',
                      margin: '0 0 14px 0',
                    }}>
                      {faq.excerpt.length > 90
                        ? faq.excerpt.substring(0, 90) + '...'
                        : faq.excerpt}
                    </p>

                    {/* Read time */}
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#999',
                      fontWeight: '500',
                    }}>
                      {faq.readTime} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts Feed */}
        {recentPosts.length > 0 && (
          <section style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 max(5vw, 20px) clamp(80px, 12vh, 120px)',
          }}>
            <h2 style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
              paddingTop: '40px',
              borderTop: '1px solid #e5e5e5',
            }}>
              Latest Updates
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '24px',
                    padding: '24px 0',
                    borderBottom: '1px solid #eee',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  className="hover:opacity-60"
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#000',
                      lineHeight: '1.4',
                      marginBottom: '6px',
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#888',
                      margin: '0',
                      lineHeight: '1.5',
                    }}>
                      {post.excerpt.length > 120
                        ? post.excerpt.substring(0, 120) + '...'
                        : post.excerpt}
                    </p>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: '#bbb',
                    whiteSpace: 'nowrap',
                    paddingTop: '4px',
                  }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {allPosts.length === 0 && (
          <section style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '60px max(5vw, 20px)',
            textAlign: 'center',
          }}>
            <p style={{ color: '#999', fontSize: '1rem' }}>
              No posts yet. Check back soon.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
