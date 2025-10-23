/**
 * GET /api/crm/listings
 *
 * Fetches listings from LockedOn CRM
 *
 * Query parameters:
 * - status: 'available' | 'sold' | 'rented' (optional)
 * - limit: number of results (optional, default: 20)
 * - offset: pagination offset (optional, default: 0)
 *
 * Future implementation will call LockedOn API
 * Once you have the API documentation, add authentication and API calls here
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'available';
  const limit = searchParams.get('limit') || 20;
  const offset = searchParams.get('offset') || 0;

  try {
    // TODO: Implement LockedOn API call
    // const apiKey = process.env.LOCKEDON_API_KEY;
    // const apiUrl = process.env.NEXT_PUBLIC_LOCKEDON_API_URL;

    // const response = await fetch(`${apiUrl}/listings`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     status,
    //     limit: parseInt(limit),
    //     offset: parseInt(offset),
    //   }),
    // });

    // For now, return placeholder response
    return Response.json(
      {
        message: 'LockedOn listings API integration pending',
        status: 'not_configured',
        documentation: 'Configure LOCKEDON_API_KEY in .env.local to enable this endpoint',
      },
      { status: 501 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch listings', details: error.message },
      { status: 500 }
    );
  }
}
