import { getContent } from "@/lib/site-content";
import { PhotoFrame } from "./Media";

export default async function Cases() {
  const { cases, casesClaim } = await getContent();
  return (
    <section id="cases" className="border-b border-line bg-paper-dim/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">실제 성공 사례</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            먼저 병목을 뚫어낸
            <br />
            셀러들의 실제 데이터
          </h2>
          <p className="mt-6 text-lg font-semibold text-amber-deep">{casesClaim}</p>
        </div>

        <div className="mt-14 flex flex-col gap-8">
          {cases.map((c) => (
            <article
              key={c.tag}
              className="grid gap-8 rounded-none border border-line bg-paper p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div>
                <span className="tick border-b border-amber pb-1 text-amber-deep">{c.tag}</span>
                <h3 className="display mt-5 text-2xl leading-snug sm:text-3xl">{c.headline}</h3>

                {/* 지표 */}
                <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-line py-5">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="display text-xl text-pine sm:text-2xl">{m.value}</dt>
                      <dd className="tick mt-1">{m.label}</dd>
                    </div>
                  ))}
                </dl>

                {/* 전 → 처방 → 결과 */}
                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <Row label="기존 상태" tone="dim">{c.before}</Row>
                  <Row label="수술 처방" tone="amber">{c.prescription}</Row>
                  <Row label="최종 결과" tone="pine">{c.result}</Row>
                </div>
              </div>

              {/* 증거 이미지 자리 */}
              <PhotoFrame
                src={c.image ?? ""}
                alt={`${c.tag} 증빙 이미지`}
                hint={c.proofHint}
                className="min-h-[220px] w-full lg:h-full"
              />
            </article>
          ))}
        </div>

        <p className="tick mt-8">
          * 실제 수강생 사례이며, 성과는 시장 상황과 실행량에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}

function Row({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "dim" | "amber" | "pine";
  children: React.ReactNode;
}) {
  const color =
    tone === "amber" ? "text-amber-deep" : tone === "pine" ? "text-pine" : "text-ink-soft";
  return (
    <div className="flex gap-4">
      <span className={`tick w-16 shrink-0 pt-0.5 ${color}`}>{label}</span>
      <p className="text-ink">{children}</p>
    </div>
  );
}
