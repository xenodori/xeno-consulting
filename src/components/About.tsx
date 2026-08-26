import { consultant, timeline, book } from "@/lib/content";
import { PhotoFrame } from "./Media";

export default function About() {
  return (
    <section id="about" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="eyebrow mb-8">컨설턴트 소개</p>

        {/* hook headline */}
        <h2 className="display max-w-3xl text-3xl leading-tight sm:text-4xl md:text-[2.9rem]">
          {consultant.hook}
        </h2>

        {/* pull quote — one liner */}
        <blockquote className="mt-12 border-t border-ink/15 pt-10">
          <p className="display text-2xl leading-snug text-ink sm:text-3xl">
            “{consultant.oneLiner}”
          </p>
        </blockquote>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* bio + credentials */}
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p className="dropcap">{consultant.bio[0]}</p>
              {consultant.bio.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {consultant.credentials.map((c) => (
                <li key={c} className="flex gap-4 text-[0.98rem] leading-relaxed">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-amber" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* timeline + 저서 */}
          <div>
            {/* 저서 — 권위 증거 */}
            <figure className="mb-12 flex items-center gap-5 border-b border-line pb-10">
              <PhotoFrame
                src={book.image}
                alt={book.title}
                hint={book.hint}
                className="aspect-[3/4] w-28 shrink-0 rounded-none border-ink/15"
              />
              <figcaption>
                <p className="eyebrow mb-2">저서</p>
                <p className="text-[0.95rem] font-semibold leading-snug text-ink">
                  {book.title}
                </p>
                <p className="tick mt-1.5">{book.author}</p>
              </figcaption>
            </figure>

            <p className="eyebrow mb-7">지나온 길</p>
            <ol className="space-y-6">
              {timeline.map((t) => (
                <li
                  key={t.period}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line pb-5 last:border-0"
                >
                  <span className="tick pt-1">{t.period}</span>
                  <span
                    className={
                      t.highlight
                        ? "display text-lg text-amber"
                        : "text-[0.95rem] leading-snug text-ink"
                    }
                  >
                    {t.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
