// Craft.do Blog API Integration

const CRAFT_API_URL = process.env.CRAFT_API_URL;
const CRAFT_API_KEY = process.env.CRAFT_API_KEY;
const WEBSITE_BLOGS_FOLDER_ID = '32BBB65F-AFDC-4606-9F4F-0B618ACB5228';

async function craftFetch(endpoint, options = {}) {
  if (!CRAFT_API_URL || !CRAFT_API_KEY) {
    return null;
  }

  const response = await fetch(`${CRAFT_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${CRAFT_API_KEY}`,
      'Accept': options.accept || 'application/json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Craft API error: ${response.status}`);
  }

  return options.accept === 'text/markdown'
    ? response.text()
    : response.json();
}

function extractExcerpt(content, maxLength = 200) {
  // Get first paragraph after removing headers and formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/>\s+/g, '') // Remove blockquotes
    .trim();

  const firstParagraph = plainText.split('\n\n')[0] || '';
  return firstParagraph.length > maxLength
    ? firstParagraph.substring(0, maxLength) + '...'
    : firstParagraph;
}

function extractMetadata(content) {
  // Extract author, date, reading time from metadata line
  // Format: **Author: Name Date: Date Reading Time: N Minutes Description:** text
  const authorMatch = content.match(/Author:\s*(.+?)(?=\s*Date:)/i);
  const dateMatch = content.match(/Date:\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);
  const readTimeMatch = content.match(/Reading Time:\s*(\d+)/i);
  // Description comes AFTER the closing :** - e.g., "Description:** Confused by..."
  const descriptionMatch = content.match(/(?:Description|Target Region):\*\*\s*([^\n]+)/i);

  // Parse author name and title (e.g., "Luke Fornieri - Licensed Estate Agent & Director")
  let authorName = 'Fornieri & Azar';
  let authorTitle = '';
  if (authorMatch) {
    const authorFull = authorMatch[1].replace(/\*+/g, '').trim();
    // Split by dash or comma
    const parts = authorFull.split(/\s*[-,]\s*/);
    authorName = parts[0].trim();
    authorTitle = parts.slice(1).join(' ').trim();
  }

  return {
    author: authorName,
    authorTitle: authorTitle,
    date: dateMatch ? dateMatch[1].trim() : null,
    readTime: readTimeMatch ? parseInt(readTimeMatch[1]) : 5,
    description: descriptionMatch ? descriptionMatch[1].trim() : null,
  };
}

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractFirstImage(blocks) {
  // Find the first image block in the content
  if (!blocks || !Array.isArray(blocks)) return null;

  for (const block of blocks) {
    // Check multiple possible URL properties
    const imageUrl = block.url || block.src || block.imageUrl || block.file?.url;
    if ((block.type === 'image' || block.type === 'file' || block.type === 'media') && imageUrl) {
      return imageUrl;
    }
    // Also check for markdown image syntax
    if (block.markdown) {
      const imgMatch = block.markdown.match(/!\[[^\]]*\]\(([^)]+)\)/);
      if (imgMatch) {
        return imgMatch[1];
      }
    }
  }
  return null;
}

function blocksToMarkdown(blocks) {
  // Convert blocks array to markdown string
  if (!blocks || !Array.isArray(blocks)) return '';

  const lines = [];
  let prevWasBlockquote = false;

  for (const block of blocks) {
    let markdown = '';

    // Handle image blocks separately
    if (block.type === 'image' && block.url) {
      markdown = `![${block.alt || ''}](${block.url})`;
    } else {
      markdown = block.markdown || '';
    }

    if (!markdown) continue;

    const isBlockquote = block.decorations?.includes('quote') || markdown.startsWith('>');

    // Add extra newline after blockquote to ensure it closes
    if (prevWasBlockquote && !isBlockquote) {
      lines.push('');
    }

    lines.push(markdown);
    prevWasBlockquote = isBlockquote;
  }

  return lines.join('\n\n');
}

function stripMetadataFromContent(content) {
  // Remove the metadata block: **Author: ... Description/Target Region:** text
  // The whole thing is on one line, bold, and includes everything up to the end of description
  return content
    .replace(/^\*\*Author:.*?(?:Description|Target Region):\*\*\s*[^\n]*/gm, '') // Remove full metadata line
    .replace(/^\*{3,}\s*$/gm, '') // Remove horizontal rules (*****)
    .replace(/\n{3,}/g, '\n\n') // Collapse multiple newlines
    .trim();
}

export async function getBlogPosts() {
  try {
    const data = await craftFetch(`/documents?folderId=${WEBSITE_BLOGS_FOLDER_ID}`);

    if (!data || !data.items || data.items.length === 0) {
      console.warn('No blog posts found in Craft, using mock data');
      return getMockBlogPosts();
    }

    // Fetch content for each post to get excerpts, metadata, and images
    const posts = await Promise.all(
      data.items.map(async (doc) => {
        try {
          // Fetch JSON to get structured blocks with images
          const jsonData = await craftFetch(`/blocks?id=${doc.id}`);
          const blocks = jsonData?.content || [];

          // Convert blocks to markdown for rendering
          const rawContent = blocksToMarkdown(blocks);
          const metadata = extractMetadata(rawContent);
          const content = stripMetadataFromContent(rawContent);

          // Extract first image for OG
          const firstImage = extractFirstImage(blocks);

          return {
            id: doc.id,
            slug: titleToSlug(doc.title),
            title: doc.title,
            excerpt: metadata.description || extractExcerpt(content),
            content: content,
            blocks: blocks, // Include raw blocks for rendering
            publishedAt: metadata.date || new Date().toISOString().split('T')[0],
            author: {
              name: metadata.author,
              title: metadata.authorTitle,
            },
            tags: ['Real Estate', 'Melbourne'],
            readTime: metadata.readTime,
            ogImage: firstImage || '/images/og-default.jpg',
          };
        } catch (error) {
          console.error(`Error fetching content for ${doc.title}:`, error);
          return null;
        }
      })
    );

    return posts.filter(Boolean);
  } catch (error) {
    console.error('Craft API error:', error);
    return getMockBlogPosts();
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const posts = await getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    const mockPosts = getMockBlogPosts();
    return mockPosts.find(post => post.slug === slug) || null;
  }
}

function getMockBlogPosts() {
  return [
    {
      id: '1',
      slug: 'melbourne-market-update-january-2025',
      title: 'Melbourne Property Market Update: January 2025',
      excerpt: 'The Melbourne property market starts 2025 with strong momentum. Prices are up 2.3% in the inner suburbs, with auctions achieving 72% clearance rates.',
      content: `
# Melbourne Property Market Update: January 2025

## Market Overview

The Melbourne property market has started 2025 with strong momentum across most suburbs. Key highlights:

- **Median price increase**: 2.3% in inner suburbs
- **Auction clearance rates**: 72% (above 5-year average)
- **Days on market**: Down to 28 days (from 35 in December)
- **Rental vacancy**: 1.2% (tight market continues)

## Suburb Highlights

### Richmond
- Median house price: $1,450,000 (+3.1%)
- Median unit price: $680,000 (+2.8%)
- Hot property types: 2-bedroom art deco apartments

### Brunswick
- Median house price: $1,280,000 (+2.9%)
- Median unit price: $590,000 (+2.4%)
- Trend: Family buyers upgrading to larger homes

### St Kilda
- Median house price: $1,680,000 (+4.2%)
- Median unit price: $620,000 (+3.1%)
- Demand spike: Waterfront apartments

## What's Ahead

We expect continued growth through Q1 2025, particularly in:
- Well-located suburbs within 10km of CBD
- Properties with good transport links
- Family-friendly neighborhoods with schools

## Sources
- Domain.com.au Market Report
- REIV Auction Results
- ABS Housing Data
      `,
      publishedAt: '2025-01-28',
      author: {
        name: 'Luke Fornieri',
        title: 'Director',
      },
      tags: ['Market Update', 'Melbourne', '2025'],
      readTime: 5,
      ogImage: '/images/blog/market-update-jan-2025.jpg',
    },
  ];
}
