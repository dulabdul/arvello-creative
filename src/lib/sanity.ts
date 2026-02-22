// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',

  // WAJIB FALSE UNTUK ARSITEKTUR SSG + WEBHOOKS
  // Ini memaksa Vercel melewati antrean Cache CDN dan langsung mengambil data terbaru dari Live API Sanity.
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
