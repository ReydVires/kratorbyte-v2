import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWorkflows } from '../context/WorkflowContext';
import { Heading } from './ui/atoms/Typography';
import Card from './ui/atoms/Card';
import MetricsGrid from './ui/organisms/MetricsGrid';
import IncidentItem from './ui/molecules/IncidentItem';

const DashboardView: React.FC = () => {
  const { analytics } = useWorkflows();

  if (!analytics) return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <Heading level={1}>Loading dashboard metrics...</Heading>
    </div>
  );

  const { metrics, performance, incidents } = analytics;

  return (
    <div className="dashboard-container-inner" style={{ animation: 'fadeIn 0.4s ease' }}>
      <Heading level={1}>System Health Overview</Heading>
      
      <MetricsGrid metrics={metrics} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <Card style={{ height: 400 }}>
          <Heading level={3}>Performance Metrics</Heading>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={performance}>
              <defs>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={12} />
              <YAxis stroke="var(--text-dim)" fontSize={12} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: 8 }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <Area type="monotone" dataKey="success" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSuccess)" />
              <Area type="monotone" dataKey="fail" stroke="#ef4444" fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <Heading level={3}>Recent Incidents</Heading>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {incidents.map((incident: any, idx: number) => (
              <IncidentItem 
                key={incident.id}
                title={incident.title}
                severity={incident.severity}
                description={incident.description}
                isLast={idx === incidents.length - 1}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;

