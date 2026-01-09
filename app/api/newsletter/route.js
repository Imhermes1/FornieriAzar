import { RexApiClient } from '@/lib/rex-api-client';

export async function POST(request) {
    try {
        const { firstName, lastName, email } = await request.json();

        // Validate required fields
        if (!email) {
            return Response.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Initialize Rex API client
        const rexClient = new RexApiClient();

        // Create contact in Rex with 'Website Newsletter' tag
        const contactData = {
            data: {
                type: 'person',
                name_first: firstName || '',
                name_last: lastName || '',
                emails: [
                    {
                        email: email,
                        email_primary: true
                    }
                ],
                tags: ['Website Newsletter'],
                source: 'Website',
                notes: 'Subscribed via website newsletter form'
            },
            return_id: false
        };

        const result = await rexClient.request('/v1/rex/contacts/create', {
            method: 'POST',
            body: JSON.stringify(contactData),
            next: { revalidate: 0 } // No caching for writes
        });

        return Response.json({
            success: true,
            message: 'Successfully subscribed to newsletter',
            contactId: result.result?.id || result.id
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);

        // Check if it's a duplicate contact error
        if (error.message?.includes('duplicate') || error.message?.includes('already exists')) {
            return Response.json({
                success: true,
                message: 'You are already subscribed to our newsletter'
            });
        }

        return Response.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        );
    }
}
