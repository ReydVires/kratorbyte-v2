import React from 'react';
import { Zap, Shield } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';
import { useAuth } from '../../../hooks/useAuth';

const ThemedHeader: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <header style={{
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(10, 5, 24, 0.8)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Zap size={24} color="#06b6d4" />
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 800, 
          margin: 0,
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>FlowForge</h2>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Shield size={18} color="#8b5cf6" />
        <Text variant="dim" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
          {user ? `${user.tenant} (${user.role})` : 'Loading...'}
        </Text>
        <div style={{ 
          width: 32, 
          height: 32, 
          borderRadius: '50%', 
          background: 'var(--accent-primary)', 
          opacity: 0.8 
        }} />
      </div>
    </header>
  );
};

export default ThemedHeader;
