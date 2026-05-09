"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PROGRESS_STORAGE_KEY,
  loadProgress,
  type LearningProgressState,
} from "@/lib/progressStorage";
import { units } from "@/lib/units";

export function useLearningProgress() {
  const [state, setState] = useState<LearningProgressState>(() =>
    typeof window !== "undefined" ? loadProgress() : { visitedUnitIds: [], quizResults: {} }
  );

  const refresh = useCallback(() => {
    setState(loadProgress());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PROGRESS_STORAGE_KEY || e.key === null) refresh();
    };
    window.addEventListener("storage", onStorage);
    const onCustom = () => refresh();
    window.addEventListener("goo-learning-progress", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("goo-learning-progress", onCustom);
    };
  }, [refresh]);

  const isLessonCompleted = useCallback(
    (unitId: string) => !!state.quizResults[unitId]?.correct,
    [state.quizResults]
  );

  const isUnitVisited = useCallback(
    (unitId: string) => state.visitedUnitIds.includes(unitId),
    [state.visitedUnitIds]
  );

  /** 단일 모듈(전체 차시) 기준 0~1 */
  const getModuleProgress = useCallback(() => {
    const done = units.filter((u) => isLessonCompleted(u.id)).length;
    return done / units.length;
  }, [isLessonCompleted]);

  const getTotalProgress = useCallback(() => getModuleProgress(), [getModuleProgress]);

  const getCompletedCount = useCallback(() => {
    return units.filter((u) => isLessonCompleted(u.id)).length;
  }, [isLessonCompleted]);

  return {
    state,
    refresh,
    isLessonCompleted,
    isUnitVisited,
    getModuleProgress,
    getTotalProgress,
    getCompletedCount,
  };
}
