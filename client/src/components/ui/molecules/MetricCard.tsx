import React from 'react';
import Card from '../atoms/Card';
import { Heading, Text } from '../atoms/Typography';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, trendColor, icon }) => {
  return (
    <Card hoverable padding={24}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="dim">{label}</Text>
        {icon}
      </div>
      <Heading level={2} style={{ marginTop: 12, marginBottom: 8 }}>{value}</Heading>
      {trend && (
        <Text variant="dim" style={{ fontSize: '0.8rem', color: trendColor }}>
          {trend} from last 24h
        </Text>
      )}
    </Card>
  );
};

export default MetricCard;
