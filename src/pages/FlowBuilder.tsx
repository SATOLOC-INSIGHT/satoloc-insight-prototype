import { useState } from 'react';
import {
  Type,
  Hash,
  Link2,
  MessageSquare,
  LayoutList,
  Sparkles,
  FileEdit,
  Wand2,
  Split,
  Search,
  BarChart3,
  Share2,
  Image,
  Bot,
  Brain,
  Quote,
} from 'lucide-react';

const inputNodes = [
  { id: 'prompt', icon: Type, label: 'Prompt Input' },
  { id: 'keyword', icon: Hash, label: 'Keyword Input' },
  { id: 'title', icon: Type, label: 'Title Input' },
  { id: 'url', icon: Link2, label: 'URL Context' },
  { id: 'reddit-mentions', icon: MessageSquare, label: 'Reddit Brand Mentions' },
  { id: 'reddit-topics', icon: LayoutList, label: 'Reddit Topics' },
];

const intelligenceNodes = [
  { id: 'reddit-analysis', icon: Brain, label: 'Reddit Brand Analysis', desc: 'Outputs mention data and insights' },
  { id: 'ai-citation', icon: Quote, label: 'AI Citation Analysis', desc: 'Outputs citation data and gaps' },
];

const aiProcessingNodes = [
  { id: 'content-gen', icon: Sparkles, label: 'Content Generator' },
  { id: 'headline', icon: FileEdit, label: 'Headline Optimizer' },
  { id: 'improver', icon: Wand2, label: 'Content Improver' },
  { id: 'prompt-improver', icon: Wand2, label: 'Prompt Improver' },
  { id: 'citation-finder', icon: Search, label: 'Citation Finder' },
  { id: 'seo', icon: BarChart3, label: 'SEO Analyzer' },
  { id: 'social', icon: Share2, label: 'Social Content Adapter' },
  { id: 'branch', icon: Split, label: 'Conditional Branch' },
];

const mediaNodes = [
  { id: 'image-suggest', icon: Image, label: 'Image Suggester' },
  { id: 'ai-image-openai', icon: Bot, label: 'AI Image (OpenAI)' },
  { id: 'ai-image-gemini', icon: Bot, label: 'AI Image (Gemini)' },
];

function NodeItem({ icon: Icon, label, desc }: { icon: React.ElementType; label: string; desc?: string }) {
  return (
    <div className="flex items-center gap-2 py-2 px-2 rounded hover:bg-[var(--border)]/50 cursor-grab group">
      <div className="w-8 h-8 rounded flex items-center justify-center bg-[var(--border)]/50 shrink-0 group-hover:bg-[var(--primary)]/10">
        <Icon className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-[var(--text-primary)] truncate">{label}</div>
        {desc && <div className="text-xs text-[var(--text-secondary)] truncate">{desc}</div>}
      </div>
    </div>
  );
}

export function FlowBuilder() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      {/* Node panel */}
      <div className="w-64 shrink-0 bg-[var(--card-bg)] rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
        <div className="p-3 border-b border-[var(--border)]">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm">Nodes</h3>
          <p className="text-xs text-[var(--text-secondary)]">Drag to canvas</p>
        </div>
        <input
          type="text"
          placeholder="Search nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mx-2 mt-2 px-2 py-1.5 rounded-[var(--radius-input)] border border-[var(--border)] text-sm text-[var(--text-primary)] bg-[var(--card-bg)]"
        />
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          <div>
            <h4 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-1">Input (6)</h4>
            {inputNodes.map((n) => (
              <NodeItem key={n.id} icon={n.icon} label={n.label} />
            ))}
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-[var(--primary)]" /> Intelligence (2)
            </h4>
            {intelligenceNodes.map((n) => (
              <NodeItem key={n.id} icon={n.icon} label={n.label} desc={n.desc} />
            ))}
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-1">AI Processing (8)</h4>
            {aiProcessingNodes.map((n) => (
              <NodeItem key={n.id} icon={n.icon} label={n.label} />
            ))}
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase text-[var(--text-secondary)] mb-1">Media (3)</h4>
            {mediaNodes.map((n) => (
              <NodeItem key={n.id} icon={n.icon} label={n.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--page-bg)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#E5E7EB_1px,transparent_1px)] bg-[length:16px_16px]" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">Untitled Workflow</span>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-1.5 rounded text-sm border border-[var(--border)] text-[var(--text-primary)]">Actions</button>
            <button type="button" className="px-3 py-1.5 rounded text-sm border border-[var(--border)] text-[var(--text-primary)]">Save</button>
            <button type="button" className="px-3 py-1.5 rounded-[var(--radius-btn)] bg-[var(--primary)] text-white text-sm font-medium">Execute</button>
            <button type="button" className="px-3 py-1.5 rounded text-sm border border-[var(--border)] text-[var(--text-primary)]">Batch</button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-8 shadow-[var(--shadow-card)] border border-[var(--border)] max-w-md text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--border)]/50 flex items-center justify-center mx-auto mb-4">
              <LayoutList className="w-6 h-6 text-[var(--text-secondary)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)]">Start Building Your Workflow</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Drag nodes from the left panel onto the canvas, then connect them to create your content generation pipeline.
            </p>
            <p className="mt-3 text-xs text-[var(--primary)]">
              New: Reddit Brand Analysis and AI Citation Analysis nodes under Intelligence.
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] text-[var(--text-secondary)]">React Flow</div>
      </div>
    </div>
  );
}
