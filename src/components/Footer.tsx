export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="display text-2xl">제노의 1:1 컨설팅</span>
            <span className="tick text-paper/50">XENO</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            정체된 이커머스 스토어를 1:1로 전수 해부하고, 매출이 다시
            움직이게 만드는 밀착 클리닉. 매달 3명만.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-paper/70">
          <a href="mailto:xenodori@gmail.com" className="transition-colors hover:text-amber">
            xenodori@gmail.com
          </a>
          <a href="#apply" className="transition-colors hover:text-amber">
지원 신청하기
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 sm:flex-row sm:justify-between sm:px-8">
          <span className="tick text-paper/40">© {new Date().getFullYear()} 제노 · XENO Consulting</span>
          <span className="tick text-paper/40">Seoul · 온라인/오프라인 세션</span>
        </div>
      </div>
    </footer>
  );
}
