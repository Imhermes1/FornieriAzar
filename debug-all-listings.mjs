
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/search', {
            method: 'POST',
            body: JSON.stringify({
                criteria: [],
                limit: 50
            })
        });

        console.log('Total Listings found:', response.result.total);
        response.result.rows.forEach(l => {
            console.log(`[${l.system_listing_state}] ${l.id} - ${l.property?.adr_street_address || l.legal_prop_address}`);
        });

    } catch (e) {
        console.error(e);
    }
}

test();
