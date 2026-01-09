'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * HeroVideo Component - Robust Loop Version
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
    const [fade, setFade] = useState(true); // true = Player 1 is active, false = Player 2 is active

    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const playbackRate = 1.1;

    // Initialization
    useEffect(() => {
        if (videoRef1.current) {
            videoRef1.current.src = videos[0];
            videoRef1.current.playbackRate = playbackRate;
            videoRef1.current.play().catch(e => console.log("Initial autoplay blocked", e));
        }

        // Prepare the second video on the secondary player
        if (videoRef2.current) {
            videoRef2.current.src = videos[1];
            videoRef2.current.playbackRate = playbackRate;
            videoRef2.current.preload = "auto";
        }
    }, []);

    const handleVideoEnd = (playerNumber) => {
        // Only trigger if the ending video is the one currently "active"
        if ((playerNumber === 1 && !fade) || (playerNumber === 2 && fade)) return;

        const nextIdx = (activeIndex + 1) % videos.length;
        const followingIdx = (nextIdx + 1) % videos.length;

        if (fade) {
            // Player 1 just ended -> Start Player 2
            if (videoRef2.current) {
                videoRef2.current.play().then(() => {
                    setFade(false);
                    setActiveIndex(nextIdx);

                    // After transition finishes, update the hidden player (Player 1)
                    setTimeout(() => {
                        if (videoRef1.current) {
                            videoRef1.current.src = videos[followingIdx];
                            videoRef1.current.load();
                        }
                    }, 2000);
                }).catch(err => {
                    console.error("Player 2 failed to play, skipping...", err);
                    setActiveIndex(nextIdx); // Try to recover by skipping state
                });
            }
        } else {
            // Player 2 just ended -> Start Player 1
            if (videoRef1.current) {
                videoRef1.current.play().then(() => {
                    setFade(true);
                    setActiveIndex(nextIdx);

                    // After transition finishes, update the hidden player (Player 2)
                    setTimeout(() => {
                        if (videoRef2.current) {
                            videoRef2.current.src = videos[followingIdx];
                            videoRef2.current.load();
                        }
                    }, 2000);
                }).catch(err => {
                    console.error("Player 1 failed to play, skipping...", err);
                    setActiveIndex(nextIdx);
                });
            }
        }
    };

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
                ref={videoRef1}
                muted
                playsInline
                onEnded={() => handleVideoEnd(1)}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: fade ? 1 : 0,
                    transition: 'opacity 2s ease-in-out',
                    zIndex: fade ? 2 : 1
                }}
            />
            <video
                ref={videoRef2}
                muted
                playsInline
                onEnded={() => handleVideoEnd(2)}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: !fade ? 1 : 0,
                    transition: 'opacity 2s ease-in-out',
                    zIndex: !fade ? 2 : 1
                }}
            />
        </div>
    );
}

