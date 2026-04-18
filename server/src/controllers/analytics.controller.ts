import { Request, Response } from 'express';
import { analyticsService } from '../services/analytics.service';
import { sseManager } from '../lib/sse';

export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    res.json({
      metrics: await analyticsService.getMetrics(),
      performance: await analyticsService.getPerformanceData(),
      incidents: await analyticsService.getRecentIncidents()
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

export const streamMetrics = async (req: Request, res: Response) => {
  // SSE Headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send initial data
  const initialData = {
    metrics: await analyticsService.getMetrics(),
    performance: await analyticsService.getPerformanceData(),
    incidents: await analyticsService.getRecentIncidents()
  };
  res.write(`data: ${JSON.stringify(initialData)}\n\n`);

  // Register client for broadcasts
  sseManager.addClient(res);
  
  // Keep connection alive with heartbeat
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 30000);

  res.on('close', () => {
    clearInterval(heartbeat);
  });
};
