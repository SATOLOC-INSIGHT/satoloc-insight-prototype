import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sun, Bell, MessageCircle, Globe } from 'lucide-react';

function breadcrumbFromPath(path: string): string {
  const segment = path.split('/').filter(Boolean)[0] || 'home';
  return segment.replace(/-/g, ' ');
}

export function TopBar({ title }: { title?: string }) {
  const location = useLocation();
  const breadcrumb = title ?? breadcrumbFromPath(location.pathname);

  return (
    <header className="h-14 px-4 flex items-center justify-between bg-[var(--card-bg)] border-b border-[var(--border)] shrink-0">
      <div className="flex items-center gap-2">
        <button type="button" className="p-1.5 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button type="button" className="p-1.5 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50">
          <ChevronRight className="w-5 h-5" />
        </button>
        <span className="text-[var(--text-primary)] text-sm capitalize">{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="p-2 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50" aria-label="Theme">
          <Sun className="w-5 h-5" />
        </button>
        <button type="button" className="p-2 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>
        <button type="button" className="flex items-center gap-1.5 px-2 py-1.5 rounded text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50">
          U User <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
        </button>
        <button type="button" className="p-2 rounded text-[var(--text-secondary)] hover:bg-[var(--border)]/50" aria-label="Chat">
          <MessageCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 pl-2 ml-2 border-l border-[var(--border)]">
          <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="text-sm text-[var(--text-primary)]">shop.feuduciel.com</span>
          <ChevronRight className="w-4 h-4 rotate-[-90deg] text-[var(--text-secondary)]" />
        </div>
      </div>
    </header>
  );
}
