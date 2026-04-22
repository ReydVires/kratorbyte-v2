import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Globe, MessageSquare, Database, Code, Clock } from 'lucide-react';

const getIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('webhook') || l.includes('trigger')) return <Globe size={18} />;
  if (l.includes('slack') || l.includes('notify')) return <MessageSquare size={18} />;
  if (l.includes('db') || l.includes('postgres')) return <Database size={18} />;
  if (l.includes('parser') || l.includes('script')) return <Code size={18} />;
  return <Clock size={18} />;
};

const getColors = (type?: string) => {
  switch(type) {
    case 'input': return { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' };
    case 'output': return { border: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' };
    default: return { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
  }
};

interface WorkflowNodeProps {
  data: { label: string };
  type?: string;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ data, type }) => {
  const colors = getColors(type);

  return (
    <div style={{ 
      padding: '12px 16px', 
      borderRadius: '8px', 
      border: `1px solid ${colors.border}`, 
      background: colors.bg,
      backdropFilter: 'blur(8px)',
      minWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#fff',
      boxShadow: `0 4px 15px ${colors.border}33`
    }}>
      <Handle type="target" position={Position.Top} style={{ background: colors.border }} />
      <div style={{ color: colors.border }}>{getIcon(data.label)}</div>
      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: colors.border }} />
    </div>
  );
};

export default WorkflowNode;
