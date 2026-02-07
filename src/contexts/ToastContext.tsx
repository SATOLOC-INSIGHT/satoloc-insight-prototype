import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Toast = { id: string; message: string; detail?: string; type?: 'success' | 'info' };

type ContextValue = {
  toasts: Toast[];
  addToast: (message: string, detail?: string, type?: Toast['type']) => void;
};

const Context = createContext<ContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, detail?: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, detail, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <Context.Provider value={{ toasts, addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </Context.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-[var(--radius-card)] bg-[var(--card-bg)] border border-[var(--border)] shadow-lg text-sm"
      role="status"
    >
      <span className="text-[var(--text-primary)]">{toast.message}</span>
      {toast.detail && <span className="text-[var(--text-secondary)] text-xs block mt-0.5">{toast.detail}</span>}
      <button
        type="button"
        onClick={onDismiss}
        className="ml-auto shrink-0 p-1 rounded hover:bg-[var(--border)]/50 text-[var(--text-secondary)]"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(Context);
  if (!ctx) return { toasts: [], addToast: () => {} };
  return ctx;
}
