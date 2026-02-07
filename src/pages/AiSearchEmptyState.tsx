import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { AddKeywordsGeneratePromptsModal } from '../components/AddKeywordsGeneratePromptsModal';

export function AiSearchEmptyState() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-[var(--primary)]" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">Start tracking AI citations</h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md">
        Add keywords or topics. SatoLOC generates the prompts real users ask LLMs, runs them on Perplexity, ChatGPT, Claude & Gemini, then shows where you’re cited—and suggests content for gaps.
      </p>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90"
      >
        <Plus className="w-4 h-4" /> Add keywords & generate prompts
      </button>
      {showModal && <AddKeywordsGeneratePromptsModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
