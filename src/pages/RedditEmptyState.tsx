import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export function RedditEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-[var(--orange)]/10 flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-[var(--orange)]" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">Start Tracking Your Brand</h2>
      <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md">
        Set up Reddit monitoring to discover what people say about your brand, track sentiment, and turn insights into content actions.
      </p>
      <Link
        to="/custom-content/reddit-dashboard"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--orange)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90"
      >
        Setup Reddit Tracking
      </Link>
    </div>
  );
}
