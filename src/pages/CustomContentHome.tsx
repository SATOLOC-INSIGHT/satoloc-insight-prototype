import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, History } from 'lucide-react';

export function CustomContentHome() {
  const [activeTab, setActiveTab] = useState<'reddit' | 'history'>('reddit');

  return (
    <div className="space-y-4">
      <div className="flex gap-1 border-b border-[var(--border)]">
        <button
          type="button"
          onClick={() => setActiveTab('reddit')}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${activeTab === 'reddit' ? 'border-[var(--primary)] text-[var(--primary)] font-medium' : 'border-transparent text-[var(--text-secondary)]'}`}
        >
          <MessageCircle className="w-4 h-4" /> Reddit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${activeTab === 'history' ? 'border-[var(--primary)] text-[var(--primary)] font-medium' : 'border-transparent text-[var(--text-secondary)]'}`}
        >
          <History className="w-4 h-4" /> History
        </button>
        <span className="self-center ml-2 text-xs text-[var(--text-secondary)]">22</span>
      </div>

      {activeTab === 'reddit' && (
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-6 border border-[var(--border)] shadow-[var(--shadow-card)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Reddit-powered content</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Use brand mentions and topics from Reddit to inform your content. View your Brand Intelligence dashboard or start from a prompt.</p>
          <div className="flex gap-3 mt-4">
            <Link
              to="/custom-content/reddit-dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--orange)]/10 text-[var(--orange)] border border-[var(--orange)]/30 rounded-[var(--radius-btn)] text-sm font-medium hover:bg-[var(--orange)]/20"
            >
              <MessageCircle className="w-4 h-4" /> Brand Intelligence Dashboard
            </Link>
            <Link
              to="/custom-content/editor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90"
            >
              New post (Classic editor)
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-6 border border-[var(--border)] shadow-[var(--shadow-card)]">
          <h2 className="font-semibold text-[var(--text-primary)]">History</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Your recent generated content (22 items).</p>
        </div>
      )}
    </div>
  );
}
