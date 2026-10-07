import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import StitchDivider from "@/components/StitchDivider";
import { getPhotos } from "@/lib/photos";
import { STORIES, getStory } from "@/content/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getStory(params.slug);
  return { title: story ? `${story.name} | WOVN` : "Story | WOVN" };
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStory(params.slug);
  if (!story) notFound();

  const photos = getPhotos(story.photoFolder);
  const gallery = photos.slice(1);
  const index = STORIES.findIndex((s) => s.slug === story.slug);
  const next = STORIES[(index + 1) % STORIES.length];

  const sections = [
    { title: "The brief", body: story.brief },
    { title: "What we made", body: story.made },
    { title: "The outcome", body: story.outcome },
  ];

  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-night text-white">
        <Photo src={photos[0]} alt={story.name} priority label={`Add photos to public/images/${story.photoFolder}/`} />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40">
          <p className="font-tag text-[11px] uppercase tracking-tag text-thread">{story.kicker}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] sm:text-7xl">{story.name}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{story.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="space-y-6 border-t border-border pt-6 lg:sticky lg:top-10">
            {story.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-tag text-[11px] uppercase tracking-tag text-muted">{f.label}</dt>
                <dd className="mt-1 text-ink">{f.value}</dd>
              </div>
            ))}
            {story.shopSlug && (
              <Link
                href={`/shops/${story.shopSlug}`}
                className="inline-block border border-thread px-6 py-3 font-tag text-xs uppercase tracking-tag text-thread hover:bg-thread hover:text-ink"
              >
                Visit the shop
              </Link>
            )}
          </dl>
        </aside>

        <div className="space-y-14 lg:col-span-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-tag text-[11px] uppercase tracking-tag text-thread">{s.title}</h2>
              <p className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-3xl sm:leading-snug">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <StitchDivider className="mb-12" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden bg-night ${
                  i % 5 === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10] lg:col-span-2" : "aspect-[4/5]"
                }`}
              >
                <Photo
                  src={src}
                  alt={`${story.name}, photo ${i + 2}`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-night text-white">
        <Link
          href={`/stories/${next.slug}`}
          className="group mx-auto flex max-w-7xl items-end justify-between gap-8 px-6 py-20"
        >
          <div>
            <p className="font-tag text-[11px] uppercase tracking-tag text-thread">Next story</p>
            <p className="mt-3 font-serif text-4xl group-hover:text-thread sm:text-6xl">{next.name}</p>
          </div>
          <span className="hidden font-tag text-xs uppercase tracking-tag sm:inline">Read</span>
        </Link>
      </section>
    </>
  );
}
