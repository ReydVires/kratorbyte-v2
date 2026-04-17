import { test, expect } from '@playwright/test';

test.describe('FlowForge Workflow Engine', () => {
  test('should load the dashboard and show health metrics', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('System Health Overiew');
    await expect(page.locator('.glass-panel.card')).toHaveCount(6); // 4 metrics + 2 charts/lists
  });

  test('should navigate to Workflows and interact with the DAG', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Workflows")');
    await expect(page.locator('h1')).toContainText('Inventory Sync');
    
    // Check if React Flow is loaded
    await expect(page.locator('.react-flow__renderer')).toBeVisible();
  });

  test('should use AI Builder to generate a workflow', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("AI Builder")');
    
    const textarea = page.locator('textarea');
    await textarea.fill('Create a workflow that triggers on a Github webhook and sends a Slack notification.');
    
    await page.click('button:has-text("Generate Workflow")');
    
    // Wait for mock generation and navigation
    await page.click('button:has-text("Open in Builder")', { timeout: 10000 });
    
    await expect(page.locator('h1')).toContainText('Github to Slack');
  });
});
