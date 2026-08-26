import { getContent } from "@/lib/site-content";

export default async function Compare() {
  const { compareRows } = await getContent();
  return (
    <section id="compare" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
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
                  <span className="tick">일반 VOD / 단체 코칭</span>
                </th>
                <th className="rounded-t-xl bg-ink py-4 px-5 align-bottom text-paper">
                  <span className="eyebrow text-amber">1:1 VIP 딥다이브</span>
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
                    className={`bg-ink/95 px-5 py-5 text-sm leading-relaxed text-paper ${
                      i === compareRows.length - 1 ? "rounded-b-xl" : ""
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
