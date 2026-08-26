const links = [
  { href: "/#about", label: "소개" },
  { href: "/#cases", label: "사례" },
  { href: "/#roadmap", label: "커리큘럼" },
  { href: "/#pricing", label: "수강료" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/#top" className="flex items-baseline gap-2">
          <span className="display text-xl tracking-tight">제노의 1:1 컨설팅</span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink sm:inline-block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#apply"
            className="ml-1 inline-flex items-center gap-2 bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-amber"
          >
            지원하기
          </a>
        </nav>
      </div>
    </header>
  );
}
