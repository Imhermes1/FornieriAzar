import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PropertyContent from '../../components/PropertyContent';
import PropertyDescription from '../../components/PropertyDescription';
import PropertyEnquirySection from '../../components/PropertyEnquirySection';
import SoldAgentCard from '../../components/SoldAgentCard';
import { RexApiClient } from '@/lib/rex-api-client';
import { normalizeRexProperty } from '@/lib/rexsoftware-helper';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const client = new RexApiClient();
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(id),
                extra_fields: ['advert_internet', 'images', 'agent', 'listing_adverts', 'agent_profile_image', 'related']
            })
        });

        const listing = response.result;
        const address = listing?.property?.adr_street_address || 'Property';
        const suburb = listing?.property?.adr_suburb_or_town || '';
        const firstImage = listing?.images?.[0]?.url || '/images/FNA.png';

        return {
            title: `${address}, ${suburb} | Fornieri & Azar`,
            description: listing?.advert_internet?.body?.slice(0, 160) || `View this property in ${suburb}`,
            openGraph: {
                title: `${address}, ${suburb}`,
                description: listing?.advert_internet?.body?.slice(0, 160) || `View this property in ${suburb}`,
                images: [{ url: firstImage, width: 1200, height: 630, alt: `${address}, ${suburb}` }],
            },
        };
    } catch {
        return {
            title: 'Property | Fornieri & Azar',
            description: 'View property details',
        };
    }
}

export default async function PropertyPage({ params }) {
    const { id } = await params;

    const client = new RexApiClient();
    let listing = null;

    try {
        const response = await client.request('/v1/rex/Listings/read', {
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(id),
                extra_fields: ['advert_internet', 'images', 'agent', 'listing_adverts', 'agent_profile_image', 'related']
            })
        });
        listing = response.result ? normalizeRexProperty(response.result) : null;
    } catch (error) {
        console.error('Error fetching property:', error);
    }

    if (!listing) {
        return (
            <div data-page="property">
                <Header />
                <main className="property-page">
                    <div className="property-not-found">
                        <h1>Property Not Found</h1>
                        <p>This property may no longer be available.</p>
                        <Link href="/buy" className="btn btn--primary">Browse Properties</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const {
        id: propertyId,
        address,
        suburb,
        state,
        postcode,
        bedrooms,
        bathrooms,
        carSpaces,
        landSize,
        price,
        description,
        headline,
        images,
        agentName,
        agentPhone,
        agentEmail,
        agentImage,
        statementOfInformation,
        documents,
        status // Destructure status
    } = listing;

    // Filter images to ensure we only have property photos in the gallery/hero
    const heroImage = images[0] || '/images/FNA.png';

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fornieriazar.com.au' },
            { '@type': 'ListItem', position: 2, name: 'Buy', item: 'https://fornieriazar.com.au/buy' },
            { '@type': 'ListItem', position: 3, name: `${address}, ${suburb}` },
        ],
    };

    // SOLD PROPERTY LAYOUT - Match reference image
    if (status === 'sold') {
        return (
            <div data-page="property">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <Header />
                <main className="property-page">
                    {/* 1. Fullscreen hero */}
                    <section className="property-hero">
                        <Image
                            src={heroImage}
                            alt={address}
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </section>

                    {/* 2. Details section with agent */}
                    <section className="sold-details">
                        <div className="sold-details__container">
                            <div className="sold-details__main">
                                <span className="sold-details__status">SOLD</span>
                                <h1 className="sold-details__address">{address}</h1>
                                <p className="sold-details__suburb">{suburb} {state}</p>

                                <div className="sold-details__stats">
                                    {bedrooms > 0 && <span>{bedrooms} Bed</span>}
                                    {bathrooms > 0 && <span>{bathrooms} Bath</span>}
                                    {carSpaces > 0 && <span>{carSpaces} Car</span>}
                                </div>

                                {/* Price replaced with SOLD */}
                                <div className="property-price-inline">
                                    <span className="property-price-inline__label">STATUS</span>
                                    <h3 className="property-price-inline__value">SOLD</h3>
                                </div>

                                <div className="sold-details__description">
                                    <PropertyDescription description={description} />
                                </div>
                            </div>

                            {/* Agent sidebar - matching buy screen style */}
                            <div className="sold-details__agent">
                                <SoldAgentCard
                                    agentName={agentName}
                                    agentPhone={agentPhone}
                                    agentEmail={agentEmail}
                                    agentImage={agentImage}
                                />
                            </div>
                        </div>
                    </section>

                    {/* 3. Split section: image left, floating text right */}
                    <section className="sold-cta-split">
                        <div className="sold-cta-split__image">
                            <Image
                                src={images[2] || heroImage}
                                alt="Property detail"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="sold-cta-split__text-wrapper">
                            <div className="sold-cta-split__text">
                                <h2>SELL WITH US</h2>
                                <p>At Fornieri & Azar, we believe every property deserves a tailored approach. Our team combines local expertise with innovative marketing strategies to connect your home with the right buyer—someone whose lifestyle and aspirations align perfectly with what your property offers.</p>
                                <p>From your first consultation to settlement, we're with you every step of the way. Whether you're selling a family home, investment property, or downsizing, we deliver results through dedication, transparency, and genuine care for your goals.</p>
                                <Link href="/sell" className="sold-cta-split__link">
                                    Learn More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Enquiry Form & Map */}
                    <PropertyEnquirySection
                        address={address}
                        suburb={suburb}
                        state={state}
                        postcode={postcode}
                        propertyId={propertyId}
                        status={status}
                        agentEmail={agentEmail}
                    />
                </main>
                <Footer />
            </div>
        );
    }

    // REGULAR LISTING LAYOUT
    return (
        <div data-page="property">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />
            <main className="property-page">
                {/* Hero section with massive property image */}
                <section className="property-hero">
                    <Image
                        src={heroImage}
                        alt={address}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </section>

                <PropertyContent
                    images={images}
                    address={address}
                    suburb={suburb}
                    price={price}
                    agentName={agentName}
                    agentPhone={agentPhone}
                    agentEmail={agentEmail}
                    agentImage={agentImage}
                    statementOfInformation={statementOfInformation}
                >
                    <div className="property-heading">
                        <h1 className="property-address">{address}</h1>
                        <p className="property-suburb">{suburb} {state}</p>
                    </div>

                    <div className="property-stats-bar">
                        {bedrooms > 0 && (
                            <div className="stat-item">
                                <span className="stat-val">{bedrooms}</span>
                                <span className="stat-label">BED</span>
                            </div>
                        )}
                        {bathrooms > 0 && (
                            <div className="stat-item">
                                <span className="stat-val">{bathrooms}</span>
                                <span className="stat-label">BATH</span>
                            </div>
                        )}
                        {carSpaces > 0 && (
                            <div className="stat-item">
                                <span className="stat-val">{carSpaces}</span>
                                <span className="stat-label">CAR</span>
                            </div>
                        )}
                        {landSize && (
                            <div className="stat-item">
                                <span className="stat-val">{landSize}</span>
                                <span className="stat-label">SIZE</span>
                            </div>
                        )}
                    </div>

                    {/* Price below stats */}
                    <div className="property-price-inline">
                        <span className="property-price-inline__label">LISTING PRICE</span>
                        <h3 className="property-price-inline__value">{price || 'CONTACT AGENT'}</h3>
                    </div>

                    <div className="property-details-section">
                        <PropertyDescription description={description} />
                    </div>
                </PropertyContent>

                {/* Enquiry Form & Map */}
                <PropertyEnquirySection
                    address={address}
                    suburb={suburb}
                    state={state}
                    postcode={postcode}
                    propertyId={propertyId}
                    agentEmail={agentEmail}
                />
            </main>
            <Footer />
        </div>
    );
}
