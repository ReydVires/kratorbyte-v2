import { Request, Response } from 'express';
import { analyticsService } from '../services/analytics.service';

export const getDashboardMetrics = (req: Request, res: Response) => {
  res.json({
    metrics: analyticsService.getMetrics(),
    performance: analyticsService.getPerformanceData(),
    incidents: analyticsService.getRecentIncidents()
  });
};
