import { getContent } from "@/lib/site-content";
import { Icon, SectionMark } from "./Icons";

export default async function Compare() {
  const { compareRows } = await getContent();
  return (
    <section id="compare" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionMark name="compare" />
          <p className="eyebrow mb-4">가치 제안</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            늘어지는 8주짜리 강의는 그만.
            <br />
            <span className="text-amber">6시간</span> 만에 당신의 스토어를
            <br />
            완전히 뜯어고칩니다
          </h2>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-32 py-4 pr-4" />
                <th className="py-4 pr-4 align-bottom">
                  <span className="tick inline-flex items-center gap-2 text-ink-soft">
                    <Icon name="x" className="h-4 w-4" />
                    일반 VOD / 단체 코칭
                  </span>
                </th>
                <th className="border-x-2 border-t-2 border-amber bg-ink py-4 px-5 align-bottom text-paper">
                  <span className="eyebrow inline-flex items-center gap-2 text-amber">
                    <Icon name="check" className="h-4 w-4" />
                    1:1 VIP 딥다이브
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r, i) => (
                <tr key={r.label} className="border-b border-line align-top">
                  <th scope="row" className="py-5 pr-4 text-sm font-semibold text-ink">
                    {r.label}
                  </th>
                  <td className="py-5 pr-4 text-sm leading-relaxed text-ink-soft">
                    {r.vod}
                  </td>
                  <td
                    className={`border-x-2 border-amber bg-ink px-5 py-5 text-sm leading-relaxed text-paper ${
                      i === compareRows.length - 1 ? "border-b-2" : ""
                    }`}
                  >
                    {r.vip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
