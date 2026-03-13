import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Engagement Rings — Handcrafted Diamond Rings by Riolls',
  description: 'Find the perfect engagement ring at Riolls Jewels. GIA-certified diamonds, handcrafted solitaires, halo rings and bespoke engagement rings crafted in Surat. Free consultation.',
  keywords: [
    'engagement rings',
    'engagement ring',
    'diamond engagement ring',
    'solitaire engagement ring',
    'halo engagement ring',
    'bespoke engagement ring',
    'custom engagement ring',
    'handcrafted engagement ring',
    'gold engagement ring',
    'GIA certified diamond ring',
  ],
  openGraph: {
    title: 'Engagement Rings — Handcrafted by Riolls Jewels',
    description: 'GIA-certified diamond engagement rings, handcrafted in Surat. Solitaires, halos, and fully bespoke commissions. Delivered worldwide.',
    url: 'https://riolls.com/engagement-rings',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Engagement Rings by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engagement Rings — Riolls Jewels',
    description: 'GIA-certified diamond engagement rings, handcrafted in Surat. Solitaires, halos, and bespoke commissions.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/engagement-rings' },
};

const features = [
  { icon: '💎', title: 'GIA-Certified Diamonds', body: 'Every diamond is independently certified by GIA, IGI, or SGL for cut, colour, clarity, and carat weight.' },
  { icon: '🔨', title: '100% Handcrafted', body: 'Each ring is shaped by a single master goldsmith from raw precious metal — never cast from a mould.' },
  { icon: '✍️', title: 'Bespoke Option', body: 'Don\'t see what you\'re looking for? Commission a completely custom ring designed around your vision.' },
  { icon: '🌍', title: 'Worldwide Delivery', body: 'Fully insured, tracked delivery to India, Dubai, UK, USA, and worldwide.' },
];

const styles = [
  { name: 'Solitaire', href: '/shop?cat=rings&style=solitaire', desc: 'Timeless single-stone elegance' },
  { name: 'Halo', href: '/shop?cat=rings&style=halo', desc: 'Centre stone surrounded by brilliance' },
  { name: 'Three Stone', href: '/shop?cat=rings&style=three-stone', desc: 'Past, present, and future' },
  { name: 'Eternity Band', href: '/shop?cat=rings&style=eternity', desc: 'Diamonds all the way around' },
  { name: 'Vintage', href: '/shop?cat=rings&style=vintage', desc: 'Intricate milgrain & filigree details' },
  { name: 'Bespoke', href: '/bespoke', desc: 'Fully custom — your vision, our craft' },
];

export default function EngagementRingsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engagement Rings — Riolls Jewels',
    url: 'https://riolls.com/engagement-rings',
    description: 'GIA-certified diamond engagement rings, handcrafted in Surat by master goldsmiths.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Engagement Rings', item: 'https://riolls.com/engagement-rings' },
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are Riolls engagement ring diamonds GIA certified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every diamond at Riolls Jewels comes with an independent certificate from GIA, IGI, or SGL, confirming its cut, colour, clarity, and carat weight.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I design a custom engagement ring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Our bespoke commission service lets you create a fully custom engagement ring from scratch — we handle sketching, 3D rendering, stone selection, and handcrafting over 8–12 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a bespoke engagement ring take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bespoke engagement rings at Riolls typically take 8 to 12 weeks from consultation to delivery, ensuring unhurried perfection at every stage.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />

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
      }}>
        <span style={{ display: 'block', width: '50px', height: '1px', background: '#c9a96e', margin: '0 auto 1.5rem' }} />
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem', display: 'block' }}>
          GIA-Certified Diamonds · Handcrafted in Surat
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Engagement Rings — Crafted for Your Forever Moment
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          From classic solitaires to intricate halos and fully bespoke creations — every Riolls engagement ring is handcrafted by a single master goldsmith and set with a GIA-certified diamond chosen for maximum brilliance.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop?cat=rings" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Shop Engagement Rings
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Design a Bespoke Ring
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Why Riolls</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Every ring, a promise of perfection
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

      {/* Styles Grid */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Ring Styles</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Find your perfect style
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {styles.map(s => (
              <Link key={s.name} href={s.href} style={{
                display: 'block', background: '#2a1e10', padding: '2rem 1.5rem',
                textDecoration: 'none', color: '#f5f0e8', textAlign: 'center',
              }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>{s.name}</strong>
                <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem' }}>{s.desc}</span>
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
            What makes a Riolls engagement ring different?
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            At Riolls, every engagement ring begins not with a catalogue, but with a conversation. Whether you choose a piece from our collection or commission something entirely original, our master goldsmiths invest the same level of devotion — shaping, hand-setting, and finishing each ring as if it were their own.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            We source only GIA, IGI, and SGL certified diamonds — stones graded for brilliance, fire, and scintillation, not just statistics. Our 18k gold settings are precision-crafted to hold each diamond securely while maximising light performance from every angle.
          </p>
          <p style={{ color: '#6b5c4e', lineHeight: 1.85 }}>
            The result is a ring that will be examined at close quarters for a lifetime — and will bear that scrutiny with quiet confidence.
          </p>
        </div>
      </section>

      {/* GEO: Inline Q&A — factual answers for AI Overview extraction */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
            Questions Answered
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '2.5rem' }}>
            Everything you need to know before buying an engagement ring
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#2a1e10', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5rem' }}>
              What is the best metal for an engagement ring?
            </p>
            <p style={{ color: '#6b5c4e', lineHeight: 1.85, margin: 0 }}>
              18k white gold and 18k yellow gold are the most popular choices for engagement rings. 18k gold (75% pure gold) offers the ideal balance of durability and purity — hard enough to hold a diamond securely through daily wear, while rich enough in colour to last a lifetime without fading. Platinum is the most durable option but carries a higher price premium. Rose gold has become increasingly popular for its warm, romantic tone. At Riolls, all engagement rings are available in 18k yellow, white, and rose gold, as well as platinum on bespoke commissions.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#2a1e10', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5rem' }}>
              How do I choose the right engagement ring size?
            </p>
            <p style={{ color: '#6b5c4e', lineHeight: 1.85, margin: 0 }}>
              The most accurate way to find a ring size is to visit a jeweller for a professional sizing. If you are buying as a surprise, the average UK ring size for women is approximately L–M (US size 6–6.5). Fingers are slightly larger in the evening and in warm weather, so it is best to measure at the end of the day. All Riolls engagement rings can be resized within reason after purchase at no charge within the first 60 days. Our detailed size guide is available at riolls.com/size-guide with printable ring-sizer templates for UK, US, EU, and Indian sizes.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#2a1e10', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5rem' }}>
              What is the difference between a solitaire and a halo engagement ring?
            </p>
            <p style={{ color: '#6b5c4e', lineHeight: 1.85, margin: 0 }}>
              A solitaire engagement ring features a single centre diamond held by a simple claw or bezel setting — the purest, most classic engagement ring style, designed to let the diamond speak for itself. A halo engagement ring surrounds the centre stone with a frame of smaller accent diamonds, which increases the apparent size of the centre stone and adds additional sparkle. Solitaires are timeless and understated; halos are glamorous and visually impactful. Both styles are available at Riolls in GIA-certified diamond options and fully customisable metal and claw configurations.
            </p>
          </div>

          <div>
            <p style={{ color: '#2a1e10', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.5rem' }}>
              How much should I spend on an engagement ring?
            </p>
            <p style={{ color: '#6b5c4e', lineHeight: 1.85, margin: 0 }}>
              The traditional guideline of "two months' salary" is a marketing invention — the right budget is whatever feels comfortable for your financial situation. In India, engagement rings commonly range from ₹50,000 to ₹5,00,000 and above for fine handcrafted pieces. The most important factor is not total spend but how the budget is allocated: prioritising cut quality over carat weight produces a more brilliant ring at the same price point. At Riolls, we offer a free private consultation to help you understand exactly what is achievable within your budget before you commit to anything.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a0f00', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f5f0e8', fontWeight: 400, marginBottom: '1rem' }}>
          Begin your engagement ring journey
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Book a private consultation — in person at our Surat atelier or virtually — and let us help you find or create the ring that will define a lifetime.
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
