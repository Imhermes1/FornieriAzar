
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({
                id: 4842096,
                extra_fields: ['advert_internet', 'images', 'agent']
            })
        });

        const listing = response.result;
        console.log('--- Agent with Extra Fields ---');
        console.log(JSON.stringify(listing.listing_agent_1, null, 2));

        console.log('\n--- Advert Internet with Extra Fields ---');
        console.log(JSON.stringify(listing.advert_internet, null, 2));

    } catch (e) {
        console.error(e);
    }
}

test();
