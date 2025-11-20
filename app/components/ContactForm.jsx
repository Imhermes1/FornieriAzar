'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        interest: 'selling',
        message: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (status.error) {
            setStatus(prev => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send enquiry');
            }

            setStatus({ submitting: false, submitted: true, error: null });
            // Reset form after successful submission
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                interest: 'selling',
                message: ''
            });
        } catch (error) {
            setStatus({
                submitting: false,
                submitted: false,
                error: error.message || 'Failed to send enquiry. Please try again.'
            });
        }
    };

    return (
        <form className="cta-form" onSubmit={handleSubmit} aria-label="Contact form">
            {status.submitted && (
                <div style={{
                    padding: '20px',
                    background: 'rgba(147, 151, 160, 0.15)',
                    borderRadius: '8px',
                    border: '1px solid rgba(147, 151, 160, 0.3)',
                    color: 'var(--white)',
                    marginBottom: '20px'
                }}>
                    <strong>Thank you for your enquiry!</strong>
                    <p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.9 }}>
                        We have received your message and will respond within one business day.
                    </p>
                </div>
            )}

            {status.error && (
                <div style={{
                    padding: '20px',
                    background: 'rgba(220, 38, 38, 0.15)',
                    borderRadius: '8px',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    color: 'var(--white)',
                    marginBottom: '20px'
                }}>
                    <strong>Error:</strong> {status.error}
                </div>
            )}

            <div className="form-row">
                <label htmlFor="fullName">Full name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Alexandra Thompson"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={status.submitting}
                    required
                />
            </div>
            <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="alexandra@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status.submitting}
                    required
                />
            </div>
            <div className="form-row">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+61 400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status.submitting}
                />
            </div>
            <div className="form-row">
                <label htmlFor="interest">I'm interested in</label>
                <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    disabled={status.submitting}
                >
                    <option value="Selling a property">Selling my home</option>
                    <option value="Buying a property">Buying a home</option>
                    <option value="Property development">Property development</option>
                    <option value="General enquiry">Just have a question</option>
                </select>
            </div>
            <div className="form-row">
                <label htmlFor="message">How can we help?</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us a bit about what you're looking for or any questions you have"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.submitting}
                    required
                ></textarea>
            </div>
            <button
                className="btn btn--primary"
                type="submit"
                disabled={status.submitting}
                style={{ opacity: status.submitting ? 0.6 : 1 }}
            >
                {status.submitting ? 'Sending...' : 'Send message'}
            </button>
            <p className="cta-form__disclaimer">Your information is kept confidential and secure.</p>
        </form>
    );
}
