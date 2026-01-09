/**
 * Debug Rex API - Switch to Fornieri & Azar account (ID 6194)
 * Run with: node --env-file=.env.local scripts/debug-rex-listings.js
 */

async function debug() {
    const baseUrl = 'https://api.rexsoftware.com';
    const LIVE_ACCOUNT_ID = 6194;  // Fornieri & Azar

    // Login directly to the live account
    console.log('Logging in directly to Fornieri & Azar (account 6194)...\n');

    const loginResp = await fetch(`${baseUrl}/v1/rex/Authentication/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: process.env.REX_API_EMAIL,
            password: process.env.REX_API_PASSWORD,
            account_id: LIVE_ACCOUNT_ID
        })
    });

    const loginData = await loginResp.json();
    const token = loginData.result;

    if (!token) {
        console.log('Login failed:', loginData.error);
        return;
    }

    console.log('Login successful!\n');

    // Verify we're in the right account
    const accResp = await fetch(`${baseUrl}/v1/rex/Accounts/search`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit: 1 })
    });

    const accData = await accResp.json();
    console.log('Current account:', accData.result?.rows?.[0]?.name);
    console.log('Is test:', accData.result?.rows?.[0]?.is_test_account);

    // Now search for listings
    console.log('\n--- Your Listings ---\n');

    const listingsResp = await fetch(`${baseUrl}/v1/rex/Listings/search`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            criteria: [
                { name: 'system_listing_state', value: 'current' },
                { name: 'system_publication_status', type: 'in', value: ['published'] }
            ],
            limit: 20
        })
    });

    const listingsData = await listingsResp.json();
    console.log(`Total listings: ${listingsData.result?.total}`);

    listingsData.result?.rows?.forEach((l, i) => {
        console.log(`${i + 1}. ID: ${l.id}`);
        console.log(`   Suburb: ${l.property?.adr_suburb_or_town}`);
        console.log(`   Address: ${l.property?.adr_street_address}`);
        console.log(`   Price: ${l.price_advertise_as}`);
        console.log('');
    });
}

debug().catch(console.error);
