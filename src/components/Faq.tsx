import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow mb-4">자주 묻는 질문</p>
        <h2 className="display text-3xl sm:text-4xl md:text-5xl">
          결정 전에, 이건 짚고 가세요
        </h2>

        <dl className="mt-12 divide-y divide-line border-t border-line">
          {faqs.map((f) => (
            <div key={f.q} className="py-7">
              <dt className="flex gap-3 text-lg font-semibold text-ink">
                <span aria-hidden className="text-amber">Q</span>
                {f.q}
              </dt>
              <dd className="mt-3 flex gap-3 leading-relaxed text-ink-soft">
                <span aria-hidden className="font-semibold text-ink-soft/50">A</span>
                <span>{f.a}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
