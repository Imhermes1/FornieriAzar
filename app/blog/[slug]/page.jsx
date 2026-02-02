import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/craft-api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import CraftBlockRenderer from '@/app/components/CraftBlockRenderer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Fornieri & Azar`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        {/* Article Header */}
        <article>
          <header style={{
            padding: 'clamp(100px, 15vh, 160px) max(5vw, 20px) clamp(40px, 6vh, 60px)',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Back Link */}
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#999',
                textDecoration: 'none',
                marginBottom: '32px',
                transition: 'color 0.2s ease',
              }}
              className="back-link hover:text-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All posts
            </Link>

            {/* Meta */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.85rem',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '20px',
            }}>
              <span>{post.author.name}</span>
              <span style={{ color: '#ddd' }}>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span style={{ color: '#ddd' }}>·</span>
              <span>{post.readTime} min read</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '600',
              color: '#000',
              letterSpacing: '-0.5px',
              lineHeight: '1.15',
              marginBottom: '24px',
            }}>
              {post.title}
            </h1>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: '#f5f5f5',
                      color: '#666',
                      borderRadius: '100px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div
            className="blog-content"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '0 max(5vw, 20px) clamp(60px, 10vh, 100px)',
            }}
          >
            <CraftBlockRenderer blocks={post.blocks} />
          </div>

          {/* Author & Footer */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 max(5vw, 20px) clamp(80px, 12vh, 120px)',
          }}>
            <div style={{
              borderTop: '1px solid #e5e5e5',
              paddingTop: '40px',
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                Written by
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: '#000',
                    fontSize: '1.1rem',
                    marginBottom: '4px',
                  }}>
                    {post.author.name}
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: '1.5',
                    marginBottom: '2px',
                  }}>
                    Licensed Estate Agent & Director
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: '1.5',
                  }}>
                    Fornieri & Azar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
