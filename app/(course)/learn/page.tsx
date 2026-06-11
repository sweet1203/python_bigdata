import Icon from "@/components/common/Icon";
import CodeExplanationBox from "@/components/learn/CodeExplanationBox";
import ExerciseBox from "@/components/learn/ExerciseBox";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import LinePurposeQuiz from "@/components/learn/LinePurposeQuiz";
import SectionNav from "@/components/learn/SectionNav";
import UnitVisitTracker from "@/components/learn/UnitVisitTracker";
import {
  loadLessonMarkdown,
  parseLessonMainHeading,
  stripLeadingH1,
} from "@/lib/loadLesson";
import { lessonWebAppendix } from "@/lib/lessonAppendix";
import { COURSE_MODULE } from "@/lib/courseConstants";
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
    `> 이번 차시 요약: ${currentContent.summary}\n\n---\n\n` + coreAndAppendix;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="min-w-0 space-y-6">
        <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
          <UnitVisitTracker unitId={currentUnit.id} />
          <header className="border-b border-slate-100 pb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Icon name="chart" size={16} className="text-slate-400" />
              <span>{COURSE_MODULE.title}</span>
              <span>·</span>
              <span>차시 {currentUnit.id}</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-800">{displayTitle}</h1>
            </div>
          </header>

          <LessonMarkdown markdown={markdownWithIntro} />
        </section>

        <section className="space-y-5 rounded-xl border border-primary-200/80 bg-gradient-to-b from-white to-primary-50/40 p-6 shadow-sm lg:p-8">
          <div className="border-b border-primary-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">마무리 점검 · 학습 활동</h2>
            <p className="mt-1 text-sm text-slate-600">
              교안을 Colab에서 실행한 뒤,{" "}
              {currentContent.codeExplanation ? (
                <>
                  <strong className="font-semibold text-slate-800">코드 변형 실습</strong>을 풀고{" "}
                  <strong className="font-semibold text-slate-800">코드 설명</strong>을 읽고,
                </>
              ) : currentContent.challenge ? (
                <>
                  <strong className="font-semibold text-slate-800">변형 실습</strong>(예제와 조건이 조금 다름)과{" "}
                  <strong className="font-semibold text-slate-800">도전 문제</strong>를 풀고,
                </>
              ) : (
                <>
                  <strong className="font-semibold text-slate-800">코드 변형 실습</strong>을 풀고,
                </>
              )}{" "}
              {currentContent.codeExplanation ? (
                <>변형 실습 상자의 해석을 적어 본 뒤 퀴즈로 점검해 보세요.</>
              ) : (
                <>
                  상자의 <strong className="font-semibold text-slate-800">「실행 후, 출력 이렇게 읽어 보세요」</strong>
                  로 출력을 해석한 다음 퀴즈로 점검해 보세요.
                </>
              )}
            </p>
          </div>
          <LinePurposeQuiz
            unitId={currentUnit.id}
            question={currentContent.quiz.question}
            answerId={currentContent.quiz.answerId}
            options={currentContent.quiz.options}
          />
          {currentContent.exercise && (
            <ExerciseBox
              title={currentContent.exercise.title}
              prompt={currentContent.exercise.prompt}
              interpretation={currentContent.exercise.interpretation}
              hint={currentContent.exercise.hint}
              answer={currentContent.exercise.answer}
              variant="practice"
            />
          )}
          {currentContent.codeExplanation && (
            <CodeExplanationBox
              title={currentContent.codeExplanation.title}
              intro={currentContent.codeExplanation.intro}
              blocks={currentContent.codeExplanation.blocks}
            />
          )}
          {currentContent.challenge && (
            <ExerciseBox
              title={currentContent.challenge.title}
              prompt={currentContent.challenge.prompt}
              interpretation={currentContent.challenge.interpretation}
              hint={currentContent.challenge.hint}
              answer={currentContent.challenge.answer}
              variant="challenge"
            />
          )}
          <div className="space-y-2 rounded-lg border border-slate-200 bg-white/90 p-4">
            <h3 className="text-base font-semibold text-slate-900">코드 해석 3문장 템플릿</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
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
