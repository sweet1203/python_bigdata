import Link from "next/link";
import { assessmentPages, assessmentPlanPage } from "@/lib/assessmentCatalog";

export default function AssessmentPathList({ includePlan = false }: { includePlan?: boolean }) {
  const items = includePlan ? [...assessmentPages, assessmentPlanPage] : [...assessmentPages];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((page) => (
        <li key={page.slug}>
          <Link
            href={page.path}
            className="group flex h-full flex-col rounded-[32px] border border-ghostly-blue/50 bg-canvas-white p-5 shadow-[var(--shadow-genie-lg)] transition-all hover:border-luminous-blue/30 hover:shadow-[0_18px_28px_6px_rgba(4,69,144,0.1)]"
          >
            {"step" in page && (
              <span className="mb-3 inline-flex w-fit rounded-full bg-ghostly-blue/50 px-2.5 py-0.5 text-xs font-semibold text-electric-blue">
                STEP {page.step}
              </span>
            )}
            <span className="font-display text-base font-medium tracking-[-0.02em] text-obsidian">
              {page.title}
            </span>
            <span className="mt-1.5 flex-1 text-sm leading-relaxed text-silver-pine">
              {page.description}
            </span>
            <span className="mt-4 text-sm font-medium text-luminous-blue transition-colors group-hover:text-electric-blue">
              보기 →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
