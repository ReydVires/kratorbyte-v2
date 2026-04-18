import { Request, Response } from 'express';
import { workflowService } from '../services/workflow.service';
import { sseManager } from '../lib/sse';
import { analyticsService } from '../services/analytics.service';

export const getWorkflows = async (req: Request, res: Response) => {
  try {
    const workflows = await workflowService.getAllWorkflows();
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
};

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await workflowService.getTemplates();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

export const createWorkflow = async (req: Request, res: Response) => {
  try {
    const newWf = await workflowService.createWorkflow(req.body);
    res.status(201).json(newWf);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workflow' });
  }
};

export const triggerWorkflow = async (req: Request, res: Response) => {
  const { workflowId } = req.body;
  
  // Simulate execution and broadcast update via SSE
  const metrics = await analyticsService.getMetrics();
  const performance = await analyticsService.getPerformanceData();
  const incidents = await analyticsService.getRecentIncidents();
  
  sseManager.broadcast({ metrics, performance, incidents });

  res.json({ 
    message: 'Execution started', 
    runId: `r${Math.floor(Math.random() * 1000)}`,
    workflowId 
  });
};
