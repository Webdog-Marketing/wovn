"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/stories", label: "Stories" },
  { href: "/shops", label: "Club shops" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

// Pages that open with a full-bleed dark hero get a transparent, light nav that
// sits on top of it. Everything else gets a normal dark-on-cream nav.
function hasDarkHero(path: string) {
  return path === "/" || path === "/process" || path === "/stories" || path.startsWith("/stories/");
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const overlay = hasDarkHero(pathname);

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "relative z-30 border-b border-border text-ink"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-display text-2xl uppercase tracking-[0.18em]">
          WOVN
        </Link>
        <nav className="flex items-center gap-5 font-tag text-[11px] uppercase tracking-tag sm:gap-8">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="thread-underline hidden sm:inline">
              {l.label}
            </Link>
          ))}
          <Link
            href="/enquire"
            className="border border-current px-4 py-2 hover:border-thread hover:bg-thread hover:text-ink"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
