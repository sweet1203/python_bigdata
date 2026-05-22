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
    <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-stretch sm:justify-between">
      {prev ? (
        <Link
          href={prev.path}
          className="group flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors hover:border-amber-300 hover:bg-amber-50/60"
        >
          <span className="shrink-0 text-lg text-slate-400 group-hover:text-amber-700" aria-hidden>
            ←
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-slate-500">이전</span>
            <span className="block font-medium text-slate-800">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
      {current && (
        <div className="flex items-center justify-center px-2 text-center text-xs text-slate-500 sm:max-w-[8rem]">
          {current.step} / {assessmentPages.length}
        </div>
      )}
      {next ? (
        <Link
          href={next.path}
          className="group flex flex-1 items-center justify-end gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm transition-colors hover:border-amber-400 hover:bg-amber-100/80"
        >
          <span className="min-w-0 text-right">
            <span className="block text-xs text-amber-800/80">다음</span>
            <span className="block font-medium text-amber-950">{next.title}</span>
          </span>
          <span className="shrink-0 text-lg text-amber-600" aria-hidden>
            →
          </span>
        </Link>
      ) : (
        <Link
          href="/assessment"
          className="group flex flex-1 items-center justify-end gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm hover:bg-slate-50"
        >
          <span className="font-medium text-slate-800">목차로</span>
          <span className="text-lg text-slate-400" aria-hidden>
            →
          </span>
        </Link>
      )}
    </div>
  );
}
