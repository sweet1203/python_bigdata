import { notFound } from "next/navigation";
import AssessmentShell from "@/components/assessment/AssessmentShell";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import {
  allAssessmentSlugs,
  assessmentPages,
  assessmentPlanPage,
  getAssessmentMeta,
} from "@/lib/assessmentCatalog";
import {
  loadAssessmentMarkdown,
  loadAssessmentPlanMarkdown,
  parseMainHeading,
  stripLeadingH1,
} from "@/lib/loadAssessment";

interface AssessmentSlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allAssessmentSlugs.map((slug) => ({ slug }));
}

export default async function AssessmentSlugPage({ params }: AssessmentSlugPageProps) {
  const { slug } = await params;
  const meta = getAssessmentMeta(slug);
  if (!meta) notFound();

  let rawMarkdown = "";
  try {
    rawMarkdown =
      slug === assessmentPlanPage.slug
        ? await loadAssessmentPlanMarkdown()
        : await loadAssessmentMarkdown(slug);
  } catch {
    rawMarkdown = `# 자료를 불러올 수 없습니다\n\n파일이 있는지 확인해 주세요.\n`;
  }

  const heading = parseMainHeading(rawMarkdown);
  const displayTitle = heading ?? meta.title;
  const body = stripLeadingH1(rawMarkdown);
  const isPlan = slug === assessmentPlanPage.slug;
  const stepPage = assessmentPages.find((p) => p.slug === slug);
  const subtitle = stepPage
    ? `STEP ${stepPage.step} · ${stepPage.description}`
    : isPlan
      ? assessmentPlanPage.description
      : undefined;

  return (
    <AssessmentShell
      currentSlug={slug}
      badge="수행평가 안내"
      title={displayTitle}
      subtitle={subtitle}
    >
      <LessonMarkdown markdown={body} />
    </AssessmentShell>
  );
}
