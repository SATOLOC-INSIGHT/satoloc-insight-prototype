import { useLocation, Link } from 'react-router-dom';
import { Copy, Send, Plus, Settings } from 'lucide-react';

export function CustomContentEditor() {
  const location = useLocation();
  const state = location.state as { title?: string; prompt?: string; tone?: string; language?: string } | null;
  const title = state?.title ?? '';
  const prompt = state?.prompt ?? '';
  const tone = state?.tone ?? 'Professional';
  const language = state?.language ?? 'English';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link to="/custom-content" className="hover:text-[var(--primary)]">Custom Content</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">Editor</span>
        {state && <span className="ml-2 px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-xs">Pre-filled from Action Plan</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left panel — settings & prompt */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="flex gap-2 border-b border-[var(--border)] pb-2 mb-4">
            <button type="button" className="px-3 py-1.5 rounded text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)]">Reddit</button>
            <button type="button" className="px-3 py-1.5 rounded text-sm text-[var(--text-secondary)]">History</button>
          </div>
          <div className="space-y-3">
            <label className="block text-[13px] font-medium text-[var(--text-primary)]">Title</label>
            <input
              type="text"
              defaultValue={title}
              placeholder="e.g. 3 things Google's Feb 2026 Discover update..."
              className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[13px] font-medium text-[var(--text-primary)]">Tone</label>
                <select defaultValue={tone} className="w-full mt-1 px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--text-primary)]">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[var(--text-primary)]">Language</label>
                <select defaultValue={language} className="w-full mt-1 px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--text-primary)]">
                  <option>English</option>
                  <option>Turkish</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-[13px] font-medium text-[var(--text-primary)]">Advanced Settings</label>
                <button type="button" className="p-1 text-[var(--text-secondary)]"><Settings className="w-4 h-4" /></button>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Templates, keywords, web search</p>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[var(--text-primary)]">Prompt</label>
              <textarea
                defaultValue={prompt}
                placeholder="Create ONE LinkedIn optimized post about..."
                rows={12}
                className="w-full mt-1 px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] text-sm resize-y"
              />
              <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
                <span>1.1k / 10k</span>
                <div className="flex gap-1">
                  <button type="button" className="text-[var(--primary)]">Improve</button>
                  <button type="button" className="text-[var(--primary)]">Focus</button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium">
            <Plus className="w-4 h-4" /> Generate Content
          </button>
        </div>

        {/* Right panel — generated content */}
        <div className="lg:col-span-3 bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <button type="button" className="text-sm text-[var(--primary)]">Convert to Flow</button>
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50" title="Copy"><Copy className="w-4 h-4" /></button>
              <button type="button" className="flex items-center gap-1 px-2 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--border)]/50">Export</button>
              <button type="button" className="flex items-center gap-1 px-2 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--border)]/50">Save</button>
              <button type="button" className="flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius-btn)] bg-[var(--primary)] text-white text-sm font-medium"><Send className="w-4 h-4" /> Publish</button>
            </div>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mb-3">264 words · 1779 chars · 2 min read</div>
          <div className="prose prose-sm max-w-none text-[var(--text-primary)]">
            {state ? (
              <p className="text-[var(--text-secondary)] italic">Content will be generated here after you click &ldquo;Generate Content&rdquo;. Your prompt has been pre-filled from the action plan.</p>
            ) : (
              <p className="text-[var(--text-secondary)]">Generated content appears here. Use the prompt on the left and click Generate Content.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
