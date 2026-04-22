import React from 'react';
import { Text } from '../atoms/Typography';
import Badge from '../atoms/Badge';

interface IncidentItemProps {
  title: string;
  severity: string;
  description: string;
  isLast?: boolean;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ title, severity, description, isLast }) => {
  return (
    <div style={{ 
      borderBottom: isLast ? 'none' : '1px solid var(--border-color)', 
      paddingBottom: isLast ? 0 : 12,
      marginBottom: isLast ? 0 : 12
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Text style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 0 }}>{title}</Text>
        <Badge variant={severity === 'Critical' ? 'error' : 'warning'}>
          {severity}
        </Badge>
      </div>
      <Text variant="dim" style={{ fontSize: '0.8rem', marginBottom: 0 }}>{description}</Text>
    </div>
  );
};

export default IncidentItem;
