import React from 'react';
import { ChevronDown } from 'lucide-react';

interface WorkflowSelectorProps {
  workflows: any[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const WorkflowSelector: React.FC<WorkflowSelectorProps> = ({ workflows, selectedId, onSelect }) => {
  return (
    <div style={{ position: 'relative' }}>
       <select 
         value={selectedId} 
         onChange={(e) => onSelect(e.target.value)}
         style={{
           background: 'var(--glass-bg)',
           color: 'white',
           border: '1px solid var(--border-color)',
           borderRadius: 8,
           padding: '8px 32px 8px 12px',
           appearance: 'none',
           cursor: 'pointer',
           outline: 'none',
           fontSize: '0.9rem'
         }}
       >
         {workflows.map(w => (
           <option key={w.id} value={w.id}>{w.name}</option>
         ))}
       </select>
       <ChevronDown 
         size={16} 
         style={{ 
           position: 'absolute', 
           right: 12, 
           top: '50%', 
           transform: 'translateY(-50%)', 
           pointerEvents: 'none',
           color: 'var(--text-dim)'
         }} 
       />
    </div>
  );
};

export default WorkflowSelector;
