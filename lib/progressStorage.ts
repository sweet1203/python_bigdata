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

const STORAGE_KEY = "ac-data-progress-v1";

const initialState: LearningProgressState = {
  visitedUnitIds: [],
  quizResults: {},
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadProgress(): LearningProgressState {
  if (!isBrowser()) return initialState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialState;

  try {
    const parsed = JSON.parse(raw) as LearningProgressState;
    return {
      visitedUnitIds: parsed.visitedUnitIds ?? [],
      quizResults: parsed.quizResults ?? {},
    };
  } catch {
    return initialState;
  }
}

export function saveProgress(next: LearningProgressState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
