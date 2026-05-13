"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

function buildComponents(inline: boolean): Components {
  return {
    p: ({ children }) =>
      inline ? (
        <span className="inline leading-relaxed [&:not(:first-child)]:ml-1">{children}</span>
      ) : (
        <p className="my-0 leading-relaxed [&:not(:first-child)]:mt-2">{children}</p>
      ),
    strong: ({ children }) => <strong className="font-semibold text-inherit">{children}</strong>,
    em: ({ children }) => <em className="italic text-inherit">{children}</em>,
    code: ({ className, children }) => {
      if (className) {
        return (
          <code className="my-1 block overflow-x-auto rounded-md bg-zinc-100 p-2 font-mono text-[0.85em] text-zinc-800">
            {children}
          </code>
        );
      }
      return (
        <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-primary-900">{children}</code>
      );
    },
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
    ul: ({ children }) => <ul className="my-2 list-disc space-y-2 pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal space-y-2 pl-5">{children}</ol>,
    li: ({ children }) => <li className="mt-0.5 leading-relaxed">{children}</li>,
  };
}

interface InlineMarkdownProps {
  text: string;
  className?: string;
  /** 한 줄(예: "힌트:" 옆)에 이어 붙일 때 */
  inline?: boolean;
}

/**
 * 퀴즈 문항·선택지·실습 안내 등 짧은 UI 문자열용.
 * `**굵게**`, `인라인 코드` 등을 렌더링합니다.
 */
export default function InlineMarkdown({ text, className, inline = false }: InlineMarkdownProps) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const body = (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(inline)}>
      {trimmed}
    </ReactMarkdown>
  );
  return inline ? <span className={className}>{body}</span> : <div className={className}>{body}</div>;
}
