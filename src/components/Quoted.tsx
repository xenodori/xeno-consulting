import { Fragment } from "react";

/**
 * 텍스트에서 홑따옴표 '…' 로 감싼 중요 용어를 강조색으로 표시한다.
 * tone: "light" — 밝은 배경(진한 앰버), "dark" — 어두운 배경(밝은 앰버).
 * 따옴표가 없으면 원문 그대로 렌더링된다.
 */
export function Quoted({
  text,
  tone = "light",
}: {
  text: string;
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "text-amber-lit" : "text-amber-deep";
  const parts = text.split(/(‘[^’]*’)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("‘") && p.endsWith("’") ? (
          <strong key={i} className={`font-semibold ${color}`}>
            {p}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
