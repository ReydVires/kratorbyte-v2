import React, { useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import { Play, Save } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { useToast } from '../context/ToastContext';
import { Heading, Text } from './ui/atoms/Typography';
import Button from './ui/atoms/Button';
import WorkflowSelector from './ui/molecules/WorkflowSelector';
import WorkflowBoard from './ui/organisms/WorkflowBoard';

const WorkflowView: React.FC = () => {
  const { showToast } = useToast();
  const { 
    selectedWorkflow: workflow, 
    workflows, 
    setSelectedWorkflowId: onWorkflowSelect,
    triggerWorkflow
  } = useWorkflows();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (workflow) {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    }
  }, [workflow, setNodes, setEdges]);

  if (!workflow) {
    return (
      <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
        <Text variant="dim">No workflow selected. Design one using the AI Builder.</Text>
      </div>
    );
  }

  const handleRun = () => {
    if (workflow?.id) {
      triggerWorkflow(workflow.id);
      showToast(`${workflow.name} triggered successfully`, 'success');
    }
  };

  return (
    <div className="workflow-view-container" style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, animation: 'fadeIn 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <WorkflowSelector 
            workflows={workflows} 
            selectedId={workflow.id} 
            onSelect={onWorkflowSelect} 
          />
          <div>
            <Heading level={1} style={{ fontSize: '1.25rem', marginBottom: 2 }}>{workflow.name}</Heading>
            <Text variant="dim" style={{ fontSize: '0.75rem', marginBottom: 0 }}>
              ID: {workflow.id} • Status: <span style={{ color: 'var(--accent-secondary)' }}>{workflow.status}</span>
            </Text>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="secondary" onClick={() => showToast('Changes saved to cloud', 'info')}>
            <Save size={18} /> Save
          </Button>
          <Button variant="primary" onClick={handleRun}>
            <Play size={18} /> Run Now
          </Button>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <WorkflowBoard 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange}
          setEdges={setEdges} 
        />
      </div>
    </div>
  );
};

export default WorkflowView;

