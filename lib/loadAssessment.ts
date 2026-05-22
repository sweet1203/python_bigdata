import { readFile } from "fs/promises";
import path from "path";

export async function loadAssessmentMarkdown(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "assessment", `${slug}.md`);
  return readFile(filePath, "utf-8");
}

export async function loadAssessmentPlanMarkdown(): Promise<string> {
  const filePath = path.join(process.cwd(), "assessment", "PLAN.md");
  return readFile(filePath, "utf-8");
}

export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+(?:\r?\n)+/, "");
}

export function parseMainHeading(markdown: string): string | null {
  const m = /^#\s+(.+)/m.exec(markdown);
  return m ? m[1].trim() : null;
}
