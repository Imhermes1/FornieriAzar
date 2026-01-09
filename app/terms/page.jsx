'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
    return (
        <div>
            <Header />

            <main style={{
                paddingTop: '80px',
                minHeight: '100vh',
                background: 'var(--off-white)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: 'clamp(40px, 6vh, 80px) clamp(20px, 5vw, 60px)'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <span style={{
                            display: 'block',
                            fontSize: '11px',
                            letterSpacing: '0.3em',
                            color: 'var(--gray-400)',
                            marginBottom: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Legal
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(28px, 5vw, 42px)',
                            fontWeight: '500',
                            letterSpacing: '0.02em',
                            color: 'var(--off-black)'
                        }}>
                            Terms & Conditions
                        </h1>
                    </div>

                    <div style={{
                        background: 'var(--white)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
                        overflow: 'hidden',
                        minHeight: '80vh'
                    }}>
                        <iframe
                            src="https://lukef.craft.me/bWZKGNZ3oeEmZF"
                            style={{
                                width: '100%',
                                height: '80vh',
                                border: 'none',
                                display: 'block'
                            }}
                            title="Terms and Conditions"
                            loading="lazy"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
