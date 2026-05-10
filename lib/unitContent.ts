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

const PENGUINS_LOAD = `import pandas as pd
import seaborn as sns

df = sns.load_dataset("penguins")`;

const MPG_LOAD = `import pandas as pd
import seaborn as sns

df = sns.load_dataset("mpg")`;

export const unitContents: Record<string, UnitContent> = {
  "1": {
    unitId: "1",
    summary:
      "데이터→정보→지혜, 파이썬·판다스·코랩의 역할을 이해하고 seaborn 내장 펭귄 데이터로 첫 실행을 해 봅니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df.head()`,
    breakdown: {
      input: "Colab, pandas, seaborn — `sns.load_dataset(\"penguins\")`는 인터넷으로 샘플을 한 번 받아 옵니다.",
      process: "표 데이터를 DataFrame으로 읽고 head로 앞부분만 확인합니다.",
      output: "처음 5행 미리보기로 열 이름·값 형태를 빠르게 파악합니다.",
    },
    lineNotes: [
      "import pandas as pd: 표 데이터 처리를 pd라는 짧은 이름으로 씁니다.",
      "seaborn: 통계·시각화용 라이브러리이며, 교육용 표본 데이터를 `load_dataset`으로 제공합니다.",
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
        "첫 셀에서 pandas와 seaborn을 불러온 뒤 `sns.load_dataset(\"penguins\")`로 df를 만들고 `df.head()` 출력을 확인해 보세요.",
      hint: "첫 실행 시 `load_dataset`이 잠시 걸릴 수 있습니다.",
      answer: `${PENGUINS_LOAD}

df.head()`,
    },
  },
  "2": {
    unitId: "2",
    summary:
      "Series(1차원)와 DataFrame(2차원)의 차이, load_dataset으로 읽기, head·tail·info·shape·열 선택까지 연습합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df.head()
df.info()
print(df.shape)
df[["species", "bill_length_mm"]]`,
    breakdown: {
      input: "seaborn 펭귄 데이터와 pandas.",
      process: "DataFrame 구조를 head/info/shape로 살피고 열을 고릅니다.",
      output: "행·열 개수, dtypes, 필요한 열만 뽑아 볼 수 있습니다.",
    },
    lineNotes: [
      "DataFrame: 여러 열이 모인 표. df['bill_length_mm']처럼 한 열만 보면 Series입니다.",
      "info(): 행 수, 열 타입, 결측 개요를 한 번에 봅니다.",
      "df[['species','bill_length_mm']]: 열이 두 개 이상이면 DataFrame(대괄호 두 겹)으로 유지됩니다.",
    ],
    quiz: {
      question: "DataFrame에서 단일 열 df['bill_length_mm']을 뽑았을 때의 자료형에 가장 가까운 것은?",
      answerId: "a",
      options: [
        { id: "a", label: "Series (1차원)" },
        { id: "b", label: "dict" },
        { id: "c", label: "list of dict" },
      ],
    },
    exercise: {
      title: "실습",
      prompt: "같은 df에 대해 tail(3)으로 마지막 3행과 columns로 열 이름 목록을 출력해 보세요.",
      hint: "df.tail(3), df.columns 순으로 실행하면 됩니다.",
      answer: `${PENGUINS_LOAD}

print(df.tail(3))
print(df.columns)`,
    },
  },
  "3": {
    unitId: "3",
    summary:
      "sort_values로 순위를 매기고, describe·평균 등 통계와 value_counts·unique로 범주형(종·섬)을 분석합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df.sort_values(by="bill_length_mm", ascending=False).head(3)
df.describe()
df["species"].value_counts()`,
    breakdown: {
      input: "정렬 기준 열 이름과 오름/내림 여부(ascending).",
      process: "sort_values로 순서를 바꾸고, describe·value_counts로 요약합니다.",
      output: "부리 길이 상위 개체, 수치 요약, 종별 마리 수 등 해석에 쓰는 값이 나옵니다.",
    },
    lineNotes: [
      "ascending=False: 값이 큰 쪽이 위로 오는 내림차순 정렬.",
      "describe(): 숫자 열에 대해 count·mean·std·사분위·min·max를 한번에.",
      "value_counts(): 범주(species, island 등)별 빈도를 내림차순으로 셉니다.",
    ],
    quiz: {
      question: "부리 길이(bill_length_mm)가 긴 순으로 정렬하려면 ascending을 어떻게 두는 것이 맞을까요?",
      answerId: "c",
      options: [
        { id: "a", label: "True (오름차순)" },
        { id: "b", label: "생략하면 항상 내림차순" },
        { id: "c", label: "False (내림차순)" },
      ],
    },
    exercise: {
      title: "실습",
      prompt:
        "flipper_length_mm(날개 길이)가 긴 순으로 정렬한 뒤, 상위 2마리의 species와 flipper_length_mm만 한 줄(체이닝)으로 출력해 보세요.",
      hint: "sort_values(by='flipper_length_mm', ascending=False).head(2)[['species','flipper_length_mm']]",
      answer: `${PENGUINS_LOAD}

df.sort_values(by="flipper_length_mm", ascending=False).head(2)[["species", "flipper_length_mm"]]`,
    },
  },
  "4": {
    unitId: "4",
    summary:
      "행 번호(레이블)를 인덱스로 두고 loc와 iloc의 차이, 슬라이싱 시 끝 포함 여부를 구분해 행·열을 추출합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df = df.dropna().reset_index(drop=True)
df.insert(0, "번호", range(len(df)))
df = df.set_index("번호")

df.loc[0, "bill_length_mm"]
df.loc[0:2, ["species", "bill_length_mm", "body_mass_g"]]
df.iloc[0:2]`,
    breakdown: {
      input: "결측 제거 후 0,1,2… 번호를 인덱스로 둔 펭귄 표.",
      process: "loc는 레이블·iloc는 0부터 번호로 접근합니다.",
      output: "한 칸, 여러 행·열, 슬라이스 결과가 Series 또는 DataFrame으로 반환됩니다.",
    },
    lineNotes: [
      "loc[0, 'bill_length_mm']: 인덱스 0번 행과 열 이름이 만나는 한 값.",
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
      prompt:
        "위와 같이 번호를 인덱스로 둔 뒤, 0번 펭귄의 species, bill_length_mm, bill_depth_mm만 한 번에 추출하는 loc 코드를 써 보세요.",
      hint: "df.loc[0, ['species','bill_length_mm','bill_depth_mm']]",
      answer: `${PENGUINS_LOAD}

df = df.dropna().reset_index(drop=True)
df.insert(0, "번호", range(len(df)))
df = df.set_index("번호")
df.loc[0, ["species", "bill_length_mm", "bill_depth_mm"]]`,
    },
  },
  "5": {
    unitId: "5",
    summary:
      "비교 연산으로 불리언 마스크를 만들고 & |로 결합하며, groupby로 종·섬별 집계를 합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df[(df["body_mass_g"] > 4500) & (df["species"] == "Gentoo")]
df.groupby("species")["body_mass_g"].mean()`,
    breakdown: {
      input: "열에 대한 조건식 — 각 행에 True/False Series.",
      process: "조건을 df[조건]에 넣어 행을 거르고, groupby로 그룹별 통계를 냅니다.",
      output: "조건에 맞는 부분집합과 종별 평균 체중 등 집계 결과.",
    },
    lineNotes: [
      "pandas에서는 and 대신 &, 각 조건을 반드시 괄호로 묶습니다.",
      "isin(['Adelie','Chinstrap']) 등으로 범주 조건을 간단히 쓸 수 있습니다.",
      "groupby('species')['body_mass_g'].mean(): 종 단위로 평균 체중.",
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
      prompt: "species가 Adelie 또는 Chinstrap인 행만 남기려면 isin을 써서 한 줄로 필터링해 보세요.",
      hint: "df['species'].isin(['Adelie', 'Chinstrap'])",
      answer: `${PENGUINS_LOAD}

df[df["species"].isin(["Adelie", "Chinstrap"])]`,
    },
  },
  "6": {
    unitId: "6",
    summary:
      "펭귄 데이터에 포함된 결측을 isna로 확인하고, dropna·fillna(중앙값 등)로 분석 가능한 형태로 정제합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

print(df.isna().sum())

df["bill_length_mm"] = df["bill_length_mm"].fillna(df["bill_length_mm"].median())`,
    breakdown: {
      input: "seaborn penguins — 일부 열에 원래부터 결측이 있습니다.",
      process: "isna().sum()으로 열별 결측 개수를 보고, 열 특성에 맞게 fillna 또는 dropna.",
      output: "통계·그래프에 쓸 수 있도록 NaN 비율을 줄인 표.",
    },
    lineNotes: [
      "isna()/isnull(): 각 칸이 결측인지 True/False.",
      "fillna(중앙값): 숫자 열에서 흔히 쓰이지만, 해석 목적에 맞는지 생각해야 합니다.",
      "dropna(subset=['species']): 특정 열만 보고 행을 삭제.",
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
      prompt:
        "sex 열의 결측을 문자열 'unknown'으로 채운 뒤, sex 열의 isna().sum()이 0인지 확인해 보세요.",
      hint: "df['sex'] = df['sex'].fillna('unknown')",
      answer: `${PENGUINS_LOAD}

df["sex"] = df["sex"].fillna("unknown")
df["sex"].isna().sum()`,
    },
  },
  "7": {
    unitId: "7",
    summary:
      "mpg 데이터로 히스토그램·막대(빈도·평균)·산점도·선 그래프를 구분해 쓰고, 제목·축으로 그림을 완성합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt
${MPG_LOAD}

plt.hist(df["mpg"], bins=15, color="skyblue", edgecolor="black")
plt.title("연비(mpg) 분포")
plt.xlabel("mpg")
plt.ylabel("빈도")
plt.show()`,
    breakdown: {
      input: "seaborn 내장 mpg 표와 matplotlib.",
      process: "hist/bar/scatter/line으로 목적에 맞게 그리고 제목·축을 붙입니다.",
      output: "분포·비교·관계·추세를 한눈에 보여 주는 그림.",
    },
    lineNotes: [
      "plt.hist(열): 한 수치 열의 분포(히스토그램).",
      "value_counts().plot(kind='bar'): 범주별 개수 비교.",
      "groupby(...).mean().plot(kind='bar'): 범주별 평균 비교.",
      "scatter / line: 관계·시간(연식) 추세에 자주 씁니다.",
    ],
    quiz: {
      question: "연비(mpg) 값이 전체적으로 어떻게 퍼져 있는지 **분포**를 보고 싶을 때 가장 먼저 쓰기 쉬운 그래프는?",
      answerId: "b",
      options: [
        { id: "a", label: "범주별 평균 막대만 가능" },
        { id: "b", label: "히스토그램 (plt.hist)" },
        { id: "c", label: "파이 차트만 가능" },
      ],
    },
    exercise: {
      title: "실습",
      prompt:
        "mpg 데이터를 읽은 뒤, `mpg` 열로 히스토그램을 그려 보세요. (bins=12 정도, title·xlabel·ylabel 포함)",
      hint: "plt.hist(df['mpg'], bins=12, edgecolor='black') 후 축·제목·show",
      answer: `import matplotlib.pyplot as plt
${MPG_LOAD}

plt.hist(df["mpg"], bins=12, color="wheat", edgecolor="black")
plt.title("연비 분포")
plt.xlabel("mpg")
plt.ylabel("빈도")
plt.show()`,
    },
  },
  "8": {
    unitId: "8",
    summary:
      "확인→전처리→통계→시각화→인사이트의 EDA 파이프라인으로 펭귄 데이터를 한 번에 분석합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt
${PENGUINS_LOAD}

df = df.dropna()
print(df.head(), df.shape)
print(df.describe())

df.groupby("species")["body_mass_g"].mean().plot(kind="bar")
plt.title("펭귄 종별 평균 체중 (g)")
plt.ylabel("g")
plt.show()`,
    breakdown: {
      input: "분석 대상으로 다시 펭귄 데이터를 사용 — 1~6차시와 동일 맥락.",
      process: "head/shape/describe로 살피고, 결측 제거 후 groupby·시각화.",
      output: "숫자 근거와 그림으로 결론·인사이트 문장을 쓸 수 있습니다.",
    },
    lineNotes: [
      "EDA는 정해진 답이 아니라 데이터를 탐험하며 가설을 다듬는 과정입니다.",
      "describe는 숫자 열 위주 — 범주열은 value_counts 등을 병행합니다.",
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
        "질문 하나(예: bill_length_mm와 bill_depth_mm의 상관은?)를 정하고, corr 한 줄과 scatter 플롯으로 시각화해 보세요.",
      hint: "df['bill_length_mm'].corr(df['bill_depth_mm']), plt.scatter(...)",
      answer: `import matplotlib.pyplot as plt
${PENGUINS_LOAD}

df = df.dropna()
print("상관계수:", df["bill_length_mm"].corr(df["bill_depth_mm"]))
plt.scatter(df["bill_length_mm"], df["bill_depth_mm"], alpha=0.6)
plt.xlabel("bill_length_mm")
plt.ylabel("bill_depth_mm")
plt.title("부리 길이 vs 부리 깊이")
plt.show()`,
    },
  },
};
