import ExerciseBox from "@/components/learn/ExerciseBox";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import LinePurposeQuiz from "@/components/learn/LinePurposeQuiz";
import SectionNav from "@/components/learn/SectionNav";
import Sidebar from "@/components/learn/Sidebar";
import UnitVisitTracker from "@/components/learn/UnitVisitTracker";
import {
  loadLessonMarkdown,
  parseLessonMainHeading,
  stripLeadingH1,
} from "@/lib/loadLesson";
import { lessonWebAppendix } from "@/lib/lessonAppendix";
import { unitContents } from "@/lib/unitContent";
import { units } from "@/lib/units";

interface LearnPageProps {
  searchParams?: Promise<{ unit?: string }>;
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = (await searchParams) ?? {};
  const selectedUnitId = params.unit ?? "1";
  const currentUnit = units.find((unit) => unit.id === selectedUnitId) ?? units[0];
  const currentContent = unitContents[currentUnit.id] ?? unitContents["1"];
  const currentIndex = units.findIndex((unit) => unit.id === currentUnit.id);
  const prevUnit = currentIndex > 0 ? units[currentIndex - 1] : null;
  const nextUnit = currentIndex < units.length - 1 ? units[currentIndex + 1] : null;

  let rawMarkdown = "";
  try {
    rawMarkdown = await loadLessonMarkdown(currentUnit.id);
  } catch {
    rawMarkdown = `# 자료를 불러올 수 없습니다\n\n\`content/lessons/${currentUnit.id}.md\` 파일이 있는지 확인하거나 \`npm install\` 후 다시 실행해 주세요.\n`;
  }

  const lessonHeading = parseLessonMainHeading(rawMarkdown);
  const displayTitle = lessonHeading ?? currentUnit.label;
  const bodyWithoutTitle = stripLeadingH1(rawMarkdown);
  const appendix = lessonWebAppendix[currentUnit.id];
  const coreAndAppendix =
    bodyWithoutTitle + (appendix ? `\n\n---\n\n${appendix}` : "");
  const markdownWithIntro =
    `> **이번 차시 요약:** ${currentContent.summary}\n\n---\n\n` + coreAndAppendix;

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[240px_1fr]">
      <Sidebar items={units} activeUnitId={currentUnit.id} />
      <div className="min-w-0 space-y-6">
        <section className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-10">
          <UnitVisitTracker unitId={currentUnit.id} />
          <header className="border-b border-zinc-100 pb-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                차시 {currentUnit.id} / {units.length}
              </p>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900">{displayTitle}</h1>
            </div>
          </header>

          <LessonMarkdown markdown={markdownWithIntro} />
        </section>

        <section className="space-y-5 rounded-xl border border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/40 p-6 shadow-sm lg:p-8">
          <div className="border-b border-emerald-100 pb-4">
            <h2 className="text-lg font-bold text-zinc-900">마무리 점검 · 코스웨어 활동</h2>
            <p className="mt-1 text-sm text-zinc-600">
              교안 전체를 읽은 뒤, 아래 퀴즈와 실습으로 오늘 내용을 짧게 점검해 보세요.
            </p>
          </div>
          <LinePurposeQuiz
            question={currentContent.quiz.question}
            answerId={currentContent.quiz.answerId}
            options={currentContent.quiz.options}
          />
          <ExerciseBox
            title={currentContent.exercise.title}
            prompt={currentContent.exercise.prompt}
            hint={currentContent.exercise.hint}
            answer={currentContent.exercise.answer}
          />
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-white/90 p-4">
            <h3 className="text-base font-semibold text-zinc-900">코드 해석 3문장 템플릿</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
              <li>이번 차시 예제에서 입력·데이터는 무엇이었고, 어떻게 불러오거나 만들었는가?</li>
              <li>핵심 처리(정렬·선택·집계 등) 한 줄로 요약하면 무엇인가?</li>
              <li>출력 결과로 무엇을 확인했고, 다음 차시에 이어서 무엇을 하면 좋은가?</li>
            </ol>
          </div>
        </section>

        <SectionNav
          prevHref={prevUnit ? `/learn?unit=${prevUnit.id}` : undefined}
          nextHref={nextUnit ? `/learn?unit=${nextUnit.id}` : undefined}
        />
      </div>
    </div>
  );
}
