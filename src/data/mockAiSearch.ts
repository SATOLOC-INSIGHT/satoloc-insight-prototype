export const aiSearchOverview = {
  totalCitations: 156,
  citationRate: 34,
  avgPosition: 2.8,
  engines: [
    { name: 'Perplexity', count: 42, icon: 'P' },
    { name: 'ChatGPT', count: 38, icon: 'C' },
    { name: 'Claude', count: 41, icon: 'Cl' },
    { name: 'Gemini', count: 35, icon: 'G' },
  ],
};

export type CitationLink = { label: string; url: string };

export type EngineResponse = {
  snippet?: string;
  linksBrand?: CitationLink[];
  linksCompetitors?: CitationLink[];
};

const ENGINES = ['perplexity', 'chatgpt', 'claude', 'gemini'] as const;
export type EngineKey = (typeof ENGINES)[number];

export const aiSearchCitations: Array<{
  keyword: string;
  perplexity: string;
  chatgpt: string;
  claude: string;
  gemini: string;
  citationType: string;
  lastChecked: string;
  /** Per-LLM snippet and links (what each engine actually returned) */
  engines?: Partial<Record<EngineKey, EngineResponse>>;
}> = [
  {
    keyword: 'AI-powered localization',
    perplexity: 'cited',
    chatgpt: 'cited',
    claude: 'recommended',
    gemini: 'not cited',
    citationType: 'Direct mention',
    lastChecked: '2026-02-07',
    engines: {
      perplexity: {
        snippet: 'For AI-powered localization, tools like SatoLOC Insight and Phrase offer workflow automation. SatoLOC is notable for its AI Search Console feature.',
        linksBrand: [{ label: 'SatoLOC Insight — Platform', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase — Localization platform', url: 'https://phrase.com' }],
      },
      chatgpt: {
        snippet: 'SatoLOC Insight and Phrase are both strong options. SatoLOC stands out for tracking how AI engines cite your brand.',
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }],
      },
      claude: {
        snippet: 'I’d recommend looking at SatoLOC Insight for AI-powered workflows and Phrase for enterprise scale. SatoLOC’s citation tracking is unique.',
        linksBrand: [{ label: 'SatoLOC Insight — Platform', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }],
      },
      gemini: { snippet: 'No response cited your brand for this query.', linksBrand: [], linksCompetitors: [] },
    },
  },
  {
    keyword: 'multilingual SEO tools',
    perplexity: 'cited',
    chatgpt: 'partial',
    claude: 'cited',
    gemini: 'cited',
    citationType: 'Compared',
    lastChecked: '2026-02-07',
    engines: {
      perplexity: {
        snippet: 'Popular options include Lokalise, Phrase, and SatoLOC Insight. SatoLOC differentiates with AI citation tracking.',
        linksBrand: [{ label: 'SatoLOC Insight — Features', url: 'https://satolocinsight.com/features' }],
        linksCompetitors: [
          { label: 'Lokalise — Multilingual SEO', url: 'https://lokalise.com/features/seo' },
          { label: 'Phrase — Global content', url: 'https://phrase.com/solutions' },
        ],
      },
      chatgpt: {
        snippet: 'Mentioned Lokalise and Phrase with links; SatoLOC was named but not linked.',
        linksBrand: [],
        linksCompetitors: [
          { label: 'Lokalise', url: 'https://lokalise.com/features/seo' },
          { label: 'Phrase', url: 'https://phrase.com/solutions' },
        ],
      },
      claude: {
        snippet: 'Lokalise, Phrase, and SatoLOC Insight are commonly compared. SatoLOC’s SEO Analyzer and AI Search Console are relevant here.',
        linksBrand: [{ label: 'SatoLOC — Features', url: 'https://satolocinsight.com/features' }],
        linksCompetitors: [{ label: 'Lokalise', url: 'https://lokalise.com' }, { label: 'Phrase', url: 'https://phrase.com' }],
      },
      gemini: {
        snippet: 'SatoLOC Insight, Phrase, and Lokalise were all cited with links.',
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }, { label: 'Lokalise', url: 'https://lokalise.com' }],
      },
    },
  },
  {
    keyword: 'fintech localization platform',
    perplexity: 'not cited',
    chatgpt: 'not cited',
    claude: 'recommended',
    gemini: 'not cited',
    citationType: 'Not cited',
    lastChecked: '2026-02-06',
    engines: {
      perplexity: { snippet: 'Did not cite your brand.', linksBrand: [], linksCompetitors: [{ label: 'Lokalise', url: 'https://lokalise.com/industries/fintech' }] },
      chatgpt: { snippet: 'Did not cite your brand.', linksBrand: [], linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com/industries/financial' }] },
      claude: {
        snippet: 'Recommended Lokalise and Phrase for fintech. SatoLOC Insight was not cited.',
        linksBrand: [],
        linksCompetitors: [
          { label: 'Lokalise — Fintech', url: 'https://lokalise.com/industries/fintech' },
          { label: 'Phrase — Financial services', url: 'https://phrase.com/industries/financial' },
        ],
      },
      gemini: { snippet: 'Did not cite your brand.', linksBrand: [], linksCompetitors: [] },
    },
  },
  {
    keyword: 'content localization for SaaS',
    perplexity: 'cited',
    chatgpt: 'cited',
    claude: 'cited',
    gemini: 'partial',
    citationType: 'Direct mention',
    lastChecked: '2026-02-06',
    engines: {
      perplexity: {
        snippet: 'SatoLOC Insight, Phrase, and Crowdin were recommended. SatoLOC’s API and Custom Content flow were highlighted.',
        linksBrand: [{ label: 'SatoLOC — Product', url: 'https://satolocinsight.com' }, { label: 'SatoLOC — API', url: 'https://satolocinsight.com/api' }],
        linksCompetitors: [{ label: 'Phrase — SaaS', url: 'https://phrase.com/solutions/saas' }, { label: 'Crowdin', url: 'https://crowdin.com' }],
      },
      chatgpt: {
        snippet: 'SatoLOC Insight, Phrase, and Crowdin are commonly recommended for SaaS content localization.',
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com/solutions/saas' }, { label: 'Crowdin', url: 'https://crowdin.com' }],
      },
      claude: {
        snippet: 'SatoLOC’s API integration and Custom Content flow are well suited to product-led teams. Phrase and Crowdin also cited.',
        linksBrand: [{ label: 'SatoLOC — API Integration', url: 'https://satolocinsight.com/api' }],
        linksCompetitors: [{ label: 'Crowdin', url: 'https://crowdin.com' }],
      },
      gemini: {
        snippet: 'Partial mention of SatoLOC; Phrase was linked.',
        linksBrand: [],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com/solutions/saas' }],
      },
    },
  },
  {
    keyword: 'AI citation tracking tool',
    perplexity: 'cited',
    chatgpt: 'cited',
    claude: 'cited',
    gemini: 'cited',
    citationType: 'Recommended',
    lastChecked: '2026-02-07',
    engines: {
      perplexity: {
        snippet: 'SatoLOC Insight offers a dedicated AI Search Console that tracks citations across Perplexity, ChatGPT, Claude, and Gemini.',
        linksBrand: [{ label: 'SatoLOC — AI Search Console', url: 'https://satolocinsight.com/ai-search-console' }, { label: 'SatoLOC — SEO Analyzer', url: 'https://satolocinsight.com/seo-analyzer' }],
        linksCompetitors: [],
      },
      chatgpt: {
        snippet: 'SatoLOC Insight is a strong option for tracking how AI engines cite your brand.',
        linksBrand: [{ label: 'SatoLOC Insight — AI Search Console', url: 'https://satolocinsight.com/ai-search-console' }],
        linksCompetitors: [],
      },
      claude: {
        snippet: 'SatoLOC Insight’s AI Search Console is unique among localization platforms for citation tracking.',
        linksBrand: [{ label: 'SatoLOC — AI Search Console', url: 'https://satolocinsight.com/ai-search-console' }],
        linksCompetitors: [],
      },
      gemini: {
        snippet: 'SatoLOC Insight provides AI citation tracking across major engines.',
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com/ai-search-console' }],
        linksCompetitors: [],
      },
    },
  },
  {
    keyword: 'SatoLOC vs Phrase',
    perplexity: 'partial',
    chatgpt: 'not cited',
    claude: 'not cited',
    gemini: 'not cited',
    citationType: 'Not cited',
    lastChecked: '2026-02-05',
    engines: {
      perplexity: {
        snippet: 'Partial comparison. Phrase was linked; SatoLOC was mentioned by name but no link was provided.',
        linksBrand: [],
        linksCompetitors: [{ label: 'Phrase — Comparison context', url: 'https://phrase.com/compare' }],
      },
      chatgpt: { snippet: 'Did not cite your brand or provide comparison.', linksBrand: [], linksCompetitors: [] },
      claude: { snippet: 'Did not cite your brand for this query.', linksBrand: [], linksCompetitors: [] },
      gemini: { snippet: 'Did not cite your brand.', linksBrand: [], linksCompetitors: [] },
    },
  },
];

/** Generate mock citation row for a prompt that was just "run" on LLMs (dynamic tracking). */
export function createMockCitationFromRun(p: {
  sourceKeyword: string;
  prompt: string;
  languageCode: string;
}): Pick<
  (typeof aiSearchCitations)[0],
  'perplexity' | 'chatgpt' | 'claude' | 'gemini' | 'citationType' | 'lastChecked' | 'engines'
> {
  const now = new Date().toISOString().slice(0, 10);
  return {
    perplexity: 'cited',
    chatgpt: 'cited',
    claude: 'recommended',
    gemini: 'partial',
    citationType: 'Direct mention',
    lastChecked: now,
    engines: {
      perplexity: {
        snippet: `Response for: "${p.prompt.slice(0, 60)}…" — SatoLOC Insight was cited.`,
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }],
      },
      chatgpt: {
        snippet: `Response for this query cited your brand.`,
        linksBrand: [{ label: 'SatoLOC Insight', url: 'https://satolocinsight.com' }],
        linksCompetitors: [],
      },
      claude: {
        snippet: `Claude recommended SatoLOC Insight in this context.`,
        linksBrand: [{ label: 'SatoLOC Insight — Platform', url: 'https://satolocinsight.com' }],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }],
      },
      gemini: {
        snippet: `Partial mention for this prompt (${p.languageCode}).`,
        linksBrand: [],
        linksCompetitors: [{ label: 'Phrase', url: 'https://phrase.com' }],
      },
    },
  };
}

export const competitorShareData = [
  { keyword: 'AI-powered localization', SatoLOC: 24, Phrase: 31, Lokalise: 22, Others: 23 },
  { keyword: 'multilingual SEO tools', SatoLOC: 28, Phrase: 25, Lokalise: 20, Others: 27 },
  { keyword: 'fintech localization platform', SatoLOC: 8, Phrase: 35, Lokalise: 30, Others: 27 },
];

/* ── Brand Trend Over Time ─────────────────────────────────── */

export type BrandTrendPoint = {
  date: string;           // ISO date
  citations: number;      // total citations that week
  citationRate: number;   // %
  perplexity: number;
  chatgpt: number;
  claude: number;
  gemini: number;
};

export const brandTrendData: BrandTrendPoint[] = [
  { date: '2025-12-09', citations: 71,  citationRate: 18, perplexity: 18, chatgpt: 16, claude: 20, gemini: 17 },
  { date: '2025-12-16', citations: 79,  citationRate: 20, perplexity: 20, chatgpt: 19, claude: 22, gemini: 18 },
  { date: '2025-12-23', citations: 84,  citationRate: 21, perplexity: 22, chatgpt: 20, claude: 23, gemini: 19 },
  { date: '2025-12-30', citations: 92,  citationRate: 23, perplexity: 24, chatgpt: 22, claude: 25, gemini: 21 },
  { date: '2026-01-06', citations: 101, citationRate: 25, perplexity: 27, chatgpt: 24, claude: 27, gemini: 23 },
  { date: '2026-01-13', citations: 112, citationRate: 28, perplexity: 30, chatgpt: 28, claude: 29, gemini: 25 },
  { date: '2026-01-20', citations: 125, citationRate: 30, perplexity: 34, chatgpt: 31, claude: 33, gemini: 27 },
  { date: '2026-01-27', citations: 138, citationRate: 32, perplexity: 37, chatgpt: 34, claude: 37, gemini: 30 },
  { date: '2026-02-03', citations: 156, citationRate: 34, perplexity: 42, chatgpt: 38, claude: 41, gemini: 35 },
];

/* ── New Citation Alerts ──────────────────────────────────── */

export type CitationAlert = {
  id: string;
  type: 'new_citation' | 'lost_citation' | 'position_change' | 'new_competitor';
  engine: EngineKey;
  keyword: string;
  message: string;
  timestamp: string;  // ISO
  read: boolean;
};

export const citationAlerts: CitationAlert[] = [
  { id: 'a1', type: 'new_citation',    engine: 'gemini',     keyword: 'AI-powered localization',     message: 'Gemini now cites SatoLOC Insight for "AI-powered localization" — previously not cited.',       timestamp: '2026-02-07T09:14:00Z', read: false },
  { id: 'a2', type: 'new_citation',    engine: 'chatgpt',    keyword: 'fintech localization platform',message: 'ChatGPT started citing SatoLOC in its response for "fintech localization platform".',          timestamp: '2026-02-07T07:30:00Z', read: false },
  { id: 'a3', type: 'position_change', engine: 'perplexity', keyword: 'multilingual SEO tools',       message: 'Brand moved from position 3 → 1 on Perplexity for "multilingual SEO tools".',                timestamp: '2026-02-06T22:15:00Z', read: false },
  { id: 'a4', type: 'new_competitor',  engine: 'claude',     keyword: 'content localization for SaaS',message: 'New competitor "Transifex" appeared in Claude\'s response for "content localization for SaaS".', timestamp: '2026-02-06T18:45:00Z', read: true },
  { id: 'a5', type: 'lost_citation',   engine: 'chatgpt',    keyword: 'SatoLOC vs Phrase',            message: 'ChatGPT no longer cites SatoLOC for "SatoLOC vs Phrase" — was partially cited before.',       timestamp: '2026-02-06T14:20:00Z', read: true },
  { id: 'a6', type: 'new_citation',    engine: 'perplexity', keyword: 'AI citation tracking tool',    message: 'Perplexity now links to satolocinsight.com/ai-search-console in the first position.',         timestamp: '2026-02-05T11:00:00Z', read: true },
  { id: 'a7', type: 'position_change', engine: 'gemini',     keyword: 'multilingual SEO tools',       message: 'Brand moved from position 4 → 2 on Gemini for "multilingual SEO tools".',                    timestamp: '2026-02-05T08:30:00Z', read: true },
];

/* ── Manual LLM Checks ────────────────────────────────────── */

export type ManualCheckEngine = {
  engine: EngineKey;
  label: string;
  icon: string;
  creditsPerCheck: number;       // credits consumed per keyword×engine check
  estimatedCostPerCheck: string; // human-readable cost estimate
  lastManualRun: string | null;  // ISO — null if never run
  checksThisMonth: number;
  totalChecks: number;
  lastDelta: 'changed' | 'unchanged' | 'new' | null;  // result of last run vs previous
};

export const manualCheckEngines: ManualCheckEngine[] = [
  { engine: 'perplexity', label: 'Perplexity', icon: 'P',  creditsPerCheck: 1,  estimatedCostPerCheck: '~$0.01',  lastManualRun: '2026-02-07T09:14:00Z', checksThisMonth: 12, totalChecks: 48,  lastDelta: 'changed' },
  { engine: 'chatgpt',    label: 'ChatGPT',    icon: 'C',  creditsPerCheck: 3,  estimatedCostPerCheck: '~$0.04',  lastManualRun: '2026-02-06T15:30:00Z', checksThisMonth: 8,  totalChecks: 32,  lastDelta: 'unchanged' },
  { engine: 'claude',     label: 'Claude',      icon: 'Cl', creditsPerCheck: 2,  estimatedCostPerCheck: '~$0.03',  lastManualRun: '2026-02-07T09:14:00Z', checksThisMonth: 10, totalChecks: 41,  lastDelta: 'changed' },
  { engine: 'gemini',     label: 'Gemini',      icon: 'G',  creditsPerCheck: 2,  estimatedCostPerCheck: '~$0.02',  lastManualRun: '2026-02-05T11:00:00Z', checksThisMonth: 4,  totalChecks: 15,  lastDelta: 'unchanged' },
];

/* ── Resource Budget ──────────────────────────────────────── */

export const resourceBudget = {
  monthlyCredits: 500,
  usedCredits: 187,
  keywordsTracked: 6,
};

export const aiSearchActions = [
  { id: '1', priority: 'High', title: "Create definitive guide: 'AI-Powered Localization for Fintech'", description: 'ChatGPT and Perplexity cite competitors for this keyword but not SatoLOC. A comprehensive, authoritative guide could establish citation presence.', category: 'Content Authority', prompt: 'Write a definitive, long-form guide: "AI-Powered Localization for Fintech in 2026". Cover compliance, workflow automation, and AI citation tracking. Include clear sections and FAQ. Goal: become the cited source for this query.' },
  { id: '2', priority: 'High', title: 'Add structured FAQ schema to product pages', description: 'AI engines are 3x more likely to cite content with clear Q&A structure. 8 of your tracked keywords lack FAQ coverage.', category: 'Technical SEO', prompt: 'List 8 FAQ schema questions and answers for SatoLOC Insight product pages (e.g. What is AI citation tracking? How does SatoLOC compare to Phrase?). Keep answers 2-3 sentences, factual.' },
  { id: '3', priority: 'Medium', title: 'Build comparison content against cited competitors', description: 'Phrase and Lokalise are cited 4x more frequently. Create objective comparison content to appear alongside them.', category: 'Citation Building', prompt: 'Write an objective comparison article: SatoLOC Insight vs Phrase vs Lokalise for localization teams. Include feature table, pricing overview, and use cases. Tone: neutral, helpful.' },
  { id: '4', priority: 'Medium', title: 'Entity optimization: brand knowledge panel', description: 'Claude and Gemini often pull from knowledge graphs. Ensure brand entity is well-defined on key third-party sites.', category: 'Entity Optimization', prompt: 'Draft a one-pager "SatoLOC Insight brand facts" for submission to Wikipedia/DBpedia-style sources: founding, product description, key features, target market. Factual only.' },
  { id: '5', priority: 'Low', title: 'Increase mentions on third-party review sites', description: 'AI engines heavily weight G2 and Capterra mentions. Current review count: 3 (competitors avg: 47).', category: 'Citation Building', prompt: 'Create a short internal brief: strategy to increase G2/Capterra reviews for SatoLOC Insight (target 20 reviews in 90 days). Include outreach template and incentives.' },
  { id: '6', priority: 'Low', title: 'Target long-tail: "localization tool with AI Search Console"', description: 'Low volume but high intent. No competitor owns this phrase in AI responses yet.', category: 'Content Authority', prompt: 'Write a 800-word blog post targeting "localization tool with AI Search Console". Explain the problem (brands invisible in AI answers), then introduce AI citation tracking and how SatoLOC helps.' },
];
