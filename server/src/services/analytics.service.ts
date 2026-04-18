import { prisma } from '../lib/prisma';

class AnalyticsService {
  async getMetrics() {
    const totalRuns = await prisma.workflowRun.count();
    const successRuns = await prisma.workflowRun.count({ where: { status: 'success' } });
    const successRate = totalRuns > 0 ? ((successRuns / totalRuns) * 100).toFixed(1) : '100';

    return {
      successRate: `${successRate}%`,
      activeRuns: (await prisma.workflow.count({ where: { status: 'active' } })),
      avgLatency: '1.1s', // In a real app, we'd average the duration column
      alerts: (await prisma.workflowRun.count({ where: { status: 'failed' } })),
      successTrend: '+0.2%',
      latencyP95: '1.8s',
      quotaUsedPercentage: 95 // Mocked value
    };
  }

  async getPerformanceData() {
    // For MVP, we'll still use some structured mock-like time data but we could group by created_at in Prisma
    return [
      { name: '00:00', success: 420, fail: 12 },
      { name: '04:00', success: 310, fail: 8 },
      { name: '08:00', success: 550, fail: 85 },
      { name: '12:00', success: 290, fail: 24 },
      { name: '16:00', success: 195, fail: 32 },
      { name: '20:00', success: 245, fail: 21 },
      { name: '23:59', success: 380, fail: 35 },
    ];
  }

  async getRecentIncidents() {
    // Map failed runs to incident objects
    const failedRuns = await prisma.workflowRun.findMany({
      where: { status: 'failed' },
      take: 5,
      orderBy: { timestamp: 'desc' },
      include: { workflow: true }
    });

    return failedRuns.map(run => ({
      id: run.id,
      title: `${run.workflow.name} Failure`,
      severity: 'Critical',
      description: `Run failed at ${run.timestamp.toISOString()}`
    }));
  }
}

export const analyticsService = new AnalyticsService();
