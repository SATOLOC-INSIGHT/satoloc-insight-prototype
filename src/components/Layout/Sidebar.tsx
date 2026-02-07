import { NavLink } from 'react-router-dom';
import {
  Languages,
  TrendingUp,
  Link2,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/localization', icon: Languages, label: 'Localization' },
  { to: '/seo-analyzer', icon: TrendingUp, label: 'SEO Analyzer' },
  { to: '/api-integration', icon: Link2, label: 'Api Integration' },
  { to: '/custom-content', icon: FileText, label: 'Custom Content' },
  { to: '/support', icon: MessageCircle, label: 'Support' },
];

export function Sidebar() {
  return (
    <aside className="w-[200px] min-h-screen bg-[var(--card-bg)] border-r border-[var(--border)] flex flex-col shrink-0">
      <div className="p-4 border-b border-[var(--border)]">
        <div className="text-[var(--primary)] font-semibold text-sm">SatoLOC Insight</div>
        <div className="text-[var(--text-secondary)] text-xs">Platform</div>
      </div>
      <div className="p-3 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--text-primary)] font-medium text-sm">P</div>
        <div className="text-[var(--text-primary)] text-sm font-medium mt-2">Pınar</div>
        <div className="text-[var(--text-secondary)] text-xs truncate">pnarbasar@gmail.com</div>
      </div>
      <nav className="flex-1 p-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/custom-content' || to === '/seo-analyzer' ? false : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-[var(--radius-btn)] text-sm mb-0.5 transition-colors ${
                isActive
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                  : 'text-[var(--text-primary)] hover:bg-[var(--border)]/50'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t border-[var(--border)]">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-btn)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50"
        >
          <Settings className="w-5 h-5" strokeWidth={1.5} />
          Settings
        </NavLink>
        <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-btn)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50 w-full">
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  );
}
