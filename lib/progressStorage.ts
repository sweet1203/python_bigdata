export interface QuizResult {
  unitId: string;
  selectedId: string;
  correct: boolean;
  updatedAt: string;
}

export interface LearningProgressState {
  visitedUnitIds: string[];
  quizResults: Record<string, QuizResult>;
}

/** 기존 로컬 데이터 자동 이전 후 이 키만 사용 */
export const PROGRESS_STORAGE_KEY = "goo-python-progress-v1";
const LEGACY_PROGRESS_KEY = "ac-data-progress-v1";

const initialState: LearningProgressState = {
  visitedUnitIds: [],
  quizResults: {},
};

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeState(parsed: unknown): LearningProgressState {
  if (!parsed || typeof parsed !== "object") return initialState;
  const p = parsed as Partial<LearningProgressState>;
  return {
    visitedUnitIds: Array.isArray(p.visitedUnitIds) ? p.visitedUnitIds : [],
    quizResults: p.quizResults && typeof p.quizResults === "object" ? p.quizResults : {},
  };
}

function notifyProgressChange() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event("goo-learning-progress"));
}

export function loadProgress(): LearningProgressState {
  if (!isBrowser()) return initialState;

  const primary = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (primary) {
    try {
      return normalizeState(JSON.parse(primary));
    } catch {
      return initialState;
    }
  }

  const legacy = window.localStorage.getItem(LEGACY_PROGRESS_KEY);
  if (legacy) {
    try {
      const migrated = normalizeState(JSON.parse(legacy));
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(LEGACY_PROGRESS_KEY);
      notifyProgressChange();
      return migrated;
    } catch {
      return initialState;
    }
  }

  return initialState;
}

export function saveProgress(next: LearningProgressState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
  notifyProgressChange();
}

export function markUnitVisited(unitId: string) {
  const current = loadProgress();
  if (current.visitedUnitIds.includes(unitId)) return current;
  const next = {
    ...current,
    visitedUnitIds: [...current.visitedUnitIds, unitId],
  };
  saveProgress(next);
  return next;
}

export function saveQuizResult(unitId: string, selectedId: string, answerId: string) {
  const current = loadProgress();
  const nextResult: QuizResult = {
    unitId,
    selectedId,
    correct: selectedId === answerId,
    updatedAt: new Date().toISOString(),
  };
  const next = {
    ...current,
    quizResults: {
      ...current.quizResults,
      [unitId]: nextResult,
    },
  };
  saveProgress(next);
  return next;
}

export function clearProgress() {
  saveProgress(initialState);
}
