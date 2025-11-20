import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Contact Us | Real Estate Agents East & South East Melbourne',
  description: 'Contact Fornieri & Azar for all your real estate needs in East and South East Melbourne. We are here to help you buy, sell, and manage your property.',
};

export default function ContactPage() {
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
            <ContactForm />
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
