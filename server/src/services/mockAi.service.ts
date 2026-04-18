export class MockAIService {
  static async generateWorkflow(prompt: string) {
    console.log('[MockAIService] Generating mock workflow for prompt:', prompt);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowercasePrompt = prompt.toLowerCase();

    if (lowercasePrompt.includes('shopify') || lowercasePrompt.includes('google sheet')) {
      return {
        name: 'Shopify to Google Sheets Sync',
        nodes: [
          { id: 'n1', type: 'trigger', data: { label: 'New Shopify Order' }, position: { x: 250, y: 50 } },
          { id: 'n2', type: 'action', data: { label: 'Format Order Data' }, position: { x: 250, y: 150 } },
          { id: 'n3', type: 'action', data: { label: 'Append to Google Sheet' }, position: { x: 250, y: 250 } }
        ],
        edges: [
          { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
          { id: 'e2-3', source: 'n2', target: 'n3', animated: true }
        ]
      };
    }

    if (lowercasePrompt.includes('slack') || lowercasePrompt.includes('incident')) {
      return {
        name: 'Incident Alert System',
        nodes: [
          { id: 'n1', type: 'trigger', data: { label: 'Critical Incident Logged' }, position: { x: 100, y: 50 } },
          { id: 'n2', type: 'condition', data: { label: 'Is Weekend?' }, position: { x: 100, y: 150 } },
          { id: 'n3', type: 'action', data: { label: 'Notify On-Call Slack' }, position: { x: -50, y: 250 } },
          { id: 'n4', type: 'action', data: { label: 'Notify Dev Channel Slack' }, position: { x: 250, y: 250 } }
        ],
        edges: [
          { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
          { id: 'e2-3', source: 'n2', target: 'n3', label: 'Yes' },
          { id: 'e2-4', source: 'n2', target: 'n4', label: 'No' }
        ]
      };
    }

    // Default generic workflow
    return {
      name: 'AI Generated Workflow (Mock)',
      nodes: [
        { id: 'm1', type: 'trigger', data: { label: 'Input Received' }, position: { x: 250, y: 50 } },
        { id: 'm2', type: 'action', data: { label: 'Process Data' }, position: { x: 250, y: 150 } },
        { id: 'm3', type: 'action', data: { label: 'Send Response' }, position: { x: 250, y: 250 } }
      ],
      edges: [
        { id: 'me1-2', source: 'm1', target: 'm2', animated: true },
        { id: 'me2-3', source: 'm2', target: 'm3', animated: true }
      ]
    };
  }
}
