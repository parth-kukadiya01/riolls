import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Wedding Rings & Bands — Handcrafted Gold by Riolls Jewels',
  description: 'Discover exquisite wedding rings and bands at Riolls Jewels. Handcrafted gold and diamond wedding bands, eternity rings, and matching bridal sets crafted in Surat.',
  keywords: [
    'wedding rings',
    'wedding ring',
    'wedding band',
    'gold wedding ring',
    'diamond wedding band',
    'eternity ring',
    'bridal set',
    'matching wedding bands',
    'handcrafted wedding ring',
    'luxury wedding ring',
  ],
  openGraph: {
    title: 'Wedding Rings & Bands — Riolls Jewels',
    description: 'Handcrafted gold and diamond wedding rings, eternity bands, and bridal sets. Made in Surat, delivered worldwide.',
    url: 'https://riolls.com/wedding-rings',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Wedding Rings by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Rings & Bands — Riolls Jewels',
    description: 'Handcrafted gold and diamond wedding rings, eternity bands, and bridal sets. Delivered worldwide.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/wedding-rings' },
};

const features = [
  { icon: '💍', title: 'Matched Bridal Sets', body: 'Commission your engagement ring and wedding band as a perfectly matched set — designed to sit flush together.' },
  { icon: '✨', title: 'Diamond Eternity Bands', body: 'Full and half-eternity bands set with conflict-free diamonds, available in yellow, white, and rose gold.' },
  { icon: '🔨', title: 'Handcrafted Precision', body: 'Every band is hand-finished to a mirror polish. No machine-made shortcuts — ever.' },
  { icon: '📐', title: 'Custom Sizing & Engraving', body: 'Complimentary sizing and inner-band engraving to make your ring uniquely and permanently yours.' },
];

const collections = [
  { name: 'Classic Bands', href: '/shop?cat=rings&style=band', desc: 'Clean lines, timeless appeal' },
  { name: 'Diamond Eternity', href: '/shop?cat=rings&style=eternity', desc: 'Stones all the way around' },
  { name: 'Pavé Bands', href: '/shop?cat=rings&style=pave', desc: 'Closely set diamond pavé' },
  { name: 'Bridal Sets', href: '/shop?cat=rings&style=bridal-set', desc: 'Engagement + wedding band paired' },
  { name: 'Men\'s Bands', href: '/shop?cat=rings&style=mens', desc: 'Substantial, masculine designs' },
  { name: 'Bespoke Band', href: '/bespoke', desc: 'Designed entirely around you' },
];

const weddingFaqs = [
  {
    q: 'What is the difference between a wedding ring and a wedding band?',
    a: 'A wedding band is a plain or minimally decorated ring worn as a symbol of marriage — typically a smooth or lightly textured metal band. A wedding ring is a broader term that can refer to any ring worn to symbolise marriage, including diamond-set or eternity-style bands. At Riolls, we offer both plain wedding bands and fully diamond-set wedding rings in yellow, white, and rose gold, as well as bespoke designs crafted to your exact specifications.',
  },
  {
    q: 'What metal is best for a wedding band?',
    a: '18k gold is the most popular metal for wedding bands due to its ideal balance of durability and beauty. Yellow gold is classic and traditional; white gold offers a contemporary, platinum-like appearance; rose gold provides a warm, romantic tone. All Riolls wedding bands are available in 18k yellow, white, and rose gold. For maximum durability in a piece worn every day, we recommend 18k over 9k or 22k gold — it is harder and more scratch-resistant while retaining a rich colour.',
  },
  {
    q: 'How do I match my wedding band to my engagement ring?',
    a: 'The easiest way to ensure a perfect match is to commission both the engagement ring and wedding band from the same jeweller as a bridal set. At Riolls, we design matching bridal sets that sit perfectly flush together — same metal, same finish, aligned stone placement. If you have an existing engagement ring, bring it (or detailed photos and measurements) to your Riolls consultation and we will design a wedding band that complements it precisely.',
  },
  {
    q: 'How long does it take to make a wedding band at Riolls?',
    a: 'Ready-made Riolls wedding bands typically require 4 to 6 weeks for sizing, finishing, and delivery. Bespoke or custom wedding bands — including matched bridal sets, diamond eternity bands, or fully original designs — take 8 to 12 weeks from design approval to delivery. We recommend ordering at least 3 months before your wedding date to ensure unhurried delivery.',
  },
  {
    q: 'Can I get my wedding band engraved?',
    a: 'Yes. All Riolls wedding bands can be hand-engraved on the inner band with a personal message, date, or initials. Inner-band engraving is included as a complimentary service on all bespoke and custom commissions. For ready-made pieces, engraving can be added during the sizing and finishing process.',
  },
];

export default function WeddingRingsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wedding Rings & Bands — Riolls Jewels',
    url: 'https://riolls.com/wedding-rings',
    description: 'Handcrafted gold and diamond wedding rings, eternity bands, and bridal sets by Riolls Jewels.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Wedding Rings', item: 'https://riolls.com/wedding-rings' },
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
    mainEntity: weddingFaqs.map(f => ({
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
        background: 'radial-gradient(ellipse at 60% 40%, #1a1208, #0a0500)',
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
          Handcrafted in Surat · Delivered Worldwide
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Wedding Rings — The Circle That Seals Your Promise
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          From sleek classic bands to diamond-encrusted eternity rings, every Riolls wedding ring is handcrafted to be worn every day for the rest of your life. That demands more than beautiful — it demands perfect.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop?cat=rings" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Shop Wedding Rings
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Create a Bespoke Band
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Our Promise</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Rings built to last a lifetime — and beyond
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>{f.icon}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem' }}>{f.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{f.body}</p>
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
            Explore wedding ring styles
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
              Everything you need to know about wedding rings
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {weddingFaqs.map((f, i) => (
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
          Reserve your wedding rings today
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Allow 4–6 weeks for ready-made bands and 8–12 weeks for bespoke commissions. Book a consultation to begin.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Book a Consultation
          </Link>
          <a href="https://wa.me/message/CNVYZ7P7GP3SN1?text=Hello" target="_blank" rel="noopener noreferrer" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.9rem 2.5rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            WhatsApp Enquiry
          </a>
        </div>
      </section>
    </>
  );
}
