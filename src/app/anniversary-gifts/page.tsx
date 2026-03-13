import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Anniversary Gifts — Luxury Jewellery for Every Milestone | Riolls',
  description: 'Mark every anniversary with fine jewellery from Riolls. Handcrafted diamond pendants, eternity rings, bracelets, and bespoke anniversary gifts. Free gift wrapping.',
  keywords: [
    'anniversary gifts',
    'anniversary gift',
    'anniversary jewellery',
    'anniversary jewelry',
    'diamond anniversary gift',
    'gold anniversary gift',
    'anniversary ring',
    'anniversary necklace',
    'luxury anniversary present',
    'personalised anniversary gift',
  ],
  openGraph: {
    title: 'Anniversary Gifts — Fine Jewellery by Riolls Jewels',
    description: 'Handcrafted diamond and gold jewellery for every anniversary milestone. Eternity rings, pendants, bracelets, and bespoke pieces.',
    url: 'https://riolls.com/anniversary-gifts',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Anniversary Gift Jewellery by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anniversary Gifts — Riolls Jewels',
    description: 'Handcrafted diamond and gold jewellery for every anniversary milestone.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/anniversary-gifts' },
};

const milestones = [
  { year: '1st', name: 'Paper / Gold', gift: 'Gold pendant or delicate chain' },
  { year: '5th', name: 'Wood / Sapphire', gift: 'Sapphire earrings or ring' },
  { year: '10th', name: 'Tin / Diamond', gift: 'Diamond eternity band' },
  { year: '15th', name: 'Crystal / Ruby', gift: 'Ruby necklace or bracelet' },
  { year: '25th', name: 'Silver Jubilee', gift: 'Diamond and silver set' },
  { year: '50th', name: 'Golden Jubilee', gift: 'Bespoke gold heirloom piece' },
];

const categories = [
  { name: 'Eternity Rings', href: '/shop?cat=rings&style=eternity', desc: 'Diamonds all the way around' },
  { name: 'Diamond Pendants', href: '/shop?cat=necklaces', desc: 'Timeless, wearable daily' },
  { name: 'Diamond Earrings', href: '/shop?cat=earrings', desc: 'Studs, drops & chandeliers' },
  { name: 'Tennis Bracelets', href: '/shop?cat=bracelets', desc: 'The ultimate anniversary gift' },
  { name: 'Charm Bracelets', href: '/shop?cat=bracelets&style=charm', desc: 'Add a charm each year' },
  { name: 'Bespoke Gift', href: '/bespoke', desc: 'Custom-made, one-of-a-kind' },
];

const weddingAnniversaryFaqs = [
  {
    q: 'What jewellery is traditional for a 10th wedding anniversary?',
    a: 'The 10th wedding anniversary is traditionally known as the diamond anniversary. A diamond eternity band is the most fitting jewellery gift — diamonds set continuously around the band symbolise unending love and perfectly honour the milestone. At Riolls, diamond eternity bands are available in 18k yellow, white, and rose gold, with full or half-eternity stone settings using GIA-certified diamonds.',
  },
  {
    q: 'What is a good jewellery gift for a first anniversary?',
    a: 'The first wedding anniversary is traditionally associated with gold, making gold jewellery the ideal gift. A delicate gold pendant, a gold chain, or a simple gold bangle are all wonderful choices for a first anniversary. At Riolls, first anniversary gold pieces are handcrafted in 18k yellow, white, or rose gold — a lasting and meaningful way to mark the beginning of a shared lifetime.',
  },
  {
    q: 'What jewellery should I buy for a 25th silver wedding anniversary?',
    a: 'The 25th wedding anniversary — the silver jubilee — is traditionally celebrated with silver. The most elegant jewellery approach is to combine silver and diamonds: a diamond-set piece in white gold or platinum captures the silver palette with the brilliance of fine gemstones. Consider a diamond tennis bracelet, a pavé diamond band, or a white gold and diamond pendant as a gift that honours 25 years with the sparkle they deserve.',
  },
  {
    q: 'What is the most romantic anniversary jewellery gift?',
    a: 'The most romantic anniversary jewellery gifts are personalised pieces that carry a specific meaning unique to the couple — an engraved date, initials, or a meaningful symbol. Eternity rings represent unending love; solitaire pendants with a significant gemstone honour a birthstone or shared memory; and fully bespoke commissions allow a story to be woven permanently into precious metal. At Riolls, bespoke anniversary pieces can incorporate engravings, specific gemstones, and design details chosen entirely by the giver.',
  },
  {
    q: 'How far in advance should I order custom anniversary jewellery?',
    a: 'For a fully bespoke anniversary jewellery commission at Riolls — a custom-designed piece built entirely around your vision — allow at least 12 weeks from consultation to delivery. This covers the design, approval, and handcrafting stages. For ready-made Riolls pieces that require sizing, engraving, or minor personalisation, allow 4 to 6 weeks. To avoid disappointment around important anniversary dates, booking your consultation 3 to 4 months in advance is strongly recommended.',
  },
];

export default function AnniversaryGiftsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Anniversary Gifts — Riolls Jewels',
    url: 'https://riolls.com/anniversary-gifts',
    description: 'Handcrafted diamond and gold jewellery gifts for every wedding anniversary milestone.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Anniversary Gifts', item: 'https://riolls.com/anniversary-gifts' },
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
    mainEntity: weddingAnniversaryFaqs.map(f => ({
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
        background: 'radial-gradient(ellipse at 50% 50%, #1a1208, #0a0500)',
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
          Celebrate Every Milestone
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Anniversary Gifts — Fine Jewellery to Mark Your Journey Together
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          From a first anniversary pendant to a golden jubilee heirloom, Riolls crafts jewellery gifts that carry the full weight of your shared story — and grow more precious with every passing year.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Shop Anniversary Gifts
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Create a Bespoke Gift
          </Link>
        </div>
      </section>

      {/* Milestones */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Anniversary Guide</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            The perfect gift for every year
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem', textAlign: 'left' }}>
            {milestones.map(m => (
              <div key={m.year} style={{ background: '#faf7f3', padding: '1.75rem 1.5rem', borderRadius: '2px', borderLeft: '3px solid #c9a96e' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c9a96e', display: 'block', marginBottom: '0.3rem' }}>{m.year}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{m.name}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{m.gift}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Gift Categories</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Discover anniversary jewellery
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {categories.map(c => (
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
              Everything you need to know about anniversary jewellery gifts
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {weddingAnniversaryFaqs.map((f, i) => (
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
          Need help choosing the perfect anniversary gift?
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Our jewellery consultants will help you select or design a piece that perfectly reflects the milestone you are celebrating.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Book a Gift Consultation
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
