import type { MetadataRoute } from 'next';

const BASE_URL = 'https://riolls.com';

// Static routes with their SEO priority + change frequency
const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/bespoke`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/custom-diamond-rings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/luxury-jewelry-dubai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/custom-engagement-ring-design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE_URL}/education/diamond-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/delivery-returns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  { url: `${BASE_URL}/size-guide`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE_URL}/product-care`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
];

/**
 * Fetch product slugs from the backend to include dynamic product pages.
 * Falls back to an empty array if the request fails (e.g. during static builds
 * without a live backend).
 */
async function fetchProductSlugs(): Promise<string[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
    const res = await fetch(`${apiBase}/api/products?limit=1000&fields=slug`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items: { slug?: string }[] = Array.isArray(json.data) ? json.data : [];
    return items.map((p) => p.slug).filter((s): s is string => Boolean(s));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchProductSlugs();

  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
