export interface PerformanceMetric {
  name: string;
  success: number;
  fail: number;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'Warning' | 'Info';
  description: string;
}

class AnalyticsService {
  private performanceData: PerformanceMetric[] = [
    { name: '00:00', success: 420, fail: 12 },
    { name: '04:00', success: 310, fail: 8 },
    { name: '08:00', success: 550, fail: 85 },
    { name: '12:00', success: 290, fail: 24 },
    { name: '16:00', success: 195, fail: 32 },
    { name: '20:00', success: 245, fail: 21 },
    { name: '23:59', success: 380, fail: 35 },
  ];

  private incidents: Incident[] = [
    { id: '1', title: 'Webhook Failure', severity: 'Critical', description: 'Target host: api.stripe.com (502 Bad Gateway)' },
    { id: '2', title: 'DB Timeout', severity: 'Warning', description: 'Postgres upsert took > 2s for Inventory Sync' },
    { id: '3', title: 'Parsing Error', severity: 'Info', description: 'Malformed JSON from Shopify Webhook (ignored)' },
    { id: '4', title: 'Rate Limit', severity: 'Warning', description: 'Slack API rate limit reached (retried)' },
  ];

  getMetrics() {
    return {
      successRate: '98.4%',
      activeRuns: 142,
      avgLatency: '1.2s',
      alerts: this.incidents.length,
      successTrend: '+0.6%',
      latencyP95: '1.9s'
    };
  }

  getPerformanceData() {
    return this.performanceData;
  }

  getRecentIncidents() {
    return this.incidents;
  }
}

export const analyticsService = new AnalyticsService();
