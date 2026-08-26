import {
  program,
  process,
  roi,
  seatsRemaining,
  valueStack,
  valueTotal,
  bonuses,
} from "@/lib/content";
import { PhotoFrame } from "./Media";

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

        {/* 실시간 남은 자리 배너 */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border border-amber/40 bg-amber/10 px-5 py-3.5">
          <span className="flex items-center gap-2 text-sm font-semibold text-amber-deep">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-amber-deep" />
            모집 중
          </span>
          <span className="text-sm text-ink">{seatsRemaining}</span>
          <span className="tick">마감 시 대기 등록으로 전환</span>
        </div>

        {/* 가치 스택 */}
        <div className="mt-6 border border-line bg-paper-dim/30 p-6 sm:p-8">
          <p className="eyebrow mb-5">받는 것의 가치</p>
          <ul className="divide-y divide-line">
            {valueStack.map((v) => (
              <li key={v.item} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="text-[0.95rem] text-ink">{v.item}</span>
                <span className="tick shrink-0 line-through decoration-ink-soft/40">
                  {v.worth}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-4">
            <span className="text-sm text-ink-soft">합산 가치</span>
            <span className="display text-xl text-ink-soft line-through">{valueTotal}</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-sm font-semibold text-amber-deep">당신의 투자</span>
            <span className="display text-2xl text-amber-deep">{program.price}만원</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
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

            {/* 보너스 */}
            <div className="mt-6 space-y-3">
              {bonuses.map((b) => (
                <div key={b.title} className="border border-amber/50 bg-amber/15 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-amber">
                      ＋ 보너스 · {b.title}
                    </span>
                    <span className="tick shrink-0 text-paper/60">
                      <span className="line-through">{b.retail}</span>{" "}
                      <span className="text-amber">{b.free}</span>
                    </span>
                  </div>
                  {b.image && (
                    <PhotoFrame
                      src={b.image}
                      alt={`${b.title} 이미지`}
                      hint="강의 패키지 이미지"
                      className="mt-3 aspect-[16/9] w-full rounded-none border-paper/15"
                    />
                  )}
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-paper/70">{b.desc}</p>
                </div>
              ))}
            </div>

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
