const faqs = [
  {
    question: "코랩이 뭔가요?",
    answer: "코랩(Colab)은 구글에서 제공하는 클라우드 파이썬 실습 환경으로, 별도 설치 없이 브라우저에서 바로 코드를 실행할 수 있습니다.",
  },
  {
    question: "처음 시작하려면 어떻게 해야 하나요?",
    answer: "`학습하기` 페이지에서 단원을 선택한 뒤 `코랩에서 열기` 버튼을 눌러 노트북을 열고 셀을 위에서부터 순서대로 실행하면 됩니다.",
  },
  {
    question: "데이터 파일은 어떻게 올리나요?",
    answer: "`데이터` 페이지에서 파일을 다운로드한 후, 코랩 왼쪽 파일 탭에서 업로드하거나 `files.upload()` 코드를 사용하면 됩니다.",
  },
  {
    question: "그래프에서 한글이 깨질 때는 어떻게 하나요?",
    answer: "코랩에서 한글 폰트를 설치하고 matplotlib 폰트 설정을 적용하면 해결됩니다. 수업 자료의 시각화 단원 예제를 그대로 사용하세요.",
  },
];

export default function HelpPage() {
  return (
    <section className="w-full space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-bold">도움말</h1>
      <p className="text-zinc-700">수업 중 자주 묻는 질문을 모아둔 페이지입니다.</p>
      <ul className="space-y-3">
        {faqs.map((faq) => (
          <li key={faq.question} className="rounded-md border border-zinc-200 px-4 py-3">
            <p className="font-semibold text-zinc-900">{faq.question}</p>
            <p className="mt-1 text-sm text-zinc-700">{faq.answer}</p>
          </li>
        ))}
      </ul>
      <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
        <p className="font-semibold text-emerald-900">학생 베타 테스트 반영 사항</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
          <li>모바일 화면에서 상단 메뉴가 잘리지 않도록 가로 스크롤 메뉴로 개선했습니다.</li>
          <li>키보드만으로도 링크/버튼 이동이 가능하도록 포커스 표시를 강화했습니다.</li>
          <li>수행평가 준비실 체크리스트를 자동 저장해 중간 종료 후에도 이어서 작성할 수 있습니다.</li>
        </ul>
      </div>
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
        <p className="font-semibold text-zinc-900">정식 수업 안내</p>
        <p className="mt-1">
          수업 순서는 <span className="font-medium">학습하기 → 퀴즈 → 내 학습 현황 → 수행평가</span>입니다. 데이터 파일은{" "}
          <span className="font-medium">데이터</span> 메뉴에서 내려받아 코랩에 업로드해 사용하세요.
        </p>
      </div>
    </section>
  );
}
