import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BuyerForm from '../components/BuyerForm';

export const metadata = {
    title: 'Buyer Registration | Off-Market Properties East & South East Melbourne',
    description: 'Register as a buyer with Fornieri & Azar to get exclusive access to off-market properties and tailored property matches in East and South East Melbourne.',
};

export default function BuyersPage() {
    return (
        <>
            <div data-page="buyers">
                <Header />
                <main>
                    {/* Hero Section */}
                    <section className="minimal-hero">
                        <h1 className="minimal-hero__title">Register as a Buyer</h1>
                        <p className="minimal-hero__text">
                            Get exclusive access to off-market opportunities and be the first to know about properties that match your criteria.
                        </p>
                    </section>

                    {/* Form Section */}
                    <section className="minimal-section">
                        <div className="minimal-container">
                            <BuyerForm />
                        </div>
                    </section>

                    {/* Benefits Section */}
                    <section className="minimal-section" style={{ backgroundColor: 'var(--off-white)' }}>
                        <div className="minimal-container">
                            <div className="minimal-services">
                                <article className="minimal-service-card">
                                    <h3>Off-Market Access</h3>
                                    <p className="minimal-text">
                                        Be the first to know about exclusive properties before they hit the market.
                                    </p>
                                </article>

                                <article className="minimal-service-card">
                                    <h3>Tailored Matches</h3>
                                    <p className="minimal-text">
                                        Receive only properties that match your specific criteria and budget.
                                    </p>
                                </article>

                                <article className="minimal-service-card">
                                    <h3>Expert Guidance</h3>
                                    <p className="minimal-text">
                                        Work with experienced agents who understand Melbourne's premium market.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </section>

                    {/* Subtle Seller CTA */}
                    <section className="minimal-section">
                        <div className="minimal-container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            <p className="eyebrow">Selling?</p>
                            <h2 className="minimal-heading">We match qualified buyers with the right properties</h2>
                            <p className="minimal-text" style={{ marginBottom: '24px' }}>
                                If you're considering selling, we can connect you with buyers actively searching in your area.
                            </p>
                            <Link href="/contact" className="btn btn--ghost">Get in touch</Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
