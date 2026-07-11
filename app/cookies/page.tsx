import StitchDivider from "@/components/StitchDivider";

export const metadata = { title: "Cookie Policy — WOVN" };

export default function CookiePolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl uppercase tracking-wide text-ink">
        Cookie Policy
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated: [add date]</p>

      <StitchDivider className="my-10" />

      <div className="space-y-8 text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-ink [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">
        <div>
          <h2>What cookies are</h2>
          <p>
            Cookies are small files a website stores on your device to
            remember information — like your cookie choice itself, or
            whether you&apos;ve visited before.
          </p>
        </div>

        <div>
          <h2>Necessary</h2>
          <p>
            Always on, since the site can&apos;t function properly without
            them. This includes remembering your cookie preference, and
            cookies Shopify sets on its checkout pages (shop.wovn.club) to
            handle your cart, checkout session, and fraud prevention.
          </p>
        </div>

        <div>
          <h2>Analytics &amp; marketing</h2>
          <p>
            Only load if you click &quot;Accept all&quot; in the cookie
            banner. These help us understand how people use the site and
            measure the effectiveness of our advertising:
          </p>
          <ul>
            <li>
              <strong>Google Analytics</strong> — site usage and traffic
            </li>
            <li>
              <strong>Meta (Facebook/Instagram) Pixel</strong> — advertising
              measurement
            </li>
            <li>
              <strong>Google Ads</strong> — advertising measurement
            </li>
          </ul>
          <p>
            These are managed through Google Tag Manager. The exact cookie
            names and durations are set by Google and Meta directly and can
            change — see{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              className="text-thread thread-underline"
            >
              Google&apos;s cookie policy
            </a>{" "}
            and{" "}
            <a
              href="https://www.facebook.com/privacy/policies/cookies/"
              className="text-thread thread-underline"
            >
              Meta&apos;s cookie policy
            </a>{" "}
            for full detail.
          </p>
        </div>

        <div>
          <h2>Google Search Console</h2>
          <p>
            We use Google Search Console to monitor this site&apos;s search
            performance. It doesn&apos;t set any cookies on your device —
            it only confirms we own the site.
          </p>
        </div>

        <div>
          <h2>Changing your mind</h2>
          <p>
            You can change your cookie choice at any time using the
            &quot;Cookie preferences&quot; link in the footer of every
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
