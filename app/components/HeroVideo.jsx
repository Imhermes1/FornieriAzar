'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * HeroVideo Component - Optimized Version
 * 
 * Better way of loading:
 * 1. Only preloads the first video to save critical bandwidth on initial load.
 * 2. Delay loading of secondary videos until the first one is actually playing.
 * 3. Uses a lightweight state management to swap players for seamless loops.
 */
export default function HeroVideo() {
    const videos = [
        '/video/Hero/8284677-uhd_3840_2160_24fps.mp4',
        '/video/Hero/8284679-uhd_3840_2160_24fps.mp4',
        '/video/Hero/8285135-uhd_3840_2160_24fps.mp4',
        '/video/Hero/8292260-uhd_3840_2160_24fps.mp4',
        '/video/Hero/8292264-uhd_3840_2160_24fps.mp4'
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [fade, setFade] = useState(true); // true means player 1 is visible
    const [isSecondaryLoaded, setIsSecondaryLoaded] = useState(false);

    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);

    const playbackRate = 1.2; // Slightly slower for more "luxury" feel

    // Initialize first video immediately
    useEffect(() => {
        if (videoRef1.current) {
            videoRef1.current.src = videos[0];
            videoRef1.current.playbackRate = playbackRate;
            videoRef1.current.play().catch(e => console.log("Autoplay blocked", e));
        }

        // Delay loading the second video by 2 seconds to prioritize page assets
        const timer = setTimeout(() => {
            if (videoRef2.current) {
                videoRef2.current.src = videos[1];
                videoRef2.current.playbackRate = playbackRate;
                videoRef2.current.preload = "auto";
                setIsSecondaryLoaded(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnd = () => {
        const nextIdx = (activeIndex + 1) % videos.length;
        const followingIdx = (nextIdx + 1) % videos.length;

        if (fade) {
            // Player 1 ended, switch to Player 2
            if (videoRef2.current) {
                videoRef2.current.playbackRate = playbackRate;
                videoRef2.current.play().catch(e => console.log(e));
                setFade(false);

                // Prepare Player 1 for the sequence after Player 2
                setTimeout(() => {
                    if (videoRef1.current) {
                        videoRef1.current.src = videos[followingIdx];
                        videoRef1.current.load();
                    }
                }, 1000);
            }
        } else {
            // Player 2 ended, switch to Player 1
            if (videoRef1.current) {
                videoRef1.current.playbackRate = playbackRate;
                videoRef1.current.play().catch(e => console.log(e));
                setFade(true);

                // Prepare Player 2 for the sequence after Player 1
                setTimeout(() => {
                    if (videoRef2.current) {
                        videoRef2.current.src = videos[followingIdx];
                        videoRef2.current.load();
                    }
                }, 1000);
            }
        }
        setActiveIndex(nextIdx);
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: '#000'
        }}>
            <video
                ref={videoRef1}
                muted
                playsInline
                autoPlay
                onEnded={fade ? handleVideoEnd : null}
                poster="/images/LowRes_2k_18.jpg" // High quality poster while loading
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: fade ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                    zIndex: fade ? 2 : 1
                }}
            />
            <video
                ref={videoRef2}
                muted
                playsInline
                onEnded={!fade ? handleVideoEnd : null}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: !fade ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                    zIndex: !fade ? 2 : 1
                }}
            />
        </div>
    );
}

