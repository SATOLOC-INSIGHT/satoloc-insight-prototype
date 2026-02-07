import { useState, Fragment, useMemo } from 'react';
import { RefreshCw, Plus, Sparkles, Loader2, Filter, TrendingUp, TrendingDown, Bell, BellDot, Clock, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, Activity, Play, Zap, Coins, Trash2 } from 'lucide-react';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar as RechartsBar, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { aiSearchOverview, aiSearchCitations, competitorShareData, brandTrendData, citationAlerts, manualCheckEngines, resourceBudget, type EngineKey, type CitationAlert } from '../data/mockAiSearch';
import { Link } from 'react-router-dom';
import { AddKeywordsGeneratePromptsModal } from '../components/AddKeywordsGeneratePromptsModal';
import { useAiSearchTracking } from '../contexts/AiSearchTrackingContext';
import { LANGUAGES, REGIONS } from '../data/mockPrompts';

const ENGINE_LABELS: Record<EngineKey, string> = {
  perplexity: 'Perplexity',
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
};

const engineStatusColor: Record<string, string> = {
  cited: 'bg-[#22C55E]',
  recommended: 'bg-[#22C55E]/80',
  partial: 'bg-[#EAB308]',
  'not cited': 'bg-[#EF4444]',
};

const ALERT_ICON: Record<CitationAlert['type'], typeof TrendingUp> = {
  new_citation: TrendingUp,
  lost_citation: TrendingDown,
  position_change: Activity,
  new_competitor: AlertTriangle,
};

const ALERT_COLOR: Record<CitationAlert['type'], string> = {
  new_citation: 'text-emerald-500',
  lost_citation: 'text-red-500',
  position_change: 'text-blue-500',
  new_competitor: 'text-amber-500',
};

const ALERT_BG: Record<CitationAlert['type'], string> = {
  new_citation: 'bg-emerald-500/10',
  lost_citation: 'bg-red-500/10',
  position_change: 'bg-blue-500/10',
  new_competitor: 'bg-amber-500/10',
};

const ALERT_LABEL: Record<CitationAlert['type'], string> = {
  new_citation: 'New Citation',
  lost_citation: 'Lost Citation',
  position_change: 'Position Change',
  new_competitor: 'New Competitor',
};

const ENGINE_COLOR: Record<EngineKey, string> = {
  perplexity: '#8B5CF6',
  chatgpt: '#10B981',
  claude: '#F59E0B',
  gemini: '#3B82F6',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function AiSearchConsoleDashboard() {
  const { dynamicCitations, removeCitation } = useAiSearchTracking();
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const [removedStaticIds, setRemovedStaticIds] = useState<Set<number>>(new Set());
  const [selectedKeyword, setSelectedKeyword] = useState(competitorShareData[0].keyword);
  const [lastUpdated, setLastUpdated] = useState(() => new Date().toLocaleString());
  const [showAddKeywordsModal, setShowAddKeywordsModal] = useState(false);

  const [filterLanguage, setFilterLanguage] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'cited' | 'not_cited'>('all');

  // Trend chart state
  const [trendMetric, setTrendMetric] = useState<'citations' | 'citationRate'>('citations');
  const [showEngineBreakdown, setShowEngineBreakdown] = useState(true);

  // Alerts state
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const [alertFilter, setAlertFilter] = useState<'all' | CitationAlert['type']>('all');
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  // Manual check state
  const [runningEngines, setRunningEngines] = useState<Set<EngineKey>>(new Set());

  const filteredAlerts = useMemo(() => {
    return citationAlerts.filter((a) => {
      if (dismissedAlerts.has(a.id)) return false;
      if (alertFilter !== 'all' && a.type !== alertFilter) return false;
      return true;
    });
  }, [alertFilter, dismissedAlerts]);

  const unreadCount = citationAlerts.filter((a) => !a.read && !dismissedAlerts.has(a.id)).length;

  const languageLabel = (code: string) => LANGUAGES.find((l) => l.code === code)?.label ?? code;
  const regionLabel = (code: string) => REGIONS.find((r) => r.code === code)?.label ?? code;

  const isCited = (row: { perplexity?: string; chatgpt?: string; claude?: string; gemini?: string }) => {
    const statuses = [row.perplexity, row.chatgpt, row.claude, row.gemini].filter(Boolean);
    return statuses.some((s) => s === 'cited' || s === 'recommended' || s === 'partial');
  };

  const filteredDynamic = useMemo(() => {
    return dynamicCitations.filter((row) => {
      if (row.status === 'checking') return true;
      if (filterLanguage && row.languageCode !== filterLanguage) return false;
      if (filterStatus === 'cited' && !isCited(row)) return false;
      if (filterStatus === 'not_cited' && isCited(row)) return false;
      return true;
    });
  }, [dynamicCitations, filterLanguage, filterStatus]);

  const filteredStatic = useMemo(() => {
    return aiSearchCitations
      .map((row, i) => ({ ...row, _origIndex: i }))
      .filter((row) => {
        if (removedStaticIds.has(row._origIndex)) return false;
        if (filterStatus === 'cited' && !isCited(row)) return false;
        if (filterStatus === 'not_cited' && isCited(row)) return false;
        return true;
      });
  }, [filterStatus, removedStaticIds]);

  const activeStaticCount = aiSearchCitations.length - removedStaticIds.size;
  const totalTrackedCount = aiSearchOverview.totalCitations + dynamicCitations.filter((r) => r.status === 'ready').length - (aiSearchCitations.length - activeStaticCount);
  const readyCount = dynamicCitations.filter((r) => r.status === 'ready').length;

  const chartData = competitorShareData.find((d) => d.keyword === selectedKeyword)
    ? [selectedKeyword].map((k) => {
        const row = competitorShareData.find((d) => d.keyword === k)!;
        return { name: k, ...row };
      })[0]
    : null;

  const barData = chartData
    ? [
        { name: 'SatoLOC', value: chartData.SatoLOC, fill: '#3B82F6' },
        { name: 'Phrase', value: chartData.Phrase, fill: '#6B7280' },
        { name: 'Lokalise', value: chartData.Lokalise, fill: '#9CA3AF' },
        { name: 'Others', value: chartData.Others, fill: '#E5E7EB' },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">AI Search Console</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Track how AI engines cite your brand and monitor your share of voice</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-secondary)]">Last updated: {lastUpdated}</span>
          <button type="button" onClick={() => setShowAddKeywordsModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90">
            <Plus className="w-4 h-4" /> Add keywords & generate prompts
          </button>
          <button type="button" className="flex items-center gap-2 px-3 py-1.5 border border-[var(--primary)] text-[var(--primary)] rounded-[var(--radius-btn)] hover:bg-[var(--primary)]/10">
            <RefreshCw className="w-4 h-4" /> Refresh Analysis
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-[var(--radius-card)] bg-[var(--primary)]/5 border border-[var(--primary)]/20">
        <Sparkles className="w-5 h-5 text-[var(--primary)] shrink-0" />
        <div className="text-sm text-[var(--text-primary)]">
          <span className="font-medium">Manual citation checks — you're in control:</span> Add keywords → SatoLOC generates prompts. You decide when to run them on each LLM. Pay only for what you check. Delta detection skips unchanged responses to save credits.
        </div>
      </div>

      {showAddKeywordsModal && <AddKeywordsGeneratePromptsModal onClose={() => setShowAddKeywordsModal(false)} />}

      {/* Section A — Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Total Citations</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{totalTrackedCount}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">
            Across all tracked AI engines{readyCount > 0 ? ` · +${readyCount} from your runs` : ''}
          </div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Citation Rate</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{aiSearchOverview.citationRate}%</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">Queries where brand appears in AI responses</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Avg. Position</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)] mt-1">{aiSearchOverview.avgPosition}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">Average rank in AI-generated answers</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Engines Tracked</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {aiSearchOverview.engines.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--border)]/50">
                <span className="text-xs font-medium text-[var(--text-primary)]">{e.icon}</span>
                <span className="text-xs text-[var(--text-secondary)]">{e.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section — Brand Trend Over Time */}
      <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)] border border-[var(--border)]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              Brand Visibility Trend
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Weekly citation metrics across all tracked AI engines</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-[var(--radius-btn)] border border-[var(--border)] overflow-hidden">
              <button
                type="button"
                onClick={() => setTrendMetric('citations')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${trendMetric === 'citations' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Total Citations
              </button>
              <button
                type="button"
                onClick={() => setTrendMetric('citationRate')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${trendMetric === 'citationRate' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Citation Rate %
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowEngineBreakdown(!showEngineBreakdown)}
              className={`px-3 py-1.5 rounded-[var(--radius-btn)] text-xs font-medium border transition-colors ${showEngineBreakdown ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border)] text-[var(--text-secondary)]'}`}
            >
              Per-engine breakdown
            </button>
          </div>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {(() => {
            const latest = brandTrendData[brandTrendData.length - 1];
            const prev = brandTrendData[brandTrendData.length - 2];
            const citDelta = latest.citations - prev.citations;
            const rateDelta = latest.citationRate - prev.citationRate;
            return (
              <>
                <div className="rounded-[var(--radius-input)] bg-[var(--page-bg)] p-3">
                  <div className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)] font-medium">This week</div>
                  <div className="text-lg font-semibold text-[var(--text-primary)]">{latest.citations}</div>
                  <div className={`text-xs font-medium flex items-center gap-0.5 ${citDelta >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {citDelta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {citDelta >= 0 ? '+' : ''}{citDelta} vs last week
                  </div>
                </div>
                <div className="rounded-[var(--radius-input)] bg-[var(--page-bg)] p-3">
                  <div className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)] font-medium">Citation rate</div>
                  <div className="text-lg font-semibold text-[var(--text-primary)]">{latest.citationRate}%</div>
                  <div className={`text-xs font-medium flex items-center gap-0.5 ${rateDelta >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {rateDelta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {rateDelta >= 0 ? '+' : ''}{rateDelta}pp vs last week
                  </div>
                </div>
                <div className="rounded-[var(--radius-input)] bg-[var(--page-bg)] p-3">
                  <div className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)] font-medium">9-week growth</div>
                  <div className="text-lg font-semibold text-emerald-500">+{Math.round(((latest.citations - brandTrendData[0].citations) / brandTrendData[0].citations) * 100)}%</div>
                  <div className="text-xs text-[var(--text-secondary)]">{brandTrendData[0].citations} → {latest.citations} citations</div>
                </div>
                <div className="rounded-[var(--radius-input)] bg-[var(--page-bg)] p-3">
                  <div className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)] font-medium">Top engine</div>
                  <div className="text-lg font-semibold text-[var(--text-primary)]">Perplexity</div>
                  <div className="text-xs text-[var(--text-secondary)]">{latest.perplexity} citations this week</div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={brandTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                tickFormatter={(v: string) => {
                  const d = new Date(v);
                  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                }}
              />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip
                contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: 12 }}
                labelFormatter={(v: string) => {
                  const d = new Date(v);
                  return `Week of ${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`;
                }}
              />
              <Legend />
              {trendMetric === 'citations' ? (
                <>
                  <Line type="monotone" dataKey="citations" name="Total Citations" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  {showEngineBreakdown && (
                    <>
                      <Line type="monotone" dataKey="perplexity" name="Perplexity" stroke={ENGINE_COLOR.perplexity} strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="chatgpt" name="ChatGPT" stroke={ENGINE_COLOR.chatgpt} strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="claude" name="Claude" stroke={ENGINE_COLOR.claude} strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="gemini" name="Gemini" stroke={ENGINE_COLOR.gemini} strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} />
                    </>
                  )}
                </>
              ) : (
                <Line type="monotone" dataKey="citationRate" name="Citation Rate %" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section — New Citation Alerts + LLM Check Frequency (side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Citation Alerts — takes 3 cols */}
        <div className="lg:col-span-3 bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--border)] flex flex-col">
          <div
            className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between cursor-pointer"
            onClick={() => setAlertsExpanded(!alertsExpanded)}
          >
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              {unreadCount > 0 ? <BellDot className="w-5 h-5 text-[var(--primary)]" /> : <Bell className="w-5 h-5 text-[var(--text-secondary)]" />}
              Citation Alerts
              {unreadCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={alertFilter}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setAlertFilter(e.target.value as typeof alertFilter)}
                className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-xs text-[var(--text-primary)] px-2 py-1"
              >
                <option value="all">All types</option>
                <option value="new_citation">New citations</option>
                <option value="lost_citation">Lost citations</option>
                <option value="position_change">Position changes</option>
                <option value="new_competitor">New competitors</option>
              </select>
              {alertsExpanded ? <ChevronUp className="w-4 h-4 text-[var(--text-secondary)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />}
            </div>
          </div>

          {alertsExpanded && (
            <div className="divide-y divide-[var(--border)] overflow-y-auto max-h-80">
              {filteredAlerts.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]">No alerts matching this filter.</div>
              ) : (
                filteredAlerts.map((alert) => {
                  const Icon = ALERT_ICON[alert.type];
                  return (
                    <div key={alert.id} className={`px-4 py-3 flex gap-3 items-start hover:bg-[var(--page-bg)]/30 transition-colors ${!alert.read ? 'bg-[var(--primary)]/[0.03]' : ''}`}>
                      <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ALERT_BG[alert.type]}`}>
                        <Icon className={`w-4 h-4 ${ALERT_COLOR[alert.type]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${ALERT_BG[alert.type]} ${ALERT_COLOR[alert.type]}`}>
                            {ALERT_LABEL[alert.type]}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--border)]/50 text-[var(--text-secondary)] font-medium uppercase">
                            {alert.engine}
                          </span>
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                          )}
                        </div>
                        <p className="text-sm text-[var(--text-primary)] mt-1 leading-snug">{alert.message}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {timeAgo(alert.timestamp)}
                          </span>
                          <span className="text-[11px] text-[var(--text-secondary)]">
                            Keyword: <span className="font-medium text-[var(--text-primary)]">{alert.keyword}</span>
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDismissedAlerts((prev) => new Set([...prev, alert.id]))}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 -mr-1"
                        title="Dismiss"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Manual LLM Check — takes 2 cols */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--border)] flex flex-col">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Play className="w-5 h-5 text-[var(--primary)]" />
              Run LLM Check
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Manually trigger citation checks — you control when and what to check</p>
          </div>

          {/* Check All button */}
          <div className="px-4 pt-3 pb-2">
            <button
              type="button"
              onClick={() => {
                if (runningEngines.size > 0) return;
                setRunningEngines(new Set(['perplexity', 'chatgpt', 'claude', 'gemini'] as EngineKey[]));
                setTimeout(() => setRunningEngines(new Set()), 3000);
              }}
              disabled={runningEngines.size > 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {runningEngines.size === 4 ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Checking all engines…</>
              ) : (
                <><Zap className="w-4 h-4" /> Check All Engines ({manualCheckEngines.reduce((s, e) => s + e.creditsPerCheck, 0)} credits × {resourceBudget.keywordsTracked} kw)</>
              )}
            </button>
            {/* Compact credit usage */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] mb-1">
                <span className="flex items-center gap-1"><Coins className="w-3 h-3" /> {resourceBudget.usedCredits} / {resourceBudget.monthlyCredits} credits used</span>
                <span>{resourceBudget.monthlyCredits - resourceBudget.usedCredits} remaining</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(resourceBudget.usedCredits / resourceBudget.monthlyCredits) * 100}%`,
                    background: (resourceBudget.usedCredits / resourceBudget.monthlyCredits) > 0.8 ? '#EF4444' : (resourceBudget.usedCredits / resourceBudget.monthlyCredits) > 0.6 ? '#EAB308' : '#3B82F6',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Per-engine rows */}
          <div className="divide-y divide-[var(--border)] flex-1">
            {manualCheckEngines.map((eng) => (
              <div key={eng.engine} className="px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: ENGINE_COLOR[eng.engine] }}
                    >
                      {eng.icon}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{eng.label}</span>
                      <span className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                        <Coins className="w-3 h-3" /> {eng.creditsPerCheck} credit{eng.creditsPerCheck > 1 ? 's' : ''}/check ({eng.estimatedCostPerCheck})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (runningEngines.has(eng.engine)) return;
                      setRunningEngines((prev) => new Set([...prev, eng.engine]));
                      setTimeout(() => setRunningEngines((prev) => { const n = new Set(prev); n.delete(eng.engine); return n; }), 2500);
                    }}
                    disabled={runningEngines.has(eng.engine)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--primary)] text-[var(--primary)] rounded-[var(--radius-btn)] text-xs font-medium hover:bg-[var(--primary)]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {runningEngines.has(eng.engine) ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /> Running…</>
                    ) : (
                      <><Play className="w-3 h-3" /> Run</>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {eng.lastManualRun ? `Last: ${timeAgo(eng.lastManualRun)}` : 'Never run'}
                  </span>
                  <span>{eng.checksThisMonth} checks this month</span>
                  {eng.lastDelta && (
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium ${
                      eng.lastDelta === 'changed' ? 'bg-blue-500/10 text-blue-500' :
                      eng.lastDelta === 'unchanged' ? 'bg-[var(--border)]/50 text-[var(--text-secondary)]' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {eng.lastDelta === 'changed' && <><Activity className="w-3 h-3" /> Changed</>}
                      {eng.lastDelta === 'unchanged' && <><CheckCircle2 className="w-3 h-3" /> No change</>}
                      {eng.lastDelta === 'new' && <><Sparkles className="w-3 h-3" /> New</>}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact credit usage bar */}

      {/* Section B — Citation table */}
      <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--border)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-[var(--text-primary)]">Citation Tracking</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--text-primary)] px-2 py-1.5"
            >
              <option value="">All languages</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--text-primary)] px-2 py-1.5"
            >
              <option value="all">All statuses</option>
              <option value="cited">Cited</option>
              <option value="not_cited">Not cited</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--page-bg)]/50">
                <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">Keyword</th>
                <th className="text-center py-3 px-2 font-medium text-[var(--text-primary)]">Perplexity</th>
                <th className="text-center py-3 px-2 font-medium text-[var(--text-primary)]">ChatGPT</th>
                <th className="text-center py-3 px-2 font-medium text-[var(--text-primary)]">Claude</th>
                <th className="text-center py-3 px-2 font-medium text-[var(--text-primary)]">Gemini</th>
                <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">Citation Type</th>
                <th className="text-left py-3 px-4 font-medium text-[var(--text-primary)]">Last Checked</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody>
              {filteredDynamic.map((row) => (
                <Fragment key={row.id}>
                  <tr
                    onClick={() => row.status === 'ready' && setExpandedRowKey(expandedRowKey === row.id ? null : row.id)}
                    className={`border-b border-[var(--border)] hover:bg-[var(--page-bg)]/30 ${row.status === 'ready' ? 'cursor-pointer' : ''}`}
                  >
                    <td className="py-3 px-4 font-medium text-[var(--text-primary)]">
                      {row.status === 'checking' ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
                          Checking…
                        </span>
                      ) : (
                        <>
                          {row.keyword}
                          <span className="block text-[10px] text-[var(--text-secondary)] mt-0.5">
                            {languageLabel(row.languageCode)} · {regionLabel(row.regionCode)}
                          </span>
                        </>
                      )}
                    </td>
                    {row.status === 'checking' ? (
                      <>
                        <td colSpan={4} className="py-3 px-2 text-center text-xs text-[var(--text-secondary)]">Running on LLMs…</td>
                        <td className="py-3 px-4 text-[var(--text-secondary)]">—</td>
                        <td className="py-3 px-4 text-[var(--text-secondary)]">—</td>
                        <td className="py-3 px-2" />
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.perplexity!] || 'bg-gray-300'}`} title={row.perplexity} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.chatgpt!] || 'bg-gray-300'}`} title={row.chatgpt} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.claude!] || 'bg-gray-300'}`} title={row.claude} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.gemini!] || 'bg-gray-300'}`} title={row.gemini} />
                        </td>
                        <td className="py-3 px-4 text-[var(--text-secondary)]">{row.citationType}</td>
                        <td className="py-3 px-4 text-[var(--text-secondary)]">{row.lastChecked}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1">
                            <button type="button" className="text-xs text-[var(--primary)] hover:underline">Check Now</button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeCitation(row.id); }}
                              className="p-1 rounded text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Remove from tracking"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                  {row.status === 'ready' && expandedRowKey === row.id && row.engines && (
                    <tr className="bg-[var(--page-bg)]/30">
                      <td colSpan={8} className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                        <p className="font-medium text-[var(--text-primary)] mb-3">Links mentioned by each LLM</p>
                        <div className="space-y-4">
                          {(['perplexity', 'chatgpt', 'claude', 'gemini'] as const).map((engineKey) => {
                            const data = row.engines[engineKey];
                            const label = ENGINE_LABELS[engineKey];
                            if (!data) return null;
                            return (
                              <div key={engineKey} className="border border-[var(--border)] rounded-[var(--radius-input)] p-3">
                                <p className="font-medium text-[var(--text-primary)] text-xs mb-1.5">{label}</p>
                                {data.snippet && <p className="text-xs mb-2">&ldquo;{data.snippet}&rdquo;</p>}
                                <p className="font-medium text-[var(--text-primary)] text-[11px] uppercase tracking-wide mb-1">Links mentioned in {label}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-[11px] text-[var(--text-secondary)]">Your brand</span>
                                    {(data.linksBrand?.length ?? 0) > 0 ? (
                                      <ul className="mt-0.5 space-y-0.5">
                                        {data.linksBrand.map((link) => (
                                          <li key={link.url}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline text-xs truncate block max-w-full" title={link.url}>{link.label}</a>
                                            <span className="text-[10px] text-[var(--text-secondary)] block truncate max-w-full" title={link.url}>{link.url}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-[10px] italic mt-0.5">None</p>
                                    )}
                                  </div>
                                  <div>
                                    <span className="text-[11px] text-[var(--text-secondary)]">Competitors</span>
                                    {(data.linksCompetitors?.length ?? 0) > 0 ? (
                                      <ul className="mt-0.5 space-y-0.5">
                                        {data.linksCompetitors.map((link) => (
                                          <li key={link.url}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline text-xs truncate block max-w-full" title={link.url}>{link.label}</a>
                                            <span className="text-[10px] text-[var(--text-secondary)] block truncate max-w-full" title={link.url}>{link.url}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-[10px] italic mt-0.5">None</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setExpandedRowKey(null); }} className="mt-3 text-[var(--primary)] text-xs hover:underline">Collapse</button>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
              {filteredStatic.map((row) => {
                const rowKey = `static-${row._origIndex}`;
                return (
                  <Fragment key={rowKey}>
                    <tr
                      onClick={() => setExpandedRowKey(expandedRowKey === rowKey ? null : rowKey)}
                      className="border-b border-[var(--border)] hover:bg-[var(--page-bg)]/30 cursor-pointer"
                    >
                      <td className="py-3 px-4 font-medium text-[var(--text-primary)]">{row.keyword}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.perplexity] || 'bg-gray-300'}`} title={row.perplexity} />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.chatgpt] || 'bg-gray-300'}`} title={row.chatgpt} />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.claude] || 'bg-gray-300'}`} title={row.claude} />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${engineStatusColor[row.gemini] || 'bg-gray-300'}`} title={row.gemini} />
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{row.citationType}</td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{row.lastChecked}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1">
                          <button type="button" className="text-xs text-[var(--primary)] hover:underline">Check Now</button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setRemovedStaticIds((prev) => new Set([...prev, row._origIndex])); }}
                            className="p-1 rounded text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Remove from tracking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRowKey === rowKey && (
                      <tr className="bg-[var(--page-bg)]/30">
                        <td colSpan={8} className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                          <p className="font-medium text-[var(--text-primary)] mb-3">Links mentioned by each LLM</p>
                          <div className="space-y-4">
                            {(['perplexity', 'chatgpt', 'claude', 'gemini'] as const).map((engineKey) => {
                              const data = row.engines?.[engineKey];
                              const label = ENGINE_LABELS[engineKey];
                              if (!data) {
                                return (
                                  <div key={engineKey} className="border border-[var(--border)] rounded-[var(--radius-input)] p-3">
                                    <p className="font-medium text-[var(--text-primary)] text-xs mb-2">{label}</p>
                                    <p className="text-xs text-[var(--text-secondary)] italic">No response data</p>
                                  </div>
                                );
                              }
                              return (
                                <div key={engineKey} className="border border-[var(--border)] rounded-[var(--radius-input)] p-3">
                                  <p className="font-medium text-[var(--text-primary)] text-xs mb-1.5">{label}</p>
                                  {data.snippet && (
                                    <p className="text-xs mb-2">&ldquo;{data.snippet}&rdquo;</p>
                                  )}
                                  <p className="font-medium text-[var(--text-primary)] text-[11px] uppercase tracking-wide mb-1">Links mentioned in {label}</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <span className="text-[11px] text-[var(--text-secondary)]">Your brand</span>
                                      {(data.linksBrand?.length ?? 0) > 0 ? (
                                        <ul className="mt-0.5 space-y-0.5">
                                          {data.linksBrand!.map((link) => (
                                            <li key={link.url}>
                                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline text-xs truncate block max-w-full" title={link.url}>{link.label}</a>
                                              <span className="text-[10px] text-[var(--text-secondary)] block truncate max-w-full" title={link.url}>{link.url}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="text-[10px] italic mt-0.5">None</p>
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-[11px] text-[var(--text-secondary)]">Competitors</span>
                                      {(data.linksCompetitors?.length ?? 0) > 0 ? (
                                        <ul className="mt-0.5 space-y-0.5">
                                          {data.linksCompetitors!.map((link) => (
                                            <li key={link.url}>
                                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline text-xs truncate block max-w-full" title={link.url}>{link.label}</a>
                                              <span className="text-[10px] text-[var(--text-secondary)] block truncate max-w-full" title={link.url}>{link.url}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="text-[10px] italic mt-0.5">None</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setExpandedRowKey(null); }} className="mt-3 text-[var(--primary)] text-xs hover:underline">Collapse</button>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section C — Competitor share of voice */}
      <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
        <h2 className="font-semibold text-[var(--text-primary)] mb-3">Competitor Share of Voice</h2>
        <div className="flex gap-2 mb-4">
          {competitorShareData.map((d) => (
            <button
              key={d.keyword}
              type="button"
              onClick={() => setSelectedKeyword(d.keyword)}
              className={`px-3 py-1.5 rounded-[var(--radius-btn)] text-sm ${selectedKeyword === d.keyword ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)]/50 text-[var(--text-secondary)]'}`}
            >
              {d.keyword.length > 20 ? d.keyword.slice(0, 20) + '…' : d.keyword}
            </button>
          ))}
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={70} />
              <Tooltip />
              <RechartsBar dataKey="value" name="Share %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          to="/seo-analyzer/ai-search-console/actions"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90"
        >
          View AI Visibility Action Plan →
        </Link>
      </div>
    </div>
  );
}
