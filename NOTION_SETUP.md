# Notion Setup Instructions for Buyer Registration

## Step 1: Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Name it: "Fornieri & Azar Buyer Leads"
4. Select your workspace
5. Click "Submit"
6. **Copy the "Internal Integration Token"** - you'll need this for `.env.local`

## Step 2: Create Notion Database

1. In Notion, create a new page called "Buyer Leads"
2. Add a database (table view)
3. Create the following properties:

| Property Name | Type | Options (if applicable) |
|--------------|------|------------------------|
| Name | Title | - |
| Email | Email | - |
| Phone | Phone | - |
| Suburbs | Text | - |
| Budget | Select | Under $1M, $1M - $2M, $2M - $3M, $3M - $5M, $5M+ |
| Property Type | Select | House, Apartment, Townhouse, Land, Any |
| Status | Select | New, Contacted, Qualified, Archived |
| Source | Text | - |
| Submitted | Date | - |
| Notes | Text | - |

4. **Get the Database ID:**
   - Open the database as a full page
   - Copy the URL - it looks like: `https://notion.so/yourworkspace/DATABASE_ID?v=...`
   - The DATABASE_ID is the long string of letters/numbers between the last `/` and the `?`

## Step 3: Share Database with Integration

1. Open your "Buyer Leads" database
2. Click the "..." menu (top right)
3. Click "Add connections"
4. Select "Fornieri & Azar Buyer Leads" integration
5. Click "Confirm"

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

```
NOTION_API_KEY=your_integration_token_here
NOTION_BUYER_DATABASE_ID=your_database_id_here
```

## Step 5: Test the Integration

1. Restart your dev server: `npm run dev`
2. Visit: `http://localhost:3000/buyers`
3. Fill out the form and submit
4. Check your Notion database - the entry should appear!

## Campaign Tracking

Use URL parameters to track different campaigns:

- Email: `fornieriazar.com.au/buyers?source=email-nov2024`
- SMS: `fornieriazar.com.au/buyers?source=sms-campaign`
- Instagram: `fornieriazar.com.au/buyers?source=instagram`
- Facebook: `fornieriazar.com.au/buyers?source=facebook`

The `source` parameter will automatically populate in the Notion database.

## Notion Database Views (Optional)

Create custom views in Notion to organize leads:

1. **By Status**: Filter by New/Contacted/Qualified
2. **By Budget**: Group by Budget range
3. **By Suburb**: Filter by specific suburbs
4. **By Source**: See which campaigns are performing best
5. **This Week**: Filter by Submitted date (last 7 days)
