import { fetchRexListings } from './lib/rexsoftware-helper.js';

async function test() {
    try {
        const listings = await fetchRexListings();
        console.log(`Found ${listings.length} listings`);
        if (listings.length > 0) {
            console.log('Sample listing:', JSON.stringify(listings[0], null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

test();
