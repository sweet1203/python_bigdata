import { redirect } from "next/navigation";

/** 예전 URL 호환: 개요는 /assessment 에 통합 */
export default function AssessmentOverviewRedirect() {
  redirect("/assessment");
}
