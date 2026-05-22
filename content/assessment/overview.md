# 2차 수행평가 안내 — 데이터 시각화 포트폴리오

## 기본 정보

| 항목 | 내용 |
|------|------|
| 평가 단원 | 빅데이터 분석 결과 시각화 |
| 실시 시기 | 6월 |
| 만점 | 100점 (학기 성적의 30% 반영) |
| 평가 방법 | 포트폴리오 (교사평가, 개별 수행, 원점수 합산) |

1차 수행(Orange3)과 달리, 이번 평가는 **직접 작성한 Python 코드**와 **Colab 실행 결과**를 근거로 합니다.

---

## 데이터 불러오기 (필수 방식)

CSV를 따로 받지 않습니다. 수업과 같이 **`import seaborn`** 후 **`sns.load_dataset("이름")`** 만 사용합니다.

- **연습(7~8차시):** `penguins`
- **수행평가:** `tips`, `iris`, `mpg`, `titanic`, `flights`, `exercise` **중 1개** (`penguins` 금지)

자세한 표·예시: **`/assessment/datasets`**

```python
import seaborn as sns
df = sns.load_dataset("tips")  # 본인이 고른 이름
```

---

## 무엇을 만들까요 (포트폴리오 1세트)

| 구분 | 내용 | 루브릭 연결 |
|------|------|-------------|
| 코드·그래프 | Colab — seaborn 데이터 1종, 그래프 2종 이상 | 프로그래밍 시각화 (40점) |
| 그래픽 강조 | `color`, `hue` 등으로 핵심 정보 강조 | 그래픽 요소 (30점) |
| 해석·글 | 그래프·수치에 맞는 해석·결론·주의점 | 스토리텔링 (30점) |

수업 복습: **`/learn?unit=7`** (시각화), **`/learn?unit=8`** (EDA·인사이트) — 코드 패턴은 같고, 수행 때만 데이터 이름을 바꿉니다.

---

## 코스웨어 안내 페이지 (주소 직접 입력)

| 경로 | 내용 |
|------|------|
| `/assessment` | 이 목차 |
| `/assessment/datasets` | 허용 6종 + `load_dataset` 방법 |
| `/assessment/rubric` | 성취기준·채점표 |
| `/assessment/submit` | 제출물·파일명 |
| `/assessment/checklist` | 제출 전 점검 |
| `/assessment/colab-outline` | 노트북 셀 구성 |

제출 위치(리로스쿨, Google 폼 등)는 **수업 시간 선생님 안내**를 따릅니다.

---

## Classroom 노트북 (사본 배포)

교사가 배포하는 파일: `ac-data-courseware/assessment/수행2_데이터시각화_템플릿.ipynb`

- AI 기본 꺼짐 (`generative_ai_disabled`)
- **질문(마크다운) ↔ 코드** 셀 번갈아 작성
- 교사용: `assessment/CLASSROOM_배포안내.md`

## 권장 순서

1. Classroom에서 **사본** 노트북 열기
2. `/assessment/datasets` 에서 `DATASET` 1개 선택
3. 노트북 셀 순서대로 작성 → `/assessment/checklist` 점검
4. Classroom·서술 폼 제출 (선생님 안내)

---

## AI·정직성

- AI는 **개념·문장 다듬기** 보조만. 정답 전체 생성·친구 노트북 복사 금지
- 해석·서술은 **본인이 실행한 그래프·수치**만 근거로 작성
