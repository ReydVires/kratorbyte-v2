import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, Clock, Activity } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';

const DashboardView: React.FC = () => {
  const { analytics } = useWorkflows();

  if (!analytics) return <div style={{ padding: 40, textAlign: 'center' }}>Loading dashboard metrics...</div>;

  const { metrics, performance, incidents } = analytics;

  return (
    <div className="dashboard-view">
      <h1 style={{ marginBottom: 24 }}>System Health Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <div className="glass-panel card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)' }}>Success Rate</span>
            <CheckCircle2 size={20} color="#4ade80" />
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: 12 }}>{metrics.successRate}</h2>
          <p style={{ color: '#4ade80', fontSize: '0.8rem' }}>{metrics.successTrend} from last 24h</p>
        </div>
        <div className="glass-panel card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)' }}>Active Runs</span>
            <Activity size={20} color="#06b6d4" />
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: 12 }}>{metrics.activeRuns}</h2>
          <p style={{ color: '#06b6d4', fontSize: '0.8rem' }}>Running across nodes</p>
        </div>
        <div className="glass-panel card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)' }}>Avg. Latency</span>
            <Clock size={20} color="#8b5cf6" />
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: 12 }}>{metrics.avgLatency}</h2>
          <p style={{ color: '#8b5cf6', fontSize: '0.8rem' }}>P95: {metrics.latencyP95}</p>
        </div>
        <div className="glass-panel card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)' }}>System Alerts</span>
            <AlertCircle size={20} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: 12 }}>{metrics.alerts}</h2>
          <p style={{ color: '#fca5a5', fontSize: '0.8rem' }}>Requires attention</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="glass-panel card" style={{ height: 400 }}>
          <h3 style={{ marginBottom: 20 }}>Performance Metrics</h3>
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
        </div>

        <div className="glass-panel card">
          <h3 style={{ marginBottom: 20 }}>Recent Incidents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {incidents.map((incident: any) => (
              <div key={incident.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{incident.title}</span>
                  <span className={`badge ${incident.severity === 'Critical' ? 'badge-error' : 'badge-warning'}`}>
                    {incident.severity}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
