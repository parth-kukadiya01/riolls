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
    images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'Luxury Jewelry Dubai — Riolls Jewels' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Jewelry Dubai — Riolls Jewels',
    description: 'Handcrafted luxury diamond jewellery delivered to Dubai and across the UAE. Bespoke engagement rings, fine gold jewellery.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
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

      {/* Dubai Gold Heritage */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block', textAlign: 'center' }}>Gold Capital of the World</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1.5rem', textAlign: 'center' }}>
            Why Dubai's finest choose handcrafted over high-street
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.9, marginBottom: '1.2rem' }}>
            Dubai has long been synonymous with gold — the Dubai Gold Souk in Deira is the world's largest gold market, and the city's appetite for fine jewellery is unmatched anywhere on earth. Yet the most discerning buyers in the UAE increasingly seek what mass-market retailers cannot offer: a piece created entirely by a single craftsman's hands, from raw gold to finished heirloom.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.9, marginBottom: '1.2rem' }}>
            Riolls Jewels was founded in Surat, Gujarat — the city that cuts and polishes over 90% of the world's diamonds. Every piece is 100% handmade by a single master goldsmith. No casting machines, no assembly lines. The result is a jewel with visible humanity: slight variations in hand-engraving, the warmth of hand-burnished metal, a weight and presence that machine-made pieces simply cannot replicate.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.9 }}>
            For UAE clients, this matters. Jewellery in Dubai is not merely decorative — it is an expression of status, heritage, and occasion. A Riolls piece carries a certificate of authenticity, full hallmarking, and the story of its maker. That provenance is the difference between a purchase and a legacy.
          </p>
        </div>
      </section>

      {/* UAE Delivery & Shipping */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block', textAlign: 'center' }}>Delivery to the UAE</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '2rem', textAlign: 'center' }}>
            Secure, insured delivery across Dubai and the UAE
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2rem' }}>
            {[
              { title: 'Fully Insured Transit', body: 'Every shipment to Dubai and the UAE is fully insured for its declared value throughout transit — from our atelier door to yours.' },
              { title: 'Tracked End-to-End', body: 'Real-time tracking at every stage. You receive a tracking number the moment your piece leaves Surat, with delivery confirmation on arrival.' },
              { title: 'Discreet Packaging', body: 'Pieces are shipped in unmarked outer packaging for security. Inside, your jewel arrives in Riolls signature presentation packaging with a certificate of authenticity.' },
              { title: 'UAE Customs Handled', body: 'We manage all export documentation from India. UAE import duties on fine jewellery are the recipient\'s responsibility — our team advises on current AED customs thresholds before dispatch.' },
            ].map(item => (
              <div key={item.title} style={{ borderTop: '1px solid #e8ddd2', paddingTop: '1.5rem' }}>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{item.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai FAQ */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block', textAlign: 'center' }}>Questions from UAE Clients</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '2.5rem', textAlign: 'center' }}>
            Frequently asked by Dubai & UAE buyers
          </h2>
          {[
            {
              q: 'How long does delivery to Dubai take?',
              a: 'Standard delivery to Dubai and across the UAE takes 5–9 business days from dispatch. Express options (3–4 business days) are available on request. Bespoke commission delivery timelines are discussed individually after design approval.',
            },
            {
              q: 'Do you accept AED payments?',
              a: 'We accept payment in USD, GBP, INR, and AED via international bank transfer or card. Prices are quoted in INR by default; our team provides an AED equivalent at the current exchange rate before checkout.',
            },
            {
              q: 'Can I commission a bespoke piece from Dubai?',
              a: 'Absolutely. Bespoke consultations are conducted via private video call. UAE clients regularly commission engagement rings, wedding bands, and anniversary gifts through our virtual consultation service. The full process — from initial discussion to delivery — is handled remotely with no need to travel.',
            },
            {
              q: 'Is the gold hallmarked to UAE standards?',
              a: 'All Riolls pieces carry BIS hallmarking (India\'s Bureau of Indian Standards, equivalent to international hallmarking standards) and arrive with a certificate of authenticity. UAE buyers may optionally request an independent assay from a Dubai-based laboratory upon receipt.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid #e8ddd2', paddingBottom: '1.8rem', marginBottom: '1.8rem' }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: '#2a1e10', fontWeight: 400, marginBottom: '0.7rem' }}>{q}</h3>
              <p style={{ color: '#6b5c4e', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{a}</p>
            </div>
          ))}
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
