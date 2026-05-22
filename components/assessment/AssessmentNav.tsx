import Link from "next/link";
import { assessmentPages, assessmentPlanPage } from "@/lib/assessmentCatalog";

function navLinkClass(active: boolean) {
  return active
    ? "border-amber-500 bg-amber-50 text-amber-950 shadow-sm"
    : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/50";
}

export default function AssessmentNav({
  currentSlug,
  variant = "sidebar",
}: {
  currentSlug?: string | null;
  variant?: "sidebar" | "compact";
}) {
  const isIndex = currentSlug == null;

  if (variant === "compact") {
    return (
      <nav aria-label="수행평가 안내" className="flex flex-wrap gap-2">
        <Link
          href="/assessment"
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${navLinkClass(isIndex)}`}
        >
          목차
        </Link>
        {assessmentPages.map((page) => (
          <Link
            key={page.slug}
            href={page.path}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${navLinkClass(currentSlug === page.slug)}`}
          >
            {page.step}. {page.title}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="수행평가 안내" className="space-y-1">
      <Link
        href="/assessment"
        className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${navLinkClass(isIndex)}`}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
          ☰
        </span>
        <span>안내 목차</span>
      </Link>
      {assessmentPages.map((page) => (
        <Link
          key={page.slug}
          href={page.path}
          className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${navLinkClass(currentSlug === page.slug)}`}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              currentSlug === page.slug
                ? "bg-amber-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {page.step}
          </span>
          <span className="min-w-0">
            <span className="block font-medium leading-snug">{page.title}</span>
            <span className="block truncate text-xs text-slate-500">{page.description}</span>
          </span>
        </Link>
      ))}
      <div className="mt-3 border-t border-slate-100 pt-3">
        <Link
          href={assessmentPlanPage.path}
          className={`block rounded-lg border px-3 py-2 text-xs transition-colors ${navLinkClass(currentSlug === assessmentPlanPage.slug)}`}
        >
          <span className="font-medium text-slate-700">{assessmentPlanPage.title}</span>
          <span className="mt-0.5 block text-slate-500">{assessmentPlanPage.description}</span>
        </Link>
      </div>
    </nav>
  );
}
