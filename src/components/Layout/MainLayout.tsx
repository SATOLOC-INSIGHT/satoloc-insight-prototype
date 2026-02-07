import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--page-bg)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <footer className="text-center py-4 text-[var(--text-secondary)] text-xs border-t border-[var(--border)]">
          © 2026 Satoloc Insight. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
