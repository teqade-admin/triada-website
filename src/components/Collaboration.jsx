import React, { useState, useEffect } from "react";
import "./Collaboration.css";

const collabCards = [
    {
        title: "Homegrown Brands",
        intro: "Building strong foundations in the Indian market.",
        desc:
            "Whether you're D2C or B2B, we help you strengthen and scale your presence in India with data-driven strategies and local market expertise.",
        features: [
            "Market positioning and brand differentiation strategies",
            "Omnichannel distribution and retail expansion",
            "Digital marketing and e-commerce optimization",
            "Supply chain and operations scaling",
            "Customer acquisition and retention programs",
        ],
        linkUrl: "/approach",
        linkText: "Explore our approach →",
        imgSrc: "apples.jpg"
    },
    {
        title: "D2C Brands Going Global",
        intro: "Your passport to international success.",
        desc:
            "Step confidently into international markets with our proven strategy framework, partnership network, and cross-border expertise.",
        features: [
            "Market research and entry strategy development",
            "International compliance and regulatory guidance",
            "Cross-border logistics and fulfillment solutions",
            "Localization strategy for target markets",
            "Partnership and distributor network building",
        ],
        linkUrl: "/global-journey",
        linkText: "Start your global journey →",
        imgSrc: "ship.jpg"
    },
    {
        title: "International Brands Entering India",
        intro: "Seamless market entry and sustainable growth.",
        desc:
            "From exports to white-labeling, we bridge the gap between global brands and Indian businesses with culturally-informed strategies.",
        features: [
            "India market assessment and opportunity mapping",
            "Local partnership and joint venture facilitation",
            "White-labeling and manufacturing connections",
            "Regulatory navigation and business setup support",
            "Go-to-market strategy and pilot programs",
        ],
        linkUrl: "/enter-india",
        linkText: "Enter India with confidence →",
        imgSrc: "peafowl.jpg"
    }
];


const MOBILE_BREAKPOINT = 800; // px for switching to slider mode

const CollaborationSection = () => {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

    useEffect(() => {
        // Responsive listen for mobile view
        const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % collabCards.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isMobile]);

    if (isMobile) {
        return (
            <section className="collab-section">
                <h2 className="collab-title">Who We Collaborate With</h2>
                <p className="collab-intro">
                    We collaborate with brands and businesses who are ready to scale, evolve, and think big.
                </p>
                <div className="collab-slider">
                    {collabCards.map((card, idx) => (
                        <div
                            className="collab-card"
                            key={idx}
                            style={{ display: idx === current ? "flex" : "none" }}
                        >
                            <div className="card-head">
                                <h3>{card.title}</h3>
                                <p className="card-intro">{card.intro}</p>
                            </div>
                            <p className="card-desc"><span>{card.desc}</span></p>
                            <a className="card-link" href={card.linkUrl}>{card.linkText}</a>
                            <img
                                src={card.imgSrc}
                                alt={card.title}
                                className="card-image"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    margin: "16px auto 0",
                                    height: "auto",
                                }}
                            />
                        </div>
                    ))}
                    <div className="collab-slider-indicators">
                        {collabCards.map((_, idx) =>
                            <span
                                key={idx}
                                className={`slider-dot${idx === current ? " active" : ""}`}
                                onClick={() => setCurrent(idx)}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Desktop: Show cards in grid
    return (
        <section className="collab-section">
            <h2 className="collab-title">Who We Collaborate With</h2>
            <p className="collab-intro">
                We collaborate with brands and businesses who are ready to scale, evolve, and think big.
            </p>
            <div className="collab-card-row">
                {collabCards.map((card, idx) => (
                    <div className="collab-card" key={idx}>
                        <div className="card-head">
                            <h3>{card.title}</h3>
                            <p className="card-intro">{card.intro}</p>
                        </div>
                        <p className="card-desc"><span>{card.desc}</span></p>
                        <a className="card-link" href={card.linkUrl}>{card.linkText}</a>
                        <img
                            src={card.imgSrc}
                            alt={card.title}
                            className="card-image"
                            style={{
                                display: "block",
                                width: "100%",
                                margin: "16px auto 0",
                                height: "auto",
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CollaborationSection;
