import { getContent } from "@/lib/site-content";

export default async function Qualify() {
  const { qualify } = await getContent();
  return (
    <section id="qualify" className="border-b border-line bg-paper-dim/40 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">지원 자격</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            소수 정예의 성과를 위해,
            <br />
            아무나 받지 않습니다
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* 안 받는 사람 */}
          <div className="border border-line bg-paper p-7 sm:p-8">
            <p className="eyebrow mb-7 text-ink-soft">받지 않습니다</p>
            <ul className="space-y-5">
              {qualify.no.map((t) => (
                <li key={t} className="flex gap-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-ink-soft/40" />
                  <span className="line-through decoration-ink-soft/30">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 받는 사람 */}
          <div className="border border-amber bg-paper p-7 sm:p-8">
            <p className="eyebrow mb-7 text-amber-deep">이런 분에게 열려 있습니다</p>
            <ul className="space-y-5">
              {qualify.yes.map((t) => (
                <li key={t} className="flex gap-4 text-[0.98rem] leading-relaxed text-ink">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-amber" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
