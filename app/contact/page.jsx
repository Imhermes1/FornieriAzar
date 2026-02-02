import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Contact Us | Real Estate Agents East & South East Melbourne',
  description: 'Contact Fornieri & Azar for all your real estate needs in East and South East Melbourne. We are here to help you buy, sell, and manage your property.',
  openGraph: {
    title: 'Contact Us | Real Estate Agents East & South East Melbourne',
    description: 'Contact Fornieri & Azar for all your real estate needs in East and South East Melbourne.',
    images: [{ url: '/images/LowRes_2k_18.jpg', width: 1200, height: 630, alt: 'Contact Fornieri & Azar' }],
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Fornieri & Azar',
    image: 'https://fornieriazar.com.au/images/LowRes_2k_18.jpg',
    url: 'https://fornieriazar.com.au',
    telephone: '+61-3-9999-9999',
    email: 'team@fornieriazar.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631,
    },
    areaServed: [
      { '@type': 'City', name: 'Glen Waverley' },
      { '@type': 'City', name: 'Malvern East' },
      { '@type': 'City', name: 'Chadstone' },
      { '@type': 'City', name: 'Vermont South' },
      { '@type': 'City', name: 'Blackburn South' },
      { '@type': 'City', name: 'Berwick' },
      { '@type': 'City', name: 'Narre Warren North' },
      { '@type': 'City', name: 'Dingley Village' },
      { '@type': 'City', name: 'Keysborough' },
      { '@type': 'City', name: 'Hampton' },
      { '@type': 'City', name: 'Brighton' },
    ],
    sameAs: [
      'https://www.facebook.com/fornieriazar',
      'https://www.instagram.com/fornieriazar',
    ],
  };

  return (
    <div data-page="contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
                  <a href="mailto:marketing@fornieriazar.com.au" className="contact-info__email">marketing@fornieriazar.com.au</a>
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
