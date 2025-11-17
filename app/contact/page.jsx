'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'selling',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission will be handled via API route when you configure it
    console.log('Form submitted:', formData);
  };

  return (
    <div data-page="contact">
      <Header />
      <main>
        <section className="page-hero" aria-labelledby="contact-title">
          <img className="page-hero__media" src="/images/main.jpg" alt="Luxury residence foyer" />
          <div className="page-hero__content">
            <p className="page-hero__eyebrow">Concierge desk</p>
            <h1 className="page-hero__title" id="contact-title">Arrange a confidential consultation</h1>
            <p className="page-hero__meta">Share your objectives and we will tailor a strategy spanning acquisition, divestment, or portfolio optimisation.</p>
          </div>
        </section>

        <section className="cta" aria-labelledby="contact-form-title">
          <div className="cta-inner">
            <div className="cta-copy">
              <p className="eyebrow">Contact form</p>
              <h2 id="contact-form-title">How can we assist?</h2>
              <p>We typically respond within one business day. Your details remain confidential and are used solely to facilitate your enquiry.</p>
              <div className="experience-highlights">
                <div>
                  <p className="experience-highlights__label">Office</p>
                  <p className="experience-highlights__value">Malvern East VIC 3145</p>
                </div>
                <div>
                  <p className="experience-highlights__label">Direct line</p>
                  <p className="experience-highlights__value">+61 (03) 9000 0000</p>
                </div>
              </div>
            </div>
            <form className="cta-form" onSubmit={handleSubmit} aria-label="Contact form">
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Alexandra Thompson"
                  value={formData.name}
                  onChange={handleChange}
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
                />
              </div>
              <div className="form-row">
                <label htmlFor="interest">I'm interested in</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="selling">Selling a property</option>
                  <option value="buying">Buyer representation</option>
                  <option value="projects">Project collaboration</option>
                  <option value="valuation">Portfolio valuation</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Share any key details or timeframes"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button className="btn btn--primary" type="submit">Submit enquiry</button>
              <p className="cta-form__disclaimer">Submitting this form does not create an agency agreement. We keep your information confidential.</p>
            </form>
          </div>
        </section>

        <section className="testimonials" aria-label="Client testimonials">
          <div className="section-heading">
            <p className="eyebrow">Client reflections</p>
            <h2>Experience and trust from prestige clientele</h2>
          </div>
          <div className="testimonial-grid">
            <figure className="testimonial-card">
              <blockquote>
                "Every interaction was discreet, professional, and insight-driven. Fornieri & Azar's team delivered above our price expectations."
              </blockquote>
              <figcaption>Vendor, Brighton</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "From initial briefing to settlement, the process was precise and transparent. We felt supported at every step."
              </blockquote>
              <figcaption>Buyer, Toorak</figcaption>
            </figure>
            <figure className="testimonial-card">
              <blockquote>
                "Their understanding of luxury assets and network access is invaluable for our family's property strategy."
              </blockquote>
              <figcaption>Private family office</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
