import { NavLink, Outlet } from 'react-router-dom';
import { FileSearch, BarChart3, Layout, AlertCircle, Users, Sparkles } from 'lucide-react';

const tabs = [
  { to: 'crawl', label: 'Crawl', icon: FileSearch },
  { to: 'gsc', label: 'GSC', icon: BarChart3 },
  { to: 'overview', label: 'Overview', icon: Layout },
  { to: 'pages', label: 'Pages', icon: FileSearch },
  { to: 'issues', label: 'Issues', icon: AlertCircle },
  { to: 'competitors', label: 'Competitors', icon: Users },
  { to: 'ai-search-console', label: 'AI Search Console', icon: Sparkles },
];

export function SeoAnalyzerTabs() {
  return (
    <div className="space-y-4">
      <div className="flex gap-1 border-b border-[var(--border)] overflow-x-auto">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/seo-analyzer/${to}`}
            end={to === 'crawl'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-sm rounded-t-[var(--radius-btn)] border-b-2 -mb-px transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]'
                  : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
              }`
            }
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
