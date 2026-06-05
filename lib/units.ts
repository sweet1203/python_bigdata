export interface Unit {
  id: string;
  label: string;
}

/** 차시별정보(1~8차시)와 동일한 순서·제목 */
export const units: Unit[] = [
  { id: "1", label: "1차시. 데이터의 세계와 Pandas 소개" },
  { id: "2", label: "2차시. 판다스와 친해지기 (Series·DataFrame)" },
  { id: "3", label: "3차시. 데이터 정렬과 기초 통계" },
  { id: "4", label: "4차시. 인덱싱과 슬라이싱 (loc·iloc)" },
  { id: "5", label: "5차시. 필터링과 그룹화" },
  { id: "6", label: "6차시. 전처리 — 결측치" },
  { id: "7-1", label: "7-1차시. 데이터 시각화 (기초)" },
  { id: "7-2", label: "7-2차시. 데이터 시각화 (응용)" },
  { id: "8", label: "8차시. 실전 프로젝트 (EDA)" },
];
