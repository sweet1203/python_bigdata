"use client";

import { useEffect, useState } from "react";

const CHECKLIST_KEY = "ac-assessment-checklist-v1";

const checklistItems = [
  { id: "data-source", label: "데이터 출처를 명확히 적었다." },
  { id: "cleaning", label: "결측치/이상치 처리 과정을 설명했다." },
  { id: "visual", label: "그래프 제목, 축 이름, 범례를 정확히 넣었다." },
  { id: "insight", label: "그래프를 근거로 해석 문장을 작성했다." },
  { id: "reflection", label: "한계점과 개선 방향을 작성했다." },
];

type ChecklistState = Record<string, boolean>;

function createInitialChecklist(): ChecklistState {
  return Object.fromEntries(checklistItems.map((item) => [item.id, false]));
}

export default function AssessmentPage() {
  const [checklist, setChecklist] = useState<ChecklistState>(createInitialChecklist);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CHECKLIST_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChecklistState;
      setChecklist({ ...createInitialChecklist(), ...parsed });
    } catch {
      setChecklist(createInitialChecklist());
    }
  }, []);

  const handleToggle = (id: string) => {
    setChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      window.localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
    setSavedMessage("자기점검 체크 상태가 저장되었습니다.");
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <section className="w-full space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-bold">수행평가 준비실</h1>
      <p className="text-zinc-700">실습 결과를 수행평가 제출물 형태로 정리할 수 있도록 체크리스트와 템플릿을 제공합니다.</p>

      <div className="rounded-lg border border-zinc-200 p-4">
        <h2 className="mb-3 text-lg font-semibold">루브릭 체크리스트 (40/30/30)</h2>
        <ul className="space-y-2 text-sm text-zinc-700">
          <li className="rounded-md bg-zinc-50 px-3 py-2">
            <span className="font-semibold text-zinc-900">40점 · 분석 과정</span>: 데이터 수집/전처리 과정의 타당성과 재현 가능성
          </li>
          <li className="rounded-md bg-zinc-50 px-3 py-2">
            <span className="font-semibold text-zinc-900">30점 · 시각화 품질</span>: 그래프 종류 선택, 가독성, 라벨링 정확성
          </li>
          <li className="rounded-md bg-zinc-50 px-3 py-2">
            <span className="font-semibold text-zinc-900">30점 · 해석/발표</span>: 결과 해석의 논리성, 한계 인식, 개선 제안
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4">
        <h2 className="mb-2 text-lg font-semibold">포트폴리오 템플릿</h2>
        <p className="mb-3 text-sm text-zinc-600">아래 구조를 복사해 보고서/발표자료의 기본 틀로 사용하세요.</p>
        <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-100">
{`# 데이터 시각화 수행평가 포트폴리오

1. 주제와 분석 질문
- 내가 분석하려는 문제는 무엇인가?

2. 데이터 소개
- 데이터 출처:
- 주요 변수:

3. 전처리 과정
- 결측치/이상치 처리:
- 파생변수 생성:

4. 시각화 결과
- 그래프 1:
- 그래프 2:

5. 결과 해석
- 핵심 인사이트 1:
- 핵심 인사이트 2:

6. 한계와 개선 방향
- 현재 분석의 한계:
- 다음 단계 계획:`}
        </pre>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4">
        <h2 className="mb-2 text-lg font-semibold">제출 전 자기점검 폼</h2>
        <p className="mb-3 text-sm text-zinc-600">
          완료 항목: <span className="font-semibold">{checkedCount}</span> / {checklistItems.length}
        </p>
        <ul className="space-y-2">
          {checklistItems.map((item) => (
            <li key={item.id} className="rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={checklist[item.id]} onChange={() => handleToggle(item.id)} />
                {item.label}
              </label>
            </li>
          ))}
        </ul>
        {savedMessage && <p className="mt-3 text-xs text-emerald-700">{savedMessage}</p>}
      </div>
    </section>
  );
}
