import Link from 'next/link';
import SellForm from '../components/SellForm';

export const metadata = {
    title: 'Sell With Us | Fornieri & Azar Real Estate',
    description: 'Ready to sell your property? Get a free market appraisal from the Fornieri & Azar team.',
    openGraph: {
        title: 'Sell With Us | Fornieri & Azar Real Estate',
        description: 'Ready to sell your property? Get a free market appraisal from the Fornieri & Azar team.',
        images: [{ url: '/images/LowRes_2k_18.jpg', width: 1200, height: 630, alt: 'Sell With Fornieri & Azar' }],
    },
};

export default function SellPage() {
    return (
        <div className="sell-standalone">
            {/* Minimal Header */}
            <header className="sell-standalone__header">
                <Link href="/" className="sell-standalone__logo">
                    Fornieri <span>&</span> Azar
                </Link>
                <Link href="/" className="sell-standalone__close" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
            </header>

            <main className="sell-standalone__content">
                <div className="sell-standalone__intro">
                    <h1>The Brief</h1>
                    <p>
                        This is a short questionnaire to help us understand your property and goals.
                        Your answers will help us provide you with an accurate market appraisal
                        and tailored selling strategy.
                    </p>
                </div>

                <SellForm />
            </main>
        </div>
    );
}
