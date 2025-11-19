import { NextResponse } from 'next/server';

/**
 * LockedOn CRM Articles/Blog API Endpoint
 *
 * GET /api/crm/articles
 *
 * Fetches blog articles and market insights from LockedOn CRM
 * This allows you to write content in LockedOn and display it on your website
 *
 * Query Parameters:
 * - category: 'market-insights' | 'buyer-guide' | 'seller-guide' | 'suburb-profiles' (optional)
 * - limit: number of results (optional, default: 10, max: 50)
 * - offset: pagination offset (optional, default: 0)
 * - featured: 'true' | 'false' - filter for featured articles (optional)
 * - published: 'true' | 'false' - filter for published articles (optional, default: true)
 *
 * SETUP INSTRUCTIONS:
 * Same as listings endpoint - requires LockedOn API credentials
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
  const offset = parseInt(searchParams.get('offset') || '0');
  const featured = searchParams.get('featured') === 'true';
  const published = searchParams.get('published') !== 'false';

  // Check if API is configured
  const apiKey = process.env.LOCKEDON_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;
  const officeUuid = process.env.LOCKEDON_OFFICE_UUID;

  if (!apiKey || apiKey === 'your_api_key_here') {
    return NextResponse.json(
      {
        message: 'LockedOn API not yet configured',
        status: 'awaiting_api_credentials',
        placeholder: true,
        mockArticles: getMockArticles(limit, offset, category),
        instructions: {
          note: 'Once configured, you can write blog posts and articles in LockedOn CRM and they will automatically appear on your website',
          step1: 'Contact LockedOn Support to enable blog/articles feature',
          step2: 'Configure API credentials (same as listings endpoint)',
          step3: 'Create articles in LockedOn CRM dashboard',
          step4: 'Articles will be fetched and displayed automatically'
        }
      },
      { status: 200 }
    );
  }

  try {
    // Build LockedOn Query API request for articles
    const queryBody = {
      office: officeUuid,
      entity: 'articles', // Adjust based on actual LockedOn schema
      filters: {
        ...(category && { category }),
        ...(featured && { featured: true }),
        published
      },
      limit,
      offset,
      sort: [{ field: 'publishedDate', direction: 'desc' }]
    };

    const response = await fetch(`${apiUrl}/api/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(queryBody)
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('LockedOn API rate limit exceeded. Please try again shortly.');
      }
      throw new Error(`LockedOn API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      articles: transformArticleData(data),
      meta: {
        total: data.stats?.total || 0,
        limit,
        offset,
        hasMore: (data.stats?.total || 0) > (offset + limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error('LockedOn Articles API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch articles from LockedOn CRM',
        message: error.message,
        placeholder: true,
        mockArticles: getMockArticles(limit, offset, category)
      },
      { status: 500 }
    );
  }
}

/**
 * Transform LockedOn article data to frontend format
 */
function transformArticleData(data) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(article => ({
    id: article.id || article.uuid,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    author: article.author,
    publishedDate: article.publishedDate,
    featured: article.featured || false,
    featuredImage: article.featuredImage,
    tags: article.tags || [],
    readTime: article.readTime || estimateReadTime(article.content)
  }));
}

/**
 * Estimate reading time based on word count
 */
function estimateReadTime(content) {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Mock articles for development/testing
 */
function getMockArticles(limit, offset, category) {
  const allMockArticles = [
    {
      id: 'mock-article-1',
      title: 'Melbourne Prestige Property Market Insights Q4 2024',
      slug: 'melbourne-prestige-market-q4-2024',
      excerpt: 'An analysis of recent trends in Melbourne\'s luxury property sector, including buyer behaviour, pricing movements, and emerging suburbs.',
      content: 'Full article content would be here...',
      category: 'market-insights',
      author: {
        name: 'Fornieri & Azar Research',
        role: 'Market Analysis'
      },
      publishedDate: '2024-12-15',
      featured: true,
      featuredImage: '/images/main.jpg',
      tags: ['Market Analysis', 'Melbourne', 'Luxury Property'],
      readTime: 8,
      placeholder: true
    },
    {
      id: 'mock-article-2',
      title: 'The Ultimate Guide to Selling Prestige Property',
      slug: 'selling-prestige-property-guide',
      excerpt: 'Strategic considerations for vendors seeking optimal outcomes in the luxury market, from preparation to settlement.',
      content: 'Full article content would be here...',
      category: 'seller-guide',
      author: {
        name: 'Fornieri & Azar',
        role: 'Advisory'
      },
      publishedDate: '2024-12-10',
      featured: false,
      featuredImage: '/images/main.jpg',
      tags: ['Selling', 'Strategy', 'Guide'],
      readTime: 12,
      placeholder: true
    },
    {
      id: 'mock-article-3',
      title: 'Toorak Property Profile: Heritage Meets Modern Luxury',
      slug: 'toorak-property-profile-2024',
      excerpt: 'Exploring Toorak\'s enduring appeal, architectural diversity, and what discerning buyers should know about this prestigious suburb.',
      content: 'Full article content would be here...',
      category: 'suburb-profiles',
      author: {
        name: 'Fornieri & Azar',
        role: 'Local Experts'
      },
      publishedDate: '2024-12-05',
      featured: false,
      featuredImage: '/images/main.jpg',
      tags: ['Toorak', 'Suburb Profile', 'Luxury'],
      readTime: 6,
      placeholder: true
    },
    {
      id: 'mock-article-4',
      title: 'Buyer Representation: Why Exclusive Advisory Matters',
      slug: 'buyer-representation-advisory',
      excerpt: 'Understanding the value of dedicated buyer representation in competitive prestige property acquisitions.',
      content: 'Full article content would be here...',
      category: 'buyer-guide',
      author: {
        name: 'Fornieri & Azar',
        role: 'Buyer Advisory'
      },
      publishedDate: '2024-11-28',
      featured: false,
      featuredImage: '/images/main.jpg',
      tags: ['Buying', 'Advisory', 'Strategy'],
      readTime: 10,
      placeholder: true
    }
  ];

  // Filter by category if specified
  let filteredArticles = allMockArticles;
  if (category) {
    filteredArticles = allMockArticles.filter(article => article.category === category);
  }

  return filteredArticles.slice(offset, offset + limit);
}
