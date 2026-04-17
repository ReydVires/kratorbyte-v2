export interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'paused';
  tenant: string;
  lastRun: string | null;
  nodes: any[];
  edges: any[];
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  prompt: string;
  nodes: any[];
  edges: any[];
}

class WorkflowService {
  private workflows: Workflow[] = [
    { 
      id: '1', 
      name: 'Inventory Sync', 
      status: 'active', 
      tenant: 'Acme Corp', 
      lastRun: '2024-03-20T10:00:00Z',
      nodes: [
        { id: '1', type: 'input', data: { label: 'Webhook' }, position: { x: 250, y: 0 } },
        { id: '2', data: { label: 'Data Parser' }, position: { x: 100, y: 100 } },
        { id: '3', data: { label: 'DB Upsert' }, position: { x: 400, y: 100 } },
        { id: '4', type: 'output', data: { label: 'Slack' }, position: { x: 250, y: 200 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-4', source: '3', target: '4' },
      ]
    },
  ];

  private templates: WorkflowTemplate[] = [
    {
      id: 't1',
      title: "Github to Slack",
      prompt: "Create a workflow that triggers on a Github webhook and sends a Slack notification.",
      nodes: [
        { id: 'g1', type: 'input', data: { label: 'Github Webhook' }, position: { x: 100, y: 100 } },
        { id: 'g2', data: { label: 'Filter PRs' }, position: { x: 300, y: 100 } },
        { id: 'g3', type: 'output', data: { label: 'Slack Notify' }, position: { x: 500, y: 100 } }
      ],
      edges: [
        { id: 'eg1', source: 'g1', target: 'g2' },
        { id: 'eg2', source: 'g2', target: 'g3' }
      ]
    },
    {
      id: 't2',
      title: "Shopify to Postgres",
      prompt: "Every day at 9 AM, fetch inventory from Shopify and update my Postgres database.",
      nodes: [
        { id: 's1', type: 'input', data: { label: '9 AM Schedule' }, position: { x: 100, y: 100 } },
        { id: 's2', data: { label: 'Shopify API' }, position: { x: 300, y: 100 } },
        { id: 's3', type: 'output', data: { label: 'Postgres Upsert' }, position: { x: 500, y: 100 } }
      ],
      edges: [
        { id: 'es1', source: 's1', target: 's2' },
        { id: 'es2', source: 's2', target: 's3' }
      ]
    }
  ];

  getAllWorkflows() {
    return this.workflows;
  }

  getTemplates() {
    return this.templates;
  }

  createWorkflow(data: Partial<Workflow>) {
    const newWorkflow: Workflow = {
      id: String(this.workflows.length + 1),
      name: data.name || 'Untitled Workflow',
      status: 'active',
      tenant: 'Acme Corp',
      lastRun: null,
      nodes: data.nodes || [],
      edges: data.edges || []
    };
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }
}

export const workflowService = new WorkflowService();
