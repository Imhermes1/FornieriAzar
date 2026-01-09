/**
 * Test Rex API Integration
 * 
 * Run with: node --env-file=.env.local scripts/test-rex-api.js
 */

async function test() {
    console.log('--- Rex API Test ---');

    // Dynamic import for ES module
    const { RexApiClient } = await import('../lib/rex-api-client.js');
    const client = new RexApiClient();

    try {

        console.log('1. Checking credentials...');
        if (!process.env.REX_API_TOKEN && !(process.env.REX_API_EMAIL && process.env.REX_API_PASSWORD)) {
            console.error('Error: No Rex API credentials found in .env.local');
            return;
        }

        console.log('2. Performing search...');
        const result = await client.searchListings([], 5);

        console.log('Success!');
        console.log(`Found ${result.result?.total || 0} listings.`);

        if (result.result?.rows?.length > 0) {
            console.log('\nFirst listing sample:');
            const p = result.result.rows[0];
            console.log(`- ID: ${p.id}`);
            console.log(`- Address: ${p.legal_prop_address}`);
            console.log(`- Price: ${p.price_advertise_as}`);
        }

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

test();
