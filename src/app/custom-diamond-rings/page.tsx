import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Custom Diamond Rings USA — Bespoke Handcrafted Diamond Rings',
  description: 'Shop custom diamond rings in the USA from Riolls Jewels. Handcrafted bespoke diamond engagement rings, solitaires & eternity bands. Ships fast across the United States.',
  keywords: [
    'custom diamond rings USA',
    'bespoke diamond rings USA',
    'handcrafted engagement rings USA',
    'custom diamond engagement ring',
    'buy diamond ring online USA',
    'luxury diamond rings',
  ],
  openGraph: {
    title: 'Custom Diamond Rings USA — Riolls Jewels',
    description: 'Handcrafted bespoke diamond rings shipped across the USA. Custom designs, conflict-free diamonds, master craftsmanship.',
    url: 'https://riolls.com/custom-diamond-rings',
  },
  alternates: { canonical: 'https://riolls.com/custom-diamond-rings' },
};

const steps = [
  {
    icon: '💬',
    title: 'Consultation',
    body: 'Tell us your vision — stone shape, carat, metal, and setting style. Our gemologists guide you at every step.',
  },
  {
    icon: '✏️',
    title: 'Design & Rendering',
    body: 'We create HD 3D renders so you can visualise your diamond ring before a single grain of gold is melted.',
  },
  {
    icon: '💎',
    title: 'Diamond Selection',
    body: 'Choose from GIA-certified round, princess, pear, oval, and cushion cut diamonds — all conflict-free.',
  },
  {
    icon: '🔨',
    title: 'Master Crafting',
    body: 'Our master goldsmiths handcraft your ring over 6–10 weeks using time-honoured techniques.',
  },
  {
    icon: '📦',
    title: 'USA Delivery',
    body: 'Insured, tracked shipping straight to your door anywhere in the United States.',
  },
];

export default function CustomDiamondRingsUSAPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Custom Diamond Rings USA — Riolls Jewels',
    url: 'https://riolls.com/custom-diamond-rings',
    description: 'Handcrafted bespoke custom diamond rings for customers across the United States.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'Custom Diamond Rings USA', item: 'https://riolls.com/custom-diamond-rings' },
      ],
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse at 60% 40%, #2c1e0e, #0f0a05)',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
        position: 'relative',
      }}>
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold,#c9a96e)', marginBottom: '1.2rem', display: 'block' }}>
          Ships Across the United States
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', fontWeight: 400, lineHeight: 1.2, maxWidth: '820px', margin: '0 0 1.5rem' }}>
          Custom Diamond Rings in the USA — Handcrafted by Master Goldsmiths
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '620px', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          At Riolls Jewels, we design and handcraft bespoke diamond rings to your exact specifications. Whether you're looking for a classic solitaire engagement ring, a dazzling halo, or a unique custom design — our master craftsmen bring your vision to life and deliver it directly to you across the USA.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/bespoke" style={{
            background: 'var(--gold,#c9a96e)', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Start Your Custom Ring
          </Link>
          <Link href="/shop?cat=rings" style={{
            border: '1px solid rgba(201,169,110,0.45)', color: '#c9a96e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Browse Diamond Rings
          </Link>
        </div>
      </section>

      {/* Why Riolls */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold,#c9a96e)', marginBottom: '1rem', display: 'block' }}>Why Choose Riolls</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1rem' }}>
            The finest custom diamond rings, delivered to your door in the USA
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto 3rem' }}>
            Since 2008, Riolls Jewels has crafted luxury diamond rings for clients worldwide. Every ring is 100% handmade using GIA-certified, conflict-free diamonds and ethically sourced gold — with full transparency at every step.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem', textAlign: 'left' }}>
            {[
              { label: 'GIA-Certified Diamonds', desc: 'Every stone is independently graded for cut, colour, clarity and carat.' },
              { label: 'Conflict-Free', desc: 'We source only ethically mined, Kimberley Process certified diamonds.' },
              { label: 'Bespoke Design', desc: 'Every ring is unique — designed around your vision, not a template.' },
              { label: 'USA Shipping', desc: 'Fully insured, tracked express delivery across the United States.' },
            ].map(f => (
              <div key={f.label} style={{ borderLeft: '2px solid #c9a96e', paddingLeft: '1.2rem' }}>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.4rem' }}>{f.label}</strong>
                <span style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold,#c9a96e)', marginBottom: '0.8rem', display: 'block' }}>How It Works</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: '#2a1e10', fontWeight: 400 }}>
              Your custom diamond ring in 5 steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#faf7f3', padding: '2rem 1.5rem', borderRadius: '2px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>{s.icon}</span>
                <strong style={{ color: '#2a1e10', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{s.title}</strong>
                <p style={{ color: '#6b5c4e', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Studio */}
      <section style={{ background: '#1a0f00', padding: '5rem 2rem', textAlign: 'center' }}>
        <span style={{ letterSpacing: '0.18em', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold,#c9a96e)', marginBottom: '1rem', display: 'block' }}>Intelligent Design</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f5f0e8', fontWeight: 400, marginBottom: '1rem' }}>
          Design your custom diamond ring with AI
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.7)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Use our AI Studio to describe your dream diamond ring and receive a detailed design brief — ready for our goldsmiths to bring life. Available anywhere in the USA.
        </p>
        <Link href="/ai-studio/step-1" style={{
          background: 'var(--gold,#c9a96e)', color: '#1a0f00', padding: '0.9rem 2.5rem',
          textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
        }}>
          Try the AI Studio ✦
        </Link>
      </section>

      {/* CTA */}
      <section style={{ background: '#faf7f3', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2a1e10', fontWeight: 400, marginBottom: '1rem' }}>
          Ready to commission your custom diamond ring?
        </h2>
        <p style={{ color: '#6b5c4e', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
          Contact our team for a free private consultation. We serve clients across the USA and ship worldwide.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{
            background: 'var(--gold,#c9a96e)', color: '#1a0f00', padding: '0.85rem 2.2rem',
            textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Request a Consultation
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid #c9a96e', color: '#8a6a3e', padding: '0.85rem 2.2rem',
            textDecoration: 'none', letterSpacing: '0.08em', fontSize: '0.85rem',
          }}>
            Learn About Bespoke →
          </Link>
        </div>
      </section>
    </>
  );
}
