import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Target, Users, MessageSquare, Palette, BarChart3, Brain, Lightbulb, TrendingUp, Map, Zap, Rocket, Award } from 'lucide-react';
import './Hero.css';
import AnimatedTriada from './AnimatedTriada';

const HeroSection = () => {
  return (
    <section className="hero-section" id="home">
      <h1 className="hero-title brand-heading">
         <AnimatedTriada className="triada-animation" />
      </h1>
      <h2 className="hero-slogan brand-heading">
          Strategy. Scale. India.
      </h2>
      <p className="hero-subtitle brand-body">
        Scaling what’s local. Growing what’s global. Taking India everywhere.
      </p>
      <div className="hero-cta">
        <button className="btn btn-primary">Explore Our Process</button>
        <button className="btn btn-secondary">Start Your Journey</button>
      </div>
    </section>
  );
};

export default HeroSection;
