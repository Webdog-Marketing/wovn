"use client";

import { openCookiePreferences } from "@/components/CookieConsent";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 font-tag text-xs uppercase tracking-tag text-muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p>WOVN</p>
          <p>Woven for those who play bigger than they are</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/wovn-club"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WOVN on LinkedIn"
              className="text-muted hover:text-thread"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.instagram.com/wovn_club/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WOVN on Instagram"
              className="text-muted hover:text-thread"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          <a href="/privacy" className="hover:text-ink">
            Privacy policy
          </a>
          <a href="/cookies" className="hover:text-ink">
            Cookie policy
          </a>
          <button onClick={openCookiePreferences} className="hover:text-ink">
            Cookie preferences
          </button>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
