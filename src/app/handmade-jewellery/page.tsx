import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Handmade Jewellery — 100% Handcrafted Fine Jewellery | Riolls',
  description: 'Every Riolls piece is 100% handmade by master goldsmiths in Surat. Discover handmade gold rings, necklaces, earrings, and bracelets — jewellery with a soul.',
  keywords: [
    'handmade jewellery',
    'handcrafted jewellery',
    'handmade jewelry',
    'handcrafted jewelry',
    'handmade gold jewellery',
    'handmade diamond jewellery',
    'artisan jewellery',
    'handmade rings',
    'handmade necklaces',
    'handmade earrings',
  ],
  openGraph: {
    title: 'Handmade Jewellery — 100% Handcrafted by Riolls Jewels',
    description: 'Every Riolls piece is made entirely by hand by master goldsmiths in Surat. No moulds, no shortcuts — just exceptional craft.',
    url: 'https://riolls.com/handmade-jewellery',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Handmade Jewellery by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handmade Jewellery — Riolls Jewels',
    description: '100% handcrafted fine jewellery by master goldsmiths in Surat. No moulds, no shortcuts.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/handmade-jewellery' },
};

const craftSteps = [
  { step: '01', title: 'Hand-Drawing', body: 'Every design begins as a pencil sketch — proportions, stone placement, and metalwork detail all committed to paper before metal is touched.' },
  { step: '02', title: 'Hand-Fabrication', body: 'Metal is cut, shaped, soldered, and formed entirely by hand. No casting from pre-made moulds — each piece is built from raw precious metal.' },
  { step: '03', title: 'Stone Setting', body: 'Diamonds and gemstones are hand-set by specialist setters who position each stone for maximum brilliance and security.' },
  { step: '04', title: 'Hand-Finishing', body: 'Final surfaces are hand-polished, engraved, and checked — ensuring every millimetre meets our standard before it leaves the atelier.' },
];

const collections = [
  { name: 'Handmade Rings', href: '/shop?cat=rings', desc: 'Solitaires, bands & cocktail rings' },
  { name: 'Handmade Necklaces', href: '/shop?cat=necklaces', desc: 'Pendants, chains & statement pieces' },
  { name: 'Handmade Earrings', href: '/shop?cat=earrings', desc: 'Studs, hoops & chandeliers' },
  { name: 'Handmade Bracelets', href: '/shop?cat=bracelets', desc: 'Tennis, bangles & cuffs' },
];

const handmadeFaqs = [
  {
    q: 'What is handmade jewellery?',
    a: 'Handmade jewellery is jewellery made entirely by human hands using traditional metalsmithing techniques, without machine casting or automated production. In a handmade piece, every join is soldered by a craftsperson, every stone is individually hand-set, and every surface is hand-finished. The process requires years of specialist training and produces pieces with a quality and character that machine-made jewellery cannot replicate. At Riolls, every piece is handmade from raw precious metal by a single master goldsmith at our Surat atelier.',
  },
  {
    q: 'Is handmade jewellery better than machine-made jewellery?',
    a: 'Handmade jewellery is superior to machine-made jewellery in several important ways: construction strength (hand-soldered joins at stress points are significantly stronger than cast joins), unique character (subtle variations confirm each piece is genuinely one-of-a-kind), higher artisan skill (each piece embodies years of trained craftsmanship), and a human story that gives sentimental value beyond the material. Machine-made jewellery is more consistent and lower in cost, but lacks the depth of quality, individuality, and longevity of a truly handmade piece.',
  },
  {
    q: 'Why is handmade jewellery more expensive?',
    a: 'Handmade jewellery is more expensive than machine-made jewellery because it requires far greater skilled labour time. A single handmade ring at Riolls can take 20 to 40 hours of skilled goldsmith time from raw metal to finished piece — compared to minutes for a machine-cast equivalent. Lower production volume, the impossibility of cutting corners at any stage, and the cost of training and retaining master craftspeople all contribute to a higher price. The result, however, is a piece of fundamentally higher quality, strength, and value.',
  },
  {
    q: 'Where is Riolls jewellery handmade?',
    a: 'All Riolls jewellery is handmade at our atelier in Surat, Gujarat, India — the undisputed world capital of jewellery craftsmanship, home to over 500,000 skilled jewellery craftspeople. Surat processes approximately 90% of the world\'s rough diamonds and has a centuries-old tradition of fine jewellery making. Riolls has maintained a fully hand-fabrication atelier in Surat since 2008, working with master goldsmiths trained in traditional techniques passed down through generations of Surat\'s jewellery community.',
  },
];

export default function HandmadeJewelleryPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Handmade Jewellery — Riolls Jewels',
    url: 'https://riolls.com/handmade-jewellery',
    description: '100% handcrafted fine jewellery by master goldsmiths in Surat, India.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Handmade Jewellery', item: 'https://riolls.com/handmade-jewellery' },
      ],
    },
    provider: {
      '@type': 'JewelryStore',
      name: 'Riolls Jewels',
      url: 'https://riolls.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: handmadeFaqs.map(f => ({
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
        background: 'radial-gradient(ellipse at 30% 70%, #1a1208, #0a0500)',
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
          100% Handcrafted · Surat Atelier · Est. 2008
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Handmade Jewellery — Every Piece Made by Human Hands
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '640px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          In a world of machine-made mass production, Riolls remains committed to the oldest tradition in jewellery: making every single piece entirely by hand. From the first cut of metal to the final polish, each Riolls jewel carries the unmistakable signature of human craft.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Shop Handmade Collection
          </Link>
          <Link href="/about" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Our Craft Story
          </Link>
        </div>
      </section>

      {/* Craft Process */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>The Craft</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            How a Riolls jewel is made
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {craftSteps.map(s => (
              <div key={s.step} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c9a96e', display: 'block', marginBottom: '0.6rem' }}>{s.step}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem' }}>{s.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Collections</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Explore handmade jewellery by type
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

      {/* Content block */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1.2rem' }}>
            Why handmade jewellery matters
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            Machine-cast jewellery is uniform by design — every ring identical to the last. Handmade jewellery is the opposite. Subtle variations in texture, the warmth of a hand-polished surface, the slight asymmetry that tells you this was made by a person — these are not defects. They are the marks of authenticity.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            At Riolls, we have maintained a fully hand-fabrication atelier since 2008. Our goldsmiths are trained in techniques passed down through generations of Surat's world-renowned jewellery tradition — arguably the finest concentration of jewellery craft skill anywhere on earth.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85 }}>
            When you wear a Riolls piece, you are wearing someone's best work. That matters — and it shows.
          </p>
        </div>
      </section>

      {/* GEO: FAQ section — AI Overview & People Also Ask extraction */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
              Questions Answered
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400 }}>
              Everything you need to know about handmade jewellery
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {handmadeFaqs.map((f, i) => (
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
          Own something made entirely by hand
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Browse our handmade collection or commission a one-of-a-kind bespoke piece designed around your vision.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Browse Handmade Jewellery
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.9rem 2.5rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Commission a Bespoke Piece
          </Link>
        </div>
      </section>
    </>
  );
}
