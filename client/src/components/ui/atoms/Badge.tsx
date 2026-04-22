import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: { background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' },
    warning: { background: 'rgba(234, 179, 8, 0.2)', color: '#fde047' },
    error: { background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' },
    info: { background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd' },
  };

  const style: React.CSSProperties = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    display: 'inline-block',
    ...variants[variant]
  };

  return (
    <span className={`ui-badge badge badge-${variant} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;
