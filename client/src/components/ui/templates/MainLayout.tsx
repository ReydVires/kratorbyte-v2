import React from 'react';
import ThemedHeader from '../organisms/ThemedHeader';
import ThemedSidebar from '../organisms/ThemedSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'workflows' | 'ai';
  onTabChange: (tab: 'dashboard' | 'workflows' | 'ai') => void;
  quotaPercentage: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  quotaPercentage 
}) => {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ThemedHeader />
      <div className="app-body" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', flex: 1, overflow: 'hidden' }}>
        <ThemedSidebar 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          quotaPercentage={quotaPercentage} 
        />
        <main style={{ padding: '32px', overflowY: 'auto', background: 'var(--bg-dark)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
