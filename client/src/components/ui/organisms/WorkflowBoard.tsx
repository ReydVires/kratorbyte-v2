import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  Node,
  Edge,
} from '@xyflow/react';
// @ts-ignore
import '@xyflow/react/dist/style.css';
import WorkflowNode from '../molecules/WorkflowNode';
import Card from '../atoms/Card';

const nodeTypes = {
  input: WorkflowNode,
  output: WorkflowNode,
  default: WorkflowNode,
};

interface WorkflowBoardProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const WorkflowBoard: React.FC<WorkflowBoardProps> = ({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange,
  setEdges 
}) => {
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card style={{ height: '100%', position: 'relative', overflow: 'hidden' }} padding={0}>
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
          style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: 8 }}
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
    </Card>
  );
};

export default WorkflowBoard;
