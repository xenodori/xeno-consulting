import { guarantee } from "@/lib/content";

export default function Guarantee() {
  return (
    <section id="guarantee" className="border-b border-line bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-amber">리스크 리버설</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">{guarantee.headline}</h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">{guarantee.lead}</p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper/15 bg-paper/15 md:grid-cols-3">
          {guarantee.points.map((p, i) => (
            <div key={p.title} className="flex flex-col gap-4 bg-ink p-7">
              <span className="display text-3xl text-amber">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-semibold text-paper">{p.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-paper/70">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="tick mt-6 text-paper/40">{guarantee.note}</p>
      </div>
    </section>
  );
}
