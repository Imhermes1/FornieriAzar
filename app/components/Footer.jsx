'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [year, setYear] = useState(2026);
    const videoRef = useRef(null);
    const [activeIdx, setActiveIdx] = useState(0);

    const videos = [
        '/video/6532832-hd_1920_1080_24fps.mp4',
        '/video/6533199-hd_1920_1080_24fps.mp4'
    ];

    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [showCredits, setShowCredits] = useState(false);
    const [showNewsletter, setShowNewsletter] = useState(false);

    // Newsletter form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const handleVideoEnd = () => {
        setActiveIdx((prev) => (prev + 1) % videos.length);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(err => {
                console.warn("Footer video autoplay failed:", err);
            });
        }
    }, [activeIdx]);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                setFirstName('');
                setLastName('');
                setEmail('');
                // Auto-close after 3 seconds
                setTimeout(() => {
                    setShowNewsletter(false);
                    setSubmitStatus(null);
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="minimal-footer">
            <div className="minimal-footer__video-wrapper">
                <video
                    ref={videoRef}
                    key={videos[activeIdx]}
                    muted
                    playsInline
                    autoPlay
                    onEnded={handleVideoEnd}
                    className="minimal-footer__video"
                    style={{ border: 'none', outline: 'none' }}
                >
                    <source src={videos[activeIdx]} type="video/mp4" />
                </video>
                <div className="minimal-footer__overlay"></div>
            </div>

            <div className="minimal-footer__container">
                <div className="minimal-footer__grid">
                    <div className="minimal-footer__brand-col">
                        <Link href="/" className="minimal-footer__logo-text">
                            FORNIERI <span>&</span> AZAR
                        </Link>
                    </div>

                    <div className="minimal-footer__nav-col">
                        <div className="minimal-footer__links">
                            <a href="https://www.instagram.com/fornieri.azar/?hl=en" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                            <a href="https://www.youtube.com/@LukeFornieri" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
                            <a href="https://www.linkedin.com/in/lukefornieri/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                        </div>
                    </div>

                    <div className="minimal-footer__nav-col">
                        <div className="minimal-footer__links">
                            <Link href="/contact">CONTACT</Link>
                            <button
                                onClick={() => setShowNewsletter(true)}
                                className="minimal-footer__link-btn"
                            >
                                NEWSLETTER
                            </button>
                            <Link href="/privacy">PRIVACY</Link>
                        </div>
                    </div>
                </div>

                <div className="minimal-footer__bottom">
                    <div className="minimal-footer__bottom-left">
                        <span>© FORNIERI & AZAR {year}</span>
                        <button
                            onClick={() => setShowDisclaimer(true)}
                            className="minimal-footer__legal-link"
                        >
                            DISCLAIMER
                        </button>
                        <button
                            onClick={() => setShowCredits(true)}
                            className="minimal-footer__legal-link"
                        >
                            SITE CREDITS
                        </button>
                    </div>
                </div>
            </div>

            {/* Newsletter Modal */}
            {showNewsletter && (
                <div className="footer-modal" onClick={() => setShowNewsletter(false)}>
                    <div className="footer-modal__content newsletter-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="footer-modal__close" onClick={() => setShowNewsletter(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {submitStatus === 'success' ? (
                            <div className="newsletter-success">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--off-black)" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <h3>You're In.</h3>
                                <p>Welcome to Fornieri & Azar. We'll keep you updated with our latest listings and market insights.</p>
                            </div>
                        ) : (
                            <div className="footer-modal__text">
                                <h3 style={{ marginBottom: '8px' }}>THE INSIDER:</h3>
                                <p style={{ marginBottom: '8px', color: 'var(--gray-600)' }}>The latest listings.</p>
                                <p style={{ marginBottom: '8px', color: 'var(--gray-600)' }}>The biggest results.</p>
                                <p style={{ marginBottom: '32px', color: 'var(--gray-600)' }}>All things FORNIERI & AZAR.</p>

                                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                                    <div className="newsletter-form__row">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="newsletter-form__input"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="newsletter-form__input"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="newsletter-form__input newsletter-form__input--full"
                                    />
                                    <button
                                        type="submit"
                                        className="newsletter-form__submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                                    </button>

                                    {submitStatus === 'error' && (
                                        <p className="newsletter-form__error">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showDisclaimer && (
                <div className="footer-modal" onClick={() => setShowDisclaimer(false)}>
                    <div className="footer-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button className="footer-modal__close" onClick={() => setShowDisclaimer(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="footer-modal__text">
                            <h3>Disclaimer</h3>
                            <p>The information available on or through this website is intended to provide general information to the public. We may change, delete, add to, or otherwise amend information contained on this website at any time without notice.</p>
                            <p>Although we have taken all reasonable measures to ensure the quality and accuracy of the information on our website, we make no warranty, express or implied, nor assume any legal liability or responsibility for the accuracy, correctness, completeness, or use of any such information, nor represent that its use would not infringe on privately owned rights.</p>
                        </div>
                    </div>
                </div>
            )}

            {showCredits && (
                <div className="footer-modal" onClick={() => setShowCredits(false)}>
                    <div className="footer-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button className="footer-modal__close" onClick={() => setShowCredits(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="footer-modal__text">
                            <h3>Site Credits</h3>
                            <div className="footer-modal__credits-list">
                                <div className="footer-modal__credits-item">
                                    <span className="label">VIDEO CONTENT</span>
                                    <div className="links">
                                        <a href="https://unsplash.com/@patwhelen" target="_blank" rel="noopener noreferrer">PAT WHELEN (UNSPLASH)</a>
                                        <a href="https://www.instagram.com/pwhelen/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
