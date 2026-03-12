import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Luxury Jewelry Dubai — Fine Handcrafted Jewellery by Riolls',
  description: 'Discover luxury jewelry in Dubai from Riolls Jewels — handcrafted diamond rings, necklaces, and bespoke engagement rings delivered to Dubai and the UAE.',
  keywords: [
    'luxury jewelry Dubai',
    'luxury jewellery Dubai',
    'diamond rings Dubai',
    'bespoke engagement ring Dubai',
    'fine jewellery UAE',
    'custom jewelry Dubai',
    'luxury gold jewellery Dubai',
  ],
  openGraph: {
    title: 'Luxury Jewelry Dubai — Riolls Jewels',
    description: 'Handcrafted luxury diamond jewellery delivered to Dubai and across the UAE. Bespoke engagement rings, fine gold jewellery, worldwide service.',
    url: 'https://riolls.com/luxury-jewelry-dubai',
  },
  alternates: { canonical: 'https://riolls.com/luxury-jewelry-dubai' },
};

const whyRiolls = [
  { icon: '👑', title: 'Regal Craftsmanship', body: 'Every piece is handcrafted by master goldsmiths with decades of experience in luxury jewellery.' },
  { icon: '💎', title: 'Conflict-Free Diamonds', body: 'GIA-certified, ethically sourced diamonds chosen for maximum brilliance and fire.' },
  { icon: '✈️', title: 'Dubai Delivery', body: 'Fully insured, tracked delivery directly to Dubai and across the UAE.' },
  { icon: '🔒', title: 'Certified Authenticity', body: 'Every piece comes with a certificate of authenticity and material hallmarking.' },
];

export default function LuxuryJewelryDubaiPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Luxury Jewelry Dubai — Riolls Jewels',
    url: 'https://riolls.com/luxury-jewelry-dubai',
    description: 'Luxury handcrafted diamond jewellery delivered to Dubai and the UAE.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Luxury Jewelry Dubai', item: 'https://riolls.com/luxury-jewelry-dubai' },
      ],
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse at 40% 60%, #1a1208, #0a0500)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
        position: 'relative',
      }}>
        {/* Golden shimmer line */}
        <span style={{ display: 'block', width: '50px', height: '1px', background: '#c9a96e', margin: '0 auto 1.5rem' }} />
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem', display: 'block' }}>
          Delivered to Dubai & UAE
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Luxury Jewelry in Dubai — Handcrafted Fine Jewellery by Riolls
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          Riolls Jewels brings the world's finest handcrafted luxury jewellery to Dubai. From dazzling diamond solitaires to bespoke gold necklaces — each piece is a testament to master craftsmanship, created for those who demand nothing but the absolute best.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Explore Luxury Collection
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Commission Bespoke Piece
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Why Riolls for Dubai</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1.2rem' }}>
            World-class luxury jewellery, delivered to Dubai
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto 3rem' }}>
            Dubai's discerning jewellery lovers deserve only the finest. Riolls Jewels, established in Surat in 2008, has been crafting heirloom-quality luxury pieces for global clients. Our handcrafted diamond rings, gold necklaces, and bespoke engagement rings are now available with direct delivery to Dubai and the UAE.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {whyRiolls.map(f => (
              <div key={f.title} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>{f.icon}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem' }}>{f.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Highlight */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Our Collections</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Luxury jewellery favoured in Dubai
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Diamond Rings', href: '/shop?cat=rings', desc: 'Solitaires, halos, eternity bands' },
              { name: 'Gold Necklaces', href: '/shop?cat=necklaces', desc: 'Layering chains & statement pendants' },
              { name: 'Diamond Earrings', href: '/shop?cat=earrings', desc: 'Studs, drops & chandelier earrings' },
              { name: 'Bespoke Pieces', href: '/bespoke', desc: 'Fully custom, one-of-a-kind creations' },
            ].map(c => (
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

      {/* CTA */}
      <section style={{ background: '#1a0f00', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f5f0e8', fontWeight: 400, marginBottom: '1rem' }}>
          Experience luxury jewellery delivered to Dubai
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Contact our team for a private consultation or browse our full collection online. We ship worldwide with full insurance and tracking.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Request a Consultation
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
