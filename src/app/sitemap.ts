import type { MetadataRoute } from 'next';

const BASE_URL = 'https://riolls.com';

// Static routes with their SEO priority + change frequency
const staticRoutes: MetadataRoute.Sitemap = [
  // Tier 1 — Homepage
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },

  // Tier 2 — AI Studio landing
  { url: `${BASE_URL}/ai-studio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.98 },

  // Tier 3 — Core shop & ring categories
  { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/engagement-rings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/wedding-rings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },

  // Tier 4 — High-value SEO landing pages
  { url: `${BASE_URL}/bespoke`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/custom-jewellery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/handmade-jewellery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/anniversary-gifts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/custom-diamond-rings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/luxury-jewelry-dubai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/custom-engagement-ring-design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

  // Tier 5 — Discovery & content hubs
  { url: `${BASE_URL}/trending-jewellery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },

  // Tier 6 — Trust & informational pages
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/education/diamond-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

  // Tier 7 — Supporting pages
  { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE_URL}/size-guide`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.75 },
  { url: `${BASE_URL}/product-care`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.75 },
  { url: `${BASE_URL}/delivery-returns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.75 },

  // Tier 8 — Legal
  { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
];

/**
 * Fetch product slugs and updatedAt from the backend to include dynamic product pages.
 * Falls back to an empty array if the request fails (e.g. during static builds
 * without a live backend).
 */
async function fetchProductSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
    const res = await fetch(`${apiBase}/products?limit=1000&fields=slug,updatedAt`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items: { slug?: string; updatedAt?: string }[] = Array.isArray(json.data) ? json.data : [];
    return items
      .filter((p): p is { slug: string; updatedAt?: string } => Boolean(p.slug))
      .map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  } catch {
    return [];
  }
}

/**
 * Fetch published blog post slugs from the backend to include dynamic blog pages.
 * Falls back to an empty array if the request fails (e.g. during static builds
 * without a live backend).
 */
async function fetchBlogSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
    const res = await fetch(`${apiBase}/blog?limit=1000&fields=slug,updatedAt`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items: { slug?: string; updatedAt?: string }[] = Array.isArray(json.data) ? json.data : [];
    return items
      .filter((p): p is { slug: string; updatedAt?: string } => Boolean(p.slug))
      .map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts] = await Promise.all([
    fetchProductSlugs(),
    fetchBlogSlugs(),
  ]);

  const productRoutes: MetadataRoute.Sitemap = products.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
