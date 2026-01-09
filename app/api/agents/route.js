import { RexApiClient } from '@/lib/rex-api-client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = new RexApiClient();
        const response = await client.request('/v1/rex/account-users/search', {
            method: 'POST',
            body: JSON.stringify({ limit: 50 })
        });

        // Filter out system users and format agents
        const agents = (response.result?.rows || [])
            .filter(user => {
                // Exclude system/support accounts
                const isSystem = user.first_name?.toLowerCase().includes('rex') ||
                    user.first_name?.toLowerCase().includes('support');
                return !isSystem && user.first_name && user.email;
            })
            .map(user => ({
                id: user.id,
                name: `${user.first_name} ${user.last_name || ''}`.trim(),
                email: user.email,
                phone: user.settings?.phone_mobile || user.settings?.phone_direct || null,
                image: user.settings?.profile_image?.url
                    ? `https:${user.settings.profile_image.url}`
                    : null
            }));

        return NextResponse.json({ success: true, agents });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch agents' },
            { status: 500 }
        );
    }
}
