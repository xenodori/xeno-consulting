import { getContent } from "@/lib/site-content";
import { Icon, SectionMark } from "./Icons";

export default async function Guarantee() {
  const { guarantee } = await getContent();
  return (
    <section id="guarantee" className="relative overflow-hidden border-b border-line bg-ink py-20 text-paper sm:py-28">
      {/* 배경 이미지 — 성과 대시보드 (그레이스케일 + 잉크 오버레이) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/analytics.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1] grayscale"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-ink/60"
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionMark name="shield" tone="paper" />
          <p className="eyebrow mb-4 text-amber">리스크 리버설</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">{guarantee.headline}</h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">{guarantee.lead}</p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper/15 bg-paper/15 md:grid-cols-2">
          {guarantee.points.map((p) => (
            <div key={p.title} className="flex flex-col gap-3 bg-ink p-7">
              <Icon name="shield" className="h-6 w-6 text-amber" />
              <h3 className="text-lg font-semibold text-paper">{p.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-paper/75">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="tick mt-6 text-paper/40">{guarantee.note}</p>
      </div>
    </section>
  );
}
