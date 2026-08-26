"use client";

import { useState } from "react";

/**
 * 사진/영상 자리. 실제 파일이 있으면 렌더링하고, 없으면 안내 플레이스홀더를 보여준다.
 * - 이미지: public/ 에 파일을 넣으면 자동 표시 (예: public/consultant.jpg → src="/consultant.jpg")
 *   파일이 없거나 로드 실패 시 자동으로 플레이스홀더로 대체된다.
 * - 영상: YouTube URL 이면 임베드, /파일.mp4 이면 <video>, 비어있으면 플레이스홀더
 */

function ytId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return m ? m[1] : null;
}

export function PhotoFrame({
  src,
  alt,
  hint = "사진 자리",
  className = "",
}: {
  src?: string;
  alt: string;
  hint?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;
  return (
    <div
      className={`relative overflow-hidden rounded-none border border-line bg-paper-dim ${className}`}
    >
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <Placeholder icon="photo" label={hint} />
      )}
    </div>
  );
}

export function VideoFrame({
  src,
  title,
  className = "",
}: {
  src?: string;
  title: string;
  className?: string;
}) {
  const id = src ? ytId(src) : null;

  return (
    <div
      className={`relative overflow-hidden rounded-none border border-line bg-ink ${className}`}
    >
      {id ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : src ? (
        <video className="h-full w-full object-cover" controls preload="metadata">
          <source src={src} />
        </video>
      ) : (
        <Placeholder icon="video" label="영상 자리" tone="dark" />
      )}
    </div>
  );
}

function Placeholder({
  icon,
  label,
  tone = "light",
}: {
  icon: "photo" | "video";
  label: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex aspect-[4/3] h-full w-full flex-col items-center justify-center gap-3 ${
        dark ? "text-paper/60" : "text-ink-soft/70"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "12px 12px",
        backgroundBlendMode: "normal",
      }}
    >
      <span
        aria-hidden
        className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl ${
          dark ? "border-paper/25" : "border-line bg-paper"
        }`}
      >
        {icon === "photo" ? "🖼" : "▶"}
      </span>
      <span className="tick" style={{ color: "currentColor" }}>
        {label}
      </span>
    </div>
  );
}
