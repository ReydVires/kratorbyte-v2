import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

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
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const fetchWorkflows = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/workflows`);
      setWorkflows(res.data);
      if (res.data.length > 0 && !selectedWorkflowId) {
        setSelectedWorkflowId(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch workflows', err);
    }
  }, [selectedWorkflowId]);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/workflows/templates`);
      setTemplates(res.data);
    } catch (err) {
      console.error('Failed to fetch templates', err);
    }
  }, []);

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
      await axios.post(`${API_BASE}/workflows/trigger`, { workflowId: id });
    } catch (err) {
      console.error('Failed to trigger workflow', err);
    }
  };

  const saveGeneratedWorkflow = async (wfData: any) => {
    try {
      const res = await axios.post(`${API_BASE}/workflows`, wfData);
      setWorkflows(prev => [res.data, ...prev]);
      setSelectedWorkflowId(res.data.id);
      return res.data;
    } catch (err) {
      console.error('Failed to save workflow', err);
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
      saveGeneratedWorkflow
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
