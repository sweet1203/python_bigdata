# 수행평가 모듈 구현 계획 (초안)

> 기준 문서: 저장소 루트 `수행평가표2.md`  
> 학생 노출: `/assessment` 진입 (사이드바 미연결, **섹션 내부 링크·STEP 네비 사용**)  
> 참고 레거시: GitHub `sweet1203/pf_ev26_3_1` (Orange3 + Google 시트 서술)

---

## 1. 목표

| 항목 | 내용 |
|------|------|
| 평가명 | 2차 — 핵심 정보 강조 데이터 시각화 **포트폴리오** |
| 만점 | 100점 (학기 30%) |
| 도구 | **Python + Colab** (7~8차시 penguins, matplotlib/seaborn) |
| 루브릭 | 40 / 30 / 30 (프로그래밍 시각화 · 그래픽 강조 · 해석·스토리) |
| 성취기준 | 12빅분03-03 / 03-04 / 03-05 |

학생은 코스웨어에서 **안내·루브릭·체크리스트**만 읽고, 제출은 **리로스쿨·Google 폼 등 선생님이 안내한 경로**로 진행한다. (코스웨어에 외부 URL 링크를 달지 않음)

---

## 2. URL 구조 (직접 입력)

| 경로 | 용도 | 콘텐츠 소스 |
|------|------|-------------|
| `/assessment` | 목차·접속 경로 안내 | `assessmentCatalog.ts` |
| `/assessment/overview` | 평가 개요·일정·포트폴리오 구성 | `content/assessment/overview.md` |
| `/assessment/datasets` | seaborn 6종·load_dataset 안내 | `content/assessment/datasets.md` |
| `/assessment/rubric` | 성취기준 + 채점표 | `content/assessment/rubric.md` |
| `/assessment/submit` | 제출물·파일명·금지 사항 | `content/assessment/submit.md` |
| `/assessment/checklist` | 제출 전 자기점검 | `content/assessment/checklist.md` |
| `/assessment/colab-outline` | Colab 노트북 셀 구성 안내 | `content/assessment/colab-outline.md` |
| `/assessment/plan` | (교사·개발) 이 문서 요약 | `assessment/PLAN.md` |

**의도적으로 하지 않는 것**

- 사이드바·홈·7차시 하단에 `/assessment` 링크 추가 (보류)
- Colab·Google 시트·pf_ev26 **외부** URL 연결

---

## 3. 성취기준 ↔ 루브릭 ↔ 제출물

| 성취기준 | 배점 | 제출에서 보는 것 |
|----------|------|------------------|
| 03-03 구조적 시각화 | 40 | `.ipynb` / Colab — 그래프 2종+, 제목·축, 실행 성공 |
| 03-04 그래픽 강조 | 30 | 코드의 `color`, `hue`, `s=` 등 + 강조 의도 한 줄 |
| 03-05 스토리텔링 | 30 | 서술(폼 또는 노트북 MD) — 수치 근거, 결론, 한계 |

### 포트폴리오 1세트 (학생)

1. **코드·그래프** — penguins, `dropna` 후 7차시 수준 이상  
2. **이미지** — 강조 그래프 PNG 1~2장 (리로스쿨 등, 선생님 안내)  
3. **서술** — pf_ev26 `Grade3Submit`와 동일 블록(데이터 이해 → 기법 → 통계 → 시각화 해석 → 결론), 근거를 Orange → **코랩 실행 결과**로 수정

---

## 4. 구현 단계

### Phase A — 초안 (현재)

- [x] `assessment/PLAN.md` (본 문서)
- [x] `content/assessment/*.md` 5종
- [x] `lib/loadAssessment.ts`, `lib/assessmentCatalog.ts`
- [x] `app/(course)/assessment/page.tsx`, `[slug]/page.tsx`
- [ ] 교사 검토 후 문구 확정

### Phase B — Colab·제출 운영

- [x] Classroom 배포용 `assessment/수행2_데이터시각화_템플릿.ipynb` (AI off, MD↔코드 교차)
- [ ] Classroom에 **사본으로 배포** 절차 안내 (교사)
- [ ] Google 시트 제출 폼 문구 Python版 (pf_ev26 fork 또는 시트만 수정)
- [ ] 리로스쿨 파일명 규칙 안내 (`학번이름_수행2.ipynb`, PNG)

### Phase C — 채점 지원 (선택)

- [ ] 교사용 채점 체크표 PDF 또는 `/assessment/plan` 하단 표
- [ ] 7차시 `unit=7` 교안과 용어 통일 점검

### Phase D — 연동 (하지 않음 원칙)

- 사이드바 링크 추가 — **보류** (URL 직접 접속 정책)
- 외부 URL 임베드 — **하지 않음**

---

## 5. 데이터·난이도 정책 (확정)

| 구분 | 내용 |
|------|------|
| 연습 (7~8차시) | `sns.load_dataset("penguins")` |
| 수행평가 | **`import seaborn` + `load_dataset`** 만. **6종 중 1개** |
| 허용 | `tips`, `iris`, `mpg`, `titanic`, `flights`, `exercise` |
| 금지 | `penguins`, CSV 단독 제출, `diamonds` 등 |

안내 페이지: `/assessment/datasets`

---

## 6. Orange3 → Python 대응표 (교사·학생 FAQ용)

| Orange3 (pf_ev26) | Python (Colab) |
|-------------------|----------------|
| File → Data Table | `sns.load_dataset("tips")` 등 6종, `head()` |
| Column Statistics | `describe()`, `value_counts()` |
| Distributions / Bar Plot | `plt.hist`, `groupby().plot(kind="bar")` |
| Scatter Plot | `plt.scatter` / `sns.scatterplot` |
| 위젯 색·그룹 | `color=`, `hue=` |
| .ows + PNG | `.ipynb` + PNG |
| Google 서술 폼 | 동일 (문구만 코랩 근거) |

---

## 7. 채점 흐름 (교사)

1. 노트북 또는 PNG 열기 → **① 40점** (그래프 종류·실행·구조)
2. 코드에서 그래픽 파라미터·강조 일치 → **② 30점**
3. 서술·그래프·수치 일치 → **③ 30점**
4. 합산 → 분할 점수 (A 90+ … E 40+)
5. 미제출·장기 결석 → 최하점 차하(-1) (`수행평가표2.md`)

---

## 8. 일정 예시 (6월)

| 주 | 학생 | 교사 |
|----|------|------|
| W1 | `/assessment/overview` 숙지, 7차시 복습 | 안내·Colab 템플릿 배포 |
| W2 | 포트폴리오 작성 | 중간 점검(선택) |
| W3 | 제출 | 루브릭 채점 |

---

## 9. 파일 맵

```
ac-data-courseware/
  assessment/PLAN.md          ← 교사·개발 계획 (이 파일)
  content/assessment/
    overview.md
    datasets.md
    rubric.md
    submit.md
    checklist.md
    colab-outline.md
  lib/assessmentCatalog.ts
  lib/loadAssessment.ts
  app/(course)/assessment/
    page.tsx
    [slug]/page.tsx
```

---

## 10. 다음 결정 사항 (교사 확인)

1. 제출 채널: 리로스쿨만 vs Colab 공유 링크 허용 여부  
2. 서술: 기존 Google 폼 유지 vs 노트북 마크다운만  
3. 데이터: penguins 단일 확정 여부  
4. `/assessment/plan` 학생 공개 여부 (현재 URL로만 접근 가능)
