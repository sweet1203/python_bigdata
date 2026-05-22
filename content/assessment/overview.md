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

자세한 표·예시는 [데이터셋 선택](/assessment/datasets)을 보세요.

```python
import seaborn as sns
df = sns.load_dataset("tips")  # 본인이 고른 이름
```

---

## 무엇을 만들까요 (포트폴리오 1세트)

| 구분 | 내용 | 루브릭 연결 |
|------|------|-------------|
| 코드·그래프 | Colab — seaborn 데이터 1종, 그래프 2종 이상 | [프로그래밍 시각화 (40점)](/assessment/rubric) |
| 그래픽 강조 | `color`, `hue` 등으로 핵심 정보 강조 | [그래픽 요소 (30점)](/assessment/rubric) |
| 해석·글 | 그래프·수치에 맞는 해석·결론·주의점 | [스토리텔링 (30점)](/assessment/rubric) |

수업 복습: [7차시 시각화](/learn?unit=7), [8차시 EDA](/learn?unit=8) — 코드 패턴은 같고, 수행 때만 데이터 이름을 바꿉니다.

---

## 왼쪽 메뉴 안내 (1~6단계)

| 단계 | 내용 |
|------|------|
| 1 | **평가 개요** (지금 보는 페이지) |
| 2 | [데이터셋 선택](/assessment/datasets) |
| 3 | [성취기준·채점표](/assessment/rubric) |
| 4 | [Colab 노트북 구성](/assessment/colab-outline) |
| 5 | [제출 전 점검](/assessment/checklist) |
| 6 | [제출 안내](/assessment/submit) |

---

## Classroom 노트북 (사본 배포)

- Google Classroom에서 받은 **사본**만 편집
- AI 기본 꺼짐 (`generative_ai_disabled`)
- **질문(마크다운) ↔ 코드** 셀 번갈아 작성
- 셀 구성은 [Colab 노트북 구성](/assessment/colab-outline) 참고

---

## 권장 순서

1. 이 페이지(1단계 개요) 읽기
2. [데이터셋 선택](/assessment/datasets)에서 `DATASET` 정하기
3. [성취기준·채점표](/assessment/rubric) 확인
4. Classroom 사본 노트북 + [Colab 노트북 구성](/assessment/colab-outline)대로 작성
5. [제출 전 점검](/assessment/checklist) 후 [제출 안내](/assessment/submit)에 따라 제출

---

## AI·정직성

- AI는 **개념·문장 다듬기** 보조만. 정답 전체 생성·친구 노트북 복사 금지
- 해석·서술은 **본인이 실행한 그래프·수치**만 근거로 작성
