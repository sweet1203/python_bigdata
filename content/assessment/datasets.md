# 데이터셋 선택 안내 (seaborn)

수행평가에서는 **CSV 파일을 따로 받지 않습니다.** 1~8차시처럼 **`import seaborn`** 후 **`sns.load_dataset()`** 으로만 불러옵니다.

**수업 연습용 `penguins`는 사용하지 않습니다.** 아래 **6개 중 하나**만 골라 같은 방식으로 분석하세요.

---

## 공통 불러오기

Colab **맨 위 준비 셀**에 아래를 넣고, `DATASET`만 본인이 고른 이름으로 바꿉니다.

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

DATASET = "tips"  # 아래 6개 중 하나 (penguins 금지)

df = sns.load_dataset(DATASET)

if DATASET in ("mpg", "titanic"):
    df = df.dropna()

print("데이터셋:", DATASET)
print("크기:", df.shape)
df.head()
```

- **`import seaborn as sns`** — seaborn을 `sns`로 불러옵니다.
- **`sns.load_dataset("이름")`** — 인터넷 없이 Colab에 내장된 예제 표를 가져옵니다.
- **`mpg`, `titanic`** — 결측이 있어 **`dropna()`** 후 쓰는 것을 권장합니다.

서술 제출 시 데이터 이름에는 `sns.load_dataset("tips")` 처럼 **따옴표 안 이름**을 적으면 됩니다.

---

## 허용 데이터셋 6개

| 이름 (`DATASET`) | 주제 | 범주형 예 | 수치형 예 | 추천 그래프 |
|------------------|------|-----------|-----------|-------------|
| **`tips`** | 식당 팁 | `day`, `sex`, `smoker` | `total_bill`, `tip` | hist, 요일별 막대, 산점+hue |
| **`iris`** | 붓꽃 | `species` | `petal_length`, `sepal_width` … | hist, 종별 막대, 산점, heatmap |
| **`mpg`** | 자동차 연비 | `origin` | `mpg`, `horsepower`, `weight` | hist, origin별 막대, 산점, line(연식) |
| **`titanic`** | 승객 | `sex`, `pclass`, `survived` | `fare`, `age` | 막대, hist(fare), hue 산점 |
| **`flights`** | 항공 승객 | `month`, `year` | `passengers` | line, 막대(월별) |
| **`exercise`** | 운동·맥박 | `diet`, `kind` | `pulse` | hist, diet별 막대, hue |

**사용 금지:** `penguins` (7~8차시 연습용)

**사용 비권장:** `diamonds`(행 수 매우 많음), `gapminder`(연도 필터 필요) 등 위 6개 밖 데이터

---

## 데이터셋별 빠른 예시

### tips (가장 무난)

```python
DATASET = "tips"
df = sns.load_dataset("tips")
```

- hist: `total_bill`
- 막대: `df.groupby("day")["tip"].mean().plot(kind="bar")`
- 산점+강조: `sns.scatterplot(data=df, x="total_bill", y="tip", hue="sex")`

### iris

```python
DATASET = "iris"
df = sns.load_dataset("iris")
```

- 막대: `df.groupby("species")["petal_length"].mean().plot(kind="bar")`
- heatmap: 수치 4열만 `df.select_dtypes("number").corr()` 후 `sns.heatmap`

### mpg (`dropna` 권장)

```python
DATASET = "mpg"
df = sns.load_dataset("mpg").dropna()
```

- 산점: `weight` vs `mpg`
- 막대: `origin`별 평균 `mpg`

### titanic (`dropna` 권장)

```python
DATASET = "titanic"
df = sns.load_dataset("titanic").dropna()
```

- 막대: `sex`별 `survived` 비율 또는 `pclass`별 평균 `fare`

### flights

```python
DATASET = "flights"
df = sns.load_dataset("flights")
```

- line: `df.groupby("year")["passengers"].sum().plot(kind="line", marker="o")`

### exercise

```python
DATASET = "exercise"
df = sns.load_dataset("exercise")
```

- 막대: `df.groupby("diet")["pulse"].mean().plot(kind="bar")`

---

## 7-1·7-2차시에서 배운 것과 연결

| 수업 내용 | 수행에서 |
|-----------|----------|
| `sns.load_dataset(...)` | **이 방식만 사용** (CSV 업로드 X) |
| `plt.hist` | 분포 그래프 1개 |
| `groupby(...).plot(kind="bar")` | 집단 비교 1개 |
| `plt.scatter` / `sns.scatterplot` | 관계 + `hue`로 강조 |
| `plt.title`, `xlabel`, `ylabel` | 모든 그래프 |
| `describe()`, `value_counts()` | 서술 ③ 기초 통계 |

연습은 [7-1차시](/learn?unit=7-1), [7-2차시](/learn?unit=7-2) (penguins), 수행은 **위 6개 중 택 1** — 코드 형태는 같고 **데이터 이름만** 바꿉니다.

다음: [성취기준·채점표](/assessment/rubric) → [Colab 노트북 구성](/assessment/colab-outline)

---

## 선택 시 체크

- [ ] `DATASET`이 6개 중 하나이고 **`penguins`가 아니다**
- [ ] `import seaborn as sns` 와 `sns.load_dataset(...)` 로만 불러왔다
- [ ] 범주형·수치형 변수를 각각 1개 이상 쓸 수 있다
- [ ] 궁금증이 데이터 주제와 맞다
