'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ListingFilters({ suburbs = [], searchParams = {} }) {
    const router = useRouter();
    const [filters, setFilters] = useState({
        suburb: searchParams.suburb || '',
        status: searchParams.status || '',
        type: searchParams.type || '',
        bedrooms: searchParams.bedrooms || '',
        bathrooms: searchParams.bathrooms || '',
        cars: searchParams.cars || '',
        minPrice: searchParams.minPrice || '',
        maxPrice: searchParams.maxPrice || ''
    });

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, val]) => {
            if (val) params.set(key, val);
        });

        router.push(`/buy?${params.toString()}`);
    };

    return (
        <section className="minimal-filters">
            <div className="minimal-filters__bar">
                {/* Search Area */}
                <div className="filter-group filter-group--search">
                    <div className="filter-control">
                        <label>SEARCH PROPERTIES</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                placeholder=""
                                value={filters.suburb}
                                onChange={(e) => handleFilterChange('suburb', e.target.value)}
                            />
                            <svg className="icon-search" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                </div>

                {/* Location Select */}
                <div className="filter-group">
                    <div className="filter-control">
                        <label>LOCATION</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.suburb}
                                onChange={(e) => handleFilterChange('suburb', e.target.value)}
                            >
                                <option value="">ANYWHERE</option>
                                {suburbs.map(s => (
                                    <option key={s} value={s.toLowerCase()}>{s}</option>
                                ))}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Min Price */}
                <div className="filter-group">
                    <div className="filter-control">
                        <label>MIN PRICE</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            >
                                <option value="">MIN</option>
                                {[500, 750, 1000, 1500, 2000, 3000].map(v => (
                                    <option key={v} value={v * 1000}>${v / 1000}M</option>
                                ))}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Max Price */}
                <div className="filter-group">
                    <div className="filter-control">
                        <label>MAX PRICE</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            >
                                <option value="">MAX</option>
                                {[1000, 1500, 2000, 3000, 5000].map(v => (
                                    <option key={v} value={v * 1000}>${v / 1000}M</option>
                                ))}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Bed */}
                <div className="filter-group filter-group--small">
                    <div className="filter-control">
                        <label>BED</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.bedrooms}
                                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                            >
                                <option value="">ANY</option>
                                {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}+</option>)}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Bath */}
                <div className="filter-group filter-group--small">
                    <div className="filter-control">
                        <label>BATH</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.bathrooms}
                                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                            >
                                <option value="">ANY</option>
                                {[1, 2, 3, 4].map(v => <option key={v} value={v}>{v}+</option>)}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Car */}
                <div className="filter-group filter-group--small">
                    <div className="filter-control">
                        <label>CAR</label>
                        <div className="select-with-icon">
                            <select
                                value={filters.cars}
                                onChange={(e) => handleFilterChange('cars', e.target.value)}
                            >
                                <option value="">ANY</option>
                                {[1, 2, 3, 4].map(v => <option key={v} value={v}>{v}+</option>)}
                            </select>
                            <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-navigation for Status */}
            <div className="minimal-filters__nav">
                <Link href="/buy" className={!searchParams.status && !searchParams.type ? 'active' : ''}>AVAILABLE</Link>
                <Link href="/buy?status=sold" className={searchParams.status === 'sold' ? 'active' : ''}>SOLD</Link>
                <Link href="/buy?type=projects" className={searchParams.type === 'projects' ? 'active' : ''}>PROJECTS</Link>
                <Link href="/buy?type=classic" className={searchParams.type === 'classic' ? 'active' : ''}>CLASSIC</Link>
            </div>
        </section>
    );
}
