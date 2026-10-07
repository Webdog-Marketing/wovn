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

// Cookies set by Google Analytics, Google Ads and the Meta Pixel via Tag Manager.
const TRACKING_COOKIE = /^(_ga|_gid|_gat|_gcl_|_gac_|_fbp|_fbc)/;

function clearTrackingCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!TRACKING_COOKIE.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
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
    const previous = window.localStorage.getItem(CONSENT_KEY);
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);

    // Withdrawing consent should actually stop the tracking: remove the
    // analytics and advertising cookies already set, and reload so the
    // Tag Manager script that was loaded earlier is gone.
    if (value === "rejected" && previous === "accepted") {
      clearTrackingCookies();
      window.location.reload();
    }
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
                className="border border-ink px-5 py-2.5 font-tag text-xs uppercase tracking-tag text-ink hover:bg-ink hover:text-white"
              >
                Necessary only
              </button>
              <button
                onClick={() => choose("accepted")}
                className="border border-ink px-5 py-2.5 font-tag text-xs uppercase tracking-tag text-ink hover:bg-ink hover:text-white"
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
