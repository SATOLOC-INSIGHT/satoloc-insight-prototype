/** Mock: prompts that SatoLOC "generates" from keywords/topics to run on LLMs */
export type PromptIntent = 'best-of' | 'comparison' | 'how-to' | 'recommendation';

export type LanguageOption = { code: string; label: string };
export type RegionOption = { code: string; label: string };

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Turkish' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'ja', label: 'Japanese' },
  { code: 'pt', label: 'Portuguese' },
];

export const REGIONS: RegionOption[] = [
  { code: 'US', label: 'United States' },
  { code: 'UK', label: 'United Kingdom' },
  { code: 'TR', label: 'Turkey' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'EU', label: 'Europe (general)' },
  { code: 'GLOBAL', label: 'Global' },
];

export type GeneratedPrompt = {
  id: string;
  sourceKeyword: string;
  prompt: string;
  intent: PromptIntent;
  status: 'draft' | 'running' | 'tracking';
  cited?: boolean;
  languageCode: string;
  regionCode: string;
};

/** Localized prompt templates: best-of, how-to use {keyword}; topic-specific use full sentence */
const LOCALIZED_TEMPLATES: Record<
  string,
  { bestOf: string; howTo: string; comparison?: string; recommendation?: string }
> = {
  en: {
    bestOf: 'What are the best options for {keyword}?',
    howTo: 'How do I get started with {keyword}?',
    comparison: 'Compare SatoLOC Insight vs Phrase for AI-driven localization workflows.',
    recommendation: 'Recommend a tool that tracks how ChatGPT and Perplexity cite my brand.',
  },
  tr: {
    bestOf: '{keyword} için en iyi seçenekler nelerdir?',
    howTo: '{keyword} ile nasıl başlarım?',
    comparison: 'SatoLOC Insight ve Phrase\'i yapay zeka destekli yerelleştirme iş akışları için karşılaştır.',
    recommendation: 'ChatGPT ve Perplexity markamı nasıl andığını takip eden bir araç öner.',
  },
  de: {
    bestOf: 'Was sind die besten Optionen für {keyword}?',
    howTo: 'Wie fange ich mit {keyword} an?',
    comparison: 'SatoLOC Insight vs. Phrase für KI-gestützte Lokalisierungs-Workflows vergleichen.',
    recommendation: 'Empfehle ein Tool, das verfolgt, wie ChatGPT und Perplexity meine Marke zitieren.',
  },
  fr: {
    bestOf: 'Quelles sont les meilleures options pour {keyword} ?',
    howTo: 'Comment commencer avec {keyword} ?',
    comparison: 'Comparez SatoLOC Insight et Phrase pour les flux de localisation pilotés par l\'IA.',
    recommendation: 'Recommandez un outil qui suit comment ChatGPT et Perplexity citent ma marque.',
  },
  es: {
    bestOf: '¿Cuáles son las mejores opciones para {keyword}?',
    howTo: '¿Cómo empiezo con {keyword}?',
    comparison: 'Compara SatoLOC Insight y Phrase para flujos de trabajo de localización con IA.',
    recommendation: 'Recomienda una herramienta que rastree cómo ChatGPT y Perplexity citan mi marca.',
  },
  ja: {
    bestOf: '{keyword}のおすすめは？',
    howTo: '{keyword}で始めるにはどうすればいい？',
    comparison: 'AIローカライゼーションワークフローのSatoLOC InsightとPhraseを比較して。',
    recommendation: 'ChatGPTとPerplexityが自社ブランドをどう引用するか追跡するツールを教えて。',
  },
  pt: {
    bestOf: 'Quais são as melhores opções para {keyword}?',
    howTo: 'Como começar com {keyword}?',
    comparison: 'Compare SatoLOC Insight e Phrase para fluxos de localização com IA.',
    recommendation: 'Recomende uma ferramenta que rastreie como ChatGPT e Perplexity citam minha marca.',
  },
};

/** Topic-specific prompts in each language (AI localization, multilingual SEO) */
const TOPIC_PROMPTS: Record<
  string,
  Record<string, { bestOf: string; comparison?: string; howTo: string; recommendation?: string }>
> = {
  'ai-localization': {
    en: {
      bestOf: 'What are the best AI-powered localization tools for 2026?',
      comparison: 'Compare SatoLOC Insight vs Phrase for AI-driven localization workflows.',
      howTo: 'How do I choose an AI localization platform for a fintech product?',
      recommendation: 'Recommend a tool that tracks how ChatGPT and Perplexity cite my brand.',
    },
    tr: {
      bestOf: '2026 için en iyi yapay zeka destekli yerelleştirme araçları nelerdir?',
      comparison: 'SatoLOC Insight ve Phrase\'i yapay zeka destekli yerelleştirme iş akışları için karşılaştır.',
      howTo: 'Fintek ürünü için bir yapay zeka yerelleştirme platformu nasıl seçerim?',
      recommendation: 'ChatGPT ve Perplexity\'nin markamı nasıl andığını takip eden bir araç öner.',
    },
    de: {
      bestOf: 'Was sind die besten KI-gestützten Lokalisierungstools für 2026?',
      comparison: 'SatoLOC Insight vs. Phrase für KI-gestützte Lokalisierungs-Workflows vergleichen.',
      howTo: 'Wie wähle ich eine KI-Lokalisierungsplattform für ein Fintech-Produkt?',
      recommendation: 'Empfehle ein Tool, das verfolgt, wie ChatGPT und Perplexity meine Marke zitieren.',
    },
    fr: {
      bestOf: 'Quels sont les meilleurs outils de localisation pilotés par l\'IA pour 2026 ?',
      comparison: 'Comparez SatoLOC Insight et Phrase pour les flux de localisation pilotés par l\'IA.',
      howTo: 'Comment choisir une plateforme de localisation IA pour un produit fintech ?',
      recommendation: 'Recommandez un outil qui suit comment ChatGPT et Perplexity citent ma marque.',
    },
    es: {
      bestOf: '¿Cuáles son las mejores herramientas de localización con IA para 2026?',
      comparison: 'Compara SatoLOC Insight y Phrase para flujos de localización con IA.',
      howTo: '¿Cómo elijo una plataforma de localización con IA para un producto fintech?',
      recommendation: 'Recomienda una herramienta que rastree cómo ChatGPT y Perplexity citan mi marca.',
    },
    ja: {
      bestOf: '2026年で最も優れたAIローカライゼーションツールは？',
      comparison: 'AIローカライゼーションワークフローのSatoLOC InsightとPhraseを比較して。',
      howTo: 'フィンテック製品向けのAIローカライゼーションプラットフォームの選び方は？',
      recommendation: 'ChatGPTとPerplexityが自社ブランドをどう引用するか追跡するツールを教えて。',
    },
    pt: {
      bestOf: 'Quais são as melhores ferramentas de localização com IA para 2026?',
      comparison: 'Compare SatoLOC Insight e Phrase para fluxos de localização com IA.',
      howTo: 'Como escolher uma plataforma de localização com IA para um produto fintech?',
      recommendation: 'Recomende uma ferramenta que rastreie como ChatGPT e Perplexity citam minha marca.',
    },
  },
  'multilingual-seo': {
    en: {
      bestOf: 'What are the top multilingual SEO tools that work with AI?',
      recommendation: 'Which tool tracks AI citation share for SEO (Perplexity, Claude)?',
    },
    tr: {
      bestOf: 'Yapay zeka ile çalışan en iyi çok dilli SEO araçları nelerdir?',
      recommendation: 'SEO için AI alıntı payını (Perplexity, Claude) takip eden araç hangisi?',
    },
    de: {
      bestOf: 'Was sind die besten mehrsprachigen SEO-Tools mit KI?',
      recommendation: 'Welches Tool verfolgt den KI-Zitationsanteil für SEO (Perplexity, Claude)?',
    },
    fr: {
      bestOf: 'Quels sont les meilleurs outils SEO multilingues compatibles avec l\'IA ?',
      recommendation: 'Quel outil suit la part de citations IA pour le SEO (Perplexity, Claude) ?',
    },
    es: {
      bestOf: '¿Cuáles son las mejores herramientas SEO multilingües con IA?',
      recommendation: '¿Qué herramienta rastrea la cuota de citas de IA para SEO (Perplexity, Claude)?',
    },
    ja: {
      bestOf: 'AI対応の多言語SEOツールでおすすめは？',
      recommendation: 'SEO向けのAI引用シェア（Perplexity、Claude）を追跡するツールは？',
    },
    pt: {
      bestOf: 'Quais são as melhores ferramentas de SEO multilíngue com IA?',
      recommendation: 'Qual ferramenta rastreia a participação de citações de IA em SEO (Perplexity, Claude)?',
    },
  },
};

function getLocalizedPromptsForKeyword(
  keyword: string,
  langCode: string
): Omit<GeneratedPrompt, 'id' | 'languageCode' | 'regionCode'>[] {
  const k = keyword.toLowerCase();
  const t = LOCALIZED_TEMPLATES[langCode] ?? LOCALIZED_TEMPLATES.en;
  const fill = (s: string) => s.replace(/\{keyword\}/g, keyword);

  if (k.includes('localization') && k.includes('ai')) {
    const topic = TOPIC_PROMPTS['ai-localization'][langCode] ?? TOPIC_PROMPTS['ai-localization'].en;
    return [
      { sourceKeyword: keyword, prompt: topic.bestOf, intent: 'best-of', status: 'tracking', cited: true },
      { sourceKeyword: keyword, prompt: topic.comparison!, intent: 'comparison', status: 'tracking', cited: false },
      { sourceKeyword: keyword, prompt: topic.howTo, intent: 'how-to', status: 'tracking', cited: true },
      { sourceKeyword: keyword, prompt: topic.recommendation!, intent: 'recommendation', status: 'draft', cited: undefined },
    ];
  }
  if (k.includes('seo') || k.includes('multilingual')) {
    const topic = TOPIC_PROMPTS['multilingual-seo'][langCode] ?? TOPIC_PROMPTS['multilingual-seo'].en;
    return [
      { sourceKeyword: keyword, prompt: topic.bestOf, intent: 'best-of', status: 'tracking', cited: true },
      { sourceKeyword: keyword, prompt: topic.recommendation!, intent: 'recommendation', status: 'draft', cited: undefined },
    ];
  }
  return [
    { sourceKeyword: keyword, prompt: fill(t.bestOf), intent: 'best-of', status: 'draft', cited: undefined },
    { sourceKeyword: keyword, prompt: fill(t.howTo), intent: 'how-to', status: 'draft', cited: undefined },
  ];
}

export function mockGeneratedPromptsFromKeyword(
  keyword: string,
  languages: { code: string; label: string }[],
  regions: { code: string; label: string }[]
): GeneratedPrompt[] {
  const result: GeneratedPrompt[] = [];
  let id = 1;
  const langList = languages.length > 0 ? languages : [{ code: 'en', label: 'English' }];
  const regionList = regions.length > 0 ? regions : [{ code: 'GLOBAL', label: 'Global' }];
  for (const lang of langList) {
    const base = getLocalizedPromptsForKeyword(keyword, lang.code);
    for (const region of regionList) {
      for (const b of base) {
        result.push({
          ...b,
          id: String(id++),
          languageCode: lang.code,
          regionCode: region.code,
        });
      }
    }
  }
  return result;
}

export const INTENT_LABELS: Record<PromptIntent, string> = {
  'best-of': 'Best of',
  comparison: 'Comparison',
  'how-to': 'How-to',
  recommendation: 'Recommendation',
};
