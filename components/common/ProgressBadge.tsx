export default function ProgressBadge({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  if (pct === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-accent-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-slate-500">{pct}%</span>
    </div>
  );
}
