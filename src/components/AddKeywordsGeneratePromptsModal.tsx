import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Play, FileText } from 'lucide-react';
import { mockGeneratedPromptsFromKeyword, INTENT_LABELS, LANGUAGES, REGIONS, type GeneratedPrompt } from '../data/mockPrompts';
import { useAiSearchTracking } from '../contexts/AiSearchTrackingContext';

type Step = 'keywords' | 'prompts';

export function AddKeywordsGeneratePromptsModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { addRunFromPrompt } = useAiSearchTracking();
  const [step, setStep] = useState<Step>('keywords');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['AI-powered localization']);
  const [selectedLanguages, setSelectedLanguages] = useState<typeof LANGUAGES>([LANGUAGES[0]]);
  const [selectedRegions, setSelectedRegions] = useState<typeof REGIONS>([REGIONS[REGIONS.length - 1]]);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleLanguage = (lang: (typeof LANGUAGES)[0]) => {
    setSelectedLanguages((prev) =>
      prev.some((l) => l.code === lang.code) ? prev.filter((l) => l.code !== lang.code) : [...prev, lang]
    );
  };

  const toggleRegion = (reg: (typeof REGIONS)[0]) => {
    setSelectedRegions((prev) =>
      prev.some((r) => r.code === reg.code) ? prev.filter((r) => r.code !== reg.code) : [...prev, reg]
    );
  };

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (k: string) => {
    setKeywords(keywords.filter((x) => x !== k));
  };

  const handleGeneratePrompts = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const all: GeneratedPrompt[] = [];
      const langs = selectedLanguages.length > 0 ? selectedLanguages : [LANGUAGES[0]];
      const regs = selectedRegions.length > 0 ? selectedRegions : [REGIONS[REGIONS.length - 1]];
      keywords.forEach((kw) => {
        all.push(...mockGeneratedPromptsFromKeyword(kw, langs, regs));
      });
      setGeneratedPrompts(all);
      setIsGenerating(false);
      setStep('prompts');
    }, 800);
  };

  const handleRunOnLLMs = (p: GeneratedPrompt) => {
    addRunFromPrompt(p);
    setGeneratedPrompts((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: 'tracking' as const } : x)));
  };

  const handleRunAllDrafts = () => {
    generatedPrompts.filter((p) => p.status === 'draft').forEach((p) => {
      addRunFromPrompt(p);
    });
    setGeneratedPrompts((prev) => prev.map((x) => (x.status === 'draft' ? { ...x, status: 'tracking' as const } : x)));
  };

  const languageLabel = (code: string) => LANGUAGES.find((l) => l.code === code)?.label ?? code;
  const regionLabel = (code: string) => REGIONS.find((r) => r.code === code)?.label ?? code;

  const handleCreateContent = (p: GeneratedPrompt) => {
    onClose();
    const lang = languageLabel(p.languageCode);
    navigate('/custom-content/editor', {
      state: {
        title: `Content that answers: "${p.prompt.slice(0, 50)}..."`,
        prompt: `Write content that directly answers this question so AI engines can cite it: "${p.prompt}"\n\nTarget: authoritative, clear, and structured (e.g. with bullet points or FAQ) so that Perplexity, ChatGPT, Claude, and Gemini are likely to cite this page. Language: ${lang}.`,
        tone: 'Professional',
        language: lang,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] shadow-lg border border-[var(--border)] w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">Add keywords & generate prompts</h2>
              <p className="text-xs text-[var(--text-secondary)]">SatoLOC generates the prompts real users ask LLMs—then we run them and show where you’re cited.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-[var(--border)]/50 text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {step === 'keywords' && (
            <>
              <div>
                <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Keywords or topics</label>
                <p className="text-xs text-[var(--text-secondary)] mb-2">We’ll generate prompts that real users might ask Perplexity, ChatGPT, Claude, and Gemini about these topics.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="e.g. fintech localization, multilingual SEO"
                    className="flex-1 px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] text-sm"
                  />
                  <button type="button" onClick={addKeyword} className="px-3 py-2 rounded-[var(--radius-btn)] border border-[var(--border)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/30">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((k) => (
                    <span key={k} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-sm">
                      {k}
                      <button type="button" onClick={() => removeKeyword(k)} className="hover:opacity-70">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Language(s)</label>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">Generate and run prompts in these languages.</p>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => {
                      const isSelected = selectedLanguages.some((l) => l.code === lang.code);
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-2.5 py-1.5 rounded-[var(--radius-input)] text-sm border transition-colors ${
                            isSelected
                              ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border)]/30'
                          }`}
                        >
                          {lang.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-2">Region(s)</label>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">Target regions for LLM context (e.g. local results).</p>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((reg) => {
                      const isSelected = selectedRegions.some((r) => r.code === reg.code);
                      return (
                        <button
                          key={reg.code}
                          type="button"
                          onClick={() => toggleRegion(reg)}
                          className={`px-2.5 py-1.5 rounded-[var(--radius-input)] text-sm border transition-colors ${
                            isSelected
                              ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border)]/30'
                          }`}
                        >
                          {reg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGeneratePrompts}
                disabled={keywords.length === 0 || isGenerating || selectedLanguages.length === 0}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-btn)] text-sm font-medium disabled:opacity-50"
              >
                {isGenerating ? (
                  <>Generating prompts…</>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate prompts to run on LLMs
                  </>
                )}
              </button>
            </>
          )}

          {step === 'prompts' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-[var(--text-secondary)]">
                  These are the prompts we’ll run on Perplexity, ChatGPT, Claude, and Gemini. Add to tracking to monitor citations over time.
                </p>
                {generatedPrompts.some((p) => p.status === 'draft') && (
                  <button
                    type="button"
                    onClick={handleRunAllDrafts}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-btn)] border border-[var(--primary)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)]/10"
                  >
                    Run all drafts
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {generatedPrompts.map((p) => (
                  <div key={p.id} className="p-3 rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--page-bg)]/30">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">{INTENT_LABELS[p.intent]}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--border)]/50 text-[var(--text-secondary)]">
                            {languageLabel(p.languageCode)} · {regionLabel(p.regionCode)}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-primary)] mt-0.5">&ldquo;{p.prompt}&rdquo;</p>
                        <span className="text-xs text-[var(--text-secondary)]">From topic: {p.sourceKeyword}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {p.status === 'tracking' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E]">Tracking</span>
                        )}
                        {p.status === 'draft' && (
                          <button type="button" onClick={() => handleRunOnLLMs(p)} className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[var(--primary)] text-white hover:opacity-90">
                            <Play className="w-3 h-3" /> Run on LLMs
                          </button>
                        )}
                        {p.status === 'tracking' && p.cited === false && (
                          <button type="button" onClick={() => handleCreateContent(p)} className="flex items-center gap-1 px-2 py-1 rounded text-xs border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
                            <FileText className="w-3 h-3" /> Create content
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setStep('keywords')} className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]">
                  ← Back to keywords
                </button>
                <button type="button" onClick={onClose} className="ml-auto px-3 py-1.5 rounded-[var(--radius-btn)] bg-[var(--primary)] text-white text-sm font-medium">
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
