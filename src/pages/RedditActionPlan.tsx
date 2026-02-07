import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Download } from 'lucide-react';
import { redditActions } from '../data/mockReddit';

const priorityStyles: Record<string, string> = {
  High: 'bg-red-500/10 text-red-600 border-red-500/30',
  Medium: 'bg-[var(--orange)]/10 text-[var(--orange)] border-[var(--orange)]/30',
  Low: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30',
};

export function RedditActionPlan() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'priority' | 'category' | 'recency'>('priority');

  const handleCreateContent = (action: (typeof redditActions)[0]) => {
    navigate('/custom-content/editor', {
      state: {
        title: action.title,
        prompt: action.prompt,
        tone: 'Professional',
        language: 'English',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/custom-content/reddit-dashboard" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]">
            ← Reddit Brand Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Recommended Actions</h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-[var(--radius-btn)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/30">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90">
            Generate Action Plan
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="text-sm text-[var(--text-secondary)]">Sort by:</span>
        {(['priority', 'category', 'recency'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSortBy(s)}
            className={`px-3 py-1 rounded-[var(--radius-btn)] text-sm capitalize ${sortBy === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)]/50 text-[var(--text-secondary)]'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {redditActions.map((action) => (
          <div
            key={action.id}
            className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityStyles[action.priority]}`}>
                    {action.priority}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--border)]/50 text-[var(--text-secondary)]">
                    {action.category}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mt-2">{action.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{action.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => handleCreateContent(action)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    Create Content <ChevronRight className="w-4 h-4" />
                  </button>
                  <button type="button" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
