import React from 'react';
import { LayoutDashboard, Activity, Zap } from 'lucide-react';
import NavItem from '../molecules/NavItem';
import QuotaMeter from '../molecules/QuotaMeter';

interface SidebarProps {
  activeTab: 'dashboard' | 'workflows' | 'ai';
  onTabChange: (tab: 'dashboard' | 'workflows' | 'ai') => void;
  quotaPercentage: number;
}

const ThemedSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, quotaPercentage }) => {
  return (
    <aside style={{ 
      padding: '24px', 
      borderRight: '1px solid var(--border-color)', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '8px',
      background: 'rgba(10, 5, 24, 0.4)'
    }}>
      <NavItem 
        label="Dashboard" 
        icon={<LayoutDashboard size={20} />} 
        active={activeTab === 'dashboard'} 
        onClick={() => onTabChange('dashboard')} 
      />
      <NavItem 
        label="Workflows" 
        icon={<Activity size={20} />} 
        active={activeTab === 'workflows'} 
        onClick={() => onTabChange('workflows')} 
      />
      <NavItem 
        label="AI Builder" 
        icon={<Zap size={20} />} 
        active={activeTab === 'ai'} 
        onClick={() => onTabChange('ai')} 
      />
      
      <QuotaMeter percentage={quotaPercentage} />
    </aside>
  );
};

export default ThemedSidebar;
