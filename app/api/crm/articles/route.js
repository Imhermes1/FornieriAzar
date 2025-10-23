/**
 * GET /api/crm/articles
 *
 * Fetches real estate articles from LockedOn CRM
 *
 * Query parameters:
 * - category: article category (optional)
 * - limit: number of results (optional, default: 10)
 * - offset: pagination offset (optional, default: 0)
 *
 * Future implementation will call LockedOn API
 * This will allow you to write articles in LockedOn and display them on your website
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = searchParams.get('limit') || 10;
  const offset = searchParams.get('offset') || 0;

  try {
    // TODO: Implement LockedOn API call
    // const apiKey = process.env.LOCKEDON_API_KEY;
    // const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;

    // const response = await fetch(`${apiUrl}/articles`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     category,
    //     limit: parseInt(limit),
    //     offset: parseInt(offset),
    //   }),
    // });

    // For now, return placeholder response
    return Response.json(
      {
        message: 'LockedOn articles API integration pending',
        status: 'not_configured',
        documentation: 'Configure LOCKEDON_API_KEY in .env.local to enable this endpoint',
      },
      { status: 501 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch articles', details: error.message },
      { status: 500 }
    );
  }
}
