'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BuyerForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        suburbs: '',
        budget: '',
        propertyType: '',
    });
    const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            // Get source parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const source = urlParams.get('source') || 'direct';

            const response = await fetch('/api/buyer-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    source,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit registration');
            }

            setStatus({ submitting: false, submitted: true, error: null });
            setFormData({ name: '', email: '', phone: '', suburbs: '', budget: '', propertyType: '' });

        } catch (error) {
            setStatus({
                submitting: false,
                submitted: false,
                error: error.message || 'Failed to submit registration'
            });
        }
    };

    return (
        <div className="buyer-form-wrapper">
            {status.submitted ? (
                <div className="success-message">
                    <h2>Thank you for registering!</h2>
                    <p>We'll be in touch soon with properties that match your criteria.</p>
                    <Link href="/" className="btn btn--primary">Return Home</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="buyer-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone *</label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="suburbs">Suburbs of Interest *</label>
                            <input
                                type="text"
                                id="suburbs"
                                placeholder="e.g., Doncaster, Glen Waverley, Box Hill"
                                required
                                value={formData.suburbs}
                                onChange={(e) => setFormData({ ...formData, suburbs: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="budget">Budget Range *</label>
                            <select
                                id="budget"
                                required
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            >
                                <option value="">Select budget</option>
                                <option value="Under $1M">Under $1M</option>
                                <option value="$1M - $2M">$1M - $2M</option>
                                <option value="$2M - $3M">$2M - $3M</option>
                                <option value="$3M - $5M">$3M - $5M</option>
                                <option value="$5M+">$5M+</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="propertyType">Property Type *</label>
                            <select
                                id="propertyType"
                                required
                                value={formData.propertyType}
                                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Land">Land</option>
                                <option value="Any">Any</option>
                            </select>
                        </div>
                    </div>

                    {status.error && (
                        <div className="error-message">{status.error}</div>
                    )}

                    <button
                        type="submit"
                        className="btn btn--primary"
                        disabled={status.submitting}
                    >
                        {status.submitting ? 'Submitting...' : 'Register Interest'}
                    </button>
                </form>
            )}

            <style jsx>{`
        .buyer-form-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .buyer-form {
          background: var(--white);
          padding: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(5, 6, 8, 0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: var(--off-black);
        }

        .form-group input,
        .form-group select {
          padding: 12px 16px;
          border: 1px solid rgba(5, 6, 8, 0.2);
          border-radius: 8px;
          font-size: 16px;
          font-family: var(--font-body);
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--off-black);
        }

        .error-message {
          background: #fee;
          color: #c00;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .success-message {
          text-align: center;
          padding: 48px;
        }

        .success-message h2 {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .success-message p {
          font-size: 18px;
          color: var(--gray-600);
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .buyer-form {
            padding: 32px 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
