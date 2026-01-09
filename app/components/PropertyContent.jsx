'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import Image from 'next/image';
import PropertySidebar from './PropertySidebar';

// Context for sharing gallery state
const GalleryContext = createContext();

export function useGallery() {
    return useContext(GalleryContext);
}

/**
 * PropertyContent - Wrapper that connects sidebar's View Gallery button to the gallery modal
 */
export default function PropertyContent({
    images,
    address,
    suburb,
    price,
    agentName,
    agentPhone,
    agentEmail,
    agentImage,
    statementOfInformation,
    children
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const containerRef = useRef(null);
    const scrollAccumulator = useRef(0);

    const SCROLL_THRESHOLD = 400;

    useEffect(() => {
        if (!images || images.length === 0) return;

        const container = containerRef.current;
        if (!container) return;

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.85) {
                    setIsLocked(true);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: [0.9]
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, [images]);

    useEffect(() => {
        if (!isLocked || showGalleryModal) return;

        const handleWheel = (e) => {
            e.preventDefault();
            scrollAccumulator.current += e.deltaY;

            if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                scrollAccumulator.current = 0;
                setCurrentIndex(prev => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= images.length) {
                        setIsLocked(false);
                        return prev;
                    }
                    return nextIndex;
                });
            } else if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
                scrollAccumulator.current = 0;
                setCurrentIndex(prev => {
                    if (prev === 0) {
                        setIsLocked(false);
                        return prev;
                    }
                    return prev - 1;
                });
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isLocked, images, showGalleryModal]);

    useEffect(() => {
        if (!isLocked || showGalleryModal) return;

        let touchStartY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!isLocked) return;

            const touchY = e.touches[0].clientY;
            const delta = touchStartY - touchY;

            if (Math.abs(delta) > 80) {
                e.preventDefault();

                if (delta > 0) {
                    setCurrentIndex(prev => {
                        const nextIndex = prev + 1;
                        if (nextIndex >= images.length) {
                            setIsLocked(false);
                            return prev;
                        }
                        return nextIndex;
                    });
                } else {
                    setCurrentIndex(prev => {
                        if (prev === 0) {
                            setIsLocked(false);
                            return prev;
                        }
                        return prev - 1;
                    });
                }

                touchStartY = touchY;
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isLocked, images, showGalleryModal]);

    useEffect(() => {
        if (!showGalleryModal) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setShowGalleryModal(false);
            if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
            if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showGalleryModal, images]);

    const openGallery = () => {
        setCurrentIndex(0);
        setShowGalleryModal(true);
    };

    const scrollToEnquiry = () => {
        const enquirySection = document.getElementById('enquiry');
        if (enquirySection) {
            enquirySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!images || images.length === 0) {
        return (
            <>
                <div className="property-col-side">
                    <PropertySidebar
                        price={price}
                        agentName={agentName}
                        agentPhone={agentPhone}
                        agentEmail={agentEmail}
                        agentImage={agentImage}
                        statementOfInformation={statementOfInformation}
                        onViewGallery={() => { }}
                        onEnquire={scrollToEnquiry}
                    />
                </div>
            </>
        );
    }

    return (
        <section className="property-wrap">
            <div className="property-grid-container">
                {/* Left Column: Details & Description */}
                <div className="property-col-main">
                    {children}
                </div>

                {/* Right Column: Sidebar */}
                <div className="property-col-side">
                    <PropertySidebar
                        price={price}
                        agentName={agentName}
                        agentPhone={agentPhone}
                        agentEmail={agentEmail}
                        agentImage={agentImage}
                        statementOfInformation={statementOfInformation}
                        onViewGallery={openGallery}
                        onEnquire={scrollToEnquiry}
                    />
                </div>
            </div>

            {/* Gallery Section */}
            <section
                ref={containerRef}
                id="gallery"
                className={`gallery-lock ${isLocked ? 'gallery-lock--active' : ''}`}
            >
                <div className="gallery-lock__viewport">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`gallery-lock__slide ${index === currentIndex ? 'gallery-lock__slide--active' : ''}`}
                            style={{
                                opacity: index === currentIndex ? 1 : 0,
                                transform: `translateX(${(index - currentIndex) * 100}%)`,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Property image ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                                priority={index < 3}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="gallery-lock__view-btn"
                    onClick={openGallery}
                >
                    VIEW GALLERY
                </button>
            </section>

            {/* Gallery Modal */}
            {showGalleryModal && (
                <div
                    className="gallery-modal"
                    onClick={() => setShowGalleryModal(false)}
                >
                    {(address || suburb) && (
                        <div className="gallery-modal__address">
                            {address}{suburb ? `, ${suburb}` : ''}
                        </div>
                    )}

                    <button
                        className="gallery-modal__close"
                        onClick={() => setShowGalleryModal(false)}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="gallery-modal__content" onClick={(e) => e.stopPropagation()}>
                        <div className="gallery-modal__image-wrap">
                            {(() => {
                                const src = images[currentIndex];
                                const isYouTube = src?.includes('youtube.com') || src?.includes('youtu.be');
                                const isVimeo = src?.includes('vimeo.com');
                                const isDirectVideo = src?.endsWith('.mp4') || src?.endsWith('.webm') || src?.endsWith('.mov');

                                if (isYouTube) {
                                    let videoId = '';
                                    if (src.includes('youtu.be/')) {
                                        videoId = src.split('youtu.be/')[1]?.split('?')[0];
                                    } else if (src.includes('watch?v=')) {
                                        videoId = src.split('watch?v=')[1]?.split('&')[0];
                                    } else if (src.includes('embed/')) {
                                        videoId = src.split('embed/')[1]?.split('?')[0];
                                    }
                                    return (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                            style={{ width: '100%', height: '100%', border: 'none' }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    );
                                } else if (isVimeo) {
                                    const vimeoId = src.split('vimeo.com/')[1]?.split('?')[0];
                                    return (
                                        <iframe
                                            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                                            style={{ width: '100%', height: '100%', border: 'none' }}
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                        />
                                    );
                                } else if (isDirectVideo) {
                                    return (
                                        <video
                                            src={src}
                                            controls
                                            autoPlay
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    );
                                } else {
                                    return (
                                        <Image
                                            src={src}
                                            alt={`Property image ${currentIndex + 1}`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            unoptimized
                                        />
                                    );
                                }
                            })()}
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    className="gallery-modal__nav gallery-modal__nav--prev"
                                    onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button
                                    className="gallery-modal__nav gallery-modal__nav--next"
                                    onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </>
                        )}

                        <div className="gallery-modal__counter">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
