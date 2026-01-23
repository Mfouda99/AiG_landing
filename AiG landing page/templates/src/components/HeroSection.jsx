import React, { useState } from 'react';
import useTypewriter from '../hooks/useTypewriter';
import ProgramCards from './ProgramCards';
import CircularCarousel from './CircularCarousel';
import './HeroSection.css';

const countries = ["Sri Lanka","Egypt","Japan", "Germany", "Brazil", "UAE", "Singapore", "USA", "Poland", "India", "Jordan","Tunisia", "France", "Canada", "Australia", "Italy"];

const HeroSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const countryName = useTypewriter(countries, 100, 50, 2000);

  const handleGetStarted = () => {
    // Add ripple effect and navigation logic
    console.log('Get Started clicked');
  };

  return (
    <section className="hero-section">
      {/* World Map Background */}
      <div className="world-map-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 600" className="world-map-svg">
          {/* Simplified world map paths */}
          <path className="continent" d="M150,180 Q200,150 280,170 T380,160 Q420,180 450,200 L430,280 Q380,300 320,290 T220,300 Q170,280 150,230 Z" />
          <path className="continent" d="M480,120 Q550,100 650,130 T780,150 Q820,180 850,220 L830,300 Q780,340 700,330 T580,320 Q520,280 480,200 Z" />
          <path className="continent" d="M880,100 Q950,80 1050,120 T1150,160 L1130,280 Q1080,320 1000,300 T900,280 Q860,220 880,150 Z" />
          <path className="continent" d="M200,350 Q280,320 380,350 T480,380 L460,480 Q400,520 320,500 T220,480 Q180,420 200,370 Z" />
          <path className="continent" d="M700,350 Q780,330 880,360 T980,400 L960,500 Q900,540 820,520 T720,500 Q680,440 700,370 Z" />
          
          {/* Connection lines */}
          <line className="connection-line line-1" x1="280" y1="180" x2="650" y2="150" />
          <line className="connection-line line-2" x1="650" y1="150" x2="950" y2="130" />
          <line className="connection-line line-3" x1="320" y1="380" x2="650" y2="150" />
          <line className="connection-line line-4" x1="800" y1="380" x2="950" y2="130" />
          <line className="connection-line line-5" x1="280" y1="180" x2="320" y2="380" />
          <line className="connection-line line-6" x1="950" y1="130" x2="800" y2="380" />
          
          {/* Pulsing dots at city locations */}
          <circle className="pulse-dot" cx="280" cy="180" r="4" />
          <circle className="pulse-dot" cx="650" cy="150" r="4" />
          <circle className="pulse-dot" cx="950" cy="130" r="4" />
          <circle className="pulse-dot" cx="320" cy="380" r="4" />
          <circle className="pulse-dot" cx="800" cy="380" r="4" />
        </svg>
      </div>

      <div className="hero-container">
        {/* Left Content Column */}
        <div className="content-column">
          <h1 className="hero-headline">
            Lead. Learn. Impact.
          </h1>
          
          <div className="typewriter-container">
            <span className="typewriter-prefix">Experience leadership in </span>
            <span className="typewriter-city">{countryName}</span>
            <span className="typewriter-cursor">|</span>
          </div>
          
          <p className="hero-description">
            AIESEC offers life-changing experiences for young people who want to make a difference
          </p>
        </div>

        {/* Right Visual Column */}
        <div className="visual-column">
          <CircularCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
