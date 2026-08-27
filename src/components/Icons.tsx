// 에디토리얼 톤에 맞춘 라인 아이콘 세트 (stroke=currentColor, 색은 상속)

import type { SVGProps } from "react";

type IconName =
  | "alert"
  | "target"
  | "trending"
  | "clock"
  | "users"
  | "compare"
  | "route"
  | "package"
  | "check"
  | "x"
  | "shield"
  | "tag"
  | "gift"
  | "question"
  | "send"
  | "book"
  | "award"
  | "user";

// 24x24 뷰박스, 1.6 두께 라인 패스만 정의한다.
const PATHS: Record<IconName, React.ReactNode> = {
  alert: (
    <>
      <path d="M12 3.5 21 19H3L12 3.5Z" />
      <path d="M12 10v4" />
      <path d="M12 16.5v.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  trending: (
    <>
      <path d="M4 15l5-5 3.5 3.5L20 6.5" />
      <path d="M15 6.5h5v5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 6.4a3.2 3.2 0 0 1 0 5.2M17 14.4c2.2.5 3.6 2.3 3.6 4.6" />
    </>
  ),
  compare: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <path d="M12 4.5v15M3.5 9.5h17" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.4 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.6" />
    </>
  ),
  package: (
    <>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  check: <path d="M4.5 12.5 9.5 17.5 20 6.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  shield: (
    <>
      <path d="M12 3 20 6v5.5c0 5-3.4 8-8 9.5-4.6-1.5-8-4.5-8-9.5V6l8-3Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  tag: (
    <>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16M12 9v11" />
      <path d="M12 9c-1-3-6-3-6 0M12 9c1-3 6-3 6 0" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.3 2-2.3 3.6" />
      <path d="M12 17v.01" />
    </>
  ),
  send: (
    <>
      <path d="M20 4 3.5 11l6.5 2.2L12.2 20 20 4Z" />
      <path d="M10 13.2 20 4" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5h9a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H5V4.5Z" />
      <path d="M5 17.5V4.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
  ...rest
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

// 섹션 상단에 두는 라인 아이콘 배지 (테두리 사각 + 아이콘)
export function SectionMark({
  name,
  tone = "ink",
}: {
  name: IconName;
  tone?: "ink" | "amber" | "paper";
}) {
  const color =
    tone === "amber"
      ? "border-amber/50 text-amber"
      : tone === "paper"
        ? "border-paper/25 text-amber"
        : "border-line text-ink";
  return (
    <span
      className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-none border ${color}`}
    >
      <Icon name={name} className="h-5 w-5" />
    </span>
  );
}
