import Link from "next/link";
import {
  assessmentPages,
  getAssessmentStepNeighbors,
  type AssessmentSlug,
} from "@/lib/assessmentCatalog";

export default function AssessmentStepFooter({ slug }: { slug: AssessmentSlug }) {
  const { prev, next } = getAssessmentStepNeighbors(slug);
  const current = assessmentPages.find((p) => p.slug === slug);

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-ghostly-blue/60 pt-6 sm:flex-row sm:items-stretch sm:justify-between">
      {prev ? (
        <Link
          href={prev.path}
          className="group flex flex-1 items-center gap-3 rounded-2xl border border-ghostly-blue/60 bg-canvas-white px-4 py-3.5 text-sm transition-all hover:border-luminous-blue/40 hover:shadow-[var(--shadow-genie-lg)]"
        >
          <span className="shrink-0 text-lg text-ash-gray group-hover:text-electric-blue" aria-hidden>
            ←
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-ash-gray">이전</span>
            <span className="block font-medium text-obsidian">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
      {current && (
        <div className="flex items-center justify-center px-2 text-center text-xs font-medium text-ash-gray sm:max-w-[8rem]">
          {current.step} / {assessmentPages.length}
        </div>
      )}
      {next ? (
        <Link
          href={next.path}
          className="group flex flex-1 items-center justify-end gap-3 rounded-[32px] bg-midnight-ink px-5 py-3.5 text-sm text-canvas-white shadow-[var(--shadow-genie-subtle)] transition-opacity hover:opacity-90"
        >
          <span className="min-w-0 text-right">
            <span className="block text-xs text-canvas-white/70">다음</span>
            <span className="block font-medium">{next.title}</span>
          </span>
          <span className="shrink-0 text-lg opacity-80" aria-hidden>
            →
          </span>
        </Link>
      ) : (
        <Link
          href="/assessment"
          className="group flex flex-1 items-center justify-end gap-3 rounded-2xl border border-ghostly-blue/60 bg-canvas-white px-4 py-3.5 text-sm transition-all hover:shadow-[var(--shadow-genie-lg)]"
        >
          <span className="font-medium text-obsidian">목차로</span>
          <span className="text-lg text-ash-gray group-hover:text-luminous-blue" aria-hidden>
            →
          </span>
        </Link>
      )}
    </div>
  );
}
