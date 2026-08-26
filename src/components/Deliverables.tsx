import { deliverables } from "@/lib/content";

export default function Deliverables() {
  return (
    <section id="deliverables" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">제공 항목</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            이 클리닉에 포함된 전부
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-none border border-line bg-line sm:grid-cols-2">
          {deliverables.map((d, i) => (
            <div key={d} className="flex gap-5 bg-paper p-7">
              <span className="display shrink-0 text-3xl text-amber-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.98rem] leading-relaxed text-ink">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
