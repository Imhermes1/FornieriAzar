
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({ id: 4842096 })
        });

        const listing = response.result;
        console.log('--- Description Debug ---');
        console.log('description:', listing.description);
        console.log('advert_internet:', JSON.stringify(listing.advert_internet, null, 2));
        console.log('headline:', listing.headline);

        console.log('\n--- Full Listing Keys ---');
        console.log(Object.keys(listing).filter(k => k.includes('desc') || k.includes('advert') || k.includes('text')));

        console.log('\n--- Agent Details ---');
        for (let key in listing.listing_agent_1) {
            console.log(`${key}:`, listing.listing_agent_1[key]);
        }

    } catch (e) {
        console.error(e);
    }
}

test();
