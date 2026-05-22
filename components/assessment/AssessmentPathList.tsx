import Link from "next/link";
import { assessmentPages, assessmentPlanPage } from "@/lib/assessmentCatalog";

export default function AssessmentPathList({ includePlan = false }: { includePlan?: boolean }) {
  const items = includePlan ? [...assessmentPages, assessmentPlanPage] : [...assessmentPages];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((page) => (
        <li key={page.slug}>
          <Link
            href={page.path}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
          >
            {"step" in page && (
              <span className="mb-2 inline-flex w-fit rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                STEP {page.step}
              </span>
            )}
            <span className="font-semibold text-slate-900">{page.title}</span>
            <span className="mt-1 flex-1 text-sm text-slate-600">{page.description}</span>
            <span className="mt-3 text-sm font-medium text-primary-700">보기 →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
