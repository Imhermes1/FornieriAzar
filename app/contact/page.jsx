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
        <section className="contact-main">
          <div className="contact-main__container">
            <div className="contact-main__header">
              <p className="contact-main__intro">
                For all general enquiries outside of the scope of our offices - including press and media - please contact us below. We'll get back to you shortly.
              </p>
            </div>

            <div className="contact-main__grid">
              <div className="contact-info">
                <div className="contact-info__item">
                  <span className="contact-info__label">PRESS ENQUIRIES</span>
                  <a href="mailto:marketingteam@fornieriazar.com.au" className="contact-info__email">marketingteam@fornieriazar.com.au</a>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__label">CAREERS</span>
                  <a href="mailto:work@fornieriazar.com.au" className="contact-info__email">work@fornieriazar.com.au</a>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__label">GENERAL ENQUIRIES</span>
                  <a href="mailto:team@fornieriazar.com.au" className="contact-info__email">team@fornieriazar.com.au</a>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
