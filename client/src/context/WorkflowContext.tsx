import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useWorkflowsApi } from '../hooks/useWorkflowsApi';
import { API_BASE } from '../lib/api';

interface WorkflowContextType {
  workflows: any[];
  templates: any[];
  analytics: any | null;
  selectedWorkflow: any | null;
  selectedWorkflowId: string | null;
  setSelectedWorkflowId: (id: string) => void;
  fetchWorkflows: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  triggerWorkflow: (id: string) => Promise<void>;
  saveGeneratedWorkflow: (wfData: any) => Promise<any>;
  generateAIWorkflow: (prompt: string) => Promise<any>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const api = useWorkflowsApi();

  const fetchWorkflows = useCallback(async () => {
    try {
      const data = await api.getWorkflows();
      setWorkflows(data);
      if (data.length > 0 && !selectedWorkflowId) {
        setSelectedWorkflowId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch workflows', err);
    }
  }, [selectedWorkflowId, api]);

  const fetchTemplates = useCallback(async () => {
    try {
      const data = await api.getTemplates();
      setTemplates(data);
    } catch (err) {
      console.error('Failed to fetch templates', err);
    }
  }, [api]);

  // Real-time Analytics via SSE
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE}/analytics/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to parse SSE data', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    fetchWorkflows();
    fetchTemplates();
  }, [fetchWorkflows, fetchTemplates]);

  const triggerWorkflow = async (id: string) => {
    try {
      await api.triggerWorkflow(id);
    } catch (err) {
      console.error('Failed to trigger workflow', err);
    }
  };

  const saveGeneratedWorkflow = async (wfData: any) => {
    try {
      const data = await api.createWorkflow(wfData);
      setWorkflows(prev => [data, ...prev]);
      setSelectedWorkflowId(data.id);
      return data;
    } catch (err) {
      console.error('Failed to save workflow', err);
      throw err;
    }
  };

  const generateAIWorkflow = async (prompt: string) => {
    try {
      const data = await api.generateAIWorkflow(prompt);
      return data;
    } catch (err) {
      console.error('Failed to generate AI workflow', err);
      throw err;
    }
  };

  const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId) || null;

  return (
    <WorkflowContext.Provider value={{
      workflows,
      templates,
      analytics,
      selectedWorkflow,
      selectedWorkflowId,
      setSelectedWorkflowId,
      fetchWorkflows,
      fetchTemplates,
      triggerWorkflow,
      saveGeneratedWorkflow,
      generateAIWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflows = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflows must be used within a WorkflowProvider');
  }
  return context;
};
