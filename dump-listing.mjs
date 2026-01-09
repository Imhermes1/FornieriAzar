
import { RexApiClient } from './lib/rex-api-client.js';
import fs from 'fs';

async function test() {
    const client = new RexApiClient();
    try {
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({ id: 4842096 })
        });

        fs.writeFileSync('listing_dump.json', JSON.stringify(response.result, null, 2));
        console.log('Dumped listing 4842096 to listing_dump.json');

    } catch (e) {
        console.error(e);
    }
}

test();
