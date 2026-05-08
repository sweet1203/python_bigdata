"use client";

import { useEffect } from "react";
import { markUnitVisited } from "@/lib/progressStorage";

interface UnitVisitTrackerProps {
  unitId: string;
}

export default function UnitVisitTracker({ unitId }: UnitVisitTrackerProps) {
  useEffect(() => {
    markUnitVisited(unitId);
  }, [unitId]);

  return null;
}
