import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
      color: 'white',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-main)',
      border: '1px solid var(--border-color)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-dim)',
      padding: '0',
    },
    danger: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#fca5a5',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    }
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '0.8rem' },
    md: { padding: '10px 16px', fontSize: '1rem' },
    lg: { padding: '14px 24px', fontSize: '1.1rem' },
  };

  const currentStyles = { 
    ...baseStyles, 
    ...variants[variant], 
    ...sizes[size],
    opacity: props.disabled || isLoading ? 0.6 : 1,
    cursor: props.disabled || isLoading ? 'not-allowed' : 'pointer',
  };

  return (
    <button 
      className={`ui-button button ${variant} ${className}`}
      style={currentStyles as React.CSSProperties}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <div className="spinner" /> : children}
    </button>
  );
};

export default Button;
