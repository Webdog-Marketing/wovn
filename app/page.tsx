import Link from "next/link";
import Photo from "@/components/Photo";
import StitchDivider from "@/components/StitchDivider";
import { getAllClients, type ClientRecord } from "@/lib/airtable";
import { getHero, getPhotos } from "@/lib/photos";
import { STORIES } from "@/content/stories";

async function getClientsSafely(): Promise<ClientRecord[]> {
  try {
    return await getAllClients();
  } catch {
    // Airtable isn't reachable in this environment, so fail soft and still render the page.
    return [];
  }
}

export default async function HomePage() {
  const clients = await getClientsSafely();
  const homePhotos = getPhotos("home");

  return (
    <>
      {/* Hero: photo above the headline on mobile, split side by side on large screens */}
      <section className="relative overflow-hidden bg-night text-white lg:flex lg:min-h-[72vh] lg:items-end">
        <div className="relative aspect-[3/2] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%]">
          <Photo
            src={homePhotos[0]}
            alt="Edukid kit worn at a football dugout"
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            label="Add a photo to public/images/home/01.jpg"
          />
          {/* keeps the nav readable over a bright photo */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/70 to-transparent" />
          {/* blends the photo into the dark panel */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent lg:bg-gradient-to-r lg:from-night lg:via-night/10 lg:to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-6 lg:pb-20 lg:pt-40">
          <div className="lg:max-w-[46%]">
            <p className="font-tag text-[11px] uppercase tracking-tag text-thread">
              Bespoke sportswear
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-[5rem]">
              Every kit tells <em className="text-thread">a story.</em>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              WOVN exists to tell the stories of those who deserve their story told.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/stories"
                className="bg-thread px-7 py-3.5 font-tag text-xs uppercase tracking-tag text-ink hover:bg-white"
              >
                See the stories
              </Link>
              <Link
                href="/enquire"
                className="border border-white/60 px-7 py-3.5 font-tag text-xs uppercase tracking-tag hover:border-white hover:bg-white hover:text-ink"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="font-serif text-3xl leading-snug text-ink sm:text-5xl sm:leading-tight">
          We build kit for federations, clubs, charities and athletes who refuse to be defined by
          their size. Thread by thread, brief by brief, we weave identity into every stitch.
        </p>
        <p className="mt-8 font-tag text-xs uppercase tracking-tag text-thread">
          No off the shelf templates. No compromise on craft.
        </p>
      </section>

      <StitchDivider className="mx-auto max-w-7xl" />

      {/* Stories */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-serif text-4xl text-ink sm:text-6xl">Stories we have told</h2>
          <Link href="/stories" className="thread-underline hidden font-tag text-xs uppercase tracking-tag sm:inline">
            All stories
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-10">
          {STORIES.map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className={`group relative block aspect-[4/5] overflow-hidden bg-night text-white ${
                i % 2 === 1 ? "sm:mt-16" : ""
              }`}
            >
              <Photo
                src={getHero(story.photoFolder)}
                alt={story.name}
                label={story.name}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-tag text-[11px] uppercase tracking-tag text-thread">
                  {story.kicker}
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{story.name}</h3>
                <p className="mt-3 max-w-md text-sm text-white/75">{story.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process teaser */}
      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-tag text-[11px] uppercase tracking-tag text-thread">How it works</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-6xl">
            From first conversation to kit in hand in about ten weeks.
          </h2>
          <dl className="mt-16 grid gap-10 sm:grid-cols-3">
            {[
              ["2 weeks", "Brief, design and mock up"],
              ["8 weeks", "Made to order, built to last"],
              ["c. 10 weeks", "From brief to delivery"],
            ].map(([big, small]) => (
              <div key={big} className="border-t border-white/20 pt-6">
                <dt className="font-serif text-5xl text-thread sm:text-6xl">{big}</dt>
                <dd className="mt-3 text-white/70">{small}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/process"
            className="mt-14 inline-block border border-white/60 px-7 py-3.5 font-tag text-xs uppercase tracking-tag hover:border-white hover:bg-white hover:text-ink"
          >
            Process and pricing
          </Link>
        </div>
      </section>

      {/* Club shops */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-serif text-4xl text-ink sm:text-6xl">Wear the story</h2>
          <Link href="/shops" className="thread-underline hidden font-tag text-xs uppercase tracking-tag sm:inline">
            All club shops
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-muted">
          Every organisation we work with gets its own shop. Buying from it supports the people behind the kit.
        </p>
        {clients.length > 0 && (
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client) => (
              <Link
                key={client.slug}
                href={`/shops/${client.slug}`}
                className="group flex min-h-[180px] flex-col justify-between bg-ground p-6 hover:bg-surface"
              >
                <p className="font-tag text-[11px] uppercase tracking-tag text-thread">{client.category}</p>
                <h3 className="font-serif text-2xl leading-tight text-ink group-hover:text-thread">
                  {client.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Closing call to action */}
      <section className="bg-thread text-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 sm:flex-row sm:items-center">
          <h2 className="max-w-2xl font-serif text-4xl sm:text-5xl">
            Got a story that deserves to be told?
          </h2>
          <Link
            href="/enquire"
            className="bg-ink px-8 py-4 font-tag text-xs uppercase tracking-tag text-white hover:bg-white hover:text-ink"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
