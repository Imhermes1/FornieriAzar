/**
 * Rex API Client
 * 
 * Handles authentication and requests to the Rex Software API.
 * Supports both static Bearer token and login-based session tokens.
 */
export class RexApiClient {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || 'https://api.rexsoftware.com';
        this.token = config.token || process.env.REX_API_TOKEN;
        this.email = config.email || process.env.REX_API_EMAIL;
        this.password = config.password || process.env.REX_API_PASSWORD;
        // Account ID for Fornieri & Azar live account (required to avoid demo account)
        this.accountId = config.accountId || process.env.REX_ACCOUNT_ID || 6194;
        this.cachedToken = null;
    }

    /**
     * Get the authorization header
     * Performs login if no token is available
     */
    async getAuthHeader() {
        if (this.token) {
            return `Bearer ${this.token}`;
        }

        if (this.cachedToken) {
            return `Bearer ${this.cachedToken}`;
        }

        if (this.email && this.password) {
            await this.login();
            return `Bearer ${this.cachedToken}`;
        }

        throw new Error('Rex API credentials not configured. Please provide REX_API_TOKEN or REX_API_EMAIL/REX_API_PASSWORD.');
    }

    /**
     * Perform login to obtain a session token
     */
    async login() {
        const response = await fetch(`${this.baseUrl}/v1/rex/Authentication/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.email,
                password: this.password,
                account_id: this.accountId
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Rex API Login Failed: ${error.message || response.statusText}`);
        }

        const data = await response.json();
        this.cachedToken = data.result?.token || data.token || data.result;

        if (!this.cachedToken) {
            throw new Error('Rex API Login successful but no token received.');
        }

        return this.cachedToken;
    }


    /**
     * Generic request helper
     */
    async request(endpoint, options = {}) {
        const authHeader = await this.getAuthHeader();

        const url = `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers,
            next: options.next || { revalidate: 3600 } // Default 1 hour cache
        });

        if (response.status === 401) {
            // Token might be expired, clear cache and retry once if using login
            if (!this.token && this.cachedToken) {
                console.warn('Rex API token expired, retrying login...');
                this.cachedToken = null;
                return this.request(endpoint, options);
            }
        }

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            let errorMessage = response.statusText;
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.error || JSON.stringify(errorJson);
            } catch {
                errorMessage = errorText || response.statusText;
            }
            console.error(`Rex API Error: ${response.status} - ${errorMessage} for ${endpoint}`);
            throw new Error(`Rex API Error (${endpoint}): ${errorMessage}`);
        }

        return response.json();
    }

    /**
     * Search listings
     */
    async searchListings(criteria = [], limit = 50, offset = 0) {
        // Note: Rex API search doesn't support extra_fields - only basic listing data is returned
        // Use Listings/read with extra_fields for full data including images
        const body = {
            limit,
            offset
        };

        return this.request('/v1/rex/listings/search', {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
}

// Export a default instance
export const rexApiClient = new RexApiClient();
