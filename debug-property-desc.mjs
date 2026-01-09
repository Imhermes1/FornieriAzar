
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
        console.log('--- Property Object Keys ---');
        console.log(Object.keys(listing.property));

        console.log('\n--- Checking common description keys in property ---');
        const searchTerms = ['desc', 'text', 'body', 'headline', 'advert', 'meta'];
        for (let key of Object.keys(listing.property)) {
            if (searchTerms.some(term => key.toLowerCase().includes(term))) {
                console.log(`${key}:`, listing.property[key]);
            }
        }

        console.log('\n--- Checking top-level again with different params ---');
        // Sometimes you need to ask for certain fields?

    } catch (e) {
        console.error(e);
    }
}

test();
