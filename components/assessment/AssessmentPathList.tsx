import { assessmentPages, assessmentPlanPage } from "@/lib/assessmentCatalog";

/** 클릭 링크 없이 경로만 표시 (URL 직접 입력 정책) */
export default function AssessmentPathList({ includePlan = false }: { includePlan?: boolean }) {
  const items = includePlan ? [...assessmentPages, assessmentPlanPage] : [...assessmentPages];

  return (
    <ul className="space-y-3">
      {items.map((page) => (
        <li
          key={page.slug}
          className="rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3"
        >
          <p className="font-semibold text-slate-900">{page.title}</p>
          <p className="mt-0.5 text-sm text-slate-600">{page.description}</p>
          <p className="mt-2 font-mono text-sm text-primary-800">{page.path}</p>
        </li>
      ))}
    </ul>
  );
}
