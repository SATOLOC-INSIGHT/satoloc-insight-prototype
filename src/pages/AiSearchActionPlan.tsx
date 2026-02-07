import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Download, FileText } from 'lucide-react';
import { aiSearchActions } from '../data/mockAiSearch';

const priorityStyles: Record<string, string> = {
  High: 'bg-red-500/10 text-red-600 border-red-500/30',
  Medium: 'bg-[var(--orange)]/10 text-[var(--orange)] border-[var(--orange)]/30',
  Low: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30',
};

export function AiSearchActionPlan() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCreateContent = (action: (typeof aiSearchActions)[0]) => {
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
          <Link to="/seo-analyzer/ai-search-console" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]">
            ← AI Search Console
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">AI Visibility Action Plan</h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-[var(--radius-btn)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/30">
            <Download className="w-4 h-4" /> Export
          </button>
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90">
            Generate Recommendations
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {aiSearchActions.map((action) => (
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
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  {action.id === '2' ? (
                    <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline">
                      <FileText className="w-4 h-4" /> Implement Guide
                    </button>
                  ) : action.id === '5' ? (
                    <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline">
                      <FileText className="w-4 h-4" /> View Strategy
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCreateContent(action)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                      Create Content <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === action.id ? null : action.id)}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    View Details
                  </button>
                </div>
                {expandedId === action.id && (
                  <div className="mt-3 p-3 rounded bg-[var(--page-bg)]/50 text-sm text-[var(--text-secondary)] border border-[var(--border)]">
                    <p className="font-medium text-[var(--text-primary)] mb-1">Supporting data</p>
                    <p>Citation gap: 8 keywords without FAQ coverage. Competitors avg. 47 reviews on G2/Capterra (SatoLOC: 3).</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
