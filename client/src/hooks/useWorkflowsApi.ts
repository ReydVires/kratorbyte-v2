import api from '../lib/api';

export const useWorkflowsApi = () => {
  const getWorkflows = async () => {
    const res = await api.get('/workflows');
    return res.data;
  };

  const getTemplates = async () => {
    const res = await api.get('/workflows/templates');
    return res.data;
  };

  const triggerWorkflow = async (id: string) => {
    await api.post('/workflows/trigger', { workflowId: id });
  };

  const createWorkflow = async (wfData: any) => {
    const res = await api.post('/workflows', wfData);
    return res.data;
  };

  const generateAIWorkflow = async (prompt: string) => {
    const res = await api.post('/workflows/generate', { prompt });
    return res.data;
  };

  return {
    getWorkflows,
    getTemplates,
    triggerWorkflow,
    createWorkflow,
    generateAIWorkflow,
  };
};
