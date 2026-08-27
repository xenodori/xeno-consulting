// 섹션 배경에 은은하게 깔리는 이미지 레이어 (그레이스케일 + 한쪽 페이드아웃)

type Side = "right" | "left";

export function Backdrop({
  src,
  side = "right",
  opacity = 0.06,
}: {
  src: string;
  side?: Side;
  opacity?: number;
}) {
  const fade =
    side === "right"
      ? "linear-gradient(to left, #000 0%, transparent 68%)"
      : "linear-gradient(to right, #000 0%, transparent 68%)";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale"
      style={{
        opacity,
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}
