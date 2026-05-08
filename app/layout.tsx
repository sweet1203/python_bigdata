import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AC-DATA 코스웨어",
  description: "코랩 실습 중심 빅데이터 분석 학습 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <a
          href="#main-content"
          className="sr-only absolute left-3 top-3 z-50 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white focus:not-sr-only"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content" className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
