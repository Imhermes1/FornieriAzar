'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interests: [],
        otherInterest: '',
        message: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const currentInterests = [...formData.interests];
            if (checked) {
                currentInterests.push(value);
            } else {
                const index = currentInterests.indexOf(value);
                if (index > -1) currentInterests.splice(index, 1);
            }
            setFormData(prev => ({ ...prev, interests: currentInterests }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (status.error) {
            setStatus(prev => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        // Prepare combined metadata for the existing API
        const submissionData = {
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            interest: formData.interests.join(', ') + (formData.otherInterest ? ` (${formData.otherInterest})` : ''),
            message: formData.message
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send enquiry');
            }

            setStatus({ submitting: false, submitted: true, error: null });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                interests: [],
                otherInterest: '',
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

    if (status.submitted) {
        return (
            <div className="contact-form-success">
                <h3>Thank you.</h3>
                <p>We've received your message and will be in touch shortly.</p>
                <button onClick={() => setStatus({ ...status, submitted: false })} className="contact-form__submit">SEND ANOTHER</button>
            </div>
        );
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__section">
                <span className="contact-form__label">HOW CAN WE HELP?</span>
                <div className="contact-form__checkbox-grid">
                    {['Buying', 'Selling', 'Careers', 'Press'].map((item) => (
                        <label key={item} className="contact-form__checkbox-label">
                            <input
                                type="checkbox"
                                name="interests"
                                value={item}
                                checked={formData.interests.includes(item)}
                                onChange={handleChange}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                    <label className="contact-form__checkbox-label contact-form__checkbox-label--full">
                        <input
                            type="checkbox"
                            name="interests"
                            value="Other"
                            checked={formData.interests.includes('Other')}
                            onChange={handleChange}
                        />
                        <span>Other (please specify)</span>
                    </label>
                </div>
                {formData.interests.includes('Other') && (
                    <input
                        type="text"
                        name="otherInterest"
                        placeholder="Please specify"
                        className="contact-form__input contact-form__input--other"
                        value={formData.otherInterest}
                        onChange={handleChange}
                        required
                    />
                )}
            </div>

            <div className="contact-form__row">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="contact-form__input"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="contact-form__input"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="contact-form__row">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="contact-form__input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    className="contact-form__input"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="contact-form__row">
                <textarea
                    name="message"
                    placeholder="Leave a message"
                    className="contact-form__textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button type="submit" className="contact-form__submit" disabled={status.submitting}>
                {status.submitting ? 'SENDING...' : 'SEND'}
            </button>

            {status.error && <p className="contact-form__error">{status.error}</p>}
        </form>
    );
}
