import { NavLink, Outlet } from 'react-router-dom';
import { FileText, Workflow } from 'lucide-react';

export function CustomContentTabs() {
  return (
    <div className="space-y-4">
      <div className="flex gap-1 border-b border-[var(--border)]">
        <NavLink
          to="/custom-content"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-sm rounded-t-[var(--radius-btn)] border-b-2 -mb-px transition-colors ${
              isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`
          }
        >
          <FileText className="w-4 h-4" strokeWidth={1.5} />
          Classic
        </NavLink>
        <span className="text-[var(--text-secondary)] text-xs self-center px-2">Best for single posts</span>
        <NavLink
          to="/custom-content/flow-builder"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-sm rounded-t-[var(--radius-btn)] border-b-2 -mb-px transition-colors ${
              isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
            }`
          }
        >
          <Workflow className="w-4 h-4" strokeWidth={1.5} />
          Flow Builder
        </NavLink>
        <span className="text-[var(--text-secondary)] text-xs self-center px-2">Best for reusable workflows</span>
      </div>
      <Outlet />
    </div>
  );
}
