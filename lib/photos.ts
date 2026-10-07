import manifest from "@/content/photo-manifest.json";

const photos = manifest as Record<string, string[]>;

// All photos in public/images/<folder>/, in filename order.
export function getPhotos(folder: string): string[] {
  return photos[folder] ?? [];
}

export function getHero(folder: string): string | null {
  return getPhotos(folder)[0] ?? null;
}
