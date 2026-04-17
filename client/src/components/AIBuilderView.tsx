import React, { useState } from 'react';
import { Wand2, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';

interface Props {
  onComplete: (wf: any) => void;
}

const AIBuilderView: React.FC<Props> = ({ onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { saveGeneratedWorkflow } = useWorkflows();

  const mockUseCases = [
    {
      title: "Github to Slack",
      prompt: "Create a workflow that triggers on a Github webhook and sends a Slack notification.",
      nodes: [
        { id: 'g1', data: { label: 'Github Webhook' }, position: { x: 100, y: 100 } },
        { id: 'g2', data: { label: 'Filter PRs' }, position: { x: 300, y: 100 } },
        { id: 'g3', data: { label: 'Slack Notify' }, position: { x: 500, y: 100 } }
      ],
      edges: [
        { id: 'eg1', source: 'g1', target: 'g2' },
        { id: 'eg2', source: 'g2', target: 'g3' }
      ]
    },
    {
      title: "Shopify to Postgres",
      prompt: "Every day at 9 AM, fetch inventory from Shopify and update my Postgres database.",
      nodes: [
        { id: 's1', data: { label: '9 AM Schedule' }, position: { x: 100, y: 100 } },
        { id: 's2', data: { label: 'Shopify API' }, position: { x: 300, y: 100 } },
        { id: 's3', data: { label: 'Postgres Upsert' }, position: { x: 500, y: 100 } }
      ],
      edges: [
        { id: 'es1', source: 's1', target: 's2' },
        { id: 'es2', source: 's2', target: 's3' }
      ]
    }
  ];

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    setTimeout(async () => {
      const match = mockUseCases.find(uc => prompt.toLowerCase().includes(uc.title.split(' ')[0].toLowerCase()));
      const wfData = match ? { 
        name: match.title, 
        nodes: match.nodes, 
        edges: match.edges 
      } : { 
        name: 'AI Workflow', 
        nodes: [{ id: 'f1', data: { label: 'AI Task' }, position: { x: 250, y: 100 } }], 
        edges: [] 
      };

      try {
        const savedWf = await saveGeneratedWorkflow(wfData);
        setResult(savedWf);
      } catch (err) {
        console.error(err);
      }
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="ai-builder-view" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Wand2 size={48} color="#8b5cf6" style={{ marginBottom: 16 }} />
        <h1>AI Workflow Architect</h1>
        <p style={{ color: 'var(--text-dim)' }}>Describe your business process in natural language, and FlowForge AI will design the DAG for you.</p>
      </div>

      <div className="glass-panel card" style={{ padding: '32px' }}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. 'Build a workflow that syncs my Shopify orders to a Google Sheet every hour'"
            style={{
              width: '100%',
              height: 120,
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              padding: 16,
              color: 'white',
              fontSize: '1rem',
              resize: 'none',
              marginBottom: 16
            }}
          />
          <button 
            className="primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isGenerating ? 'AI Architecting...' : (
              <><Sparkles size={18} /> Generate Workflow</>
            )}
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 12 }}>SUGGESTED TEMPLATES:</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {mockUseCases.map((uc, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '8px 16px', cursor: 'pointer', fontSize: '0.9rem' }}
                onClick={() => setPrompt(uc.prompt)}
              >
                {uc.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {result && !isGenerating && (
        <div className="glass-panel card" style={{ marginTop: 24, padding: '24px', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 20 }}>
            <CheckCircle color="#4ade80" />
            <h3 style={{ margin: 0 }}>Workflow Design Ready</h3>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
             <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>The AI has generated a DAG with {result.nodes?.length || 0} steps and {result.edges?.length || 0} connections. It includes validation logic and retry handlers.</p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="primary" onClick={() => onComplete(result)}>Open in Builder <ArrowRight size={18} /></button>
            <button className="secondary" onClick={() => setResult(null)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBuilderView;
