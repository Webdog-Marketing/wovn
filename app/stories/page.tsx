import Link from "next/link";
import Photo from "@/components/Photo";
import { getHero } from "@/lib/photos";
import { STORIES } from "@/content/stories";

export const metadata = { title: "Stories | WOVN" };

export default function StoriesPage() {
  return (
    <>
      <section className="bg-night pb-20 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-tag text-[11px] uppercase tracking-tag text-thread">Case studies</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">
            The stories behind the kit.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Every project starts with a story that deserves to be told. Here are a few of ours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
        {STORIES.map((story, i) => (
          <Link
            key={story.slug}
            href={`/stories/${story.slug}`}
            className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden bg-night lg:col-span-7 ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Photo
                src={getHero(story.photoFolder)}
                alt={story.name}
                label={story.name}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="font-tag text-[11px] uppercase tracking-tag text-thread">{story.kicker}</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
                {story.name}
              </h2>
              <p className="mt-5 text-lg text-muted">{story.summary}</p>
              <span className="thread-underline mt-8 inline-block font-tag text-xs uppercase tracking-tag text-ink">
                Read the story
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
