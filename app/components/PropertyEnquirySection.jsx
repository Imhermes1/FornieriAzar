'use client';

import { useState } from 'react';

export default function PropertyEnquirySection({ address, suburb, state, postcode, propertyId, status: propertyStatus, agentEmail }) {
    // Customize message based on property status
    const defaultMessage = propertyStatus === 'sold'
        ? `I'm interested in properties similar to ${address}, ${suburb}. Please contact me with similar listings or upcoming properties in this area.`
        : `I'm interested in ${address}, ${suburb}. Please contact me with more information.`;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: defaultMessage
    });
    const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    interest: 'Property enquiry',
                    message: formData.message,
                    propertyId: propertyId,
                    propertyAddress: `${address}, ${suburb}`,
                    agentEmail: agentEmail // Pass agent email to API
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send enquiry');
            }

            setStatus({ submitting: false, submitted: true, error: null });
        } catch (error) {
            setStatus({
                submitting: false,
                submitted: false,
                error: error.message || 'Failed to send enquiry'
            });
        }
    };

    // Create Google Maps embed URL
    const fullAddress = `${address}, ${suburb}, ${state} ${postcode}`;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(fullAddress)}`;

    return (
        <section id="enquiry" className="property-enquiry-section">
            <div className="property-enquiry-grid">
                {/* Left: Enquiry Form */}
                <div className="property-enquiry-form-wrap">
                    <h3 className="property-enquiry__title">
                        {propertyStatus === 'sold' ? 'Interested in Similar Properties?' : 'Enquire About This Property'}
                    </h3>

                    {status.submitted ? (
                        <div className="property-enquiry__success">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h4>Thank You</h4>
                            <p>Your enquiry has been sent. We'll be in touch shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="property-enquiry-form">
                            {status.error && (
                                <div className="property-enquiry__error">{status.error}</div>
                            )}

                            <div className="property-enquiry-form__row">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    disabled={status.submitting}
                                />
                            </div>

                            <div className="property-enquiry-form__row property-enquiry-form__row--half">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={status.submitting}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={status.submitting}
                                />
                            </div>

                            <div className="property-enquiry-form__row">
                                <textarea
                                    placeholder="Your Message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    disabled={status.submitting}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn--primary property-enquiry-form__submit"
                                disabled={status.submitting}
                            >
                                {status.submitting ? 'SENDING...' : 'SEND ENQUIRY'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Right: Map */}
                <div className="property-map-wrap">
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${address}`}
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
