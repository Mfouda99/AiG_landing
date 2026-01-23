import React from 'react';
import './ProgramCards.css';

const programs = [
  {
    id: 'volunteer',
    name: 'Global Volunteer',
    description: 'Make an impact abroad',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    colors: {
      bg: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)',
      border: '#FC8181',
      borderHover: '#F56565',
      icon: '#E53E3E'
    }
  },
  {
    id: 'talent',
    name: 'Global Talent',
    description: 'Grow your career globally',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    colors: {
      bg: 'linear-gradient(135deg, #F0FFF4 0%, #FFFFFF 100%)',
      border: '#68D391',
      borderHover: '#48BB78',
      icon: '#38A169'
    }
  },
  {
    id: 'teacher',
    name: 'Global Teacher',
    description: 'Educate & inspire youth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    colors: {
      bg: 'linear-gradient(135deg, #FFFAF0 0%, #FFFFFF 100%)',
      border: '#F6AD55',
      borderHover: '#ED8936',
      icon: '#DD6B20'
    }
  },
  {
    id: 'member',
    name: 'AIESEC Member',
    description: 'Lead local change',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    colors: {
      bg: 'linear-gradient(135deg, #EBF8FF 0%, #FFFFFF 100%)',
      border: '#63B3ED',
      borderHover: '#4299E1',
      icon: '#3182CE'
    }
  }
];

const ProgramCards = ({ selectedCard, onCardSelect }) => {
  return (
    <div className="program-cards-grid">
      {programs.map((program) => (
        <button
          key={program.id}
          className={`program-card ${selectedCard === program.id ? 'selected' : ''}`}
          onClick={() => onCardSelect(program.id)}
          style={{
            '--card-bg': program.colors.bg,
            '--card-border': program.colors.border,
            '--card-border-hover': program.colors.borderHover,
            '--card-icon': program.colors.icon
          }}
          aria-pressed={selectedCard === program.id}
        >
          {selectedCard === program.id && (
            <span className="card-checkmark">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          )}
          <span className="card-icon">
            {program.icon}
          </span>
          <span className="card-name">{program.name}</span>
          <span className="card-description">{program.description}</span>
        </button>
      ))}
    </div>
  );
};

export default ProgramCards;
