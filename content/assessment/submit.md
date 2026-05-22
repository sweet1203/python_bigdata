# 제출 안내

제출 **경로·마감**은 **Google Classroom** 및 선생님 안내(서술 폼·PNG 등)를 따릅니다.

## Classroom 배포 노트북

- 선생님이 배포하는 파일: **`assessment/수행2_데이터시각화_템플릿.ipynb`**
- 학생은 **사본 만들기** 후 그 사본만 편집·제출
- 노트북 메타데이터: **`generative_ai_disabled: true`** (생성형 AI 기본 숨김, 재활성화 금지)
- 구성: **질문(마크다운 셀) ↔ 코드(코드 셀)** 번갈아 작성

---

## 데이터 (seaborn만 사용)

| 항목 | 내용 |
|------|------|
| 불러오기 | `import seaborn as sns` → `df = sns.load_dataset("이름")` |
| 허용 이름 | `tips`, `iris`, `mpg`, `titanic`, `flights`, `exercise` |
| 금지 | `penguins` (교안 연습 전용), CSV 직접 업로드로 대체 |
| 결측 | `mpg`, `titanic` 은 `dropna()` 권장 |

상세: [데이터셋 선택](/assessment/datasets)

노트북 준비 셀에 아래가 보이면 됩니다.

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

DATASET = "tips"  # 6개 중 본인 선택
df = sns.load_dataset(DATASET)
```

---

## 제출물 구성 (포트폴리오)

### 1. 코드·실행 결과 (40점 근거)

| 항목 | 설명 |
|------|------|
| Colab 노트북 | `.ipynb` 또는 선생님이 정한 형식 |
| 데이터 | 위 6종 중 1개, **`sns.load_dataset`만** |
| 최소 그래프 | **2종 이상** (히스토그램 + 막대, 또는 막대 + 산점도 등) |
| 공통 | `title`, `xlabel`, `ylabel`, `plt.show()` |

### 2. 그래프 이미지 (30점·채점 확인용)

| 항목 | 설명 |
|------|------|
| PNG | **강조한 그래프** 1~2장 (`color`, `hue` 등이 보이는 것) |
| 파일명 예 | `학번이름_수행2_그래프1.png` |

### 3. 서술 (30점 근거)

서술 제출에 데이터 이름은 예: `sns.load_dataset("iris")` 로 적습니다.

| 블록 | 작성 내용 |
|------|-----------|
| ① 데이터·목적 | 데이터 설명, 범주형·수치형 변수, 궁금증, 분석 목적 |
| ② 분석 기법 | 집단 비교 / 두 변수 관계 / 분포 확인 + 이유 |
| ③ 기초 통계 | `describe` 등 **실행한 수치** + 특징 3가지 |
| ④ 시각화 | 그래프 종류, 선택 이유, 해석 |
| ⑤ 결론 | 결론, 주의점(상관≠인과 등) |

---

## 파일명 예시 (초안)

| 파일 | 예시 |
|------|------|
| 노트북 | `20101홍길동_수행2.ipynb` |
| 그래프 | `20101홍길동_수행2_그래프1.png` |

---

## 하지 말 것

- `penguins` 로 수행 제출
- CSV 파일만 올리고 `load_dataset` 없음
- 친구 노트북·코드 그대로 제출
- 실행하지 않은 수치를 서술에 적기

---

## 1차(Orange3)와의 차이

| 1차 | 2차 |
|-----|-----|
| Orange + CSV 파일 | **`import seaborn` + `load_dataset`** |
| 20개 CSV 중 선택 | **seaborn 6종 중 1개** |
| `.ows` + PNG | `.ipynb` + PNG |
