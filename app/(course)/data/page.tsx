const dataItems = [
  {
    name: "MBTI.csv",
    description: "선택 — 예전 수업용 샘플. 기본 실습은 seaborn `penguins` / `mpg`만으로 진행합니다.",
    href: "/data/MBTI.csv",
    usedIn: "선택",
  },
  {
    name: "students.csv",
    description: "선택 — CSV 읽기 연습·오프라인용.",
    href: "/data/students.csv",
    usedIn: "선택",
  },
  {
    name: "students_with_missing.csv",
    description: "선택 — 결측 연습용(6차시는 내장 penguins 결측으로 진행).",
    href: "/data/students_with_missing.csv",
    usedIn: "선택",
  },
];

export default function DataPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">데이터 다운로드</h1>
        <p className="text-slate-600">
          <strong className="text-slate-800">기본 실습</strong>은 Google Colab에서{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">import seaborn as sns</code> 후{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">sns.load_dataset(&quot;penguins&quot;)</code> 또는{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">&quot;mpg&quot;</code>만 사용합니다.{" "}
          <strong>CSV 업로드는 필수가 아닙니다.</strong>
        </p>
        <p className="text-sm text-slate-500">
          아래 파일은 심화·비교·오프라인용으로 남겨 두었습니다.
        </p>
        <ul className="space-y-2">
          {dataItems.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">용도: {item.usedIn}</p>
              </div>
              <a
                href={item.href}
                download
                className="inline-flex w-fit rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                다운로드
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
