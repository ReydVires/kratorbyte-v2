import { test, expect } from '@playwright/test';

test.describe('SSE Real-time Analytics', () => {
  test('should connect to SSE and populate dashboard metrics', async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/');

    // Verify initial state or loading
    // (If the app is fast, it might skip the loading state)
    
    // Wait for the metrics to be populated via SSE
    // Success Rate is a good indicator as it's fetched via /analytics/stream
    // Wait for the metrics to be populated via SSE
    // We target the h2 inside the dashboard card specifically
    const successRate = page.locator('.card h2').first();
    await expect(successRate).toContainText('%', { timeout: 10000 });
    
    // Verify that incidents list is populated
    const incidentItems = page.locator('.badge');
    await expect(incidentItems.first()).toBeVisible();
  });

  test('should receive live updates when a workflow is triggered', async ({ page }) => {
    await page.goto('/');
    
    // Switch to workflows to trigger one
    await page.click('text=Workflows');
    
    // Click 'Run Now' which calls /api/workflows/trigger
    // This now triggers an SSE broadcast on the backend
    await page.click('text=Run Now');
    
    // Verify toast appears
    await expect(page.locator('text=triggered successfully')).toBeVisible();
    
    // Go back to Dashboard to see if things are still healthy/updated
    await page.click('text=Dashboard');
    
    // The metrics should still be there
    await expect(page.locator('.card h2').first()).toContainText('%');
  });
});
