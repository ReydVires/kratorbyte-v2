import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<TypographyProps & { level?: 1 | 2 | 3 }> = ({ 
  children, 
  level = 1, 
  className = '', 
  style 
}) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  const sizes = {
    1: { fontSize: '2.5rem', marginBottom: '1.5rem' },
    2: { fontSize: '2rem', marginBottom: '1.25rem' },
    3: { fontSize: '1.5rem', marginBottom: '1rem' },
  };

  const combinedStyles: React.CSSProperties = {
    fontWeight: 700,
    letterSpacing: '-0.02em',
    ...sizes[level],
    ...style
  };

  return <Tag className={`ui-heading ${className}`} style={combinedStyles}>{children}</Tag>;
};

export const Text: React.FC<TypographyProps & { variant?: 'main' | 'dim' | 'accent' }> = ({ 
  children, 
  variant = 'main', 
  className = '', 
  style 
}) => {
  const colors = {
    main: 'var(--text-main)',
    dim: 'var(--text-dim)',
    accent: 'var(--accent-secondary)',
  };

  const combinedStyles: React.CSSProperties = {
    color: colors[variant],
    fontSize: '1rem',
    lineHeight: 1.5,
    ...style
  };

  return <p className={`ui-text ${className}`} style={combinedStyles}>{children}</p>;
};
