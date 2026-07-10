import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-2xl uppercase tracking-wide text-ink"
        >
          WOVN
        </Link>
        <nav className="flex items-center gap-8 font-tag text-xs uppercase tracking-tag text-muted">
          <Link href="/shops" className="thread-underline hover:text-ink">
            Club shops
          </Link>
          <Link href="/about" className="thread-underline hover:text-ink">
            About
          </Link>
          <Link
            href="/enquire"
            className="rounded-sm border border-thread px-4 py-2 text-thread hover:bg-thread hover:text-ink"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
