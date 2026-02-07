import { useState } from 'react';
import { TrendingUp, RefreshCw, ChevronDown, ChevronUp, MessageSquare, Zap, ExternalLink, Sparkles, Target, PenLine, Send, CheckCircle2, Copy, Star, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { redditOverview, redditMentions, redditInsights, threadIdeas, type RedditMention } from '../data/mockReddit';
import { Link, useNavigate } from 'react-router-dom';

const timeframes = ['7d', '30d', '90d'] as const;
const sentimentColors = { positive: '#22C55E', neutral: '#EAB308', negative: '#EF4444' };

function OpportunityBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'text-emerald-600 bg-emerald-500/10' : score >= 60 ? 'text-amber-600 bg-amber-500/10' : 'text-[var(--text-secondary)] bg-[var(--border)]/50';
  const label = score >= 85 ? 'High opportunity' : score >= 60 ? 'Worth engaging' : 'Low priority';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
      <Target className="w-3 h-3" /> {score} — {label}
    </span>
  );
}

export function RedditBrandDashboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>('30d');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lastUpdated] = useState(() => new Date().toLocaleString());
  const [copiedReply, setCopiedReply] = useState<string | null>(null);
  const [repliedIds, setRepliedIds] = useState<Set<string>>(() => new Set(redditMentions.filter(m => m.replied).map(m => m.id)));

  const sentimentData = [
    { name: 'Positive', value: redditOverview.sentiment.positive, color: sentimentColors.positive },
    { name: 'Neutral', value: redditOverview.sentiment.neutral, color: sentimentColors.neutral },
    { name: 'Negative', value: redditOverview.sentiment.negative, color: sentimentColors.negative },
  ];

  const handleDraftReply = (mention: RedditMention, reply: string) => {
    navigate('/custom-content/editor', {
      state: {
        title: `Reply to: ${mention.title}`,
        prompt: `Draft a Reddit reply for this thread in ${mention.subreddit}:\n\nThread: "${mention.title}"\nContext: ${mention.snippet}\n\nSuggested angle: ${reply}\n\nTone: Authentic Reddit voice — helpful, no corporate speak. Add value first, mention product naturally only if relevant. Keep it concise (2-3 paragraphs max).`,
        tone: 'Casual',
        language: 'English',
      },
    });
  };

  const handleCreateThread = (idea: typeof threadIdeas[0]) => {
    navigate('/custom-content/editor', {
      state: {
        title: idea.title,
        prompt: idea.prompt,
        tone: 'Casual',
        language: 'English',
      },
    });
  };

  const handleCopyReply = (reply: string, mentionId: string) => {
    navigator.clipboard.writeText(reply);
    setCopiedReply(`${mentionId}-${reply.slice(0, 20)}`);
    setTimeout(() => setCopiedReply(null), 2000);
  };

  // Sort mentions by opportunity score (highest first)
  const sortedMentions = [...redditMentions].sort((a, b) => b.opportunityScore - a.opportunityScore);

  const unrepliedHighOpp = sortedMentions.filter(m => m.opportunityScore >= 80 && !repliedIds.has(m.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Reddit Brand Intelligence</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Monitor, engage, and create content from Reddit conversations</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-secondary)]">Last updated: {lastUpdated}</span>
          <button type="button" className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--primary)] text-[var(--primary)] rounded-[var(--radius-btn)] hover:bg-[var(--primary)]/10">
            <RefreshCw className="w-4 h-4" /> Refresh Analysis
          </button>
        </div>
      </div>

      {/* Engagement opportunity banner */}
      {unrepliedHighOpp.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-[var(--radius-card)] bg-[var(--orange)]/5 border border-[var(--orange)]/20">
          <Zap className="w-5 h-5 text-[var(--orange)] shrink-0" />
          <div className="text-sm text-[var(--text-primary)] flex-1">
            <span className="font-medium">{unrepliedHighOpp.length} high-opportunity thread{unrepliedHighOpp.length > 1 ? 's' : ''} need your response.</span>{' '}
            Engage now while they're active — draft replies are ready below.
          </div>
          <button
            type="button"
            onClick={() => setExpandedId(unrepliedHighOpp[0].id)}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-[var(--orange)] text-white rounded-[var(--radius-btn)] text-xs font-medium hover:opacity-90"
          >
            <MessageSquare className="w-3.5 h-3.5" /> View top thread
          </button>
        </div>
      )}

      {/* Section A — Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Total Mentions</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold text-[var(--text-primary)]">{redditOverview.totalMentions}</span>
            <span className="flex items-center text-[var(--success)] text-sm">
              <TrendingUp className="w-4 h-4" /> +{redditOverview.trend}%
            </span>
          </div>
          <div className="flex gap-1 mt-2">
            {timeframes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`px-2 py-1 text-xs rounded ${timeframe === t ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)]/50 text-[var(--text-secondary)]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Sentiment Score</div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-16 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={18} outerRadius={28} paddingAngle={2} dataKey="value">
                    {sentimentData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Positive {redditOverview.sentiment.positive}%</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EAB308]" /> Neutral {redditOverview.sentiment.neutral}%</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]" /> Negative {redditOverview.sentiment.negative}%</div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Share of Voice</div>
          <div className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{redditOverview.shareOfVoice}%</div>
          <div className="mt-2 h-2 rounded-full bg-[var(--border)] overflow-hidden flex">
            <div className="h-full rounded-full bg-[var(--orange)]" style={{ width: `${redditOverview.shareOfVoice}%` }} />
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">vs. Phrase, Lokalise, Crowdin</div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)] border border-[var(--border)]">
          <div className="text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wide">Engagement Score</div>
          <div className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
            {Math.round(sortedMentions.reduce((s, m) => s + m.opportunityScore, 0) / sortedMentions.length)}
            <span className="text-sm font-normal text-[var(--text-secondary)]"> / 100 avg</span>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {unrepliedHighOpp.length} unreplied high-opp threads
          </div>
          <div className="flex gap-1 mt-2">
            {sortedMentions.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className={`h-4 flex-1 rounded-sm ${m.opportunityScore >= 85 ? 'bg-emerald-500' : m.opportunityScore >= 60 ? 'bg-amber-400' : 'bg-[var(--border)]'}`}
                title={`${m.title}: ${m.opportunityScore}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section B + C — Mention feed (with engagement features) + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold text-[var(--text-primary)]">Mention Feed</h2>
            <div className="flex gap-2 text-xs">
              <select className="rounded-[var(--radius-input)] border border-[var(--border)] bg-transparent px-2 py-1 text-[var(--text-primary)]">
                <option>All sentiment</option>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
              </select>
              <select className="rounded-[var(--radius-input)] border border-[var(--border)] bg-transparent px-2 py-1 text-[var(--text-primary)]">
                <option>Sort: Opportunity</option>
                <option>Sort: Engagement</option>
                <option>Sort: Recent</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {sortedMentions.map((m) => (
              <div key={m.id}>
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                  className="w-full px-4 py-3 text-left flex items-start gap-3 hover:bg-[var(--page-bg)]/50"
                >
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--orange)]/10 text-[var(--orange)]">{m.subreddit}</span>
                    <span className={`w-2 h-2 rounded-full ${m.sentiment === 'positive' ? 'bg-[#22C55E]' : m.sentiment === 'negative' ? 'bg-[#EF4444]' : 'bg-[#EAB308]'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[var(--text-primary)] truncate">{m.title}</span>
                      {repliedIds.has(m.id) && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600">
                          <CheckCircle2 className="w-3 h-3" /> Replied
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-secondary)] flex-wrap">
                      <OpportunityBadge score={m.opportunityScore} />
                      <span>{m.commentCount} comments</span>
                      <span>Engagement {m.engagement}</span>
                      <span>{m.date}</span>
                    </div>
                  </div>
                  {expandedId === m.id ? <ChevronUp className="w-4 h-4 shrink-0 text-[var(--text-secondary)]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-[var(--text-secondary)]" />}
                </button>

                {expandedId === m.id && (
                  <div className="px-4 pb-4 pt-0 bg-[var(--page-bg)]/30 border-t border-[var(--border)]">
                    {/* Context */}
                    <div className="py-3">
                      <p className="text-sm text-[var(--text-secondary)]">{m.snippet}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <span className="text-[var(--text-secondary)]">{m.opportunityReason}</span>
                      </div>
                    </div>

                    {/* Suggested replies */}
                    <div className="mt-2">
                      <h4 className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" /> Suggested replies
                      </h4>
                      <div className="space-y-2">
                        {m.suggestedReplies.map((reply, idx) => (
                          <div key={idx} className="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] p-3">
                            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{reply}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => handleDraftReply(m, reply)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-btn)] bg-[var(--primary)] text-white text-xs font-medium hover:opacity-90"
                              >
                                <PenLine className="w-3 h-3" /> Edit & refine
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyReply(reply, m.id)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-btn)] border border-[var(--border)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              >
                                {copiedReply === `${m.id}-${reply.slice(0, 20)}` ? (
                                  <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Copied!</>
                                ) : (
                                  <><Copy className="w-3 h-3" /> Copy</>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => setRepliedIds(prev => new Set([...prev, m.id]))}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-btn)] border border-emerald-500/30 text-xs text-emerald-600 hover:bg-emerald-500/10"
                              >
                                <Send className="w-3 h-3" /> Mark as replied
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--border)]">
                      <a href={m.threadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                        <ExternalLink className="w-3 h-3" /> View on Reddit
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDraftReply(m, m.suggestedReplies[0])}
                        className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
                      >
                        <PenLine className="w-3 h-3" /> Draft custom reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar — Insights + Thread Ideas */}
        <div className="lg:col-span-2 space-y-4">
          {/* Insight Summary */}
          <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border-l-4 border-[var(--orange)]">
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--text-primary)]">Insight Summary</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">AI-generated from recent mentions</p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-2">Key Themes</h3>
                <ul className="space-y-1.5">
                  {redditInsights.keyThemes.map((i) => (
                    <li key={i.label} className="flex items-center justify-between text-sm gap-2">
                      <span className="text-[var(--text-primary)] flex-1">{i.label}</span>
                      <span className="text-[var(--text-secondary)] shrink-0">{i.count}</span>
                      <Link
                        to="/seo-analyzer/ai-search-console"
                        className="shrink-0 flex items-center gap-0.5 text-[10px] text-[var(--primary)] hover:underline"
                        title="Track this theme in AI Search Console"
                      >
                        <Sparkles className="w-3 h-3" /> Track
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-2">Pain Points</h3>
                <ul className="space-y-1.5">
                  {redditInsights.painPoints.map((i) => (
                    <li key={i.label} className="flex justify-between text-sm">
                      <span className="text-[var(--text-primary)]">{i.label}</span>
                      <span className="text-[var(--text-secondary)]">{i.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-2">Competitor Comparisons</h3>
                <ul className="space-y-1.5">
                  {redditInsights.competitorComparisons.map((i) => (
                    <li key={i.label} className="flex justify-between text-sm">
                      <span className="text-[var(--text-primary)]">{i.label}</span>
                      <span className="text-[var(--text-secondary)]">{i.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Proactive Thread Ideas */}
          <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--border)]">
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Star className="w-4 h-4 text-[var(--orange)]" />
                Suggested Threads to Create
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Proactive engagement ideas based on trending topics</p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {threadIdeas.map((idea) => (
                <div key={idea.id} className="p-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--orange)]/10 text-[var(--orange)] font-medium">{idea.subreddit}</span>
                        {idea.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--border)]/50 text-[var(--text-secondary)]">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-sm font-medium text-[var(--text-primary)]">{idea.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{idea.description}</p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--page-bg)] flex items-center justify-center">
                      <span className={`text-xs font-bold ${idea.impactScore >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{idea.impactScore}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCreateThread(idea)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] hover:underline"
                  >
                    <PenLine className="w-3 h-3" /> Draft this thread in editor <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          to="/custom-content/editor"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-[var(--radius-btn)] text-sm font-medium hover:bg-[var(--primary)]/10"
        >
          <PenLine className="w-4 h-4" /> New Reddit Post
        </Link>
        <Link
          to="/custom-content/reddit-action-plan"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium hover:opacity-90"
        >
          View Action Plan <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
