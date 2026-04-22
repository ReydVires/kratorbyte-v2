import React from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { Text } from '../atoms/Typography';
import TemplateChip from '../molecules/TemplateChip';

interface AIArchitectFormProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  templates: any[];
  quotaPercentage?: number;
}

const AIArchitectForm: React.FC<AIArchitectFormProps> = ({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating, 
  templates,
  quotaPercentage = 0
}) => {
  return (
    <Card padding={32}>
      <div style={{ position: 'relative' }}>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
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
            marginBottom: 16,
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
           <Text variant="dim" style={{ fontSize: '0.8rem', marginBottom: 0 }}>
             {prompt.length} / 2000 characters
           </Text>
           {quotaPercentage > 90 && (
             <Text variant="accent" style={{ fontSize: '0.8rem', marginBottom: 0 }}>
               High demand - processing might be slower
             </Text>
           )}
        </div>

        <Button 
          variant="primary" 
          onClick={onGenerate}
          disabled={!prompt || isGenerating}
          isLoading={isGenerating}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Sparkles size={18} /> {isGenerating ? 'AI Architecting...' : 'Generate Workflow'}
        </Button>
      </div>

      <div style={{ marginTop: 24 }}>
        <Text variant="dim" style={{ fontSize: '0.8rem', marginBottom: 12, textTransform: 'uppercase' }}>
          Suggested Templates:
        </Text>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {templates.map((t) => (
            <TemplateChip 
              key={t.id} 
              label={t.title} 
              onClick={() => onPromptChange(t.prompt)} 
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AIArchitectForm;
