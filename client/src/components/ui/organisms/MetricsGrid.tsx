import React from 'react';
import { CheckCircle2, Activity, Clock, AlertCircle } from 'lucide-react';
import MetricCard from '../molecules/MetricCard';

interface MetricsGridProps {
  metrics: {
    successRate: string;
    activeRuns: number;
    avgLatency: string;
    alerts: number;
    successTrend: string;
    latencyP95: string;
  };
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '20px', 
      marginBottom: '32px' 
    }}>
      <MetricCard 
        label="Success Rate" 
        value={metrics.successRate} 
        trend={metrics.successTrend} 
        trendColor="#4ade80" 
        icon={<CheckCircle2 size={20} color="#4ade80" />} 
      />
      <MetricCard 
        label="Active Runs" 
        value={metrics.activeRuns} 
        trend="Across nodes" 
        trendColor="#06b6d4" 
        icon={<Activity size={20} color="#06b6d4" />} 
      />
      <MetricCard 
        label="Avg. Latency" 
        value={metrics.avgLatency} 
        trend={`P95: ${metrics.latencyP95}`} 
        trendColor="#8b5cf6" 
        icon={<Clock size={20} color="#8b5cf6" />} 
      />
      <MetricCard 
        label="System Alerts" 
        value={metrics.alerts} 
        trend="Requires attention" 
        trendColor="#ef4444" 
        icon={<AlertCircle size={20} color="#ef4444" />} 
      />
    </div>
  );
};

export default MetricsGrid;
