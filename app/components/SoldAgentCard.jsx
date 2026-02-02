'use client';

import Image from 'next/image';

export default function SoldAgentCard({ agentName, agentPhone, agentEmail, agentImage }) {
    const scrollToEnquiry = () => {
        const enquirySection = document.getElementById('enquiry');
        if (enquirySection) {
            enquirySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="sold-agent-card">
            <span className="sold-agent-card__label">SOLD</span>
            <h3 className="sold-agent-card__sold-text">SOLD</h3>

            {/* Enquire button */}
            <button
                onClick={scrollToEnquiry}
                className="btn btn--primary"
                style={{ width: '100%', marginBottom: '24px' }}
            >
                ENQUIRE NOW
            </button>

            {/* Agent info with photo */}
            {agentName && (
                <div className="sold-agent-info">
                    {agentImage && (
                        <div className="sold-agent-info__image">
                            <Image
                                src={agentImage}
                                alt={agentName}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <div className="sold-agent-info__details">
                        <h4 className="sold-agent-info__name">{agentName}</h4>
                        <div className="sold-agent-info__contacts">
                            {agentPhone && <a href={`tel:${agentPhone}`}>{agentPhone}</a>}
                            {agentEmail && <a href={`mailto:${agentEmail}`}>Email Agent</a>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
