import { readFile } from "fs/promises";
import Slugger from "github-slugger";
import path from "path";

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** 페이지 상단 제목과 중복되지 않도록 본문 첫 `# 제목` 블록 제거 */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+(?:\r?\n)+/, "");
}

/** 차시 `.md`의 `##` / `###` 으로 목차 생성 (rehype-slug 규칙과 동일한 slugger 사용) */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const slugger = new Slugger();
  const toc: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const trimmed = line.replace(/\r$/, "").trim();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const rawText = m[2]
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .trim();
    toc.push({ depth, text: rawText, id: slugger.slug(rawText) });
  }
  return toc;
}

export function parseLessonMainHeading(markdown: string): string | null {
  const m = /^#\s+(.+)/m.exec(markdown);
  return m ? m[1].trim() : null;
}

export async function loadLessonMarkdown(unitId: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "lessons", `${unitId}.md`);
  return readFile(filePath, "utf-8");
}
