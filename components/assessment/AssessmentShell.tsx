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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 lg:hidden">
        <AssessmentNav currentSlug={currentSlug} variant="compact" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-6 space-y-4">
            <p className="px-1 text-xs font-semibold tracking-wide text-ash-gray uppercase">
              수행평가 단계
            </p>
            <AssessmentNav currentSlug={currentSlug} />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <article className="rounded-[32px] border border-ghostly-blue/50 bg-arctic-mist p-6 shadow-[var(--shadow-genie-lg)] sm:p-8 lg:p-10">
            <header className="border-b border-ghostly-blue/60 pb-6">
              {badge && (
                <p className="inline-flex rounded-full border border-luminous-blue/30 bg-canvas-white px-3 py-1 text-xs font-semibold text-electric-blue">
                  {badge}
                </p>
              )}
              <h1 className="font-display mt-3 text-2xl font-medium tracking-[-0.02em] text-obsidian lg:text-[1.75rem]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm leading-relaxed text-silver-pine">{subtitle}</p>
              )}
            </header>

            <div className="assessment-content pt-6">{children}</div>

            {stepSlug && <AssessmentStepFooter slug={stepSlug} />}
          </article>
        </main>
      </div>
    </div>
  );
}
