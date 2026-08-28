import { getContent } from "@/lib/site-content";
import { PhotoFrame } from "./Media";
import { Icon, SectionMark } from "./Icons";

export default async function About() {
  const { consultant, timeline, book } = await getContent();
  return (
    <section id="about" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionMark name="user" />
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
                  <Icon name="award" className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* timeline + 저서 */}
          <div>
            {/* 저서 — 권위 증거 (입체 카드) */}
            <figure className="mb-14 flex items-start gap-6 border border-line bg-paper-dim/50 p-6">
              <div className="shrink-0 shadow-[0_20px_44px_-16px_rgba(23,20,15,0.5)]">
                <PhotoFrame
                  src={book.image}
                  alt={book.title}
                  hint={book.hint}
                  className="aspect-[3/4] w-28 rounded-none border-ink/10"
                />
              </div>
              <figcaption className="pt-1">
                <p className="eyebrow mb-2 text-amber-deep">저서 · 개정판 출간</p>
                <p className="text-[1.02rem] font-semibold leading-snug text-ink">
                  {book.title}
                </p>
                <p className="tick mt-2">{book.author}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  현장에서 검증한 해외구매대행 실전을 한 권에 담았습니다.
                </p>
              </figcaption>
            </figure>

            {/* 연혁 — 세로 타임라인 */}
            <div className="flex items-center gap-3">
              <Icon name="route" className="h-5 w-5 text-amber" />
              <p className="eyebrow">지나온 길</p>
            </div>
            <ol className="relative mt-8 border-l border-line">
              {timeline.map((t) => (
                <li key={t.period} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                      t.highlight ? "border-amber bg-amber" : "border-ink bg-paper"
                    }`}
                  />
                  <p className="tick">{t.period}</p>
                  <p
                    className={
                      t.highlight
                        ? "mt-1 display text-xl leading-snug text-amber-deep"
                        : "mt-1 text-[0.98rem] leading-snug text-ink"
                    }
                  >
                    {t.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
