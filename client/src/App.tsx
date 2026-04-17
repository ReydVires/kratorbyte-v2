import React, { useState } from 'react';
import { LayoutDashboard, Activity, Zap, Shield } from 'lucide-react';
import { WorkflowProvider, useWorkflows } from './context/WorkflowContext';
import DashboardView from './components/DashboardView';
import WorkflowView from './components/WorkflowView';
import AIBuilderView from './components/AIBuilderView';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workflows' | 'ai'>('dashboard');
  const { setSelectedWorkflowId } = useWorkflows();

  const handleAIComplete = (newWf: any) => {
    setSelectedWorkflowId(newWf.id);
    setActiveTab('workflows');
  };

  return (
    <div className="app">
      <header>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={24} className="accent-secondary" color="#06b6d4" />
          <h2 className="gradient-text">FlowForge</h2>
        </div>
        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={18} color="#8b5cf6" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Acme Corp (Admin)</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.8 }}></div>
        </div>
      </header>

      <div className="dashboard-container">
        <aside>
          <button 
            className={`secondary ${activeTab === 'dashboard' ? 'primary' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            style={{ justifyContent: 'flex-start' }}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={`secondary ${activeTab === 'workflows' ? 'primary' : ''}`}
            onClick={() => setActiveTab('workflows')}
            style={{ justifyContent: 'flex-start' }}
          >
            <Activity size={20} /> Workflows
          </button>
          <button 
            className={`secondary ${activeTab === 'ai' ? 'primary' : ''}`}
            onClick={() => setActiveTab('ai')}
            style={{ justifyContent: 'flex-start' }}
          >
            <Zap size={20} /> AI Builder
          </button>
          
          <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
             <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>QUOTA: 85% USED</p>
             <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 4 }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--accent-primary)', borderRadius: 2 }}></div>
             </div>
          </div>
        </aside>

        <main>
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'workflows' && <WorkflowView />}
          {activeTab === 'ai' && <AIBuilderView onComplete={handleAIComplete} />}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WorkflowProvider>
      <AppContent />
    </WorkflowProvider>
  );
};

export default App;
