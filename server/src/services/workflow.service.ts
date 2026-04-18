import { prisma } from '../lib/prisma';

class WorkflowService {
  async getAllWorkflows() {
    return prisma.workflow.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getTemplates() {
    return prisma.workflowTemplate.findMany();
  }

  async createWorkflow(data: any) {
    return prisma.workflow.create({
      data: {
        name: data.name || 'Untitled Workflow',
        status: 'active',
        tenant: 'Acme Corp',
        nodes: data.nodes || [],
        edges: data.edges || []
      }
    });
  }

  async updateWorkflow(id: string, data: any) {
    return prisma.workflow.update({
      where: { id },
      data: {
        nodes: data.nodes,
        edges: data.edges,
        lastRun: data.lastRun
      }
    });
  }
}

export const workflowService = new WorkflowService();
