import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string | number;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 20, 
  hoverable = false,
  style 
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    padding,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ...style
  };

  return (
    <div 
      className={`ui-card glass-panel card ${hoverable ? 'hoverable' : ''} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default Card;
