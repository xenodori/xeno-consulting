import type { Metadata } from "next";
import { Noto_Serif_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xeno.kr"),
  title: {
    default: "제노의 1:1 컨설팅 · 이커머스 스토어 딥다이브 & 30일 밀착 클리닉",
    template: "%s · 제노의 1:1 컨설팅",
  },
  description:
    "월 300~500만 원에서 멈춘 셀러를 위한 6시간 집중 수술 & 30일 실행 피드백. 현역 셀러가 내 스토어를 1:1로 전수 해부하는 월 3명 한정 VIP 클리닉.",
  openGraph: {
    title: "제노의 1:1 컨설팅 · 이커머스 스토어 딥다이브 & 30일 밀착 클리닉",
    description:
      "월 300~500만 원 박스권을 뚫는 1:1 VIP 딥다이브 클리닉 · 월 3명 한정.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${serif.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
