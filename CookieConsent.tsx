"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "wovn-cookie-consent";
const OPEN_PREFS_EVENT = "wovn:open-cookie-prefs";

type Consent = "unset" | "accepted" | "rejected";

// Call this from anywhere (e.g. a footer link) to reopen the banner so
// someone can change their mind after the fact.
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("unset");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(CONSENT_KEY) as Consent | null;
    setConsent(stored ?? "unset");

    function handleReopen() {
      setConsent("unset");
    }
    window.addEventListener(OPEN_PREFS_EVENT, handleReopen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, handleReopen);
  }, []);

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {/* Google Tag Manager only loads once someone has actively accepted —
          this covers GA4, Meta Pixel, and Google Ads, all configured inside
          the GTM container itself. Nothing here fires before consent. */}
      {mounted && consent === "accepted" && gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {mounted && consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              We use cookies for essential site function, and — only with
              your consent — for analytics and advertising. See our{" "}
              <a href="/cookies" className="text-thread thread-underline">
                Cookie Policy
              </a>{" "}
              for details.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => choose("rejected")}
                className="border border-border px-4 py-2 font-tag text-xs uppercase tracking-tag text-muted hover:text-ink"
              >
                Necessary only
              </button>
              <button
                onClick={() => choose("accepted")}
                className="border border-thread bg-thread px-4 py-2 font-tag text-xs uppercase tracking-tag text-ink hover:opacity-90"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
