import StitchDivider from "@/components/StitchDivider";

export const metadata = { title: "About — WOVN" };

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <h1 className="font-display text-4xl uppercase tracking-wide text-ink">
          About WOVN
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          The company behind WOVN is{" "}
          <a
            href="https://www.webdogsports.marketing"
            className="text-thread thread-underline"
          >
            Webdog Sports Marketing
          </a>
          , who don&apos;t just design and produce merchandise and apparel but
          create highly bespoke designs that tell a story. We work with
          digital marketing and PR to help these organisations increase their
          revenue and their reach.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          We typically work with underrepresented sports teams and charities
          where we can have a positive impact on the world. We&apos;re a small
          team who care greatly about each project.
        </p>
      </section>

      <StitchDivider />

      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xl leading-relaxed text-ink">
          Every kit tells a story. WOVN builds bespoke sportswear for
          organisations who refuse to be defined by their size: federations,
          clubs, and teams who want to punch above their weight and look like
          it.
        </p>
        <p className="mt-6 text-xl leading-relaxed text-ink">
          We work thread by thread, brief by brief, weaving identity into
          every stitch. No off-the-shelf templates, no compromise on craft.
          Just a kit that carries the ambition of the people wearing it.
        </p>
        <p className="mt-6 font-display text-2xl uppercase tracking-wide text-thread">
          Woven for those who play bigger than they are.
        </p>
      </section>

      <StitchDivider />

      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-tag text-xs uppercase tracking-tag text-muted">
              Founder
            </p>
            <p className="mt-2 font-display text-xl uppercase tracking-wide text-ink">
              Matt Webb
            </p>
          </div>
          <div>
            <p className="font-tag text-xs uppercase tracking-tag text-muted">
              Designer
            </p>
            <p className="mt-2 font-display text-xl uppercase tracking-wide text-ink">
              Matias Otero
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
