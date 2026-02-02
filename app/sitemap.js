import { getAllGuides } from '@/lib/content/guides-data';
import { getBlogPosts } from '@/lib/craft-api';
import { fetchRexListings } from '@/lib/rexsoftware-helper';

const BASE_URL = 'https://fornieriazar.com.au';

async function getSitemap() {
  const staticPages = [
    '',
    '/about',
    '/services',
    '/buy',
    '/rent',
    '/sell',
    '/buyers',
    '/contact',
    '/guide',
    '/blog',
    '/listings',
    '/team',
    '/privacy',
    '/terms',
  ];

  const guides = getAllGuides();
  const blogPosts = await getBlogPosts();
  const properties = await fetchRexListings();

  const guideUrls = guides.map((guide) => ({
    url: `${BASE_URL}/guide/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: 'monthly',
    priority: guide.priority,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const propertyUrls = properties.map((property) => ({
    url: `${BASE_URL}/property/${property.id}`,
    lastModified: new Date(property.updatedAt || property.createdAt),
    changeFrequency: 'daily',
    priority: 0.6,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    })),
    ...guideUrls,
    ...blogUrls,
    ...propertyUrls,
  ];
}

export default async function sitemap() {
  return await getSitemap();
}
