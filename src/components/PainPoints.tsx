import { pain } from "@/lib/content";

export default function PainPoints() {
  return (
    <section id="pain" className="border-b border-line bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="eyebrow mb-6 text-amber">문제 제기</p>
        <h2 className="display whitespace-pre-line text-3xl leading-tight sm:text-4xl md:text-5xl">
          {pain.headline}
        </h2>

        <ul className="mt-12 flex flex-col divide-y divide-paper/10 border-y border-paper/10">
          {pain.points.map((p) => (
            <li key={p} className="flex gap-5 py-5">
              <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-amber" />
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
