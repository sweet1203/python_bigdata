"use client";

import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import CodeBlock from "@/components/learn/CodeBlock";

interface LessonMarkdownProps {
  markdown: string;
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="mt-4 scroll-mt-28 text-3xl font-bold tracking-tight text-zinc-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 scroll-mt-28 border-b border-zinc-200 pb-2 text-2xl font-semibold text-zinc-900 first:mt-6"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 scroll-mt-28 text-xl font-semibold text-zinc-800" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 scroll-mt-28 text-lg font-semibold text-zinc-800" {...props}>
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="my-4 leading-relaxed text-zinc-700">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6 text-zinc-700">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-zinc-700">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-4 border-primary-500 bg-primary-50/90 px-4 py-3 text-[15px] text-zinc-800 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-zinc-200" />,
  strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
  em: ({ children }) => <em className="italic text-zinc-800">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 shadow-sm ring-1 ring-zinc-100">
      <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gradient-to-b from-zinc-100 to-zinc-50">{children}</thead>,
  th: ({ children }) => (
    <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold text-zinc-900">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-t border-zinc-100 px-4 py-3 align-top text-zinc-700">{children}</td>,
  tr: ({ children }) => <tr className="transition-colors even:bg-zinc-50/90">{children}</tr>,
  tbody: ({ children }) => <tbody className="divide-y divide-zinc-100">{children}</tbody>,
  code: ({ className, children }) => {
    const inline = !className;
    if (inline) {
      return (
        <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-primary-900">
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

export default function LessonMarkdown({ markdown }: LessonMarkdownProps) {
  return (
    <article className="lesson-markdown max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
