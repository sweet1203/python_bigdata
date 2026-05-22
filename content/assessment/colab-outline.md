# Colab 노트북 구성 안내

**데이터:** `penguins` 대신 **`/assessment/datasets`** 의 6개 중 하나.  
**불러오기:** 항상 `import seaborn as sns` → `sns.load_dataset(...)`.

아래 예시는 `tips` 기준입니다. 변수 이름만 본인 데이터에 맞게 바꾸세요.

---

## 셀 1 — 준비 (03-03)

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

DATASET = "tips"  # tips | iris | mpg | titanic | flights | exercise

df = sns.load_dataset(DATASET)
if DATASET in ("mpg", "titanic"):
    df = df.dropna()

print("데이터셋:", DATASET)
print("크기:", df.shape)
df.head()
```

> `penguins` 는 수행에 쓰지 않습니다.

---

## 셀 2 — 분석 목적 (마크다운, 03-05)

- 선택한 `DATASET` 이름과 주제 (예: 식당 팁 데이터)
- 궁금증 1문장
- 분석 목적 1문장
- 범주형 변수 1개, 수치형 변수 1개 (본인 표의 열 이름)

---

## 셀 3 — 기초 통계 (서술 ③)

```python
df.describe()
# 범주형 예: df["day"].value_counts()
```

서술에 쓸 **숫자 2~3개** 메모.

---

## 셀 4 — 그래프 1: 분포 (40점)

`tips` 예:

```python
plt.hist(df["total_bill"], bins=10, edgecolor="black")
plt.title("Distribution of total bill")
plt.xlabel("total_bill")
plt.ylabel("count")
plt.show()
```

`iris` → `petal_length`, `mpg` → `horsepower` 등으로 교체.

---

## 셀 5 — 그래프 2: 집단 비교 (40점)

`tips` 예:

```python
df.groupby("day")["tip"].mean().plot(kind="bar", color="steelblue")
plt.title("Mean tip by day")
plt.xlabel("day")
plt.ylabel("mean tip")
plt.show()
```

---

## 셀 6 — 그래프 3 또는 강조 (30점)

`hue`·`color` 로 핵심 강조 (7차시 산점도와 동일 패턴):

```python
sns.scatterplot(data=df, x="total_bill", y="tip", hue="sex")
plt.title("Total bill vs tip by sex")
plt.show()
```

마크다운: **무엇을 색으로 강조했는지** 한 문장.

---

## 셀 7 — 해석·스토리 (마크다운, 30점)

| 항목 | 내용 |
|------|------|
| 그래프에서 본 사실 | 수치 포함 |
| 결론 | 목적과 연결 |
| 주의점 | 상관≠인과, 결측 등 |

서술 제출에도 옮깁니다.

---

## 셀 8 — 점검

`/assessment/checklist` 확인.

---

## 데이터별 참고

| DATASET | 그래프 조합 예 |
|---------|----------------|
| tips, iris, mpg, titanic | hist + groupby 막대 + scatter(hue) |
| flights | line(연도별 passengers) + 막대(월) |
| exercise | hist(pulse) + diet별 막대 |

교안 연습: **`/learn?unit=7`** (코드는 같음, 수행만 `load_dataset` 이름 변경).
