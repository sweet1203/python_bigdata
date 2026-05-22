import Link from "next/link";
import { assessmentPages } from "@/lib/assessmentCatalog";

function navLinkClass(active: boolean) {
  return active
    ? "border-luminous-blue/50 bg-canvas-white shadow-[var(--shadow-genie-subtle)]"
    : "border-transparent bg-arctic-mist/80 hover:border-ghostly-blue hover:bg-canvas-white";
}

export default function AssessmentNav({
  currentSlug,
  variant = "sidebar",
}: {
  currentSlug?: string | null;
  variant?: "sidebar" | "compact";
}) {
  if (variant === "compact") {
    return (
      <nav aria-label="수행평가 안내" className="flex flex-wrap gap-2">
        {assessmentPages.map((page) => {
          const active = currentSlug === page.slug;
          return (
            <Link
              key={page.slug}
              href={page.path}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${navLinkClass(active)} ${
                active ? "text-obsidian" : "text-silver-pine"
              }`}
            >
              {page.step}. {page.title}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="수행평가 안내" className="space-y-2">
      {assessmentPages.map((page) => {
        const active = currentSlug === page.slug;
        return (
          <Link
            key={page.slug}
            href={page.path}
            className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-sm transition-all ${navLinkClass(active)}`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold ${
                active ? "bg-midnight-ink text-canvas-white" : "bg-ghostly-blue/60 text-silver-pine"
              }`}
            >
              {page.step}
            </span>
            <span className="min-w-0">
              <span
                className={`block font-medium leading-snug ${active ? "text-obsidian" : "text-obsidian/90"}`}
              >
                {page.title}
              </span>
              <span className="mt-0.5 block truncate text-xs text-ash-gray">{page.description}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
