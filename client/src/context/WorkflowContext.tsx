import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

interface WorkflowContextType {
  workflows: any[];
  selectedWorkflow: any | null;
  selectedWorkflowId: string | null;
  setSelectedWorkflowId: (id: string) => void;
  fetchWorkflows: () => Promise<void>;
  saveGeneratedWorkflow: (wfData: any) => Promise<any>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<any[]>([]);
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

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const saveGeneratedWorkflow = async (wfData: any) => {
    try {
      const res = await axios.post(`${API_BASE}/workflows`, wfData);
      setWorkflows(prev => [...prev, res.data]);
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
      selectedWorkflow,
      selectedWorkflowId,
      setSelectedWorkflowId,
      fetchWorkflows,
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
