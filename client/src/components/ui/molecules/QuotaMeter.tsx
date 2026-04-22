import React from 'react';
import { Text } from '../atoms/Typography';

interface QuotaMeterProps {
  percentage: number;
  label?: string;
}

const QuotaMeter: React.FC<QuotaMeterProps> = ({ percentage, label = 'QUOTA' }) => {
  return (
    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
      <Text variant="dim" style={{ fontSize: '0.75rem', marginBottom: 4, textTransform: 'uppercase' }}>
        {label}: {percentage}% USED
      </Text>
      <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
        <div 
          style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            background: 'var(--accent-primary)', 
            borderRadius: 2,
            transition: 'width 0.3s ease'
          }} 
        />
      </div>
    </div>
  );
};

export default QuotaMeter;
