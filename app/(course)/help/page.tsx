const faqs = [
  {
    question: "Colab이 뭔가요?",
    answer:
      "Google Colab은 브라우저에서 바로 파이썬 코드를 실행할 수 있는 무료 클라우드 노트북입니다. 별도 설치 없이 수업 실습에 적합합니다.",
  },
  {
    question: "처음 시작하려면 어떻게 하나요?",
    answer:
      "왼쪽 목차에서 차시를 고른 뒤 `학습하기` 교안을 읽고, Colab에서 코드 셀을 위에서부터 실행하면 됩니다.",
  },
  {
    question: "그래프에서 한글이 깨질 때는?",
    answer:
      "7차시(시각화) 교안은 제목·축을 영어로 두어 폰트 설정 없이 쓰도록 되어 있습니다. 다른 차시에서 한글 제목을 쓰고 싶다면 Colab에 한글 폰트를 설치한 뒤 matplotlib 폰트를 지정하면 됩니다.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">도움말</h1>
        <p className="text-slate-600">자주 묻는 질문입니다.</p>
        <ul className="space-y-3">
          {faqs.map((faq) => (
            <li key={faq.question} className="rounded-lg border border-slate-200 px-4 py-3">
              <p className="font-semibold text-slate-900">{faq.question}</p>
              <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">권장 순서</p>
          <p className="mt-1">
            <span className="font-medium">학습하기</span> → <span className="font-medium">퀴즈</span> →{" "}
            <span className="font-medium">내 학습 현황</span>
          </p>
        </div>
      </section>
    </div>
  );
}
