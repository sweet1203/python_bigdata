import type { TocItem } from "@/lib/loadLesson";

interface LessonTableOfContentsProps {
  items: TocItem[];
}

export default function LessonTableOfContents({ items }: LessonTableOfContentsProps) {
  if (items.length === 0) return null;

  const list = (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className={item.depth === 3 ? "ml-3 border-l border-zinc-200 pl-3" : ""}>
          <a
            href={`#${item.id}`}
            className="block text-zinc-600 transition-colors hover:text-primary-700"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="w-full">
      <details className="rounded-xl border border-zinc-200 bg-zinc-50/90 p-4 xl:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-zinc-900">목차</summary>
        <nav aria-label="목차" className="mt-3 text-sm">
          {list}
        </nav>
      </details>
      <nav aria-label="목차" className="hidden xl:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50/90 p-4 text-sm shadow-sm">
          <p className="mb-3 font-semibold text-zinc-900">목차</p>
          {list}
        </div>
      </nav>
    </aside>
  );
}
