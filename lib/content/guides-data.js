// Ultimate SEO Q&A Guides Data

export const guides = [
  {
    slug: 'how-to-buy-first-home-melbourne',
    title: 'How to Buy Your First Home in Melbourne',
    shortTitle: 'First Home Buyer Guide',
    tldr: 'First-home buyers need 5-20% deposit (,000-,000), get pre-approval first, and can access stamp duty exemptions for properties under ,000.',
    description: 'Complete 2025 guide to buying your first home in Melbourne.',
    category: 'buying',
    readTime: 12,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Helped over 200 first-home buyers purchase their dream homes.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: false, article: true },
    ogImage: '/images/guides/first-home-buyer-og.jpg',
    keywords: ['first home buyer melbourne', 'how to buy house melbourne'],
    priority: 1.0
  },
  {
    slug: 'first-home-buyer-grants-2025',
    title: 'First Home Buyer Grants & Schemes: Complete 2025 Guide',
    shortTitle: 'Grants & Schemes Guide',
    tldr: 'Victorian first-home buyers can access ,000 First Home Owner Grant for new builds under ,000, full stamp duty exemption under ,000.',
    description: 'Complete breakdown of all Victorian and federal first home buyer grants.',
    category: 'buying',
    readTime: 10,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Expert in first-home buyer programs with M in grants secured.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: false, article: true },
    ogImage: '/images/guides/grants-guide-og.jpg',
    keywords: ['first home buyer grant victoria', 'first home owner grant 2025'],
    priority: 0.9
  },
  {
    slug: 'hidden-costs-buying-property',
    title: 'Hidden Costs When Buying Property: The Complete Breakdown',
    shortTitle: 'Hidden Costs Guide',
    tldr: 'Budget 5-7% extra for stamp duty, conveyancing, inspections, and loan fees. On ,000 property, expect ,000-,000 additional costs.',
    description: 'Complete breakdown of all hidden costs when buying property in Victoria.',
    category: 'buying',
    readTime: 8,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Provides transparent cost breakdowns so buyers avoid surprises.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: false, article: true },
    ogImage: '/images/guides/hidden-costs-og.jpg',
    keywords: ['hidden costs buying house', 'stamp duty calculator victoria'],
    priority: 0.9
  },
  {
    slug: 'auction-vs-private-sale',
    title: 'Auction vs Private Sale: Which Gets You More Money?',
    shortTitle: 'Selling Method Guide',
    tldr: 'Auctions typically achieve 5-15% higher prices in hot markets. Melbourne 2024 clearance rates averaged 68%.',
    description: 'Data-driven comparison of auction vs private treaty sales in Melbourne.',
    category: 'selling',
    readTime: 10,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Has conducted 150+ auctions with 78% average clearance rate.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: false, article: true },
    ogImage: '/images/guides/auction-vs-private-og.jpg',
    keywords: ['auction vs private sale', 'should I auction my house'],
    priority: 0.9
  },
  {
    slug: 'prepare-home-for-sale',
    title: 'How to Prepare Your Home for Sale: Room-by-Room Checklist',
    shortTitle: 'Home Preparation Guide',
    tldr: 'Prepared homes sell 30% faster and for 5-10% more. Declutter 50%, repaint neutrally, fix defects, and stage professionally.',
    description: 'Step-by-step checklist for preparing your home to maximise sale price.',
    category: 'selling',
    readTime: 15,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Staging recommendations helped clients achieve k above expectations.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: true, article: true },
    ogImage: '/images/guides/prepare-home-og.jpg',
    keywords: ['how to prepare house for sale', 'home staging tips'],
    priority: 0.9
  },
  {
    slug: 'cost-of-selling-house',
    title: 'How Much Does It Cost to Sell a House in Victoria?',
    shortTitle: 'Selling Costs Guide',
    tldr: 'Selling costs total 3-5% of sale price: agent commission (1.5-3%), marketing, conveyancing, and staging.',
    description: 'Complete breakdown of all costs involved in selling a house in Victoria.',
    category: 'selling',
    readTime: 8,
    lastUpdated: '2025-02-01',
    author: {
      name: 'Luke Fornieri',
      title: 'Director & Licensed Estate Agent',
      credentials: 'Licensed Estate Agent | 8+ Years Experience',
      bio: 'Transparent fee structure with no hidden costs.',
      image: '/images/team/luke-fornieri.jpg'
    },
    schema: { faq: true, howTo: false, article: true },
    ogImage: '/images/guides/selling-costs-og.jpg',
    keywords: ['cost of selling house victoria', 'real estate agent fees melbourne'],
    priority: 0.9
  }
];

export function getGuideBySlug(slug) {
  return guides.find(guide => guide.slug === slug);
}

export function getAllGuides() {
  return guides;
}

export function getGuidesByCategory(category) {
  return guides.filter(guide => guide.category === category);
}
