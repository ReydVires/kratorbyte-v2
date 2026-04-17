import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware, tenantIsolation } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(tenantIsolation);

// Mock Data - In-memory store
let workflows = [
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

const runs = [
  { id: 'r1', workflowId: '1', status: 'success', duration: '1.4s', timestamp: '2024-03-20T10:00:00Z' },
  { id: 'r2', workflowId: '1', status: 'failed', duration: '0.8s', timestamp: '2024-03-20T09:00:00Z' },
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/workflows', (req, res) => {
  res.json(workflows);
});

app.post('/api/workflows', (req, res) => {
  const { name, nodes, edges } = req.body;
  const newWorkflow = {
    id: String(workflows.length + 1),
    name,
    status: 'active',
    tenant: 'Acme Corp',
    lastRun: null,
    nodes,
    edges
  };
  workflows.push(newWorkflow);
  res.status(201).json(newWorkflow);
});

app.get('/api/runs', (req, res) => {
  res.json(runs);
});

app.post('/api/workflows/trigger', (req, res) => {
  const { workflowId } = req.body;
  console.log(`Triggering workflow: ${workflowId}`);
  
  // Simulate execution start
  res.json({ message: 'Execution started', runId: `r${Math.floor(Math.random() * 1000)}` });
});

app.listen(PORT, () => {
  console.log(`FlowForge Server running on http://localhost:${PORT}`);
});
