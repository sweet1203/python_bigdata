"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import CodeBlock from "@/components/learn/CodeBlock";

interface AssessmentMarkdownProps {
  markdown: string;
}

function isInternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("/") || href.startsWith("#");
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-display mt-4 scroll-mt-28 text-[1.75rem] font-medium tracking-[-0.02em] text-obsidian"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-display mt-10 scroll-mt-28 border-b border-ghostly-blue pb-2 text-2xl font-medium tracking-[-0.02em] text-obsidian first:mt-6"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-display mt-8 scroll-mt-28 text-xl font-medium tracking-[-0.02em] text-obsidian"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="font-display mt-6 scroll-mt-28 text-lg font-medium tracking-[-0.02em] text-obsidian"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[15px] leading-[1.5] tracking-[-0.01em] text-silver-pine">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-[15px] leading-[1.5] text-silver-pine">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-[15px] leading-[1.5] text-silver-pine">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-2xl border border-ghostly-blue/80 bg-gradient-to-br from-whisper-fade-blue to-arctic-mist px-5 py-4 text-[15px] text-obsidian [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:text-obsidian">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-ghostly-blue" />,
  strong: ({ children }) => <strong className="font-semibold text-obsidian">{children}</strong>,
  em: ({ children }) => <em className="text-silver-pine italic">{children}</em>,
  a: ({ href, children }) => {
    const linkClass =
      "font-medium text-luminous-blue underline decoration-ghostly-blue underline-offset-[3px] transition-colors hover:text-electric-blue hover:decoration-electric-blue/40";
    if (href && isInternalHref(href)) {
      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={linkClass}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-ghostly-blue/60 bg-canvas-white shadow-[var(--shadow-genie-lg)]">
      <table className="min-w-full divide-y divide-ghostly-blue/50 text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gradient-to-b from-arctic-mist to-sky-wash/40">{children}</thead>
  ),
  th: ({ children }) => (
    <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold text-obsidian">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-ghostly-blue/40 px-4 py-3 align-top text-silver-pine">
      {children}
    </td>
  ),
  tr: ({ children }) => <tr className="even:bg-arctic-mist/60">{children}</tr>,
  tbody: ({ children }) => <tbody className="divide-y divide-ghostly-blue/30">{children}</tbody>,
  code: ({ className, children }) => {
    const inline = !className;
    if (inline) {
      return (
        <code className="rounded-lg bg-ghostly-blue/50 px-1.5 py-0.5 font-mono text-[0.9em] text-obsidian">
          {children}
        </code>
      );
    }
    const match = /language-(\w+)/.exec(className ?? "");
    const lang = match?.[1] ?? "text";
    const code = String(children).replace(/\n$/, "");
    return <CodeBlock code={code} language={lang} />;
  },
  pre: ({ children }) => <>{children}</>,
};

export default function AssessmentMarkdown({ markdown }: AssessmentMarkdownProps) {
  return (
    <article className="assessment-markdown max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
