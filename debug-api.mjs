
import { RexApiClient } from './lib/rex-api-client.js';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.searchListings();
        console.log('Total:', response.result?.total);
        if (response.result?.rows?.length > 0) {
            const first = response.result.rows[0];
            console.log('Listing Keys:', Object.keys(first));
            console.log('Property:', first.property);
            console.log('Address:', first.legal_prop_address);
            console.log('Price View:', first.price_advertise_as);
            console.log('Images:', first.listing_primary_image);
        }
    } catch (e) {
        console.error(e);
    }
}

test();
