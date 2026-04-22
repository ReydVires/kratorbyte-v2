import React, { useState } from 'react';
import { Wand2, CheckCircle, ArrowRight } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { useToast } from '../context/ToastContext';
import { Heading, Text } from './ui/atoms/Typography';
import Card from './ui/atoms/Card';
import Button from './ui/atoms/Button';
import AIArchitectForm from './ui/organisms/AIArchitectForm';

interface Props {
  onComplete: (wf: any) => void;
}

const AIBuilderView: React.FC<Props> = ({ onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { generateAIWorkflow, saveGeneratedWorkflow, templates, analytics } = useWorkflows();
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    try {
      const generatedWf = await generateAIWorkflow(prompt);
      const savedWf = await saveGeneratedWorkflow(generatedWf);
      showToast('AI Workflow designed successfully!', 'success');
      setResult(savedWf);
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.error || 'Failed to design workflow', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-builder-container" style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeIn 0.4s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Wand2 size={48} color="#8b5cf6" style={{ marginBottom: 16 }} />
        <Heading>AI Workflow Architect</Heading>
        <Text variant="dim">Describe your business process in natural language, and FlowForge AI will design the DAG for you.</Text>
      </div>

      <AIArchitectForm 
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        templates={templates}
        quotaPercentage={analytics?.metrics?.quotaUsedPercentage}
      />

      {result && !isGenerating && (
        <Card style={{ marginTop: 24, padding: '24px', animation: 'scaleUp 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 20 }}>
            <CheckCircle color="#4ade80" />
            <Heading level={3} style={{ margin: 0 }}>Workflow Design Ready</Heading>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
             <Text variant="dim" style={{ fontSize: '0.9rem' }}>
               The AI has generated a DAG with {result.nodes?.length || 0} steps and {result.edges?.length || 0} connections. It includes validation logic and retry handlers.
             </Text>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" onClick={() => onComplete(result)}>
              Open in Builder <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => setResult(null)}>
              Reset
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIBuilderView;

