import ConsultForm from "./ConsultForm";

export default function Apply() {
  return (
    <section id="apply" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4">사전 지원서</p>
          <h2 className="display text-4xl sm:text-5xl">
            내 스토어에 맞춘
            <br />
            단 한 번의 정밀 처방
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            지원서를 보내주시면 24시간 이내 스토어 현황과 개선 가능성을
            내부 심사합니다. 선발되면 개별 안내 후 1차 세션 일정을 잡아요.
            매달 세 명만 함께합니다.
          </p>

          <ul className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
            {[
              ["월 3명", "3명 마감 시 대기 등록으로 전환"],
              ["24시간 내", "지원 후 내부 심사 완료"],
              ["결제는 선발 후", "심사를 통과한 분만 안내드려요"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-baseline gap-4">
                <span className="display w-24 shrink-0 text-lg text-amber-deep">{k}</span>
                <span className="text-sm text-ink-soft">{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-none border border-line bg-paper-dim/30 p-6 sm:p-8">
          <ConsultForm />
        </div>
      </div>
    </section>
  );
}
