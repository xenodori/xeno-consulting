"use client";

import { useEffect } from "react";

/**
 * 섹션이 뷰포트에 들어올 때 부드럽게 페이드업(블러 해제)한다.
 * JS가 있을 때만 숨겼다가 드러내므로, JS 없거나 모션 최소화 설정이면 그대로 보인다.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    // 히어로(#top)는 첫 화면이라 즉시 노출, 나머지 섹션만 애니메이션
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section"),
    ).filter((s) => s.id !== "top");

    sections.forEach((s) => s.classList.add("reveal-pending"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
