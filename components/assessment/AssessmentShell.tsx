import Link from "next/link";
import AssessmentNav from "@/components/assessment/AssessmentNav";
import { assessmentPages, type AssessmentSlug } from "@/lib/assessmentCatalog";
import AssessmentStepFooter from "@/components/assessment/AssessmentStepFooter";

export default function AssessmentShell({
  currentSlug,
  title,
  subtitle,
  badge,
  children,
}: {
  currentSlug?: string | null;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  const stepSlug =
    currentSlug != null && assessmentPages.some((p) => p.slug === currentSlug)
      ? (currentSlug as AssessmentSlug)
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 lg:hidden">
        <AssessmentNav currentSlug={currentSlug} variant="compact" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6">
            <AssessmentNav currentSlug={currentSlug} />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <article className="space-y-6 rounded-xl border border-amber-200/70 bg-gradient-to-b from-white to-amber-50/20 p-6 shadow-sm lg:p-8">
            <header className="border-b border-amber-100/80 pb-5">
              {badge && <p className="text-sm font-medium text-amber-800">{badge}</p>}
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>
              )}
            </header>

            <div className="assessment-content">{children}</div>

            {stepSlug && <AssessmentStepFooter slug={stepSlug} />}
          </article>
        </main>
      </div>
    </div>
  );
}
