import { getContent } from "@/lib/site-content";
import { Icon, SectionMark } from "./Icons";

export default async function PainPoints() {
  const { pain } = await getContent();
  return (
    <section id="pain" className="relative overflow-hidden border-b border-line bg-ink py-20 text-paper sm:py-28">
      {/* 배경 이미지 — 이커머스 매장 (그레이스케일 + 잉크 오버레이) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/packages.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60"
      />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionMark name="alert" tone="paper" />
        <p className="eyebrow mb-6 text-amber">문제 제기</p>
        <h2 className="display whitespace-pre-line text-3xl leading-tight sm:text-4xl md:text-5xl">
          {pain.headline}
        </h2>

        <ul className="mt-12 flex flex-col divide-y divide-paper/10 border-y border-paper/10">
          {pain.points.map((p) => (
            <li key={p} className="flex gap-5 py-5">
              <Icon name="x" className="mt-1 h-5 w-5 shrink-0 text-amber" />
              <span className="text-lg leading-relaxed text-paper/85">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-l-2 border-amber pl-6">
          <p className="text-lg text-paper/70">{pain.punchLead}</p>
          <p className="display mt-2 text-2xl leading-snug sm:text-3xl">
            {pain.punch}
          </p>
        </div>
      </div>
    </section>
  );
}
