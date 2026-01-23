import React from 'react';
import useCountUp from '../hooks/useCountUp';
import './FloatingBubbles.css';

const bubbleData = [
  {
    id: 1,
    number: 30,
    suffix: 'k+',
    label: 'Exchanges Every Year',
    position: 'top-right',
    colors: {
      number: '#0066FF'
    }
  },
  {
    id: 2,
    number: 1,
    suffix: 'k+',
    label: 'Members',
    position: 'middle-left',
    colors: {
      number: '#FC8181'
    }
  },
  {
    id: 3,
    number: 80,
    suffix: '+',
    label: 'Partner Organizations',
    position: 'bottom-right',
    colors: {
      number: '#48BB78'
    }
  }
];

const StatBubble = ({ data, delay }) => {
  const { count, elementRef } = useCountUp(data.number, 2000);
  
  return (
    <div
      ref={elementRef}
      className={`stat-bubble ${data.position}`}
      style={{
        '--animation-delay': `${delay}s`
      }}
      role="figure"
      aria-label={`${data.number}${data.suffix} ${data.label}`}
    >
      <span className="bubble-number" style={{ color: data.colors.number }}>
        {count}{data.suffix}
      </span>
      <span className="bubble-label">{data.label}</span>
    </div>
  );
};

const FloatingBubbles = () => {
  return (
    <div className="floating-bubbles">
      {bubbleData.map((bubble, index) => (
        <StatBubble 
          key={bubble.id} 
          data={bubble} 
          delay={index}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
