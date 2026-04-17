import { Request, Response } from 'express';
import { workflowService } from '../services/workflow.service';

export const getWorkflows = (req: Request, res: Response) => {
  res.json(workflowService.getAllWorkflows());
};

export const getTemplates = (req: Request, res: Response) => {
  res.json(workflowService.getTemplates());
};

export const createWorkflow = (req: Request, res: Response) => {
  const newWf = workflowService.createWorkflow(req.body);
  res.status(201).json(newWf);
};

export const triggerWorkflow = (req: Request, res: Response) => {
  const { workflowId } = req.body;
  res.json({ 
    message: 'Execution started', 
    runId: `r${Math.floor(Math.random() * 1000)}`,
    workflowId 
  });
};
