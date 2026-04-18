import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => (
          <div 
            key={toast.id}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'rgba(23, 23, 23, 0.8)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${toast.type === 'success' ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.1)'}`,
              color: 'white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease-out forwards',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: toast.type === 'success' ? 'var(--accent-secondary)' : 'var(--accent-primary)'
            }}></div>
            {toast.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
