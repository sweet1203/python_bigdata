import AssessmentShell from "@/components/assessment/AssessmentShell";
import AssessmentMarkdown from "@/components/assessment/AssessmentMarkdown";
import { assessmentPages } from "@/lib/assessmentCatalog";
import { loadAssessmentMarkdown, parseMainHeading, stripLeadingH1 } from "@/lib/loadAssessment";

export default async function AssessmentIndexPage() {
  let body = "안내 내용을 불러올 수 없습니다.";
  let title = "2차 수행평가 안내";

  try {
    const raw = await loadAssessmentMarkdown("overview");
    title = parseMainHeading(raw) ?? title;
    body = stripLeadingH1(raw);
  } catch {
    /* keep defaults */
  }

  return (
    <AssessmentShell
      currentSlug="overview"
      badge="3학년 빅데이터분석 · 2차 수행평가"
      title={title}
      subtitle="단계별 안내를 순서대로 읽고, Classroom 사본 노트북에 작성한 뒤 제출하세요."
    >
      <AssessmentMarkdown markdown={body} />
    </AssessmentShell>
  );
}
