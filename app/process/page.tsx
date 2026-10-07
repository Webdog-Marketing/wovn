import Link from "next/link";
import Photo from "@/components/Photo";
import StitchDivider from "@/components/StitchDivider";
import { getHero } from "@/lib/photos";
import { DESIGN_FEES, PRICE_GUIDE, RETAIL_GUIDE, TIERS } from "@/content/pricing";

export const metadata = { title: "Process and pricing | WOVN" };

const STEPS = [
  {
    when: "Week 0",
    title: "The brief",
    body: "A conversation about who you are, the story you want told, and what you need. Tell us about your organisation through the enquiry form and we will take it from there.",
  },
  {
    when: "Weeks 1 to 2",
    title: "Design and mock up",
    body: "Our design team turns your story into a kit. You see it on a full mock up before anything is made.",
  },
  {
    when: "End of week 2",
    title: "Sign off",
    body: "You approve the design, confirm sizes and quantities, and we place the order.",
  },
  {
    when: "Weeks 3 to 10",
    title: "Made to order",
    body: "Your kit is made to order, to the standard it deserves. Pre sale campaigns can run alongside, so demand and revenue start building from week one.",
  },
  {
    when: "About week 10",
    title: "Delivery and launch",
    body: "Kit arrives. Your club shop goes live, or stock goes straight to your team.",
  },
];

const MODELS = [
  {
    name: "Wholesale",
    body: "You buy the kit and sell or use it as you choose. The simplest route, with the best margin per shirt for you.",
  },
  {
    name: "Pre sale revenue share",
    body: "We run a pre order campaign on your behalf, make to order once demand is confirmed, and share the revenue with you. A launch with no risk of being left with stock.",
  },
  {
    name: "Stock revenue share",
    body: "We hold the stock, list it in your club shop and handle fulfilment, paying you a share of the profit on every sale. An ongoing revenue stream with no logistics on your side.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-night text-white">
        <Photo src={getHero("process")} alt="David Follett playing badminton in his WOVN shirt" position="50% 12%" priority label="Optional: public/images/process/01.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40">
          <p className="font-tag text-[11px] uppercase tracking-tag text-thread">Process and pricing</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">
            About ten weeks from first conversation to kit in hand.
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <ol className="divide-y divide-border border-y border-border">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-4 py-10 sm:grid-cols-12 sm:gap-8">
              <p className="font-serif text-5xl text-thread sm:col-span-2">{String(i + 1).padStart(2, "0")}</p>
              <div className="sm:col-span-3">
                <p className="font-tag text-[11px] uppercase tracking-tag text-muted">{s.when}</p>
                <h2 className="mt-1 font-serif text-3xl text-ink">{s.title}</h2>
              </div>
              <p className="text-lg text-muted sm:col-span-7">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Commercial models */}
      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-tag text-[11px] uppercase tracking-tag text-thread">Ways to work with us</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
            Three ways to bring your kit to life.
          </h2>
          <div className="mt-14 grid gap-px bg-white/15 lg:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.name} className="bg-night p-8">
                <h3 className="font-serif text-2xl text-thread">{m.name}</h3>
                <p className="mt-4 text-white/75">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price guide */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-tag text-[11px] uppercase tracking-tag text-thread">Rough price guide</p>
        <h2 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">What a kit costs.</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Indicative prices per garment for wholesale orders, by quantity. The more you order, the less
          each shirt costs.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink font-tag text-[11px] uppercase tracking-tag text-muted">
                <th className="py-3 pr-4 font-normal">Specification</th>
                {TIERS.map((t) => (
                  <th key={t} className="px-4 py-3 text-right font-normal">
                    {t} shirts
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICE_GUIDE.map((row) => (
                <tr key={row.spec} className="border-b border-border align-top">
                  <td className="py-5 pr-4">
                    <p className="font-serif text-xl text-ink">{row.spec}</p>
                    <p className="mt-1 text-sm text-muted">{row.detail}</p>
                  </td>
                  {row.prices.map((p, i) => (
                    <td key={i} className="px-4 py-5 text-right font-serif text-xl text-ink">
                      {p === null ? <span className="text-muted">n/a</span> : `£${p}`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-tag text-[11px] uppercase tracking-tag text-thread">Design</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {DESIGN_FEES.map((f) => (
                <li key={f.label} className="flex justify-between gap-6 py-3">
                  <span className="text-muted">{f.label}</span>
                  <span className="text-ink">{f.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-tag text-[11px] uppercase tracking-tag text-thread">Selling it on</h3>
            <p className="mt-4 text-muted">
              Most of our clubs sell their kit at around <span className="text-ink">{RETAIL_GUIDE}</span>{" "}
              a shirt, which leaves a healthy margin to put back into the club.
            </p>
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-sm italic text-muted">
          These are guide prices only. Your final price depends on the specification, print complexity and
          extras such as sponsor branding and individual numbering. Tell us what you need and we will
          give you a clear quote.
        </p>
      </section>

      <StitchDivider className="mx-auto max-w-5xl" />

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-ink sm:text-5xl">Ready to tell your story?</h2>
        <Link
          href="/enquire"
          className="mt-10 inline-block bg-thread px-8 py-4 font-tag text-xs uppercase tracking-tag text-ink hover:bg-ink hover:text-white"
        >
          Start a project
        </Link>
      </section>
    </>
  );
}
