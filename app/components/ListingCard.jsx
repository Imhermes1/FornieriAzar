import Link from 'next/link';
import Image from 'next/image';

export default function ListingCard({ listing }) {
    const {
        id,
        address,
        suburb,
        state,
        images,
        bedrooms,
        bathrooms,
        carSpaces,
        status,
        originalStatus
    } = listing;

    // Use first image or placeholder
    const mainImage = images && images.length > 0 ? images[0] : '/images/FNA.png';

    // Format address display
    const displayAddress = address || 'Address on Request';
    const displayLocation = [suburb, state].filter(Boolean).join(' ').toUpperCase();

    return (
        <Link href={`/property/${id}`} className="property-card">
            <div className="property-card__image">
                <Image
                    src={mainImage}
                    alt={displayAddress}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className={status === 'sold' ? 'grayscale-img' : ''}
                    unoptimized
                />

                {status === 'sold' && (
                    <div className="property-card__badge property-card__badge--sold">SOLD</div>
                )}
                {status === 'rented' && (
                    <div className="property-card__badge property-card__badge--rented">LEASED</div>
                )}
                {originalStatus === 'under_offer' && status !== 'sold' && (
                    <div className="property-card__badge">UNDER OFFER</div>
                )}
                {/* Hover Stats Overlay */}
                <div className="property-card__hover-stats">
                    {bedrooms > 0 && (
                        <span className="hover-stat">{bedrooms} Bed</span>
                    )}
                    {bathrooms > 0 && (
                        <span className="hover-stat">{bathrooms} Bath</span>
                    )}
                    {carSpaces > 0 && (
                        <span className="hover-stat">{carSpaces} Car</span>
                    )}
                </div>
            </div>
            <div className="property-card__info">
                <h3 className="property-card__address">{displayAddress}</h3>
                <p className="property-card__suburb">{displayLocation}</p>
            </div>
        </Link>
    );
}
