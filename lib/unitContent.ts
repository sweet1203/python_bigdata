export interface UnitContent {
  unitId: string;
  summary: string;
  colabUrl: string;
  code: string;
  breakdown: {
    input: string;
    process: string;
    output: string;
  };
  lineNotes: string[];
  quiz: {
    question: string;
    answerId: string;
    options: { id: string; label: string }[];
  };
  exercise: {
    title: string;
    prompt: string;
    hint: string;
    answer: string;
  };
}

export const unitContents: Record<string, UnitContent> = {
  "1": {
    unitId: "1",
    summary:
      "일상의 데이터→정보→지혜, 파이썬·판다스·코랩의 역할을 이해하고 MBTI CSV를 불러 첫 실행을 해 봅니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd
import matplotlib.pyplot as plt

df_mbti = pd.read_csv("./data/MBTI.csv")
df_mbti.head()`,
    breakdown: {
      input: "코랩에 업로드한 MBTI.csv 경로(./data/MBTI.csv)와 pandas·matplotlib import.",
      process: "pd.read_csv로 표 데이터를 DataFrame으로 읽고, head로 앞부분만 확인합니다.",
      output: "처음 5행 미리보기로 열 이름·값 형태를 빠르게 파악합니다.",
    },
    lineNotes: [
      "import pandas as pd: 표 데이터 처리의 표준 도구를 짧은 이름 pd로 씁니다.",
      "read_csv(...): CSV 파일을 DataFrame(행·열 표)으로 불러옵니다.",
      "head(): 행이 많을 때 앞 5행만 보여 혼잡함을 줄입니다.",
    ],
    quiz: {
      question: "Pandas가 파이썬에서 특히 잘 맞는 역할은 무엇일까요?",
      answerId: "b",
      options: [
        { id: "a", label: "3D 게임 그래픽을 렌더링하기 위해" },
        { id: "b", label: "표 형태(행·열) 데이터를 다루기 위해" },
        { id: "c", label: "안드로이드 앱을 빌드하기 위해" },
      ],
    },
    exercise: {
      title: "실습",
      prompt:
        "코랩에 MBTI.csv를 올린 뒤, 같은 코드로 읽고 head() 결과 스크린샷 또는 셀 출력을 확인해 보세요.",
      hint: "FileNotFoundError가 나면 왼쪽 폴더에 data/MBTI.csv 경로가 맞는지 확인하세요.",
      answer: `import pandas as pd
df = pd.read_csv("./data/MBTI.csv")
df.head()`,
    },
  },
  "2": {
    unitId: "2",
    summary:
      "Series(1차원)와 DataFrame(2차원)의 차이, CSV 읽기, head·tail·info·shape·열 선택까지 연습합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd

df = pd.read_csv("students.csv")
df.head()
df.info()
print(df.shape)
df[["이름", "수학"]]`,
    breakdown: {
      input: "students.csv 파일과 pandas.",
      process: "read_csv로 표를 만들고 head/info/shape로 구조를 살핍니다.",
      output: "행·열 개수, dtypes, 필요한 열만 뽑아 볼 수 있습니다.",
    },
    lineNotes: [
      "DataFrame: 여러 열이 모인 표. df['수학']처럼 한 열만 보면 Series가 됩니다.",
      "info(): 행 수, 열 타입, 결측 개요를 한 번에 봅니다.",
      "df[['이름','수학']]: 열이 두 개 이상이면 DataFrame(대괄호 두 겹)으로 유지됩니다.",
    ],
    quiz: {
      question: "DataFrame에서 단일 열 df['수학']을 뽑았을 때의 자료형에 가장 가까운 것은?",
      answerId: "a",
      options: [
        { id: "a", label: "Series (1차원)" },
        { id: "b", label: "dict" },
        { id: "c", label: "list of dict" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "students.csv를 읽고, tail(3)으로 마지막 3행과 columns로 열 이름 목록을 출력해 보세요.",
      hint: "df.tail(3), df.columns 순으로 실행하면 됩니다.",
      answer: `import pandas as pd
df = pd.read_csv("students.csv")
print(df.tail(3))
print(df.columns)`,
    },
  },
  "3": {
    unitId: "3",
    summary:
      "sort_values로 순위를 매기고, describe·평균 등 통계와 value_counts·unique로 범주형을 분석합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd

df = pd.read_csv("students.csv")

df.sort_values(by="수학", ascending=False).head(3)
df.describe()
df["반"].value_counts()`,
    breakdown: {
      input: "정렬 기준 열 이름과 오름/내림 여부(ascending).",
      process: "sort_values로 순서를 바꾸고, describe·value_counts로 요약합니다.",
      output: "상위권, 분포, 반별 인원 등 해석에 쓰는 요약 값이 나옵니다.",
    },
    lineNotes: [
      "ascending=False: 점수가 높은 쪽이 위로 오는 ‘내림차순’ 정렬.",
      "describe(): 숫자 열에 대해 count·mean·std·사분위·min·max를 한번에.",
      "value_counts(): 범주(반, MBTI 등)별 빈도를 내림차순으로 셉니다.",
    ],
    quiz: {
      question: "수학 점수 ‘높은 순’으로 정렬하려면 ascending을 어떻게 두는 것이 맞을까요?",
      answerId: "c",
      options: [
        { id: "a", label: "True (오름차순)" },
        { id: "b", label: "생략하면 항상 내림차순" },
        { id: "c", label: "False (내림차순)" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "키가 큰 순으로 정렬한 뒤 상위 2명의 이름과 키만 출력하는 한 줄(체이닝)을 작성해 보세요.",
      hint: "sort_values(by='키', ascending=False).head(2)[['이름','키']]",
      answer: `import pandas as pd
df = pd.read_csv("students.csv")
df.sort_values(by="키", ascending=False).head(2)[["이름", "키"]]`,
    },
  },
  "4": {
    unitId: "4",
    summary:
      "레이블 기준 loc와 정수 위치 iloc의 차이, 슬라이싱 시 끝 포함 여부를 구분해 행·열을 추출합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd

df = pd.read_csv("students.csv").set_index("이름")

df.loc["민지", "수학"]
df.loc["민지":"지우", ["국어", "영어", "수학"]]
df.iloc[0:2]`,
    breakdown: {
      input: "이름을 인덱스로 둔 표와 추출할 행·열 레이블 또는 정수 위치.",
      process: "loc는 이름·iloc는 0부터 번호로 접근합니다.",
      output: "한 칸, 여러 행·열, 슬라이스 결과가 Series 또는 DataFrame으로 반환됩니다.",
    },
    lineNotes: [
      "loc['민지','수학']: 행 레이블과 열 이름이 만나는 한 값.",
      "loc 슬라이스는 끝 레이블을 포함하고, iloc[i:j]는 j를 제외합니다.",
      "iloc[-1]: 마지막 행.",
    ],
    quiz: {
      question: "iloc[0:2]와 loc에서 행 슬라이싱할 때 ‘끝’ 처리의 차이로 옳은 것은?",
      answerId: "b",
      options: [
        { id: "a", label: "둘 다 끝 인덱스를 포함하지 않는다" },
        { id: "b", label: "iloc는 끝을 제외, loc는 레이블 슬라이스에서 끝을 포함할 수 있다" },
        { id: "c", label: "차이 없다" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "인덱스를 이름으로 둔 뒤, 서연의 국어·영어·수학 점수만 한 번에 추출하는 loc 코드를 써 보세요.",
      hint: "df.loc['서연', ['국어','영어','수학']]",
      answer: `import pandas as pd
df = pd.read_csv("students.csv").set_index("이름")
df.loc["서연", ["국어", "영어", "수학"]]`,
    },
  },
  "5": {
    unitId: "5",
    summary:
      "비교 연산으로 불리언 마스크를 만들고 & | ~로 결합하며, groupby로 반·과목별 집계를 합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd

df = pd.read_csv("students.csv")

df[(df["키"] >= 165) & (df["수학"] >= 80)]
df.groupby("반")["수학"].mean()`,
    breakdown: {
      input: "열에 대한 조건식 — 각 행에 True/False Series.",
      process: "조건을 df[조건]에 넣어 행을 거르고, groupby로 그룹별 통계를 냅니다.",
      output: "조건에 맞는 부분집합과 반별 평균 등 집계 결과.",
    },
    lineNotes: [
      "pandas에서는 and 대신 &, 각 조건을 반드시 괄호로 묶습니다.",
      "isin([1,3]), between(160,170) 등으로 조건을 간단히 쓸 수 있습니다.",
      "groupby('반')['수학'].mean(): 반 단위로 수학 평균.",
    ],
    quiz: {
      question: "DataFrame에서 두 조건을 동시에 만족하는 행만 남길 때 사용하는 연산자는?",
      answerId: "a",
      options: [
        { id: "a", label: "& (앰퍼샌드)" },
        { id: "b", label: "and 키워드" },
        { id: "c", label: "&&" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "1반 또는 3반 학생만 남기려면 isin을 써서 한 줄로 필터링해 보세요.",
      hint: "df['반'].isin([1, 3])",
      answer: `import pandas as pd
df = pd.read_csv("students.csv")
df[df["반"].isin([1, 3])]`,
    },
  },
  "6": {
    unitId: "6",
    summary:
      "isna로 결측 위치를 확인하고, dropna·fillna(평균·중앙값 등)로 분석 가능한 형태로 정제합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd

df = pd.read_csv("students_with_missing.csv")
print(df.isna().sum())

df["키"] = df["키"].fillna(df["키"].mean())`,
    breakdown: {
      input: "결측이 포함된 CSV.",
      process: "isna().sum()으로 열별 결측 개수를 보고, 열 특성에 맞게 fillna 또는 dropna.",
      output: "통계·그래프에 쓸 수 있도록 NaN 비율을 줄인 표.",
    },
    lineNotes: [
      "isna()/isnull(): 각 칸이 결측인지 True/False.",
      "fillna(평균): 숫자 열에서 흔히 쓰이지만, 해석 목적에 맞는지 생각해야 합니다.",
      "dropna(subset=['이름']): 특정 열만 보고 행을 삭제.",
    ],
    quiz: {
      question: "열별로 결측 개수를 세려면 어떤 코드가 적절할까요?",
      answerId: "b",
      options: [
        { id: "a", label: "df.count()" },
        { id: "b", label: "df.isna().sum()" },
        { id: "c", label: "df.null()" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "몸무게 열의 결측을 해당 열 중앙값으로 채운 뒤, isna().sum().sum()이 0에 가까워졌는지 확인해 보세요.",
      hint: "df['몸무게'] = df['몸무게'].fillna(df['몸무게'].median())",
      answer: `import pandas as pd
df = pd.read_csv("students_with_missing.csv")
df["몸무게"] = df["몸무게"].fillna(df["몸무게"].median())
df.isna().sum()`,
    },
  },
  "7": {
    unitId: "7",
    summary:
      "Matplotlib으로 plot·bar·pie·scatter·hist를 구분해 쓰고, 제목·축·범례로 그래프를 완성합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt

과목 = ["국어", "영어", "수학"]
점수 = [85, 88, 82]

plt.bar(과목, 점수, color="skyblue")
plt.title("과목별 평균 점수")
plt.ylabel("점수")
plt.ylim(0, 100)
plt.show()`,
    breakdown: {
      input: "x축 레이블 리스트와 값 리스트(또는 DataFrame 열).",
      process: "bar/plot/scatter 등으로 인코딩하고 스타일·축 제목을 붙입니다.",
      output: "비교·추세·비율·관계를 한눈에 보여 주는 그림.",
    },
    lineNotes: [
      "항목 간 비교는 막대(bar), 시간 추세는 plot에 가깝습니다.",
      "plt.show(): 노트북/코랩에서 그림을 출력합니다.",
      "한글 깨짐이 있으면 코랩에서 나눔폰트 설정 후 런타임 재시작.",
    ],
    quiz: {
      question: "반별 인원처럼 항목을 나란히 비교할 때 가장 자연스러운 그래프는?",
      answerId: "a",
      options: [
        { id: "a", label: "막대 그래프 (bar)" },
        { id: "b", label: "히스토그램 (hist)" },
        { id: "c", label: "파이 차트만 가능" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "students.csv를 읽어 반별 수학 평균을 구한 뒤, 막대 그래프로 그려 보세요. (groupby 후 plot(kind='bar'))",
      hint: "df.groupby('반')['수학'].mean().plot(kind='bar') 후 plt.show()",
      answer: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
df.groupby("반")["수학"].mean().plot(kind="bar", color="coral")
plt.title("반별 수학 평균")
plt.ylabel("평균 점수")
plt.show()`,
    },
  },
  "8": {
    unitId: "8",
    summary:
      "확인→전처리→통계→시각화→인사이트의 EDA 파이프라인으로 학생 데이터(또는 자료)를 한 번에 분석합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
print(df.head(), df.shape)
print(df.describe())

df.groupby("반")[["국어", "영어", "수학"]].mean().plot(kind="bar")
plt.title("반별 과목 평균")
plt.show()`,
    breakdown: {
      input: "분석 대상 CSV와 질문(예: 반별 성적 차이).",
      process: "head/shape/describe로 살피고, 필요 시 결측 처리 후 groupby·corr·시각화.",
      output: "숫자 근거와 그림으로 결론·인사이트 문장을 쓸 수 있습니다.",
    },
    lineNotes: [
      "EDA는 정해진 답이 아니라 데이터를 탐험하며 가설을 다듬는 과정입니다.",
      "describe·corr은 숫자 열 위주 — 범주열은 value_counts 등을 병행합니다.",
      "인사이트는 ‘무엇이 얼마나 다른가’까지 숫자로 적으면 설득력이 생깁니다.",
    ],
    quiz: {
      question: "EDA에서 맨 처음에 가장 먼저 하는 일에 가까운 것은?",
      answerId: "c",
      options: [
        { id: "a", label: "바로 머신러닝 모델 학습" },
        { id: "b", label: "결론 문장만 먼저 작성" },
        { id: "c", label: "head·info·shape 등으로 데이터 모양과 타입 확인" },
      ],
    },
    exercise: {
      title: "실습",
      prompt:
        "분석 질문 하나(예: 키와 몸무게 상관은?)를 정하고, corr 한 줄과 scatter 플롯으로 답을 시각화해 보세요.",
      hint: "df['키'].corr(df['몸무게']), plt.scatter(df['키'], df['몸무게'])",
      answer: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
print("상관계수:", df["키"].corr(df["몸무게"]))
plt.scatter(df["키"], df["몸무게"])
plt.xlabel("키"); plt.ylabel("몸무게")
plt.title("키 vs 몸무게")
plt.show()`,
    },
  },
};
