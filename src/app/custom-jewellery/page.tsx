import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Custom Jewellery — Design Your Own Piece | Riolls Jewels',
  description: 'Create completely custom jewellery with Riolls Jewels. Design your own ring, necklace, or bracelet from scratch — your metal, your gemstone, your vision. Handcrafted in Surat.',
  keywords: [
    'custom jewellery',
    'customize jewellery',
    'custom jewelry',
    'personalised jewellery',
    'design your own jewellery',
    'custom gold ring',
    'custom diamond necklace',
    'custom engagement ring',
    'bespoke jewellery',
    'made to order jewellery',
  ],
  openGraph: {
    title: 'Custom Jewellery — Design Your Own | Riolls Jewels',
    description: 'Design completely custom jewellery with Riolls — your metal, your gemstone, your vision. Handcrafted in Surat and delivered worldwide.',
    url: 'https://riolls.com/custom-jewellery',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Custom Jewellery by Riolls Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Jewellery — Design Your Own | Riolls Jewels',
    description: 'Design your own jewellery from scratch. Your metal, your gemstone, your vision — handcrafted in Surat.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/custom-jewellery' },
};

const process = [
  { step: '01', title: 'Share Your Vision', body: 'Tell us your idea — a sketch, a photo, a feeling, or simply a word. We start every custom piece with a conversation, not a catalogue.' },
  { step: '02', title: 'Design & Refine', body: 'Our designers produce detailed sketches and photorealistic 3D renders. You review and refine until every detail is exactly right.' },
  { step: '03', title: 'Choose Your Materials', body: 'Select your metal (yellow, white, or rose gold), stone (diamond, sapphire, emerald, or any gem), and setting style.' },
  { step: '04', title: 'Master Crafting', body: 'Your piece is hand-fabricated by a single master goldsmith over 8–12 weeks — unhurried, uncompromising, and made entirely for you.' },
];

const customOptions = [
  { name: 'Custom Rings', href: '/shop?cat=rings', desc: 'Engagement, wedding, or cocktail' },
  { name: 'Custom Necklaces', href: '/shop?cat=necklaces', desc: 'Pendants, lockets & chains' },
  { name: 'Custom Earrings', href: '/shop?cat=earrings', desc: 'Studs, drops & statement pieces' },
  { name: 'Custom Bracelets', href: '/shop?cat=bracelets', desc: 'Tennis, bangles & cuffs' },
  { name: 'Full Bespoke', href: '/bespoke', desc: 'Completely original from scratch' },
  { name: 'Remodelling', href: '/contact', desc: 'Transform heirloom pieces' },
];

const customJewelleryFaqs = [
  {
    q: 'How do I design custom jewellery?',
    a: 'Designing custom jewellery starts with a brief: describe your idea using a sketch, a reference photo, or even just words that capture the feeling you want. Share your brief with a jeweller, review the design concepts they produce (sketches or 3D renders), give your feedback, approve the final design, and then wait while it is handcrafted. At Riolls, this process is guided by a dedicated concierge team from first message to final delivery. You can also begin the design process entirely online using Riolls AI Studio, which generates photorealistic concepts from your text description before any human design work begins.',
  },
  {
    q: 'How long does custom jewellery take to make?',
    a: 'At Riolls, a fully bespoke custom jewellery commission takes 8 to 12 weeks from design approval to delivery. This covers the complete handcrafting process: metal fabrication, stone setting, engraving, polishing, hallmarking, and quality inspection — all performed by a single dedicated master goldsmith. Simpler customisations such as engraving, resizing, or a metal colour change on an existing design take 4 to 6 weeks. The timeline begins from the point of design approval, not the initial enquiry.',
  },
  {
    q: 'Is custom jewellery more expensive than ready-made?',
    a: 'Custom jewellery costs more than ready-made jewellery due to the design labour, the small-batch or single-unit production, and the time invested by a skilled craftsperson. However, custom pieces eliminate the retail markup applied to mass-produced jewellery, meaning the additional cost is in genuine craft rather than brand premium. For unique pieces — an engagement ring, a meaningful anniversary gift, or a family heirloom — the incomparable sentimental and artistic value of a custom commission makes it the better investment in every meaningful sense.',
  },
  {
    q: 'Can I design jewellery online without visiting a jeweller?',
    a: 'Yes. With Riolls AI Studio at riolls.com/ai-studio, the entire design process can happen online without ever visiting the atelier. You describe your dream piece in plain words, answer a short style questionnaire, and receive three photorealistic AI-generated design concepts. From there, you customise every detail — metal colour, stone type and cut, finish, and engraving — and submit a quote request directly to the Riolls concierge team, who respond within 48 hours. The physical jewellery is then handcrafted in Surat and delivered worldwide with full insurance.',
  },
];

export default function CustomJewelleryPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Jewellery Design — Riolls Jewels',
    url: 'https://riolls.com/custom-jewellery',
    description: 'Bespoke and custom jewellery design service. Design your own ring, necklace, or bracelet, handcrafted in Surat by master goldsmiths.',
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
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Custom Jewellery', item: 'https://riolls.com/custom-jewellery' },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: customJewelleryFaqs.map(f => ({
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
        background: 'radial-gradient(ellipse at 70% 30%, #1a1208, #0a0500)',
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
          Your Vision · Our Craft · One-of-a-Kind
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Custom Jewellery — Designed by You, Crafted by Masters
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '640px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          No two people are alike — why should their jewellery be? Riolls offers a full custom jewellery design service, from a simple personalisation to a completely original creation. Your idea, realised in precious metal and gemstones.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/bespoke" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Start a Custom Commission
          </Link>
          <Link href="/contact" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Request a Consultation
          </Link>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>How It Works</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            From idea to finished jewel in 4 steps
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {process.map(s => (
              <div key={s.step} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c9a96e', display: 'block', marginBottom: '0.6rem' }}>{s.step}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem' }}>{s.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Options */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Custom Options</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '3rem' }}>
            Customise any type of jewellery
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {customOptions.map(c => (
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
              Everything you need to know about custom jewellery
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {customJewelleryFaqs.map((f, i) => (
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
          Ready to design something unique?
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Get started with a free consultation — in person at our Surat atelier or virtually via video call. No obligation, no pressure.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Book a Free Consultation
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
