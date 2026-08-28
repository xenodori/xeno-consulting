import { getContent } from "@/lib/site-content";
import { SectionMark } from "./Icons";
import { Backdrop } from "./Backdrop";
import { Quoted } from "./Quoted";

export default async function Roadmap() {
  const { roadmap } = await getContent();
  return (
    <section id="roadmap" className="relative overflow-hidden border-b border-line bg-paper-dim/40 py-20 sm:py-28">
      <Backdrop src="/img/ecommerce.jpg" side="right" opacity={0.2} />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionMark name="route" tone="amber" />
          <p className="eyebrow mb-4">커리큘럼 · 진행 프로세스</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            사전 진단부터 30일 사후 케어까지
          </h2>
        </div>

        <ol className="mt-14 relative border-l border-line">
          {roadmap.map((s, i) => (
            <li key={s.tag} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[0.62rem] top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-paper text-[0.6rem] font-bold"
              >
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="eyebrow text-amber-deep">{s.tag}</span>
                <span className="tick">{s.when}</span>
              </div>
              <h3 className="display mt-2 text-xl sm:text-2xl">{s.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-soft">
                    <span aria-hidden className="mt-1 text-amber">▹</span>
                    <span><Quoted text={p} /></span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
