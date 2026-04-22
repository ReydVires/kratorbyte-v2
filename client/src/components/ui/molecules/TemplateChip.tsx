import React from 'react';

interface TemplateChipProps {
  label: string;
  onClick: () => void;
}

const TemplateChip: React.FC<TemplateChipProps> = ({ label, onClick }) => {
  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '8px 16px', 
        cursor: 'pointer', 
        fontSize: '0.9rem',
        background: 'rgba(255, 255, 255, 0.05)',
        transition: 'all 0.2s ease',
        borderRadius: 8,
        border: '1px solid var(--border-color)'
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
    >
      {label}
    </div>
  );
};

export default TemplateChip;
