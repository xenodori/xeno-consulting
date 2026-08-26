import { program, process, roi } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">수강료 · 신청 절차</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            단 한 번의 정밀 처방
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* 가격 카드 */}
          <div className="flex flex-col rounded-none border border-ink bg-ink p-8 text-paper">
            <span className="w-fit bg-amber px-3 py-1 text-xs font-semibold tracking-wide text-paper">
              {program.badge}
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-snug">{program.name}</h3>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="display text-6xl">{program.price}</span>
              <span className="text-lg text-paper/70">만원</span>
              <span className="tick self-end pb-1 text-paper/50">{program.priceNote}</span>
            </div>

            <dl className="mt-7 space-y-3 border-t border-paper/15 pt-6 text-sm">
              <Line k="모집 인원" v={`${program.seats} · 마감 시 대기 등록`} />
              <Line k="진행 방식" v={program.format} />
            </dl>

            <a
              href="#apply"
              className="mt-8 inline-flex items-center justify-center bg-amber px-6 py-3.5 font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              사전 지원서 작성하기
            </a>
          </div>

          {/* ROI + 절차 */}
          <div className="flex flex-col gap-6">
            <div className="rounded-none border border-amber/40 bg-amber/10 p-7">
              <p className="mb-2 font-semibold text-amber-deep">ROI 관점으로 생각해보세요</p>
              <p className="text-[0.98rem] leading-relaxed text-ink">{roi}</p>
            </div>

            <ol className="flex flex-1 flex-col gap-4 rounded-none border border-line bg-paper p-7">
              <p className="tick">지원 프로세스</p>
              {process.map((p) => (
                <li key={p.step} className="flex gap-4">
                  <span className="display shrink-0 text-amber-deep">{p.step}</span>
                  <span className="text-[0.98rem] leading-relaxed text-ink">{p.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-20 shrink-0 text-paper/50">{k}</dt>
      <dd className="text-paper/90">{v}</dd>
    </div>
  );
}
