const dataItems = [
  {
    name: "MBTI.csv",
    description: "1차시 실습용 — 학생 MBTI·좋아하는 과목 데이터",
    href: "/data/MBTI.csv",
    usedIn: "1차시",
  },
  {
    name: "students.csv",
    description: "2~5·7·8차시 실습용 — 학생 성적·신체 데이터",
    href: "/data/students.csv",
    usedIn: "2·3·4·5·7·8차시",
  },
  {
    name: "students_with_missing.csv",
    description: "6차시 실습용 — 결측치가 포함된 학생 데이터",
    href: "/data/students_with_missing.csv",
    usedIn: "6차시",
  },
];

export default function DataPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">데이터 다운로드</h1>
        <p className="text-slate-600">
          단원 실습에 사용하는 CSV를 내려받아 <strong className="text-slate-800">Google Colab</strong>에 업로드하세요.
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
                <p className="mt-0.5 text-xs font-medium text-primary-600">사용 차시: {item.usedIn}</p>
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
        <div className="rounded-lg border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-900">
          <strong>Colab에서 사용하는 방법:</strong> 파일을 내려받은 뒤, Colab 왼쪽 폴더 아이콘(📁)에서{" "}
          <code className="rounded bg-warm-100 px-1 font-mono text-xs">data/</code> 폴더를 만들고 업로드하세요.
          교안 코드의 경로(<code className="rounded bg-warm-100 px-1 font-mono text-xs">./data/파일명.csv</code>)와
          일치해야 합니다.
        </div>
      </section>
    </div>
  );
}
