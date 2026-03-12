import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Custom Engagement Ring Design — Bespoke Rings by Riolls Jewels',
  description: 'Design your perfect custom engagement ring with Riolls Jewels. Choose your diamond, metal, and setting — our master goldsmiths handcraft your bespoke ring in 8–12 weeks.',
  keywords: [
    'custom engagement ring design',
    'bespoke engagement ring',
    'design your own engagement ring',
    'custom diamond engagement ring',
    'handcrafted engagement rings',
    'unique engagement rings',
    'engagement ring USA Dubai',
  ],
  openGraph: {
    title: 'Custom Engagement Ring Design — Riolls Jewels',
    description: 'Design a bespoke engagement ring with master goldsmiths. GIA diamonds, hand-rendered designs, worldwide delivery.',
    url: 'https://riolls.com/custom-engagement-ring-design',
  },
  alternates: { canonical: 'https://riolls.com/custom-engagement-ring-design' },
};

const designSteps = [
  { step: '01', title: 'Share Your Vision', body: 'Tell us your style — vintage, modern, minimalist, or bold. Share inspiration images or simply describe your dream ring.' },
  { step: '02', title: 'Choose Your Diamond', body: 'Browse GIA-certified diamonds by shape, carat, cut, and clarity. Our gemologists help you find the perfect stone within your budget.' },
  { step: '03', title: 'Select Metal & Setting', body: 'Choose from 9k, 14k, 18k or 22k — in yellow, white, or rose gold. Select your setting: solitaire, halo, pavé, three-stone, or fully custom.' },
  { step: '04', title: 'Review HD 3D Renders', body: 'We produce detailed 3D renders so you can see exactly how your ring will look before crafting begins.' },
  { step: '05', title: 'Master Crafting Begins', body: 'Your ring is hand-forged by a single master goldsmith over 8–12 weeks of dedicated, unhurried craftsmanship.' },
  { step: '06', title: 'Delivered to You', body: 'Your engagement ring arrives in a luxury presentation box, fully insured, with certificate of authenticity. Ships worldwide.' },
];

const styles_data = [
  { name: 'Solitaire', desc: 'Timeless single-stone elegance' },
  { name: 'Halo', desc: 'A halo of diamonds for maximum brilliance' },
  { name: 'Three-Stone', desc: 'Past, present, and future symbolism' },
  { name: 'Pavé', desc: 'A glittering band of micro-set diamonds' },
  { name: 'Vintage', desc: 'Art Deco and antique-inspired filigree' },
  { name: 'Fully Custom', desc: 'Anything you can imagine, we can create' },
];

export default function CustomEngagementRingDesignPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Custom Engagement Ring Design — Riolls Jewels',
    url: 'https://riolls.com/custom-engagement-ring-design',
    description: 'Design your perfect custom engagement ring with Riolls Jewels master goldsmiths.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Custom Engagement Ring Design', item: 'https://riolls.com/custom-engagement-ring-design' },
      ],
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 60%, #2e1b24, #0d060a)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
      }}>
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem', display: 'block' }}>
          Ships to USA, Dubai & Worldwide
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Custom Engagement Ring Design — Bespoke Rings by Riolls Jewels
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          Your love story is unique. Your ring should be too. At Riolls Jewels, we design and handcraft custom engagement rings that are as individual as you are. From the diamond to the setting, every element is chosen by you and crafted by our masters.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/ai-studio/step-1" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Design with AI Studio ✦
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Bespoke Process →
          </Link>
        </div>
      </section>

      {/* Design Styles */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.8rem', display: 'block' }}>Ring Styles</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400 }}>
              Every style, every dream — custom crafted
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {styles_data.map(s => (
              <div key={s.name} style={{ border: '1px solid #e8e0d6', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>{s.name}</strong>
                <span style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Process */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.8rem', display: 'block' }}>The Design Journey</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400 }}>
              From idea to your finger in 6 steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem' }}>
            {designSteps.map(s => (
              <div key={s.step} style={{ background: '#fff', padding: '2rem', borderRadius: '2px' }}>
                <span style={{ display: 'block', fontFamily: 'Georgia,serif', fontSize: '2.5rem', color: '#e8d9c4', fontWeight: 400, marginBottom: '0.5rem' }}>{s.step}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{s.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Studio */}
      <section style={{ background: '#1a0f00', padding: '5rem 2rem', textAlign: 'center' }}>
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>Intelligent Craftsmanship</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f5f0e8', fontWeight: 400, marginBottom: '1rem' }}>
          Use our AI Studio to design your engagement ring
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Describe your perfect engagement ring to our AI Studio — it will generate a detailed design brief, including stone specifications, metalwork, and setting styles — ready for our goldsmiths to bring to life.
        </p>
        <Link href="/ai-studio/step-1" style={{
          background: '#c9a96e', color: '#1a0f00', padding: '0.9rem 2.5rem',
          textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
        }}>
          Begin Your Design ✦
        </Link>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1rem' }}>
          Start designing your custom engagement ring today
        </h2>
        <p style={{ color: '#6b5c4e', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
          Book a free private consultation with our gemologists and master goldsmiths. We serve clients in the USA, Dubai, UK, and worldwide.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: '#c9a96e', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Book a Free Consultation
          </Link>
          <Link href="/shop?cat=rings" style={{
            border: '1px solid #c9a96e', color: '#8a6a3e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Browse Engagement Rings →
          </Link>
        </div>
      </section>
    </>
  );
}
