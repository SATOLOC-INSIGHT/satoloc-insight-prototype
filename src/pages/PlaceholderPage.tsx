type Props = { title: string; description?: string };

export function PlaceholderPage({ title, description }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h1>
      {description && <p className="text-sm text-[var(--text-secondary)]">{description}</p>}
      <div className="bg-[var(--card-bg)] rounded-[var(--radius-card)] p-8 border border-[var(--border)] text-center text-[var(--text-secondary)]">
        This section is not part of the Brand Intelligence prototype.
      </div>
    </div>
  );
}
