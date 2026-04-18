/// <reference types="node" />

import "dotenv/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.workflowRun.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.workflowTemplate.deleteMany();

  console.log('Clearing database...');

  // Create Templates
  const templates: any[] = [
    {
      title: "Shopify to Sheets",
      prompt: "Build a workflow that syncs my Shopify orders to a Google Sheet every hour",
      nodes: [],
      edges: []
    },
    {
      title: "Incident Response",
      prompt: "Create an alert system that notifies Slack when a critical incident is detected",
      nodes: [],
      edges: []
    },
    {
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
    }
  ];

  for (const t of templates) {
    await prisma.workflowTemplate.create({ data: t });
  }

  // Create initial Workflow
  const wf = await prisma.workflow.create({
    data: {
      name: 'Inventory Sync',
      status: 'active',
      tenant: 'Acme Corp',
      lastRun: new Date(),
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
    }
  });

  // Create some initial runs for analytics
  await prisma.workflowRun.createMany({
    data: [
      { workflowId: wf.id, status: 'success', duration: '1.4s', timestamp: new Date() },
      { workflowId: wf.id, status: 'failed', duration: '0.8s', timestamp: new Date(Date.now() - 3600000) },
      { workflowId: wf.id, status: 'success', duration: '1.2s', timestamp: new Date(Date.now() - 7200000) },
    ]
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
