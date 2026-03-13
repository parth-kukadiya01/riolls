import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Trending Jewellery 2025 — Most Popular Fine Jewellery | Riolls',
  description: 'Discover the most popular and trending jewellery styles of 2025 at Riolls Jewels. Trending rings, necklaces, earrings, and bracelets — all handcrafted in fine gold and diamonds.',
  keywords: [
    'trending jewellery',
    'trending jewelry',
    'popular jewellery 2025',
    'jewellery trends 2025',
    'most popular rings',
    'trending gold jewellery',
    'trending diamond jewellery',
    'new jewellery collection',
    'best selling jewellery',
    'fashionable jewellery',
  ],
  openGraph: {
    title: 'Trending Jewellery 2025 — Riolls Jewels',
    description: 'Discover the most popular jewellery styles of 2025 — trending rings, necklaces, and earrings, all handcrafted in fine gold.',
    url: 'https://riolls.com/trending-jewellery',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Trending Jewellery 2025 by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending Jewellery 2025 — Riolls Jewels',
    description: 'Discover the most popular jewellery styles of 2025 — handcrafted in fine gold and diamonds.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/trending-jewellery' },
};

const trends = [
  { icon: '🔶', title: 'Chunky Gold Chains', body: 'Substantial layering chains in yellow gold — worn alone or stacked — are the dominant neck trend of 2025. Cuban link, belcher, and figaro styles in 18k yellow gold are particularly sought after. The appeal lies in the weight and movement of solid gold that conveys genuine luxury rather than delicate minimalism. At Riolls, chunky gold chains are handcrafted link by link by a single goldsmith, giving each chain a quality that machine-made equivalents cannot match.' },
  { icon: '💎', title: 'Certified Natural Diamonds', body: 'GIA-certified natural diamonds remain the standard for fine jewellery in 2025, with demand for transparent, independently verified stones continuing to grow strongly. Consumers are increasingly requesting full certificate documentation — cut grade, colour, clarity, and carat weight — before purchasing. IGI and SGL certifications are also widely accepted. At Riolls, every diamond sold is independently certified by GIA, IGI, or SGL with the grading report provided to the buyer.' },
  { icon: '🌸', title: 'Coloured Gemstones', body: 'Sapphires, emeralds, and rubies are at the centre of 2025\'s jewellery moment — vivid colour as the centrepiece rather than the accent. Blue sapphires in oval and cushion cuts are the most requested coloured stone for engagement rings this year. Emerald cuts in deep greens and Burmese rubies in pavé halo settings are also seeing significant demand. Coloured stones offer comparable visual drama to diamonds at a lower cost per carat for equivalent presence.' },
  { icon: '🔮', title: 'Sculptural Forms', body: 'Abstract, organic shapes are overtaking traditional motifs in fine jewellery for 2025, with jewellery increasingly treated as wearable sculpture. Asymmetric ear cuffs, free-form bangles, and rings with undulating, non-geometric profiles are defining the aesthetic. This trend prizes individuality and artistic intent over classical symmetry. Handmade jewellery excels in this trend — the human touch of a goldsmith naturally produces the subtle irregularities that make sculptural forms convincing.' },
  { icon: '✨', title: 'Pavé Everything', body: 'Diamond pavé — closely set stones covering a surface in a continuous field of sparkle — is appearing across jewellery categories in 2025: full pavé bands, pavé hoops, pavé-set pendants, and pavé stacking rings. The appeal is the high light return from many small, well-cut stones creating a more brilliant impression per unit of cost than a single large stone. Pavé settings require exceptional hand-setting precision; at Riolls, every pavé piece is set stone by stone by a specialist setter using hand tools.' },
  { icon: '🏛️', title: 'Architectural Earrings', body: 'Bold, geometric statement earrings that draw the eye without requiring a statement necklace are a major trend of 2025. Angular hoops, elongated drop earrings with structural metalwork, and earrings that sit partially outside the ear lobe are all in high demand. This trend plays to the strength of fine handmade jewellery — complex architectural forms in metal require skilled goldsmithing that machines cannot replicate. In yellow gold, these pieces have a distinctive warmth that white metal cannot achieve.' },
];

const collections = [
  { name: 'Trending Rings', href: '/shop?cat=rings&sort=-createdAt', desc: 'Our newest and most-wanted rings' },
  { name: 'Trending Necklaces', href: '/shop?cat=necklaces&sort=-createdAt', desc: 'Latest chain and pendant styles' },
  { name: 'Trending Earrings', href: '/shop?cat=earrings&sort=-createdAt', desc: 'What everyone is wearing right now' },
  { name: 'Trending Bracelets', href: '/shop?cat=bracelets&sort=-createdAt', desc: 'Stacking and statement wrist pieces' },
  { name: 'New Arrivals', href: '/shop?sort=-createdAt', desc: 'Freshest pieces from the atelier' },
  { name: 'Featured Picks', href: '/shop?sort=featured', desc: 'Our master craftsmen\'s favourites' },
];

const trendingFaqs = [
  {
    q: 'What jewellery is trending in 2025?',
    a: 'The dominant jewellery trends of 2025 are chunky yellow gold chains worn layered or alone, coloured gemstones (particularly sapphires and emeralds) as centrepiece stones, sculptural and architectural forms that treat jewellery as wearable art, pavé diamond bands and hoops with dense stone coverage, and bold geometric earrings that make a statement without a necklace. Across all categories, there is a strong preference for handcrafted pieces with visible artisan character over machine-made uniformity.',
  },
  {
    q: 'What is the most popular jewellery style in 2025?',
    a: 'The most popular jewellery style of 2025 is layered gold chains — specifically substantial yellow gold chains in Cuban link, belcher, and figaro styles worn in multiples or as a single dominant piece. Alongside chains, coloured gemstones (particularly oval blue sapphires and emerald-cut emeralds) have overtaken colourless diamonds as the most requested centrepiece stone for both engagement rings and fashion jewellery. Pavé diamond bands remain consistently popular as stackable everyday fine jewellery.',
  },
  {
    q: 'What engagement ring styles are trending in 2025?',
    a: 'The most popular engagement ring styles of 2025 are oval and pear-cut diamonds in solitaire and thin pavé band settings, coloured centre stones (especially blue sapphires and pink sapphires replacing the traditional diamond), and architectural settings with clean, geometric metalwork rather than ornate vintage detailing. Elongated fancy cuts — oval, pear, and marquise — are preferred over round brilliants for their larger visual footprint per carat. East-west orientation settings, where an elongated stone is set horizontally rather than vertically, are also a notable trend this year.',
  },
];

export default function TrendingJewelleryPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Trending Jewellery 2025 — Riolls Jewels',
    url: 'https://riolls.com/trending-jewellery',
    description: 'The most popular and trending jewellery styles of 2025, handcrafted by Riolls Jewels in Surat.',
    dateModified: '2026-03-13',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Trending Jewellery', item: 'https://riolls.com/trending-jewellery' },
      ],
    },
    provider: {
      '@type': 'JewelryStore',
      name: 'Riolls Jewels',
      url: 'https://riolls.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: trendingFaqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 60%, #1a1208, #0a0500)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
      }}>
        <span style={{ display: 'block', width: '50px', height: '1px', background: '#c9a96e', margin: '0 auto 1.5rem' }} />
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem', display: 'block' }}>
          2025 Trends · Handcrafted in Surat
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Trending Jewellery — The Most Sought-After Pieces of 2025
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '640px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          Discover the jewellery styles that define 2025 — from bold sculptural gold to delicate diamond pavé. At Riolls, every trending piece is still handcrafted one at a time, because fashion should never compromise on quality.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop?sort=-createdAt" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Shop New Arrivals
          </Link>
          <Link href="/shop?sort=featured" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            View Featured Pieces
          </Link>
        </div>
      </section>

      {/* Trends */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>2025 Trends</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            What everyone is wearing this year
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {trends.map(t => (
              <div key={t.title} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>{t.icon}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem' }}>{t.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Shop by Category</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Trending jewellery by type
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {collections.map(c => (
              <Link key={c.name} href={c.href} style={{
                display: 'block', background: '#2a1e10', padding: '2rem 1.5rem',
                textDecoration: 'none', color: '#f5f0e8', textAlign: 'center',
              }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>{c.name}</strong>
                <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem' }}>{c.desc}</span>
                <span style={{ display: 'block', color: '#c9a96e', marginTop: '1rem', fontSize: '0.8rem', letterSpacing: '0.1em' }}>EXPLORE →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GEO: FAQ section — AI Overview & People Also Ask extraction */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
              Questions Answered
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400 }}>
              Jewellery trends for 2025 — what you need to know
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {trendingFaqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e0d8', padding: '1.75rem 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.02rem', color: '#2a1e10', fontWeight: 400, marginBottom: '0.8rem', lineHeight: 1.5 }}>
                  {f.q}
                </p>
                <p style={{ color: '#6b5c4e', lineHeight: 1.85, margin: 0, fontSize: '0.93rem' }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a0f00', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f5f0e8', fontWeight: 400, marginBottom: '1rem' }}>
          Stay ahead of the curve
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          New pieces arrive regularly from our atelier. Browse the full collection or speak to our team for personal styling advice.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Browse All Jewellery
          </Link>
          <a href="https://wa.me/message/CNVYZ7P7GP3SN1?text=Hello" target="_blank" rel="noopener noreferrer" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.9rem 2.5rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Personal Styling via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
