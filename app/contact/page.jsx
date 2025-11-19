'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
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
    <div data-page="contact">
      <Header />
      <main>
        <section className="simple-hero" aria-labelledby="contact-title">
          <div className="simple-hero__content">
            <p className="eyebrow">Get in touch</p>
            <h1 className="simple-hero__title" id="contact-title">Discuss your property needs</h1>
            <p className="simple-hero__description">Whether you're considering a sale, seeking acquisition opportunities, or require market analysis, contact us to explore your options.</p>
          </div>
        </section>

        <section className="cta" aria-labelledby="contact-form-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Contact us</p>
              <h2 id="contact-form-title">How can we help?</h2>
              <p>We usually get back to you within one business day. Your information is kept private and only used to help with your enquiry.</p>
              <div className="experience-highlights">
                <div>
                  <p className="experience-highlights__label">Office</p>
                  <p className="experience-highlights__value">Malvern East VIC 3145</p>
                </div>
              </div>
            </div>
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
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">What people say</p>
            <h2>Feedback from our clients</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Luke was professional, kept us informed every step of the way, and got us a price well above what we expected."
              </blockquote>
              <figcaption>Emma, Brighton</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "From the first meeting to when we got the keys, the whole process was smooth and transparent. We always felt looked after."
              </blockquote>
              <figcaption>Mark & Lisa, Toorak</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "Their knowledge of the local market and strong network of contacts has been invaluable for our family's property needs."
              </blockquote>
              <figcaption>The Chen Family</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
