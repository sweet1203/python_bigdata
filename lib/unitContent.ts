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
  /** 한 단계 더 생각해 보는 심화 과제 (없으면 표시하지 않음) */
  challenge?: {
    title: string;
    prompt: string;
    interpretation: string;
    hint: string;
    answer: string;
  };
  /** 교안 예제 코드를 줄 단위 주석으로 설명 (7-1 등) */
  codeExplanation?: {
    title: string;
    intro: string;
    blocks: { label: string; summary: string; code: string }[];
  };
}

const PENGUINS_LOAD = `import pandas as pd
import seaborn as sns

df = sns.load_dataset("penguins")`;

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
        "`df`가 이미 있을 때, 한 셀에 다음 두 줄을 넣고 실행하세요. ① `df.shape` ② `df.head(3)`",
      interpretation: `#### 해야 할 일

1. \`df.shape\`로 표 크기(행 수, 열 수)를 봅니다.
2. \`df.head(3)\`으로 앞 3행만 표로 봅니다.

#### 참고

- \`shape\`은 튜플, \`head(3)\`은 DataFrame입니다.`,
      hint: "위에서 아래 순서: `df.shape` → `df.head(3)` (Colab은 마지막 줄 결과가 크게 보일 수 있음)",
      answer: `df.shape
df.head(3)`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`df.columns`로 열 이름 목록을 확인하고, `df.tail(3)`으로 마지막 3행을 보세요.",
      interpretation: `#### 해야 할 일

1. \`df.columns\`로 어떤 열이 있는지 확인합니다.
2. \`df.tail(3)\`으로 표의 마지막 3행을 봅니다.

#### 참고

- \`head()\`가 앞을 보는 것처럼 \`tail()\`은 표의 뒤쪽을 봅니다.`,
      hint: "`df.columns` 다음 줄 `df.tail(3)`",
      answer: `df.columns
df.tail(3)`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 핵심 코드 두 블록입니다. 주석(초록색)을 읽으며 한 줄씩 따라가 보세요.",
      blocks: [
        {
          label: "1. 데이터 불러오기",
          summary: "pandas와 seaborn을 가져와 펭귄 표를 만드는 준비 코드",
          code: `# pandas: 표 데이터를 다루는 라이브러리. pd라는 짧은 이름으로 씁니다
import pandas as pd

# seaborn: 통계·시각화 라이브러리. 내장 예제 데이터도 제공합니다
import seaborn as sns

# sns.load_dataset: seaborn이 제공하는 예제 표를 인터넷으로 받아옵니다
# "penguins"를 df(DataFrame, 표)에 저장합니다
df = sns.load_dataset("penguins")`,
        },
        {
          label: "2. 표 확인하기",
          summary: "불러온 표가 어떻게 생겼는지 빠르게 살펴보는 코드",
          code: `# df.head(): 표의 앞 5행만 보여줍니다 (행이 수백 개여도 5개만)
df.head()

# df.shape: 표의 (행 수, 열 수)를 튜플로 알려줍니다
# 예) (344, 7) → 행 344개, 열 7개
df.shape

# df.columns: 표에 있는 열 이름들을 목록으로 보여줍니다
df.columns`,
        },
      ],
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
df.shape
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
        "한 셀에 두 줄을 넣으세요. ① 열 개수: `df.shape[1]` ② `body_mass_g` 열만 뽑아 앞 4개: `df[\"body_mass_g\"].head(4)`",
      interpretation: `#### 해야 할 일

1. \`df.shape[1]\`로 전체 열 개수를 봅니다.
2. \`df["body_mass_g"].head(4)\`로 체중 열 앞 4개 값을 봅니다.

#### 참고

- 한 열만 고르면 Series입니다.`,
      hint: "순서: `df.shape[1]` 다음 줄에 `df[\"body_mass_g\"].head(4)`",
      answer: `df.shape[1]
df["body_mass_g"].head(4)`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`df`에서 `\"species\"`, `\"flipper_length_mm\"`, `\"body_mass_g\"` 세 열만 골라 마지막 3행을 확인하세요.",
      interpretation: `#### 해야 할 일

1. 열 이름 세 개를 리스트로 묶어 열을 선택합니다.
2. \`tail(3)\`으로 마지막 3행을 봅니다.

#### 참고

- 열 두 개 이상을 고를 때는 대괄호를 두 겹(\`[[ ]]\`) 씁니다.`,
      hint: "`df[[\"species\",\"flipper_length_mm\",\"body_mass_g\"]].tail(3)`",
      answer: `df[["species", "flipper_length_mm", "body_mass_g"]].tail(3)`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 DataFrame 탐색 코드 세 블록입니다. 주석(초록색)을 읽으며 따라가 보세요.",
      blocks: [
        {
          label: "1. 표 구조 살펴보기 — info / shape",
          summary: "행·열 개수, 데이터 타입, 결측 여부를 한 번에 확인",
          code: `# df.info(): 각 열의 이름 / 결측 아닌 값 개수 / 데이터 타입을 출력합니다
# 결측이 있는 열은 Non-Null Count가 전체 행보다 작게 나옵니다
df.info()

# df.shape: (행 수, 열 수) 튜플. 표의 크기를 숫자로 바로 알 수 있습니다
df.shape`,
        },
        {
          label: "2. 열 선택하기",
          summary: "한 열(Series) vs 여러 열(DataFrame) 선택 방법",
          code: `# 열 이름을 하나만 쓰면 → Series(1차원, 숫자 목록처럼 생김)
df["bill_length_mm"]

# 열 이름을 리스트([ ])로 여러 개 쓰면 → DataFrame(2차원 표)
# 대괄호가 두 겹인 이유: df[ [리스트] ] 형태입니다
df[["species", "bill_length_mm"]]

# 앞 5행만 보고 싶으면 뒤에 .head()를 붙입니다
df[["species", "bill_length_mm"]].head()`,
        },
        {
          label: "3. 마지막 행 보기 — tail",
          summary: "표의 뒤쪽 행을 확인할 때",
          code: `# df.tail(): 기본값은 마지막 5행을 보여줍니다
df.tail()

# 괄호 안에 숫자를 넣으면 그 개수만큼만 봅니다
# df.head(3)이 앞 3행이라면, df.tail(3)은 마지막 3행
df.tail(3)`,
        },
      ],
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
        "`body_mass_g`가 작은 값부터 위로 오도록 정렬한 다음, 맨 위 3행만 남기고 열은 `species`, `body_mass_g`만 보이게 하세요.",
      interpretation: `#### 해야 할 일

1. \`body_mass_g\`가 작은 값이 위로 오도록 정렬합니다.
2. 맨 위 3행만 남기고 \`species\`, \`body_mass_g\` 열만 남깁니다.

#### 참고

- \`ascending=True\`(또는 생략)이면 오름차순입니다.`,
      hint: "`df.sort_values(by=\"body_mass_g\", ascending=True).head(3)[[\"species\",\"body_mass_g\"]]`",
      answer: `df.sort_values(by="body_mass_g", ascending=True).head(3)[["species", "body_mass_g"]]`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`flipper_length_mm`(지느러미 길이)가 큰 순으로 정렬한 뒤, 상위 20개 개체에서 종(`species`)별 마리 수를 세세요.",
      interpretation: `#### 해야 할 일

1. \`sort_values\`로 지느러미 길이 내림차순 정렬 후 \`head(20)\`으로 상위 20개만 남깁니다.
2. 남은 표에서 \`value_counts()\`로 종별 마리 수를 셉니다.

#### 참고

- \`sort_values\`와 \`value_counts\` 모두 이번 차시에서 배운 함수입니다.`,
      hint: "`top20 = df.sort_values(by=\"flipper_length_mm\", ascending=False).head(20)` 다음 줄 `top20[\"species\"].value_counts()`",
      answer: `top20 = df.sort_values(by="flipper_length_mm", ascending=False).head(20)
top20["species"].value_counts()`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 정렬·통계 코드 세 블록입니다. 주석(초록색)을 읽으며 따라가 보세요.",
      blocks: [
        {
          label: "1. 정렬하기 — sort_values",
          summary: "원하는 열 기준으로 크기 순서대로 줄 세우기",
          code: `# sort_values(): 지정한 열(by=) 기준으로 행을 정렬합니다
# ascending=False → 큰 값이 위로 오는 내림차순
# ascending=True  → 작은 값이 위로 오는 오름차순 (기본값)
df.sort_values(by="bill_length_mm", ascending=False)

# .head(3)을 붙이면 정렬 후 상위 3개만 볼 수 있습니다
df.sort_values(by="bill_length_mm", ascending=False).head(3)`,
        },
        {
          label: "2. 수치 요약 — describe",
          summary: "숫자 열의 평균·최솟값·최댓값 등을 한눈에 보기",
          code: `# df.describe(): 수치형 열 전체에 대해 아래 통계를 한 번에 보여줍니다
# count  : 결측 아닌 값 개수
# mean   : 평균
# std    : 표준편차 (값이 얼마나 퍼져 있는지)
# min    : 최솟값
# 25%, 50%, 75%: 사분위수
# max    : 최댓값
df.describe()`,
        },
        {
          label: "3. 범주 세기 — value_counts",
          summary: "종·섬처럼 종류가 정해진 열에서 각 항목이 몇 개인지 세기",
          code: `# value_counts(): 해당 열에 각 값이 몇 번 나오는지 세어 내림차순으로 보여줍니다
# 가장 많이 나온 값이 제일 위에 옵니다
df["species"].value_counts()

# 다른 열에도 똑같이 쓸 수 있습니다
df["island"].value_counts()`,
        },
      ],
    },
  },
  "4": {
    unitId: "4",
    summary:
      "P001 형식 일련번호를 인덱스로 두고 loc(이름표)와 iloc(줄 위치) 차이, 슬라이스 끝 포함 여부를 구분합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df = df.dropna().reset_index(drop=True)
df.insert(0, "펭귄번호", [f"P{i:03d}" for i in range(1, len(df) + 1)])
df = df.set_index("펭귄번호")

df.loc["P001", "bill_length_mm"]
df.loc["P001":"P003", ["species", "bill_length_mm", "body_mass_g"]]
df.iloc[0:2]`,
    breakdown: {
      input: "결측 제거 후 P001, P002… 일련번호를 인덱스로 둔 펭귄 표.",
      process: "loc는 P001 같은 이름표·iloc는 0부터 줄 위치로 접근합니다.",
      output: "한 칸, 여러 행·열, 슬라이스 결과가 Series 또는 DataFrame으로 반환됩니다.",
    },
    lineNotes: [
      "loc['P001', 'bill_length_mm']: 이름표 P001 행과 열 이름이 만나는 한 값.",
      "loc['P001':'P003']는 P003까지 포함, iloc[0:2]는 2번 위치는 제외.",
      "iloc[0]은 맨 위 줄, loc['P001']과 같은 행이지만 숫자 0과 P001은 다름.",
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
        "펭귄번호 인덱스가 준비된 `df`에서 맨 위·그다음 줄(줄 위치 0, 1)만 고르고, 열은 `species`, `flipper_length_mm`만 남기세요. (`iloc` 사용)",
      interpretation: `#### 해야 할 일

1. 줄 위치 \`0:2\`(맨 위·그다음 두 줄)로 자릅니다.
2. \`species\`, \`flipper_length_mm\` 열만 고릅니다.

#### 참고

- 일련번호 P001이 아니라 줄 번호이므로 \`iloc\`를 씁니다.`,
      hint: "`df.iloc[0:2][[\"species\",\"flipper_length_mm\"]]`",
      answer: `df.iloc[0:2][["species", "flipper_length_mm"]]`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`loc`만 사용해 마지막 행의 `species`, `body_mass_g`만 한 번에 꺼내세요.",
      interpretation: `#### 해야 할 일

1. 마지막 일련번호를 \`df.index[-1]\`로 구합니다 (예: P333).
2. \`df.loc[그이름, ["species", "body_mass_g"]]\`로 두 열만 한 번에 뽑습니다.

#### 참고

- \`loc\`에는 P001 같은 문자열 이름표를 씁니다.`,
      hint: "`last = df.index[-1]` 다음 `df.loc[last, [\"species\",\"body_mass_g\"]]`",
      answer: `last = df.index[-1]
df.loc[last, ["species", "body_mass_g"]]`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 인덱싱 코드 세 블록입니다. loc와 iloc의 차이에 집중해 읽어 보세요.",
      blocks: [
        {
          label: "1. 인덱스 만들기 — set_index",
          summary: "P001, P002… 일련번호를 인덱스(이름표)로 붙이는 과정",
          code: `# 먼저 결측을 제거하고 줄 번호를 0부터 다시 붙입니다
df = df.dropna().reset_index(drop=True)

# f"P{i:03d}" → P001, P002… 처럼 세 자리 숫자 문자열을 만듭니다
# insert(0, ...) → 맨 앞 열(0번)에 추가합니다
df.insert(0, "펭귄번호", [f"P{i:03d}" for i in range(1, len(df) + 1)])

# set_index("펭귄번호"): 펭귄번호 열을 표의 이름표(인덱스)로 지정합니다
# 이후 df.loc["P001"] 처럼 이름으로 행을 찾을 수 있습니다
df = df.set_index("펭귄번호")`,
        },
        {
          label: "2. 이름표로 찾기 — loc",
          summary: "P001처럼 이름표를 써서 행·열을 가져오는 방법",
          code: `# df.loc[행이름, 열이름]: 이름표로 정확히 한 칸을 꺼냅니다
df.loc["P001", "bill_length_mm"]

# 행 범위: "P001":"P003" → P001, P002, P003 모두 포함 (끝 포함!)
# 열 리스트: ["species", "bill_length_mm", "body_mass_g"]
df.loc["P001":"P003", ["species", "bill_length_mm", "body_mass_g"]]`,
        },
        {
          label: "3. 줄 번호로 찾기 — iloc",
          summary: "0, 1, 2… 순서 번호를 써서 행을 가져오는 방법",
          code: `# df.iloc[줄번호]: 0부터 시작하는 위치 번호로 행을 선택합니다
# iloc[0]은 맨 첫 번째 줄 (이름표 P001과 같은 행이지만 숫자로 접근)
df.iloc[0]

# iloc[0:2] → 0번, 1번 (2번은 제외! loc와 달리 끝을 포함하지 않음)
df.iloc[0:2]`,
        },
      ],
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
        "`island` 값이 `\"Dream\"`인 행만 남긴 표의 크기를 보이게 하세요. (필터 한 줄 뒤에 `.shape`을 붙이면 됩니다.)",
      interpretation: `#### 해야 할 일

1. 조건에 맞는 행만 남깁니다.
2. 남은 표의 \`(행 수, 열 수)\` 튜플을 \`.shape\`으로 봅니다.

#### 참고

- \`shape[0]\`이 줄었는지 보면 필터가 적용됐는지 확인할 수 있습니다.`,
      hint: "`df[df[\"island\"] == \"Dream\"].shape`",
      answer: `df[df["island"] == "Dream"].shape`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "종(`species`)마다 `flipper_length_mm`의 평균과 개수(count)를 한 표로 만드세요.",
      interpretation: `#### 해야 할 일

1. \`groupby\`로 종별로 묶습니다.
2. \`agg\`에 \`mean\`, \`count\`를 한 번에 넣어 표를 만듭니다.

#### 참고

- 행이 종, 열이 평균·개수인 요약 표가 나오면 됩니다.`,
      hint: "`df.groupby(\"species\")[\"flipper_length_mm\"].agg([\"mean\", \"count\"])`",
      answer: `df.groupby("species")["flipper_length_mm"].agg(["mean", "count"])`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 필터링·groupby 코드 두 블록입니다. 주석(초록색)을 읽으며 따라가 보세요.",
      blocks: [
        {
          label: "1. 조건으로 행 걸러내기 — 필터링",
          summary: "원하는 조건에 맞는 행만 남기는 방법",
          code: `# df["body_mass_g"] > 4500  → 각 행이 조건을 만족하면 True, 아니면 False
# df["species"] == "Gentoo"  → 종이 Gentoo인 행만 True

# 두 조건을 동시에 만족해야 할 때: & (앤드) 사용
# 주의: pandas에서는 and 키워드 대신 &를 쓰고, 각 조건을 괄호로 묶어야 합니다
df[(df["body_mass_g"] > 4500) & (df["species"] == "Gentoo")]

# | (파이프)를 쓰면 둘 중 하나만 만족해도 됩니다 (OR 조건)
# df[(조건A) | (조건B)]`,
        },
        {
          label: "2. 그룹별 집계 — groupby",
          summary: "종·섬처럼 같은 값끼리 묶어서 평균·합계 등을 구하는 방법",
          code: `# groupby("species"): species 값이 같은 행끼리 묶습니다
# ["body_mass_g"]: 그 그룹에서 볼 열을 고릅니다
# .mean(): 그룹마다 평균을 계산합니다
df.groupby("species")["body_mass_g"].mean()

# .mean() 자리에 다른 함수도 쓸 수 있습니다
df.groupby("species")["body_mass_g"].max()   # 그룹 내 최댓값
df.groupby("species")["body_mass_g"].count() # 그룹 내 개수`,
        },
      ],
    },
  },
  "6": {
    unitId: "6",
    summary:
      "펭귄 데이터에 포함된 결측을 isna로 확인하고, dropna·fillna(중앙값 등)로 분석 가능한 형태로 정제합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `${PENGUINS_LOAD}

df.isna().sum()

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
        "`bill_depth_mm`이 비어 있는(NaN) 행만 골라 `sub`에 두고, 그 행이 몇 개인지 `len(sub)`으로 보이게 하세요.",
      interpretation: `#### 해야 할 일

1. \`bill_depth_mm\`이 NaN인 행만 골라 \`sub\`에 둡니다.
2. 행 개수를 \`len(sub)\`으로 봅니다.

#### 참고

- \`len(sub)\`이 0이면 그 열에는 결측이 없습니다.`,
      hint: "1) `sub = df[df[\"bill_depth_mm\"].isna()]`  2) 다음 줄 `len(sub)`",
      answer: `sub = df[df["bill_depth_mm"].isna()]
len(sub)`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`bill_length_mm`에 결측이 있는 행만 지우세요. 그다음 처리 전·후 표 크기를 `(df.shape, df2.shape)` 한 줄로 비교하세요.",
      interpretation: `#### 해야 할 일

1. \`dropna(subset=["bill_length_mm"])\`로 해당 열에 NaN인 행만 지운 표를 \`df2\`에 둡니다.
2. \`(df.shape, df2.shape)\`로 처리 전·후 크기를 한 줄로 비교합니다.

#### 참고

- 튜플 앞이 원본, 뒤가 처리 후입니다.`,
      hint: "`df2 = df.dropna(subset=[\"bill_length_mm\"])` 다음 줄 `(df.shape, df2.shape)`",
      answer: `df2 = df.dropna(subset=["bill_length_mm"])
(df.shape, df2.shape)`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro: "오늘 배운 결측치 처리 코드 세 블록입니다. 주석(초록색)을 읽으며 따라가 보세요.",
      blocks: [
        {
          label: "1. 결측 확인 — isna / isnull",
          summary: "어느 열에 빈 값(NaN)이 몇 개 있는지 세는 방법",
          code: `# df.isna(): 각 칸이 비어 있으면 True, 값이 있으면 False인 표를 만듭니다
df.isna()

# .sum(): 열마다 True(=결측) 개수를 더합니다 → 열별 결측 개수
# 0이면 그 열에는 결측이 없습니다
df.isna().sum()`,
        },
        {
          label: "2. 결측 채우기 — fillna",
          summary: "빈 칸을 특정 값(중앙값·평균 등)으로 채우는 방법",
          code: `# .median(): 해당 열의 중앙값(가운데 값)을 구합니다
# 극단값(너무 크거나 작은 값)이 있어도 평균보다 안정적입니다
df["bill_length_mm"].median()

# fillna(값): NaN 칸을 지정한 값으로 채웁니다
# 중앙값으로 채우는 전형적인 패턴입니다
df["bill_length_mm"] = df["bill_length_mm"].fillna(
    df["bill_length_mm"].median()  # 결측을 이 열의 중앙값으로 대체
)`,
        },
        {
          label: "3. 결측 행 삭제 — dropna",
          summary: "결측이 있는 행 자체를 표에서 제거하는 방법",
          code: `# df.dropna(): NaN이 하나라도 있는 행을 모두 제거합니다
df.dropna()

# subset=[열이름]: 해당 열에 결측인 행만 골라서 제거합니다
# 나머지 열에 결측이 있어도 그 행은 남깁니다
df2 = df.dropna(subset=["bill_length_mm"])

# 처리 전·후 크기를 비교해 몇 행이 줄었는지 확인합니다
(df.shape, df2.shape)`,
        },
      ],
    },
  },
  "7-1": {
    unitId: "7-1",
    summary:
      "penguins 데이터로 데이터 시각화의 기초인 히스토그램, 막대 그래프, 산점도를 그리고 제목과 축 라벨을 붙이는 방법을 배웁니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt
${PENGUINS_LOAD}

df = df.dropna()

plt.hist(df["body_mass_g"], bins=15, color="skyblue", edgecolor="black")
plt.title("Penguin Body Mass Distribution")
plt.xlabel("body_mass_g")
plt.ylabel("count")
plt.show()`,
    breakdown: {
      input: "seaborn 내장 penguins 표와 matplotlib.",
      process: "목적에 맞게 hist / bar / scatter를 고르고 title·xlabel·ylabel을 붙집니다.",
      output: "분포·비교·관계를 그림으로 설명할 수 있습니다.",
    },
    lineNotes: [
      "plt.hist: 한 수치 열의 분포를 볼 때 씁니다.",
      "value_counts / groupby().mean()과 plot을 연결하면 빈도·평균 비교 막대를 쉽게 그립니다.",
      "plt.scatter: 두 수치 열 간의 상관이나 분포 패턴을 점들로 시각화합니다.",
    ],
    quiz: {
      question: "펭귄 몸무게(body_mass_g)가 전체적으로 어떻게 퍼져 있는지 분포를 보고 싶을 때 사용하는 적절한 그래프는?",
      answerId: "b",
      options: [
        { id: "a", label: "범주별 평균 막대 그래프" },
        { id: "b", label: "히스토그램 (plt.hist)" },
        { id: "c", label: "파이 차트 (plt.pie)" },
      ],
    },
    exercise: {
      title: "코드 변형 실습",
      prompt: `교안 **실습 4**에서 아래 코드로 **종별 평균 몸무게** 막대 그래프를 그렸습니다.

\`\`\`python
df.groupby("species")["body_mass_g"].mean().plot(kind="bar", color="coral")
plt.title("Mean Body Mass by Species")
plt.xlabel("species")
plt.ylabel("mean body_mass_g")
plt.xticks(rotation=0)
plt.show()
\`\`\`

위 코드에서 **집계 기준·수치 열·제목·색**만 바꿔, **섬(\`island\`)별 평균 지느러미 길이(\`flipper_length_mm\`)** 막대 그래프를 완성하세요.

- 제목: \`Mean Flipper Length by Island\`
- 가로·세로축 이름은 영어로
- \`plt.show()\`까지 실행`,
      interpretation: `#### 해야 할 일

1. \`groupby("island")\`와 \`flipper_length_mm\`으로 **평균 막대**를 그립니다.
2. 제목·축 이름을 바꿉니다 (몸무게 → 지느러미 길이, 종 → 섬).
3. 그래프가 나오면 **어느 섬 펭귄의 지느러미가 더 긴지** 한 문장으로 적어 봅니다.

#### 참고

- \`groupby(...).mean().plot(kind="bar")\` **형태는 그대로**, 열 이름만 교체하면 됩니다.`,
      hint: "`df.groupby(\"island\")[\"flipper_length_mm\"].mean().plot(kind=\"bar\", color=\"steelblue\")` → `title` / `xlabel` / `ylabel` / `xticks(rotation=0)` → `show()`",
      answer: `df.groupby("island")["flipper_length_mm"].mean().plot(kind="bar", color="steelblue")
plt.title("Mean Flipper Length by Island")
plt.xlabel("island")
plt.ylabel("mean flipper_length_mm")
plt.xticks(rotation=0)
plt.show()`,
    },
    codeExplanation: {
      title: "코드 설명",
      intro:
        "교안에서 배운 세 가지 그래프 예제입니다. 주석(초록색)을 읽으며 한 줄씩 따라가 보세요.",
      blocks: [
        {
          label: "1. 히스토그램 — 몸무게 분포 (실습 1)",
          summary: "한 수치 열이 어떤 구간에 많이 모여 있는지 볼 때",
          code: `# body_mass_g(몸무게) 값이 어느 구간에 많은지 분포를 봅니다
plt.hist(
    df["body_mass_g"],      # 그릴 데이터: 몸무게 열 전체
    bins=15,                # 가로축을 15개 구간으로 나눔 (막대 15개)
    color="skyblue",        # 막대 안쪽 색
    edgecolor="black"       # 막대 테두리 색 (구간 구분이 선명해짐)
)
plt.title("Penguin Body Mass Distribution")  # 그래프 위 제목
plt.xlabel("body_mass_g")   # 가로축 이름 (무엇을 셌는지)
plt.ylabel("count")         # 세로축: 해당 구간에 속한 펭귄 마릿수
plt.show()                  # 그래프를 화면에 출력`,
        },
        {
          label: "2. 막대 그래프 — 종별 평균 몸무게 (실습 4)",
          summary: "범주(종)마다 평균을 비교할 때",
          code: `# species(종)별 body_mass_g(몸무게) 평균을 막대 그래프로 그립니다
df.groupby("species")["body_mass_g"].mean().plot(kind="bar", color="coral")
# groupby("species"): 종별로 묶기 → ["body_mass_g"]: 몸무게 열 선택 → .mean(): 평균 계산 → .plot(): 막대 그래프로 출력

plt.title("Mean Body Mass by Species")  # 제목
plt.xlabel("species")                   # 가로축: 펭귄 종
plt.ylabel("mean body_mass_g")          # 세로축: 평균 몸무게(g)
plt.xticks(rotation=0)    # x축 글자를 기울이지 않음 (0도)
plt.show()                # 화면에 출력`,
        },
        {
          label: "3. 산점도 — 지느러미 vs 몸무게 (실습 6)",
          summary: "두 수치 변수의 관계(함께 커지는지 등)를 볼 때",
          code: `# 점 하나 = 펭귄 한 마리. 가로·세로 위치로 두 수치를 동시에 표시합니다
plt.scatter(
    df["flipper_length_mm"],  # x축: 지느러미 길이
    df["body_mass_g"],        # y축: 몸무게
    alpha=0.5                 # 점을 반투명하게 (겹친 점도 보이게)
)
plt.xlabel("flipper_length_mm")       # 가로축 이름
plt.ylabel("body_mass_g")             # 세로축 이름
plt.title("Flipper Length vs Body Mass")  # 제목
plt.show()                            # 화면에 출력
# 점이 오른쪽 위로 모이면 → 지느러미가 길수록 몸무게도 큰 경향(양의 상관)`,
        },
      ],
    },
  },
  "7-2": {
    unitId: "7-2",
    summary:
      "꺾은선 그래프, 원 그래프, 상관관계 히트맵을 그리고, 여러 그래프를 한 화면에 배치하는 서브플롯과 이미지 저장 방법을 학습합니다.",
    colabUrl: "https://colab.research.google.com/",
    code: `import matplotlib.pyplot as plt
import seaborn as sns
${PENGUINS_LOAD}

df = df.dropna()

# 섬별 평균 몸무게 꺾은선 그래프
df.groupby("island")["body_mass_g"].mean().plot(kind="line", marker="o", color="darkorange")
plt.title("Mean Body Mass by Island")
plt.xlabel("island")
plt.ylabel("mean body_mass_g")
plt.grid(True, alpha=0.3)
plt.show()`,
    breakdown: {
      input: "seaborn 내장 penguins 표와 matplotlib·seaborn.",
      process: "line / pie / heatmap을 그리고 subplots, savefig를 적용해 봅니다.",
      output: "추세, 비율, 상관관계를 표현하고 여러 시각화 결과를 하나의 레이아웃으로 저장할 수 있습니다.",
    },
    lineNotes: [
      "plt.plot(kind='line'): 섬별 평균 몸무게 등 순서가 있는 통계값이나 시간에 따른 변화 추이를 나타냅니다.",
      "plt.pie: 범주별 비율을 파이 모양 조각으로 시각화합니다.",
      "sns.heatmap: 수치 변수 간의 상관행렬(correlation matrix)을 색상 맵으로 나타냅니다.",
      "plt.subplots: 2x2 등의 격자 형태로 여러 개별 그래프를 하나의 이미지 영역에 배치합니다.",
    ],
    quiz: {
      question: "여러 수치 변수 간의 상관관계를 색상의 밝기로 한눈에 나타내는 그래프 종류는 무엇일까요?",
      answerId: "a",
      options: [
        { id: "a", label: "히트맵 (sns.heatmap)" },
        { id: "b", label: "원 그래프 (plt.pie)" },
        { id: "c", label: "꺾은선 그래프 (plt.plot)" },
      ],
    },
    exercise: {
      title: "코드 변형 실습",
      prompt: `교안 **실습 3**에서 아래 코드로 **종별 펭귄 비율** 원 그래프를 그렸습니다.

\`\`\`python
counts = df["species"].value_counts()
plt.figure(figsize=(6, 6))
plt.pie(counts, labels=counts.index, autopct="%1.1f%%", startangle=90)
plt.title("Share of Penguins by Species")
plt.show()
\`\`\`

위 코드에서 **범주 열·제목**만 바꿔, **성별(\`sex\`)별 펭귄 비율** 원 그래프를 완성하세요.

- 제목: \`Share of Penguins by Sex\`
- \`autopct="%1.1f%%"\` 유지
- \`plt.show()\`까지 실행`,
      interpretation: `#### 해야 할 일

1. \`df["sex"].value_counts()\`로 성별 빈도를 구합니다.
2. \`plt.pie\` 구조는 그대로 두고 **labels·제목**만 바꿉니다.
3. 그래프를 본 뒤 **Male과 Female 중 어느 쪽 비율이 더 큰지** 한 문장으로 적어 봅니다.

#### 참고

- 종(\`species\`) 대신 성별(\`sex\`) 열만 바꾸면 됩니다. \`pie\` 옵션은 동일합니다.`,
      hint: "`sex_counts = df[\"sex\"].value_counts()` → `plt.figure(figsize=(6, 6))` → `plt.pie(sex_counts, labels=sex_counts.index, autopct=\"%1.1f%%\", startangle=90)` → `title` → `show()`",
      answer: `sex_counts = df["sex"].value_counts()
plt.figure(figsize=(6, 6))
plt.pie(sex_counts, labels=sex_counts.index, autopct="%1.1f%%", startangle=90)
plt.title("Share of Penguins by Sex")
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
df.head()
df.shape
df.describe()

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
        "`df.dropna()`까지 해 둔 같은 `df`로, 섬(`island`)별 평균 `body_mass_g` 막대만 그리세요. 제목: `Mean body mass by island`, 축 이름은 영어로.",
      interpretation: `#### 해야 할 일

1. \`groupby\` 기준 열을 \`island\`로 바꿉니다 (교안은 종별이었음).
2. \`plot(kind="bar")\` 뒤에 \`title\`, \`xlabel\`, \`ylabel\`, \`show()\`를 붙입니다.

#### 참고

- "종별 평균 체중" 예제와 같은 줄기입니다.`,
      hint: "`df.groupby(\"island\")[\"body_mass_g\"].mean().plot(kind=\"bar\", ...)` → 제목·축 → `show()`",
      answer: `df.groupby("island")["body_mass_g"].mean().plot(kind="bar", color="darkorange")
plt.title("Mean body mass by island")
plt.xlabel("island")
plt.ylabel("mean body_mass_g")
plt.show()`,
    },
    challenge: {
      title: "도전 문제",
      prompt:
        "`flipper_length_mm`(가로)과 `body_mass_g`(세로) 산점도를 그리세요. 제목: `Flipper length vs body mass`(영어). 마지막 줄에 두 열의 상관계수 `corr`를 두세요.",
      interpretation: `#### 해야 할 일

1. \`plt.scatter\`로 산점도를 그리고, 축 이름·제목·\`show()\`를 붙입니다.
2. 마지막 줄에 \`corr\`로 상관계수를 봅니다.

#### 참고

- 산점도로 관계를 보고, 숫자 하나로 상관을 확인합니다.`,
      hint: "`scatter` → `xlabel` / `ylabel` / `title` / `show()` → 마지막 줄 `df[\"flipper_length_mm\"].corr(df[\"body_mass_g\"])`",
      answer: `plt.scatter(df["flipper_length_mm"], df["body_mass_g"], alpha=0.6)
plt.xlabel("flipper_length_mm")
plt.ylabel("body_mass_g")
plt.title("Flipper length vs body mass")
plt.show()
df["flipper_length_mm"].corr(df["body_mass_g"])`,
    },
  },
};
