import React, { useState } from 'react';
import './CircularCarousel.css';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    alt: 'Young professionals collaborating',
    title: 'Global Collaboration',
    description: 'Connect with diverse teams worldwide'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    alt: 'Volunteers teaching children',
    title: 'Make an Impact',
    description: 'Create lasting change in communities'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop',
    alt: 'Business internship',
    title: 'Career Growth',
    description: 'Develop professional skills globally'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    alt: 'Cultural exchange',
    title: 'Cultural Exchange',
    description: 'Experience diverse perspectives'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    alt: 'Leadership conference',
    title: 'Leadership Development',
    description: 'Build your leadership journey'
  }
];

const CircularCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getImageClass = (index) => {
    const diff = (index - activeIndex + images.length) % images.length;
    if (diff === 0) return 'active';
    if (diff === 1) return 'next';
    if (diff === 2) return 'next-2';
    if (diff === images.length - 1) return 'prev';
    return 'hidden';
  };

  return (
    <div className="image-showcase-container">
      <div className="images-stack">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`showcase-card ${getImageClass(index)} ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index)}
          >
            <div className="card-image-wrapper">
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
              />
              <div className="card-overlay">
                <h3 className="card-title">{image.title}</h3>
                <p className="card-description">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="showcase-controls">
        <button 
          className="control-btn prev-btn" 
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div className="indicator-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <button 
          className="control-btn next-btn" 
          onClick={handleNext}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CircularCarousel;
