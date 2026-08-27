import { PhotoFrame } from "./Media";
import { Icon } from "./Icons";
import { getContent } from "@/lib/site-content";

export default async function Hero() {
  const { program, consultant } = await getContent();
  return (
    <section id="top" className="border-b border-ink/15">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* masthead line */}
        <div className="flex items-center justify-between border-b border-line py-3 text-ink-soft">
          <span className="tick">제노의 1:1 컨설팅</span>
          <span className="tick uppercase">{program.badge}</span>
        </div>

        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* headline column */}
          <div className="reveal flex flex-col justify-center">
            <p className="eyebrow mb-8">이커머스 스토어 클리닉</p>

            <h1 className="display text-[2.7rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
              이커머스 스토어
              <br />
              <em className="not-italic text-amber">딥다이브</em>
              <span className="text-ink-soft">,</span>
              <br />
              30일 밀착 클리닉
            </h1>

            <div className="my-8 h-px w-16 bg-ink" />

            <p className="max-w-md text-lg font-medium leading-relaxed text-ink">
              {program.promise}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href="#apply"
                className="border-b-2 border-ink pb-1 text-base font-medium text-ink transition-colors hover:border-amber hover:text-amber"
              >
                사전 지원서 작성하기
              </a>
              <a
                href="#cases"
                className="border-b border-transparent pb-1 text-base text-ink-soft transition-colors hover:border-ink-soft hover:text-ink"
              >
                성공 사례 보기
              </a>
            </div>
          </div>

          {/* portrait column */}
          <div className="reveal" style={{ animationDelay: "0.12s" }}>
            <figure>
              <PhotoFrame
                src={consultant.photo}
                alt={`${consultant.name} 프로필 사진`}
                hint="프로필 사진"
                className="aspect-[4/5] w-full rounded-none border-ink/15"
              />
              <figcaption className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
                <span className="display text-lg">
                  {consultant.name}
                  <span className="ml-2 text-sm font-normal text-ink-soft">
                    {consultant.title}
                  </span>
                </span>
                <span className="tick">{consultant.tagline}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* stat strip */}
        <dl className="grid grid-cols-3 border-t border-ink/15 divide-x divide-line">
          {([
            ["6시간", "1:1 집중 수술", "clock"],
            ["30일", "실행 밀착 케어", "target"],
            ["월 3명", "소수 정예 선발", "users"],
          ] as const).map(([n, l, icon]) => (
            <div key={l} className="px-2 py-6 first:pl-0">
              <Icon name={icon} className="mb-3 h-5 w-5 text-amber" />
              <dt className="display text-3xl sm:text-4xl">{n}</dt>
              <dd className="tick mt-1.5">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
