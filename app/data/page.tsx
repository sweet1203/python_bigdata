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
    <section className="w-full space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-bold">데이터 다운로드</h1>
      <p className="text-zinc-700">단원 실습에 사용하는 데이터를 내려받아 코랩에 업로드하세요.</p>
      <ul className="space-y-2">
        {dataItems.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-2 rounded-md border border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-zinc-900">{item.name}</p>
              <p className="text-sm text-zinc-600">{item.description}</p>
              <p className="mt-0.5 text-xs text-emerald-700 font-medium">사용 차시: {item.usedIn}</p>
            </div>
            <a
              href={item.href}
              download
              className="inline-flex w-fit rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              다운로드
            </a>
          </li>
        ))}
      </ul>
      <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <strong>코랩에서 사용하는 방법:</strong> 파일을 내려받은 뒤, 코랩 왼쪽 폴더 아이콘(📁)에서{" "}
        <code className="rounded bg-amber-100 px-1 font-mono text-xs">data/</code> 폴더를 만들고 업로드하세요.
        교안 코드의 경로(<code className="rounded bg-amber-100 px-1 font-mono text-xs">./data/파일명.csv</code>)와 일치해야 합니다.
      </div>
    </section>
  );
}
