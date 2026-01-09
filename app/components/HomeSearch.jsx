'use client';

import { useState } from 'react';

export default function HomeSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('suburb', searchQuery);

        if (propertyType === 'sold') {
            params.append('status', 'sold');
        } else if (propertyType) {
            params.append('type', propertyType);
        }

        window.location.href = `/buy?${params.toString()}`;
    };

    return (
        <section className="home-search">
            <div className="home-search__container">
                <div className="home-search__header">
                    <span className="home-search__eyebrow">PROPERTY SEARCH</span>
                    <h2 className="home-search__title">Find your <span>next move.</span></h2>
                </div>

                <form className="home-search__form" onSubmit={handleSearch}>
                    <div className="home-search__field-group">
                        <div className="home-search__field">
                            <label>LOCATION</label>
                            <input
                                type="text"
                                className="home-search__input"
                                placeholder="Suburb, street, or keyword"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="home-search__field">
                            <label>CATEGORY</label>
                            <select
                                className="home-search__select"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value="">All Properties</option>
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>

                        <button type="submit" className="home-search__submit-btn">
                            <span className="btn-text">EXPLORE PROPERTIES</span>
                            <span className="btn-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <polyline points="14 6 20 12 14 18"></polyline>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
