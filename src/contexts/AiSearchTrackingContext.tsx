import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { GeneratedPrompt } from '../data/mockPrompts';
import type { EngineKey } from '../data/mockAiSearch';
import { createMockCitationFromRun } from '../data/mockAiSearch';
import { useToast } from './ToastContext';

export type DynamicCitationRow = {
  id: string;
  status: 'checking' | 'ready';
  keyword: string;
  languageCode: string;
  regionCode: string;
  promptText: string;
  /** Only when status === 'ready' */
  perplexity?: string;
  chatgpt?: string;
  claude?: string;
  gemini?: string;
  citationType?: string;
  lastChecked?: string;
  engines?: Partial<Record<EngineKey, { snippet?: string; linksBrand?: { label: string; url: string }[]; linksCompetitors?: { label: string; url: string }[] }>>;
};

type ContextValue = {
  dynamicCitations: DynamicCitationRow[];
  addRunFromPrompt: (p: GeneratedPrompt) => void;
  removeCitation: (id: string) => void;
};

const Context = createContext<ContextValue | null>(null);

export function AiSearchTrackingProvider({ children }: { children: ReactNode }) {
  const [dynamicCitations, setDynamicCitations] = useState<DynamicCitationRow[]>([]);
  const { addToast } = useToast();

  const addRunFromPrompt = useCallback((p: GeneratedPrompt) => {
    const runId = `run-${p.id}-${p.languageCode}-${p.regionCode}-${Date.now()}`;
    const checkingRow: DynamicCitationRow = {
      id: runId,
      status: 'checking',
      keyword: p.sourceKeyword,
      languageCode: p.languageCode,
      regionCode: p.regionCode,
      promptText: p.prompt,
    };
    setDynamicCitations((prev) => [checkingRow, ...prev]);

    setTimeout(() => {
      const mock = createMockCitationFromRun(p);
      setDynamicCitations((prev) =>
        prev.map((row) => (row.id === runId ? { ...row, status: 'ready' as const, ...mock } : row))
      );
      addToast(
        'Citation results ready',
        `${p.sourceKeyword} (${p.languageCode}) — view in table below`,
        'success'
      );
    }, 1800);
  }, [addToast]);

  const removeCitation = useCallback((id: string) => {
    setDynamicCitations((prev) => prev.filter((row) => row.id !== id));
  }, []);

  return (
    <Context.Provider value={{ dynamicCitations, addRunFromPrompt, removeCitation }}>
      {children}
    </Context.Provider>
  );
}

export function useAiSearchTracking() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useAiSearchTracking must be used within AiSearchTrackingProvider');
  return ctx;
}
