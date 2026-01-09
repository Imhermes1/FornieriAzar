'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PropertySidebar({
    price,
    agentName,
    agentPhone,
    agentEmail,
    agentImage,
    statementOfInformation,
    onViewGallery,
    onEnquire
}) {
    return (
        <div className="property-pricing-card">
            <span className="price-label">LISTING PRICE</span>
            <h3 className="price-value">{price || 'CONTACT AGENT'}</h3>
            <div className="price-actions">
                <button onClick={onEnquire} className="btn btn--primary">ENQUIRE NOW</button>
                <button
                    onClick={onViewGallery}
                    className="btn btn--outline"
                >
                    VIEW GALLERY
                </button>
                {statementOfInformation && (
                    <a
                        href={statementOfInformation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline"
                    >
                        Statement of Information
                    </a>
                )}
            </div>

            {/* Agent inside sticky card */}
            {agentName && (
                <div className="sidebar-agent">
                    {agentImage && (
                        <div className="sidebar-agent__image">
                            <Image
                                src={agentImage}
                                alt={agentName}
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                    )}
                    <div className="sidebar-agent__info">
                        <h4 className="sidebar-agent__name">{agentName}</h4>
                        <div className="sidebar-agent__contacts">
                            {agentPhone && <a href={`tel:${agentPhone}`}>{agentPhone}</a>}
                            {agentEmail && <a href={`mailto:${agentEmail}`}>Email Agent</a>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
