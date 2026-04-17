import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Save, ChevronDown, Globe, Code, Clock, Database, MessageSquare } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';

// Custom Node Component for a more premium look
const CustomNode = ({ data, type }: any) => {
  const getIcon = () => {
    const label = String(data.label).toLowerCase();
    if (label.includes('webhook') || label.includes('trigger')) return <Globe size={18} />;
    if (label.includes('slack') || label.includes('notify')) return <MessageSquare size={18} />;
    if (label.includes('db') || label.includes('postgres')) return <Database size={18} />;
    if (label.includes('parser') || label.includes('script')) return <Code size={18} />;
    return <Clock size={18} />;
  };

  const getColors = () => {
    switch(type) {
      case 'input': return { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' };
      case 'output': return { border: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' };
      default: return { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    }
  };

  const colors = getColors();

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
      <div style={{ color: colors.border }}>{getIcon()}</div>
      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: colors.border }} />
    </div>
  );
};

const nodeTypes = {
  input: CustomNode,
  output: CustomNode,
  default: CustomNode,
};

const WorkflowView: React.FC = () => {
  const { selectedWorkflow: workflow, workflows, setSelectedWorkflowId: onWorkflowSelect } = useWorkflows();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (workflow) {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    }
  }, [workflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!workflow) return <div style={{ padding: 40, textAlign: 'center' }}>No workflow selected</div>;

  return (
    <div style={{ height: 'calc(100vh - 120px)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
             <select 
               value={workflow.id} 
               onChange={(e) => onWorkflowSelect(e.target.value)}
               style={{
                 background: 'var(--glass-bg)',
                 color: 'white',
                 border: '1px solid var(--border-color)',
                 borderRadius: 8,
                 padding: '8px 32px 8px 12px',
                 appearance: 'none',
                 cursor: 'pointer'
               }}
             >
               {workflows.map(w => (
                 <option key={w.id} value={w.id}>{w.name}</option>
               ))}
             </select>
             <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: 12, pointerEvents: 'none' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', marginBottom: 2 }}>{workflow.name}</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>ID: {workflow.id} • Status: {workflow.status}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="secondary"><Save size={18} /> Save</button>
          <button className="primary"><Play size={18} /> Run Now</button>
        </div>
      </div>

      <div className="glass-panel" style={{ height: '90%', position: 'relative', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
        >
          <Background color="rgba(255,255,255,0.05)" gap={20} />
          <Controls />
          <MiniMap 
            style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)' }}
            nodeStrokeColor={(n) => {
              if (n.type === 'input') return '#06b6d4';
              if (n.type === 'output') return '#22c55e';
              return '#8b5cf6';
            }}
            nodeColor={(n) => {
              if (n.type === 'input') return 'rgba(6, 182, 212, 0.2)';
              if (n.type === 'output') return 'rgba(34, 197, 94, 0.2)';
              return 'rgba(139, 92, 246, 0.2)';
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowView;
