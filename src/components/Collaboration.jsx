import React, { useState, useEffect, useRef } from "react";
import "./Collaboration.css";

// --- Data for the cards ---
const collabCards = [
    {
        title: "Homegrown Brands",
        intro: "Building strong foundations in the Indian market.",
        desc: "Whether you're D2C or B2B, we help you strengthen and scale your presence in India with data-driven strategies and local market expertise.",
        linkUrl: "/approach",
        linkText: "Explore our approach",
        imgSrc: "apples.jpg" // Replace with your actual image path
    },
    {
        title: "D2C Brands Going Global",
        intro: "Your passport to international success.",
        desc: "Step confidently into international markets with our proven strategy framework, partnership network, and cross-border expertise.",
        linkUrl: "/global-journey",
        linkText: "Start your global journey",
        imgSrc: "ship.jpg" // Replace with your actual image path
    },
    {
        title: "International Brands Entering India",
        intro: "Seamless market entry and sustainable growth.",
        desc: "From exports to white-labeling, we bridge the gap between global brands and Indian businesses with culturally-informed strategies.",
        linkUrl: "/enter-india",
        linkText: "Enter India with confidence",
        imgSrc: "peafowl.jpg" // Replace with your actual image path
    }
];

// --- Custom Hook for Media Queries ---
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);
    return matches;
};

// --- Main Component ---
const CollaborationSection = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");

    return (
        <section className="collab-section">
            <h2 className="collab-title">Who We Collaborate With?</h2>
            <p className="collab-intro">
                We collaborate with brands and businesses who are ready to scale, evolve, and think big.
            </p>
            {isMobile ? <StorySlider /> : <DesktopGrid />}
        </section>
    );
};

// --- Desktop Grid Component ---
const DesktopGrid = () => (
    <div className="collab-card-row">
        {collabCards.map((card, idx) => <Card {...card} key={idx} />)}
    </div>
);

// --- Story Slider with Corrected Progress Logic ---
const StorySlider = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slideTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);
    const progressRefs = useRef([]);

    const startProgress = () => {
        const duration = 5000;
        let start = null;
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            if (progressRefs.current[current]) {
                progressRefs.current[current].style.width = `${Math.min(progress * 100, 100)}%`;
            }
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(step);
            }
        };
        animationFrameRef.current = requestAnimationFrame(step);
    };

    const nextSlide = () => setCurrent(prev => (prev + 1) % collabCards.length);
    const prevSlide = () => setCurrent(prev => (prev - 1 + collabCards.length) % collabCards.length);
    
    useEffect(() => {
        cancelAnimationFrame(animationFrameRef.current);
        clearTimeout(slideTimeoutRef.current);

        progressRefs.current.forEach((bar, idx) => {
            if (bar) {
                bar.style.transition = 'none';
                bar.style.width = idx < current ? '100%' : '0%';
            }
        });

        setTimeout(() => {
            if (progressRefs.current[current]) {
                progressRefs.current[current].style.transition = 'width 5s linear';
            }
            if (!isPaused) {
                startProgress();
                slideTimeoutRef.current = setTimeout(nextSlide, 5000);
            }
        }, 50);

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            clearTimeout(slideTimeoutRef.current);
        };
    }, [current, isPaused]);
    
    const handlePointerDown = () => setIsPaused(true);
    const handlePointerUp = () => setIsPaused(false);

    return (
        <div className="story-slider-container">
            <div className="story-progress-bars">
                {collabCards.map((_, idx) => (
                    <div className="progress-bar-container" key={idx}>
                        <div 
                            className="progress-bar"
                            ref={el => progressRefs.current[idx] = el}
                        />
                    </div>
                ))}
            </div>
            
            <div 
                className="story-slider-wrapper" 
                style={{ transform: `translateX(-${current * 100}%)` }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
            >
                {collabCards.map((card, idx) => (
                    <div className="story-slide" key={idx}>
                        <Card {...card} />
                    </div>
                ))}
            </div>

            <div className="story-click-zone prev" onClick={prevSlide}></div>
            <div className="story-click-zone next" onClick={nextSlide}></div>
        </div>
    );
};

// --- Reusable Card Component with FINAL Structure ---
const Card = ({ title, intro, desc, linkUrl, linkText, imgSrc }) => (
    <div className="collab-card">
        <div className="card-content">
            <div className="card-head">
                <h3>{title}</h3>
                <p className="card-intro">{intro}</p>
            </div>
            <p className="card-desc">{desc}</p>
        </div>
        
        <img src={imgSrc} alt="" className="card-image" />
        
        <a className="card-link" href={linkUrl}>
            {linkText}
        </a>
    </div>
);

export default CollaborationSection;
