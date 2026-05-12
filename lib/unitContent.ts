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
  /** 교안 예제와 조건·열·출력을 살짝 바꾼 과제 */
  exercise: {
    title: string;
    prompt: string;
    interpretation: string;
    hint: string;
    answer: string;
  };
  /** 한 단계 더 생각해 보는 심화 과제 */
  challenge: {
    title: string;
    prompt: string;
    interpretation: string;
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
      title: "변형 실습",
      prompt:
        "교안에서는 `df.head()`로 앞 5행을 봤습니다. 위에서 이미 `df`를 만든 뒤, 이번 셀에는 `df.shape`로 행·열 개수를 출력하고, `head(3)`으로 앞 3행만 확인해 보세요.",
      interpretation: `\`shape\`은 (행 개수, 열 개수) 튜플입니다. 표 전체가 얼마나 큰지 한눈에 잡습니다.

\`head(3)\`은 교안의 5행보다 짧게 미리 보기만 바꾼 것입니다. 열 구성은 동일한지 비교해 보세요.`,
      hint: "print(df.shape) 다음에 print(df.head(3)) 또는 df.head(3)만 셀 마지막에 두기",
      answer: `print(df.shape)
print(df.head(3))`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "위에서 `df`가 있는 상태에서, `species` 열에서 각 종이 몇 마리씩인지 세고, 그중 가장 많이 등장한 종 이름과 그 마리 수를 한 번에 출력해 보세요.",
      interpretation: `\`value_counts()\`는 많은 순으로 정렬된 표를 줍니다. 맨 위 행이 1위 종입니다.

\`idxmax()\`는 “가장 큰 값이 붙은 이름(인덱스)”을 돌려줍니다. 마리 수는 그 이름에 해당하는 숫자 칸을 같이 출력하면 됩니다.`,
      hint: "vc = df['species'].value_counts() 후 vc.idxmax(), vc.max() 또는 int(vc.iloc[0])",
      answer: `vc = df["species"].value_counts()
print(vc.idxmax(), int(vc.max()))`,
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
      title: "변형 실습",
      prompt:
        "교안은 `head`·`info`·`shape`·두 열 선택을 다뤘습니다. 이번에는 `body_mass_g` 열 하나만 뽑아(Series) 앞 4개 값만 보고, 이어서 `df.shape[1]`(열 개수)을 출력해 보세요.",
      interpretation: `\`df['body_mass_g']\`처럼 한 열만 고르면 Series(1차원)입니다. \`.head(4)\`는 앞에서 네 개 값입니다.

\`shape[1]\`은 “열이 몇 개인지”입니다. 교안의 \`columns\` 목록 길이와 같은 숫자가 나와야 합니다.`,
      hint: "print(df['body_mass_g'].head(4)), print(df.shape[1])",
      answer: `print(df["body_mass_g"].head(4))
print(df.shape[1])`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "섬(`island`)별로 펭귄이 몇 마리씩 있는지 `value_counts()`로 세고, 그중 가장 적은 마리 수를 가진 섬 이름을 출력해 보세요.",
      interpretation: `\`value_counts()\`는 기본적으로 많은 순입니다. “가장 적은 섬”은 보통 맨 아래 행이거나, 코드로는 \`idxmin()\`으로 고를 수 있습니다.

출력이 섬 이름 하나면, 그 섬이 표본 수가 가장 작은 서식지라는 뜻으로 해석할 수 있습니다.`,
      hint: "vc = df['island'].value_counts(); print(vc.idxmin())",
      answer: `vc = df["island"].value_counts()
print(vc.idxmin())`,
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
      title: "변형 실습",
      prompt:
        "교안은 `bill_length_mm`으로 내림차순 정렬했습니다. 이번에는 `body_mass_g`가 작은 순(가벼운 펭귄부터)으로 정렬한 뒤, 맨 앞 3행의 `species`와 `body_mass_g`만 골라 출력해 보세요.",
      interpretation: `\`ascending=True\`(또는 생략 시 기본 오름차순)이면 값이 작은 쪽이 위에 옵니다.

출력 3행의 \`body_mass_g\`가 위에서 아래로 커지는지 확인하면 정렬이 맞는지 점검할 수 있습니다.`,
      hint: "sort_values(by='body_mass_g', ascending=True).head(3)[['species','body_mass_g']]",
      answer: `df.sort_values(by="body_mass_g", ascending=True).head(3)[["species", "body_mass_g"]]`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "섬(`island`)마다 `bill_length_mm`의 평균이 어떻게 다른지 `groupby`로 구해 한 줄에 출력해 보세요.",
      interpretation: `결과는 섬 이름이 인덱스, 평균 부리 길이가 값인 Series 형태가 일반적입니다.

숫자를 비교해 “어느 섬 펭귄의 평균 부리가 더 긴지”를 한 문장으로 적어 보면 인사이트 연습이 됩니다.`,
      hint: "df.groupby('island')['bill_length_mm'].mean()",
      answer: `df.groupby("island")["bill_length_mm"].mean()`,
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
      title: "변형 실습",
      prompt:
        "교안은 `loc`로 0번 행과 여러 열을 뽑았습니다. 같은 방식으로 번호 인덱스를 만든 뒤, `iloc`로 0번·1번 행만 고르고 열은 `species`와 `flipper_length_mm` 두 개만 남겨 보세요. (`iloc`는 정수 위치를 쓰므로 열도 위치로 고르거나, 잘라낸 뒤 열을 선택해도 됩니다.)",
      interpretation: `\`iloc[0:2]\`는 “앞에서 0번·1번 위치의 행”입니다(끝 2는 포함 안 됨).

열을 고를 때 이름으로 고르고 싶다면 \`iloc\`으로 행만 자른 다음 \`[[열1,열2]]\`를 이어 붙이는 방식이 초보에게 안전합니다.`,
      hint: "df.iloc[0:2][['species','flipper_length_mm']]",
      answer: `df.iloc[0:2][["species", "flipper_length_mm"]]`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "같은 준비(결측 제거 → 번호 열 → 인덱스)를 한 뒤, `loc`만 사용해 마지막 번호 행의 `species`와 `body_mass_g`를 한 번에 추출해 보세요.",
      interpretation: `마지막 행의 인덱스 레이블은 \`df.index[-1]\`처럼 구할 수 있습니다. 그 값을 \`loc\`의 행 자리에 넣으면 됩니다.

교안의 “0번 행”과 달리 끝 관측을 집는 연습입니다.`,
      hint: "last = df.index[-1]; df.loc[last, ['species','body_mass_g']]",
      answer: `last = df.index[-1]
df.loc[last, ["species", "body_mass_g"]]`,
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
      title: "변형 실습",
      prompt:
        "교안은 체중·종 조건을 `&`로 묶었습니다. 이번에는 `island`가 \"Dream\"인 행만 남기는 필터를 한 줄로 작성하고, 결과의 `shape`을 출력해 보세요.",
      interpretation: `\`shape[0]\`이 원본보다 작아졌는지 보면 필터가 먹었는지 확인할 수 있습니다.

Dream 섬만 남았다면 \`island\` 열 값이 모두 Dream인지 head로 몇 줄만 검증해 보세요.`,
      hint: "df[df['island']=='Dream'].shape",
      answer: `print(df[df["island"] == "Dream"].shape)`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "종(`species`)마다 `flipper_length_mm`의 평균과 개수(count)를 한 번에 보고 싶습니다. `groupby`와 `agg`(또는 `mean`/`count`를 묶는 방법)로 표를 만들어 보세요.",
      interpretation: `열이 두 개(\`mean\`, \`count\`)인 요약 표가 나오면 성공입니다. 평균 날개 길이와 표본 수를 동시에 보면 “수가 적어서 평균이 불안정할 수 있는 종”도 짐작할 수 있습니다.`,
      hint: "df.groupby('species')['flipper_length_mm'].agg(['mean','count'])",
      answer: `df.groupby("species")["flipper_length_mm"].agg(["mean", "count"])`,
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
      title: "변형 실습",
      prompt:
        "교안은 `bill_length_mm`을 중앙값으로 채웠습니다. 이번에는 `bill_depth_mm` 열에 결측이 있는 행만 골라 새 DataFrame으로 두고, 그 행 개수(`len`)를 출력해 보세요.",
      interpretation: `\`df['bill_depth_mm'].isna()\`는 행마다 True/False입니다. 그걸로 \`df[...]\`를 쓰면 결측 행만 남습니다.

\`len(...)\`이 0이면 그 열에는 결측이 없다는 뜻입니다.`,
      hint: "sub = df[df['bill_depth_mm'].isna()]; print(len(sub))",
      answer: `sub = df[df["bill_depth_mm"].isna()]
print(len(sub))`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`bill_length_mm`에 결측이 있는 행만 통째로 제거하는 `dropna(subset=[...])`를 쓰세요. 처리 전·후 `df.shape`를 각각 출력해, 행이 몇 줄 줄었는지 확인해 보세요.",
      interpretation: `\`subset\`에 열 이름을 주면, 그 열에 NaN인 행만 지웁니다. 다른 열의 결측은 그대로 둘 수 있습니다.

전후 shape를 비교하면 몇 행이 빠졌는지 숫자로 말할 수 있습니다.`,
      hint: "print(df.shape); df2 = df.dropna(subset=['bill_length_mm']); print(df2.shape)",
      answer: `print("before", df.shape)
df2 = df.dropna(subset=["bill_length_mm"])
print("after", df2.shape)`,
    },
  },
  "7": {
    unitId: "7",
    summary:
      "mpg로 히스토그램·막대·산점도·선·상관 히트맵·파이를 그리고, 제목·축 라벨을 붙여 그림을 마무리합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt
${MPG_LOAD}

plt.hist(df["mpg"], bins=15, color="skyblue", edgecolor="black")
plt.title("Distribution of MPG (miles per gallon)")
plt.xlabel("mpg")
plt.ylabel("count")
plt.show()`,
    breakdown: {
      input: "seaborn 내장 mpg 표와 matplotlib·seaborn.",
      process: "목적에 맞게 hist / bar / scatter / line / heatmap / pie를 고르고 title·xlabel·ylabel을 붙입니다.",
      output: "분포·비교·관계·추세·상관·비율을 그림으로 설명할 수 있습니다.",
    },
    lineNotes: [
      "plt.hist: 한 수치 열의 분포를 볼 때 씁니다.",
      "sns.heatmap(corr): 숫자 열들의 상관행렬을 색으로 표현합니다.",
      "plt.pie: 범주가 적을 때 전체 대비 비율을 보여 줍니다.",
      "value_counts / groupby().mean()과 plot을 연결하면 빈도·평균 비교 막대를 쉽게 그립니다.",
    ],
    quiz: {
      question: "연비(mpg) 값이 전체적으로 어떻게 퍼져 있는지 분포를 보고 싶을 때 가장 먼저 쓰기 쉬운 그래프는?",
      answerId: "b",
      options: [
        { id: "a", label: "범주별 평균 막대만 가능" },
        { id: "b", label: "히스토그램 (plt.hist)" },
        { id: "c", label: "파이 차트만 가능" },
      ],
    },
    exercise: {
      title: "변형 실습",
      prompt:
        "교안 히스토그램은 `mpg`였습니다. 위에서 `mpg` 데이터와 `plt` 준비가 끝난 뒤, 이번 셀에는 `weight` 히스토그램만 그리세요. `bins=10`, `edgecolor='black'`, 제목 \"Distribution of vehicle weight\", 축 weight / count.",
      interpretation: `가로축은 파운드 단위 무게 구간, 세로축은 그 구간에 속한 차 대수입니다.

교안의 mpg 분포와 비교해 “무게는 한쪽에 몰리는지, 넓게 퍼지는지”를 말로 한 줄 적어 보세요.`,
      hint: "plt.hist(df['weight'], bins=10, ...); plt.title(...); plt.xlabel('weight'); plt.ylabel('count')",
      answer: `plt.hist(df["weight"], bins=10, color="lightsteelblue", edgecolor="black")
plt.title("Distribution of vehicle weight")
plt.xlabel("weight")
plt.ylabel("count")
plt.show()`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "위에서 `df`(mpg)가 있는 뒤, 이번 셀만 작성합니다. `horsepower` 결측을 제거한 뒤 `cylinders`별 평균 horsepower 막대 그래프를 그리세요. 제목·축 이름은 영어로.",
      interpretation: `막대는 실린더 수(범주)마다 평균 마력을 비교합니다. 막대가 높은 실린더 구성이 “평균적으로 힘이 센지”를 읽을 수 있습니다.

결측을 먼저 빼야 경고 없이 평균이 계산되는 경우가 많습니다.`,
      hint: "tmp = df.dropna(subset=['horsepower']); tmp.groupby('cylinders')['horsepower'].mean().plot(kind='bar')",
      answer: `tmp = df.dropna(subset=["horsepower"])
tmp.groupby("cylinders")["horsepower"].mean().plot(kind="bar", color="teal")
plt.title("Mean horsepower by cylinder count")
plt.xlabel("cylinders")
plt.ylabel("mean horsepower")
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

df.groupby("species")["body_mass_g"].mean().plot(kind="bar", color="steelblue")
plt.title("Mean body mass by penguin species")
plt.xlabel("species")
plt.ylabel("mean body_mass_g")
plt.show()`,
    breakdown: {
      input: "분석 대상으로 다시 펭귄 데이터를 사용 — 1~6차시와 동일 맥락.",
      process: "head/shape/describe로 살피고, 결측 제거 후 groupby·시각화.",
      output: "숫자 근거와 그림으로 결론·인사이트 문장을 쓸 수 있습니다.",
    },
    lineNotes: [
      "EDA는 정해진 답이 아니라 데이터를 탐험하며 가설을 다듬는 과정입니다.",
      "막대·산점도 예제에는 제목·축 라벨이 들어 있습니다.",
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
      title: "변형 실습",
      prompt:
        "교안 막대그래프는 종(`species`)별 평균 체중이었습니다. 교안에서 `df = df.dropna()`까지 실행한 같은 `df`를 쓰고, 이번 셀에는 `island`별 평균 `body_mass_g` 막대만 그리세요. 제목은 \"Mean body mass by island\", 축 이름은 영어로 맞춥니다.",
      interpretation: `막대 세 개(또는 섬 개수만큼)가 나오면, 어느 서식지 펭귄이 평균적으로 더 무거운지를 비교할 수 있습니다.

교안의 “종별”과 달리 지리(섬) 기준으로 묶었습니다.`,
      hint: "df = df.dropna(); df.groupby('island')['body_mass_g'].mean().plot(kind='bar'); plt.title(...)",
      answer: `df.groupby("island")["body_mass_g"].mean().plot(kind="bar", color="darkorange")
plt.title("Mean body mass by island")
plt.xlabel("island")
plt.ylabel("mean body_mass_g")
plt.show()`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "같은 `df`(결측 제거까지 끝낸 표)로, 이번 셀에는 `flipper_length_mm`과 `body_mass_g`의 상관계수 출력과 산점도만 작성하세요. 제목은 \"Flipper length vs body mass\"(영어), 축 이름은 열 이름과 같게 맞춥니다.",
      interpretation: `상관계수는 두 수치가 함께 커지는지를 숫자로, 산점도는 점 구름의 방향으로 확인합니다.

교안의 부리 길이·깊이 조합과는 다른 몸 크기 질문입니다.`,
      hint: "print(df['flipper_length_mm'].corr(df['body_mass_g'])); plt.scatter(df['flipper_length_mm'], df['body_mass_g'], alpha=0.6)",
      answer: `print("Correlation:", df["flipper_length_mm"].corr(df["body_mass_g"]))
plt.scatter(df["flipper_length_mm"], df["body_mass_g"], alpha=0.6)
plt.xlabel("flipper_length_mm")
plt.ylabel("body_mass_g")
plt.title("Flipper length vs body mass")
plt.show()`,
    },
  },
};
