'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroVideo Component - Single High-Performance Clip
 */
export default function HeroVideo() {
    const videoRef = useRef(null);
    const videoSrc = '/video/Hero/Hero_vid.mov';
    const playbackRate = 1.0;

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
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
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            >
                <source src={videoSrc} type="video/quicktime" />
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
}
