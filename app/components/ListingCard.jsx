import Link from 'next/link';
import Image from 'next/image';

export default function ListingCard({ listing }) {
    const {
        id,
        address,
        suburb,
        price,
        bedrooms,
        bathrooms,
        carSpaces,
        images,
        propertyType
    } = listing;

    // Use first image or placeholder
    const mainImage = images && images.length > 0 ? images[0] : '/images/placeholder-property.jpg';

    return (
        <Link href={`/property/${id}`} className="listing-card group">
            <div className="listing-card__image-container">
                {/* Using a standard img tag for external URLs if domain not configured in next.config.js, 
                but ideally use Next Image. Assuming external domains might not be whitelisted yet, 
                safest is standard img or Next Image with unoptimized if needed. 
                Using unoptimized Image for now. */}
                <Image
                    src={mainImage}
                    alt={address}
                    fill
                    className="listing-card__image transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                />
                <div className="listing-card__badge">
                    {propertyType === 'rental' ? 'For Rent' : 'For Sale'}
                </div>
            </div>

            <div className="listing-card__content">
                <div className="listing-card__price">{price}</div>
                <h3 className="listing-card__address">{address}</h3>
                <p className="listing-card__suburb">{suburb}</p>

                <div className="listing-card__features">
                    <div className="feature">
                        <span className="feature__icon">🛏</span>
                        <span className="feature__value">{bedrooms}</span>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🚿</span>
                        <span className="feature__value">{bathrooms}</span>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🚗</span>
                        <span className="feature__value">{carSpaces}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
