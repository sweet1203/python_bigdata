# Google Classroom 배포 안내 (교사용)

## 파일

`assessment/수행2_데이터시각화_템플릿.ipynb`

- `metadata.colab.generative_ai_disabled: true` — Colab에서 생성형 AI UI 기본 숨김
- 학생이 **Edit → Notebook settings** 에서 AI를 다시 켜면 규정 위반 (완전 차단은 불가)

---

## Classroom에 올리는 방법

1. Google Drive에 위 `.ipynb` 업로드
2. Drive에서 파일 우클릭 → **연결 앱** → **Google Colaboratory** (처음이면 Colab 연결)
3. Classroom → **과제 만들기** → **과제** 유형
4. **Drive에서 추가** → 해당 `.ipynb` 선택
5. **각 학생에게 사본 만들기** (필수) — 원본 수정 방지
6. 제출 방식: **Colab에서 연 후 링크 제출** 또는 **노트북 다운로드 후 제출** (학교 규정에 맞게 선택)

---

## 학생에게 말할 것

- 사본 노트북만 편집
- `DATASET`은 6개 중 1개 (`penguins` 금지)
- 마크다운 **질문 셀**에 글 쓰기, **코드 셀**에 그래프 코드 쓰기
- Gemini·생성형 AI 사용 금지
- 그래프 PNG·서술 폼은 선생님 추가 안내

---

## Colab에서 AI 숨김 확인

노트북 연 뒤 **편집 → 노트북 설정** 에 **Hide generative AI features** 가 켜져 있는지 확인.

꺼져 있으면 체크 후 저장하고, Drive 원본을 Classroom에 다시 배포.
