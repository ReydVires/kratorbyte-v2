import React, { useState } from 'react';
import { WorkflowProvider, useWorkflows } from './context/WorkflowContext';
import { ToastProvider } from './context/ToastContext';
import DashboardView from './components/DashboardView';
import WorkflowView from './components/WorkflowView';
import AIBuilderView from './components/AIBuilderView';
import MainLayout from './components/ui/templates/MainLayout';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workflows' | 'ai'>('dashboard');
  const { setSelectedWorkflowId, analytics } = useWorkflows();

  const handleAIComplete = (newWf: any) => {
    setSelectedWorkflowId(newWf.id);
    setActiveTab('workflows');
  };

  return (
    <MainLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      quotaPercentage={analytics?.metrics?.quotaUsedPercentage || 0}
    >
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'workflows' && <WorkflowView />}
      {activeTab === 'ai' && <AIBuilderView onComplete={handleAIComplete} />}
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <WorkflowProvider>
        <AppContent />
      </WorkflowProvider>
    </ToastProvider>
  );
};

export default App;
