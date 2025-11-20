'use client';

import { useState } from 'react';

export default function HomeSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (propertyType) params.append('type', propertyType);
        window.location.href = `/listings?${params.toString()}`;
    };

    return (
        <section className="home-search-section">
            <div className="home-search-container">
                <p className="footer-search-eyebrow">Looking for a home?</p>
                <form className="footer-search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="footer-search-input"
                        placeholder="Search by suburb, street, or property type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search properties"
                    />
                    <select
                        className="footer-search-select"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        aria-label="Property type filter"
                    >
                        <option value="">All types</option>
                        <option value="sale">For sale</option>
                        <option value="rent">For rent</option>
                    </select>
                    <button type="submit" className="footer-search-btn">
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
}
