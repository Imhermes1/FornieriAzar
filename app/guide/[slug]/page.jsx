import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuides } from '@/lib/content/guides-data';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${guide.title} | Fornieri & Azar`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [guide.ogImage],
    },
    keywords: guide.keywords,
  };
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.title,
    },
    datePublished: '2025-02-01',
    dateModified: guide.lastUpdated,
  };

  const faqSchema = guide.schema.faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: guide.shortTitle,
        acceptedAnswer: {
          '@type': 'Answer',
          text: guide.tldr,
        },
      },
    ],
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fornieriazar.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://fornieriazar.com.au/guide' },
      { '@type': 'ListItem', position: 3, name: guide.shortTitle },
    ],
  };

  return (
    <>
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">
        <article className="bg-gray-50 py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-200 text-gray-700 rounded-full mb-4">
                {guide.category === 'buying' ? 'Buying Guide' : 'Selling Guide'}
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
                {guide.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{guide.readTime} min read</span>
                <span>•</span>
                <span>Last updated {new Date(guide.lastUpdated).toLocaleDateString('en-AU', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-lg p-6 mb-12">
              <div className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                TL;DR
              </div>
              <p className="text-gray-700 leading-relaxed">{guide.tldr}</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-12">
              <p className="text-yellow-800 font-medium mb-2">Author</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.author.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{guide.author.credentials}</p>
              <p className="text-gray-700">{guide.author.bio}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                This guide covers everything you need to know about {guide.shortTitle.toLowerCase()}.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  Full guide content coming soon. This is the template structure.
                </p>
                <p className="text-sm text-gray-500">
                  Add your article content here in the guide-data.js file or create separate markdown files.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {guide.relatedGuides?.map(relatedSlug => {
                  const relatedGuide = getGuideBySlug(relatedSlug);
                  return relatedGuide ? (
                    <a
                      key={relatedSlug}
                      href={`/guide/${relatedSlug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">{relatedGuide.shortTitle}</h4>
                      <p className="text-sm text-gray-600">{relatedGuide.readTime} min read</p>
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
