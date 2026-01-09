
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({ id: 4842096 })
        });

        const listing = response.result;
        console.log('--- Listing Data ---');
        console.log('ID:', listing.id);
        console.log('Price Advertise As:', listing.price_advertise_as);
        console.log('Headline:', listing.advert_internet?.heading);
        console.log('Description Length:', listing.advert_internet?.body?.length);

        console.log('\n--- Agent Data ---');
        console.log('Agent 1:', JSON.stringify(listing.listing_agent_1, null, 2));

    } catch (e) {
        console.error(e);
    }
}

test();
