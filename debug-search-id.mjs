
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/search', {
            method: 'POST',
            body: JSON.stringify({
                criteria: [{ name: 'id', value: 4842096 }]
            })
        });

        const listing = response.result.rows[0];
        console.log('--- Listing Data ---');
        console.log('ID:', listing.id);

        console.log('\n--- Description Fields ---');
        console.log('advert_internet:', listing.advert_internet);
        console.log('description:', listing.description);
        console.log('legal_prop_description:', listing.legal_prop_description);

        console.log('\n--- All Listing Keys ---');
        console.log(Object.keys(listing));

    } catch (e) {
        console.error(e);
    }
}

test();
