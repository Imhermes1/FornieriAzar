'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HeroVideo Component - Compressed Single Clip
 * Optimized for instant loading with poster and preload
 */
export default function HeroVideo() {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoSrc = '/video/Hero/Hero_video.mp4';
    const posterSrc = '/video/Hero/Hero_poster.jpg'; // First frame as poster

    useEffect(() => {
        if (videoRef.current) {
            // Force load the video
            videoRef.current.load();
            videoRef.current.play().catch(e => console.log("Hero video autoplay blocked", e));
        }
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: '#000',
            overflow: 'hidden'
        }}>
            <video
                ref={videoRef}
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
                poster={posterSrc}
                onCanPlay={() => setIsLoaded(true)}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Poster fallback while video loads */}
            {!isLoaded && (
                <img
                    src={posterSrc}
                    alt=""
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            )}
        </div>
    );
}
