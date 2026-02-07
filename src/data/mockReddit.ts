export const redditOverview = {
  totalMentions: 847,
  trend: 12.4,
  sentiment: { positive: 58, neutral: 32, negative: 10 },
  shareOfVoice: 24,
  competitors: ['Phrase', 'Lokalise', 'Crowdin', 'Others'],
  competitorShares: [22, 18, 12, 24],
  trendingSubreddits: [
    { name: 'r/localization', count: 312 },
    { name: 'r/SEO', count: 198 },
    { name: 'r/startups', count: 156 },
  ],
};

export type RedditMention = {
  id: string;
  subreddit: string;
  title: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  date: string;
  snippet: string;
  /** 1-100 score: how valuable is it to engage here? */
  opportunityScore: number;
  opportunityReason: string;
  /** AI-suggested reply starters */
  suggestedReplies: string[];
  /** URL to the thread (mock) */
  threadUrl: string;
  /** Number of comments in thread */
  commentCount: number;
  /** Whether we've already replied */
  replied: boolean;
};

export const redditMentions: RedditMention[] = [
  {
    id: '1', subreddit: 'r/localization', title: 'SatoLOC vs Phrase for fintech — anyone compared?', sentiment: 'positive', engagement: 89, date: '2026-02-06',
    snippet: 'We\'re evaluating localization platforms for our finance product. SatoLOC Insight came up for AI-powered workflows...',
    opportunityScore: 92, opportunityReason: 'Direct product comparison with high purchase intent. OP is actively evaluating.',
    suggestedReplies: [
      'We built SatoLOC with fintech teams in mind — happy to share specifics on compliance workflows and how our AI Search Console tracks citations across Perplexity, ChatGPT, Claude, and Gemini.',
      'Great question! The key difference is our prompt-first approach to AI visibility tracking. We actually generate the prompts users ask LLMs and show you where you\'re cited vs competitors.',
    ],
    threadUrl: 'https://reddit.com/r/localization/comments/mock1', commentCount: 23, replied: false,
  },
  {
    id: '2', subreddit: 'r/SEO', title: 'Best tools for multilingual SEO in 2026', sentiment: 'neutral', engagement: 234, date: '2026-02-05',
    snippet: 'Thread mentions SatoLOC alongside Lokalise and Phrase. OP asked for real-world experiences with AI citation tracking.',
    opportunityScore: 85, opportunityReason: 'High-traffic list thread. Adding a detailed comparison comment can drive visibility.',
    suggestedReplies: [
      'For multilingual SEO with AI visibility, we\'ve found that tracking how LLMs actually cite your brand (not just keywords) changes the strategy entirely. SatoLOC\'s AI Search Console does this across 4 engines.',
      'Worth looking at tools that track both traditional SEO and AI citations. The gap between Google rankings and LLM citations is becoming the biggest blind spot in 2026.',
    ],
    threadUrl: 'https://reddit.com/r/SEO/comments/mock2', commentCount: 47, replied: false,
  },
  {
    id: '3', subreddit: 'r/startups', title: 'Localization tool pricing — worth it for early stage?', sentiment: 'negative', engagement: 67, date: '2026-02-04',
    snippet: '3 comments mentioned SatoLOC pricing. One user said it\'s competitive for the feature set compared to enterprise tools.',
    opportunityScore: 68, opportunityReason: 'Pricing concern thread. Helpful transparency here can flip sentiment.',
    suggestedReplies: [
      'Totally fair concern. We designed SatoLOC\'s manual check model so you only pay for what you use — no automated burns. Most early-stage teams spend under $5/mo on AI citation tracking.',
    ],
    threadUrl: 'https://reddit.com/r/startups/comments/mock3', commentCount: 12, replied: false,
  },
  {
    id: '4', subreddit: 'r/localization', title: 'AI Search Console / Perplexity citation tracking', sentiment: 'positive', engagement: 145, date: '2026-02-03',
    snippet: 'Discussion about which tools track AI citations. SatoLOC Insight was recommended for its AI Search Console feature.',
    opportunityScore: 78, opportunityReason: 'Users already recommending your product. Engage to reinforce and provide value.',
    suggestedReplies: [
      'Thanks for the mention! We recently added per-engine link tracking so you can see exactly which URLs each LLM cites — not just "cited vs not cited." Happy to answer any questions.',
    ],
    threadUrl: 'https://reddit.com/r/localization/comments/mock4', commentCount: 31, replied: true,
  },
  {
    id: '5', subreddit: 'r/SEO', title: 'How to get your brand cited in ChatGPT/Claude answers', sentiment: 'neutral', engagement: 312, date: '2026-02-02',
    snippet: 'Multiple tools mentioned. SatoLOC and a few others offer dedicated AI visibility tracking.',
    opportunityScore: 95, opportunityReason: 'Highest-engagement thread this month. Directly about your core feature. Top priority to engage.',
    suggestedReplies: [
      'The biggest insight we\'ve found building AI citation tracking: structured FAQ schema + comparison content dramatically increases citation rates. Here\'s a quick framework...',
      'We track citations across Perplexity, ChatGPT, Claude, and Gemini with actual prompt-level data. The gap between "ranking on Google" and "cited by AI" is bigger than most think.',
    ],
    threadUrl: 'https://reddit.com/r/SEO/comments/mock5', commentCount: 58, replied: false,
  },
];

/* ── Proactive Thread Ideas ─────────────────────────────────── */

export type ThreadIdea = {
  id: string;
  subreddit: string;
  title: string;
  description: string;
  impactScore: number;
  prompt: string;
  tags: string[];
};

export const threadIdeas: ThreadIdea[] = [
  {
    id: 't1', subreddit: 'r/localization', title: 'How we track AI citations across 4 LLMs (open-source framework)',
    description: 'Share a value-first post about the methodology behind AI citation tracking. Position SatoLOC as a thought leader without being salesy.',
    impactScore: 90, tags: ['Thought Leadership', 'High Engagement'],
    prompt: 'Write a Reddit post for r/localization titled "How we track AI citations across 4 LLMs." Share the methodology: prompt generation, running on Perplexity/ChatGPT/Claude/Gemini, delta detection. Be technical and helpful. Mention SatoLOC naturally at the end. Reddit tone: authentic, no corporate speak.',
  },
  {
    id: 't2', subreddit: 'r/SEO', title: 'The gap between Google rankings and AI citations (data from 50 keywords)',
    description: 'Data-driven post showing that Google rank #1 doesn\'t mean LLMs cite you. High viral potential in r/SEO.',
    impactScore: 95, tags: ['Data-Driven', 'Viral Potential'],
    prompt: 'Write a Reddit post for r/SEO: "The gap between Google rankings and AI citations — data from 50 keywords." Show that ranking #1 on Google doesn\'t guarantee citation by ChatGPT or Perplexity. Include mock data table. Reddit tone: data-nerd, share insights freely, mention your tool naturally.',
  },
  {
    id: 't3', subreddit: 'r/startups', title: 'We built an AI Search Console — here\'s what we learned about LLM visibility',
    description: 'Launch-style post sharing learnings from building the product. Great for r/startups audience.',
    impactScore: 82, tags: ['Product Launch', 'Community'],
    prompt: 'Write a Reddit post for r/startups: "We built an AI Search Console — here\'s what we learned." Share 3-4 key learnings about how AI engines cite brands differently. Be genuine about challenges. Reddit tone: founder-to-founder, honest, no hype.',
  },
];

export const redditInsights = {
  keyThemes: [
    { label: 'Tool comparison (SatoLOC vs Phrase/Lokalise)', count: 28 },
    { label: 'AI-powered localization workflows', count: 19 },
    { label: 'Multilingual SEO & Discover', count: 15 },
  ],
  painPoints: [
    { label: 'Pricing transparency for SMBs', count: 12 },
    { label: 'Integration with existing CMS', count: 8 },
  ],
  featureRequests: [
    { label: 'More GSC-style reports for AI engines', count: 14 },
    { label: 'Reddit → content pipeline automation', count: 9 },
  ],
  competitorComparisons: [
    { label: 'Mentioned alongside Phrase in comparison threads', count: 18 },
    { label: 'Mentioned alongside Lokalise in SEO threads', count: 11 },
  ],
};

export const redditActions = [
  { id: '1', priority: 'High', title: 'Create comparison guide: SatoLOC vs. Phrase vs. Lokalise', description: 'Users in r/localization frequently ask for tool comparisons. A detailed comparison post could capture high-intent traffic.', category: 'Content Gap', prompt: 'Write a comprehensive comparison guide between SatoLOC Insight, Phrase, and Lokalise for fintech localization teams. Cover pricing, AI features, and multilingual SEO capabilities. Target audience: localization managers evaluating tools.' },
  { id: '2', priority: 'Medium', title: 'Address pricing concerns in community', description: '3 threads in r/startups mention localization tool pricing. Consider a value-focused post.', category: 'Community Engagement', prompt: 'Write a professional LinkedIn post addressing common pricing concerns for localization tools, highlighting value for SMBs and transparent pricing. Tone: helpful, data-driven.' },
  { id: '3', priority: 'Low', title: "Contribute to 'best multilingual SEO tools' discussions", description: 'Recurring thread topic with 12 mentions in 30 days.', category: 'SEO Opportunity', prompt: 'Create a short, scannable list post: "5 best multilingual SEO tools in 2026" with SatoLOC Insight included. Focus on AI citation tracking and localization quality as differentiators.' },
  { id: '4', priority: 'High', title: 'Reddit AMA or expert take on AI localization', description: 'r/localization has 312 mentions this period. High engagement on AI + localization topics.', category: 'Community Engagement', prompt: 'Draft an expert opinion piece on how AI is changing localization (cite Reddit discussions and real user questions). Use for Reddit post or blog.' },
  { id: '5', priority: 'Medium', title: 'Feature highlight: AI Search Console in Reddit threads', description: 'When users ask "how to track AI citations", our feature is rarely mentioned. Create shareable explainer.', category: 'Content Gap', prompt: 'Write a 500-word explainer: "How to track when ChatGPT and Perplexity cite your brand" — product-agnostic at first, then mention SatoLOC Insight as a solution. For use in Reddit comments or support content.' },
  { id: '6', priority: 'Low', title: 'Case study: Fintech localization with SatoLOC', description: 'Fintech is a top industry in our Reddit mentions. A concrete case study could perform well.', category: 'Product Feedback', prompt: 'Outline a 1-page case study structure: Fintech company improves time-to-market with SatoLOC Insight (localization + AI citation tracking). Include placeholder metrics and quotes.' },
];
