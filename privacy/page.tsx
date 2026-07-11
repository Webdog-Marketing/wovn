import StitchDivider from "@/components/StitchDivider";

export const metadata = { title: "Privacy Policy — WOVN" };

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl uppercase tracking-wide text-ink">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated: [add date]</p>

      <StitchDivider className="my-10" />

      <div className="space-y-8 text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-ink [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">
        <div>
          <h2>Who we are</h2>
          <p>
            WOVN is operated by [Webdog Sports Marketing / OneTerra
            Consulting Limited — confirm legal entity name and company
            number]. For any question about this policy or your data,
            contact [insert contact email].
          </p>
        </div>

        <div>
          <h2>What we collect</h2>
          <p>
            When you submit an enquiry through this site, we collect:
            organisation name, organisation type, your name, email address,
            phone number, country, the garment types you&apos;re interested
            in, whether you already have a logo, any style or story notes
            you share, your timeline, and your budget range.
          </p>
          <p>
            We don&apos;t collect payment details directly — purchases are
            handled entirely by Shopify on its own checkout pages, under
            Shopify&apos;s own privacy policy.
          </p>
        </div>

        <div>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and put together a proposal</li>
            <li>To keep a record of prospective and past client projects</li>
            <li>
              To understand how people use the site, and to run advertising
              — only if you&apos;ve consented to analytics/marketing cookies
              (see our{" "}
              <a href="/cookies" className="text-thread thread-underline">
                Cookie Policy
              </a>
              )
            </li>
          </ul>
        </div>

        <div>
          <h2>Who we share it with</h2>
          <p>
            We use the following third-party services to run this site.
            Each processes data on our behalf, under their own security and
            privacy terms:
          </p>
          <ul>
            <li>
              <strong>Airtable</strong> — stores enquiry submissions
            </li>
            <li>
              <strong>Resend</strong> — sends us an email notification when
              you submit an enquiry
            </li>
            <li>
              <strong>Shopify</strong> — handles product browsing and
              checkout for club shops
            </li>
            <li>
              <strong>Vercel</strong> — hosts this website
            </li>
            <li>
              <strong>Google (Analytics, Ads, Search Console) and Meta
              (Pixel)</strong> — only load and receive data if you&apos;ve
              accepted analytics/marketing cookies
            </li>
          </ul>
          <p>
            We don&apos;t sell your data, and we don&apos;t share it with
            anyone beyond what&apos;s needed to run the services above.
          </p>
        </div>

        <div>
          <h2>Legal basis</h2>
          <p>
            We process enquiry data on the basis of our legitimate interest
            in responding to prospective clients, and to take steps toward
            a contract at your request. We process analytics and marketing
            data only with your consent, which you can withdraw at any time
            via the &quot;Cookie preferences&quot; link in the footer.
          </p>
        </div>

        <div>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry records for [insert retention period — e.g. 24
            months from your last contact with us], or until you ask us to
            delete them, whichever is sooner.
          </p>
        </div>

        <div>
          <h2>Your rights</h2>
          <p>
            Under UK GDPR, you can ask us to access, correct, or delete
            your personal data, or to restrict or object to how we use it.
            To do so, contact [insert contact email]. You also have the
            right to complain to the{" "}
            <a
              href="https://ico.org.uk"
              className="text-thread thread-underline"
            >
              Information Commissioner&apos;s Office (ICO)
            </a>{" "}
            if you think we&apos;ve mishandled your data.
          </p>
        </div>

        <div>
          <h2>Children</h2>
          <p>
            This site isn&apos;t directed at children, and we don&apos;t
            knowingly collect data from anyone under 16 through the enquiry
            form.
          </p>
        </div>

        <div>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We&apos;ll update
            the date at the top of this page when we do.
          </p>
        </div>
      </div>
    </section>
  );
}
