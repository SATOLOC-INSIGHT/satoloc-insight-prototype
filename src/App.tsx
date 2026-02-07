import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AiSearchTrackingProvider } from './contexts/AiSearchTrackingContext';
import { MainLayout } from './components/Layout/MainLayout';
import { SeoAnalyzerTabs } from './components/SeoAnalyzerTabs';
import { CustomContentTabs } from './components/CustomContentTabs';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { RedditBrandDashboard } from './pages/RedditBrandDashboard';
import { RedditActionPlan } from './pages/RedditActionPlan';
import { AiSearchConsoleDashboard } from './pages/AiSearchConsoleDashboard';
import { AiSearchEmptyState } from './pages/AiSearchEmptyState';
import { AiSearchActionPlan } from './pages/AiSearchActionPlan';
import { CustomContentHome } from './pages/CustomContentHome';
import { CustomContentEditor } from './pages/CustomContentEditor';
import { FlowBuilder } from './pages/FlowBuilder';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <AiSearchTrackingProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/custom-content" replace />} />
          <Route path="localization" element={<PlaceholderPage title="Localization" description="Website translation analysis with content reports." />} />

          <Route path="seo-analyzer" element={<SeoAnalyzerTabs />}>
            <Route index element={<Navigate to="crawl" replace />} />
            <Route path="crawl" element={<PlaceholderPage title="Crawl" description="Start website crawl." />} />
            <Route path="gsc" element={<PlaceholderPage title="GSC" />} />
            <Route path="overview" element={<PlaceholderPage title="Overview" />} />
            <Route path="pages" element={<PlaceholderPage title="Pages" />} />
            <Route path="issues" element={<PlaceholderPage title="Issues" />} />
            <Route path="competitors" element={<PlaceholderPage title="Competitors" />} />
            <Route path="ai-search-console" element={<AiSearchConsoleDashboard />} />
            <Route path="ai-search-console/empty" element={<AiSearchEmptyState />} />
            <Route path="ai-search-console/actions" element={<AiSearchActionPlan />} />
          </Route>

          <Route path="api-integration" element={<PlaceholderPage title="API Integration" description="WordPress connector, Custom CMS, API." />} />

          <Route path="custom-content" element={<CustomContentTabs />}>
            <Route index element={<CustomContentHome />} />
            <Route path="flow-builder" element={<FlowBuilder />} />
            <Route path="reddit-dashboard" element={<RedditBrandDashboard />} />
            <Route path="reddit-action-plan" element={<RedditActionPlan />} />
            <Route path="editor" element={<CustomContentEditor />} />
          </Route>

          <Route path="support" element={<PlaceholderPage title="Support" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
      </AiSearchTrackingProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
