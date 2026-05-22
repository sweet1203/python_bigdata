import { Montserrat } from "next/font/google";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-aeonik",
  display: "swap",
});

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`assessment-cute ${display.variable} min-h-full bg-sky-wash`}>{children}</div>
  );
}
