# Fornieri & Azar Real Estate Website

Premium real estate website built with Next.js 16, ready for LockedOn CRM API integration.

## 🎨 Brand Colors

- **Off-Black**: `#0F0F0F`
- **Off-White**: `#FAFAFA`
- **Gunmetal Grey**: `#9397A0`
- **Gunmetal Dark**: `#6B6E76`
- **Gunmetal Light**: `#B5B8BD`

## 🚀 Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build & Deploy

```bash
npm run build
npm start
```

The site is optimized for deployment on **Vercel**.

## 📧 Contact Form Setup

The contact form is fully functional and ready to send emails.

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Configuration
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_EMAIL_TO=enquiry@fornieriazar.com.au
CONTACT_EMAIL_FROM=website@fornieriazar.com.au
RESEND_AUDIENCE_ID=aud_1234xyz
```

### Getting a Resend API Key

1. Sign up at [resend.com](https://resend.com) (free tier available)
2. Create a new API key in the dashboard
3. Add the API key to `.env.local`
4. Verify your sending domain (fornieriazar.com.au)

### Audience Sync

The contact form now saves each enquiry to a Resend audience so you can run follow‑ups later.

1. In the Resend dashboard go to **Audiences** > **Create Audience** and name it something like `Website Enquiries`.
2. Copy the Audience ID (it starts with `aud_...`) and set `RESEND_AUDIENCE_ID` in `.env.local` and Vercel.
3. The API automatically upserts whoever submits the form, including their phone, interest and message as contact properties.

The audience sync only runs when `RESEND_AUDIENCE_ID` is configured, so you can enable it whenever you are ready to collect contacts centrally.

**Note**: In development, Resend allows sending to verified email addresses only. In production with a verified domain, you can send to anyone.

### Testing the Contact Form

1. Navigate to `/contact`
2. Fill in the form
3. Submit - you should receive an email at `enquiry@fornieriazar.com.au`

## 🏠 LockedOn CRM API Integration

The website is prepared for LockedOn CRM integration to display live property listings and blog articles.

### Current Status: **Awaiting API Credentials**

The API routes are built and ready - they just need your LockedOn API credentials.

### Setup Instructions

#### Step 1: Request API Access

Contact **LockedOn Support** to request API access for your office:
- Request JWT API token
- Request office UUID
- Confirm access to property and article data

#### Step 2: Configure Environment Variables

Update `.env.local` with your credentials:

```env
# LockedOn CRM Configuration
NEXT_PUBLIC_LOCKEDON_API_URL=https://newapi.lockedoncloud.com
LOCKEDON_API_KEY=your_jwt_token_here
LOCKEDON_OFFICE_UUID=your_office_uuid_here
```

#### Step 3: Test the Integration

```bash
# Test listings endpoint
curl http://localhost:3000/api/crm/listings?status=available&limit=5

# Test articles endpoint
curl http://localhost:3000/api/crm/articles?limit=3
```

#### Step 4: Go Live

Once configured, the website will automatically:
- Fetch live property listings from LockedOn
- Display blog articles written in LockedOn CRM
- Update in real-time when you add/edit content

### API Endpoints

#### GET `/api/crm/listings`

Fetch property listings from LockedOn CRM.

**Query Parameters:**
- `status` - 'available' | 'sold' | 'rented' | 'all' (default: 'available')
- `propertyType` - 'residential' | 'commercial' | 'land'
- `limit` - Number of results (default: 20, max: 100)
- `offset` - Pagination offset (default: 0)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `bedrooms` - Number of bedrooms
- `suburb` - Suburb name filter

**Example:**
```
GET /api/crm/listings?status=available&bedrooms=4&suburb=Toorak&limit=10
```

#### GET `/api/crm/articles`

Fetch blog articles from LockedOn CRM.

**Query Parameters:**
- `category` - 'market-insights' | 'buyer-guide' | 'seller-guide' | 'suburb-profiles'
- `limit` - Number of results (default: 10, max: 50)
- `offset` - Pagination offset
- `featured` - 'true' | 'false'

**Example:**
```
GET /api/crm/articles?category=market-insights&featured=true&limit=5
```

### Placeholder Mode

Until you configure the API, the endpoints return **mock data** that matches the expected structure. This allows you to:
- Develop and test the frontend
- See how listings and articles will look
- Verify the design and functionality

### LockedOn API Documentation

- **Main Documentation**: [LockedOn Query API Guide](https://gist.github.com/karlmikko/66b7b68401826e4281093692ef5868cc)
- **Schema Endpoint**: `GET https://newapi.lockedoncloud.com/api/schema`
- **Query Endpoint**: `POST https://newapi.lockedoncloud.com/api/query`

### Helper Functions

We've created utility functions in `/lib/lockedon-helper.js` to simplify API integration:

```javascript
import { fetchProperties, buildPropertyQuery, formatPrice } from '@/lib/lockedon-helper';

// Fetch properties with retry logic
const properties = await fetchProperties({ status: 'available' }, 20, 0);

// Build custom query
const query = buildPropertyQuery({
  officeUuid: 'API_OFFICE',
  filters: { bedrooms: 4, suburb: 'Toorak' },
  limit: 10
});

// Format price
const displayPrice = formatPrice(5500000); // $5,500,000
```

## 📁 Project Structure

```
/
├── app/
│   ├── page.jsx              # Home page
│   ├── about/page.jsx        # About page
│   ├── contact/page.jsx      # Contact page with form
│   ├── listings/page.jsx     # Property listings
│   ├── services/page.jsx     # Services page
│   ├── team/page.jsx         # Team page
│   ├── components/
│   │   ├── Header.jsx        # Site navigation
│   │   └── Footer.jsx        # Site footer
│   ├── api/
│   │   ├── contact/route.js  # Contact form handler
│   │   └── crm/
│   │       ├── listings/route.js  # LockedOn listings API
│   │       └── articles/route.js  # LockedOn articles API
│   ├── globals.css           # Global styles
│   └── layout.jsx            # Root layout
├── lib/
│   └── lockedon-helper.js    # LockedOn API utilities
├── public/
│   └── images/               # Site images
├── .env.local                # Environment variables (not in git)
└── README.md                 # This file
```

## 🎯 Key Features

### Current Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Premium minimal aesthetic with brand colors
- ✅ Fully functional contact form with email delivery
- ✅ Modern navigation with hamburger menu
- ✅ SEO optimized with metadata
- ✅ Accessible (ARIA labels, semantic HTML)
- ✅ Performance optimized (Next.js 16, SSR)

### Ready for Activation

- 🔄 Live property listings from LockedOn CRM
- 🔄 Blog/articles from LockedOn CRM
- 🔄 Property search and filtering
- 🔄 Dynamic content updates

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (React 19.2)
- **Styling**: CSS with design system variables
- **Email**: Resend (Vercel-optimized)
- **CRM**: LockedOn Query API
- **Hosting**: Vercel
- **Node.js**: v18+

## 📝 Environment Variables Reference

Create a `.env.local` file in the root directory:

```env
# LockedOn CRM API
NEXT_PUBLIC_LOCKEDON_API_URL=https://newapi.lockedoncloud.com
LOCKEDON_API_KEY=your_jwt_token_here
LOCKEDON_OFFICE_UUID=your_office_uuid_here

# Resend Email Service
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_EMAIL_TO=enquiry@fornieriazar.com.au
CONTACT_EMAIL_FROM=website@fornieriazar.com.au
```

**Note**: Never commit `.env.local` to git. It's already in `.gitignore`.

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy

Vercel will automatically:
- Build and deploy on every push to main
- Provide preview deployments for branches
- Handle SSL certificates
- Optimize performance

### Environment Variables in Vercel

Add all variables from `.env.local` to Vercel:

1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.local`
3. Select Production, Preview, and Development environments
4. Save and redeploy

## 📞 Support

For questions or issues:

- **LockedOn API Support**: Contact LockedOn Support
- **Resend Email Issues**: [resend.com/docs](https://resend.com/docs)
- **Website Issues**: Contact your development team

## 🔐 Security Notes

- All API keys are stored in environment variables (never in code)
- Contact form validates and sanitizes input
- CORS is configured for API routes
- Rate limiting handled for LockedOn API
- Email templates sanitize user input

## 📜 License

Proprietary - Fornieri & Azar Real Estate © 2024
