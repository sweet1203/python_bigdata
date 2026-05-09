const faqs = [
  {
    question: "Colab이 뭔가요?",
    answer:
      "Google Colab은 브라우저에서 바로 파이썬 코드를 실행할 수 있는 무료 클라우드 노트북입니다. 별도 설치 없이 수업 실습에 적합합니다.",
  },
  {
    question: "처음 시작하려면 어떻게 하나요?",
    answer:
      "왼쪽 목차에서 차시를 고른 뒤 `학습하기` 화면의 교안을 읽고, 안내에 따라 Colab에서 코드 셀을 위에서부터 실행하면 됩니다.",
  },
  {
    question: "데이터 파일은 어떻게 올리나요?",
    answer:
      "`데이터` 페이지에서 CSV를 다운로드한 뒤, Colab 왼쪽 파일 탭에서 업로드하거나 교안에 나온 `files.upload()` 코드를 사용하면 됩니다.",
  },
  {
    question: "그래프에서 한글이 깨질 때는?",
    answer:
      "Colab에서 한글 폰트를 설치하고 matplotlib 폰트 설정을 적용하면 해결됩니다. 시각화 차시 예제를 그대로 따라 하세요.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">도움말</h1>
        <p className="text-slate-600">수업 중 자주 묻는 질문을 모아둔 페이지입니다.</p>
        <ul className="space-y-3">
          {faqs.map((faq) => (
            <li key={faq.question} className="rounded-lg border border-slate-200 px-4 py-3">
              <p className="font-semibold text-slate-900">{faq.question}</p>
              <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3">
          <p className="font-semibold text-primary-900">학습 화면 안내</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-primary-900">
            <li>데이터 리터러시 사이트와 같은 형태로 왼쪽 고정 목차·모바일 메뉴·진행 체크를 맞춰 두었습니다.</li>
            <li>차시별 마크다운 교안은 웹에서 읽기 좋게 표시되며, 코드는 복사해 Colab에 붙여 넣을 수 있습니다.</li>
            <li>목차(넓은 화면 오른쪽)로 긴 교안을 주제별로 이동할 수 있습니다.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">정식 수업 안내</p>
          <p className="mt-1">
            권장 순서는 <span className="font-medium">학습하기(Colab 병행) → 퀴즈 → 내 학습 현황</span>입니다. 데이터 파일은{" "}
            <span className="font-medium">데이터</span> 메뉴에서 내려받아 Colab에 업로드해 사용하세요.
          </p>
        </div>
      </section>
    </div>
  );
}
