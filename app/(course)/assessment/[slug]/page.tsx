import { notFound } from "next/navigation";
import AssessmentPathList from "@/components/assessment/AssessmentPathList";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import {
  allAssessmentSlugs,
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

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <header className="border-b border-slate-100 pb-5">
          <p className="text-sm font-medium text-slate-500">수행평가 안내</p>
          <p className="mt-1 font-mono text-sm text-primary-800">{meta.path}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{displayTitle}</h1>
          {isPlan && (
            <p className="mt-2 text-sm text-amber-800">
              교사·개발용 운영 계획입니다. 학생 필수 열람 페이지는 아닙니다.
            </p>
          )}
        </header>

        <LessonMarkdown markdown={body} />

        <footer className="border-t border-slate-100 pt-5">
          <p className="mb-3 text-sm font-semibold text-slate-700">다른 안내 (주소 직접 입력)</p>
          <p className="mb-3 font-mono text-sm text-slate-600">/assessment</p>
          <AssessmentPathList includePlan={isPlan} />
        </footer>
      </section>
    </div>
  );
}
