import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Jewellery Designer — Design Your Own Jewellery with AI | Riolls',
  description: 'Riolls AI Studio: describe your dream jewellery in words, receive 3 photorealistic AI-generated designs, and have your chosen piece handcrafted in gold by master goldsmiths in Surat. No design experience needed.',
  keywords: [
    'AI jewellery design',
    'AI jewelry designer',
    'design your own jewelry AI',
    'AI ring designer',
    'custom jewelry AI',
    'AI bespoke jewelry',
    'AI engagement ring designer',
    'design engagement ring with AI',
    'AI jewelry design tool',
    'photorealistic jewelry design AI',
    'AI generated jewelry design',
    'AI jewelry maker',
    'create your own ring design online',
    'AI custom jewellery studio',
    'handcrafted AI jewelry',
    'AI jewelry design then handmade',
    'custom iced out jewelry AI',
    'AI pendant designer',
    'describe your dream ring AI',
    'AI jewelry India',
  ],
  openGraph: {
    title: 'Riolls AI Studio — Design Your Own Jewellery with AI',
    description: 'Describe your dream jewellery. Our AI generates 3 photorealistic concepts. Your chosen design is then handcrafted in real gold by master goldsmiths in Surat, India.',
    url: 'https://riolls.com/ai-studio',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Riolls AI Studio — AI Jewellery Design Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riolls AI Studio — Design Your Own Jewellery with AI',
    description: 'Describe your dream jewellery. AI generates 3 photorealistic designs. Handcrafted in gold by master goldsmiths in Surat.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  alternates: { canonical: 'https://riolls.com/ai-studio' },
};

const steps = [
  {
    n: '01',
    title: 'Share Your Style',
    body: 'Answer a few gentle questions — what you want to make, the occasion, your preferred metal, your aesthetic. There are no wrong answers. We simply want to understand who you are.',
    detail: 'Takes 2 minutes · No design knowledge needed',
  },
  {
    n: '02',
    title: 'Describe Your Vision',
    body: 'Using our guided design builder, describe your piece in words. Choose style tokens, upload a reference image if you have one, and add any personal details — an inscription, a specific gemstone, a memory you want woven in.',
    detail: 'Fully open-ended · Reference images welcome',
  },
  {
    n: '03',
    title: 'Receive Three AI Designs',
    body: 'Our AI generates three distinct, photorealistic design concepts based entirely on your words and preferences. Each one is different — different compositions, different details. Take your time. Choose the one that moves you.',
    detail: '3 photorealistic concepts · Revisions available',
  },
  {
    n: '04',
    title: 'Refine Every Detail',
    body: 'Customise your chosen design: the metal colour, the stone cut, the finish, the engraving. For custom chains and iced-out pieces, specify ice level, weight, and length. Each choice is yours to make.',
    detail: 'Metal · Stone · Finish · Engraving',
  },
  {
    n: '05',
    title: 'We Craft It in Gold',
    body: 'Your design is handed to a master goldsmith at our Surat atelier. Over 8 to 12 weeks — sometimes more, never less than it needs — your piece is shaped, set, and polished entirely by hand. Then it comes home to you.',
    detail: 'Handcrafted in Surat · 8–12 weeks · Worldwide delivery',
  },
];

const categories = [
  { name: 'Engagement Rings', icon: '💍', desc: 'Design the ring that begins your forever — solitaire, halo, vintage, or entirely new.', href: '/ai-studio/step-1' },
  { name: 'Wedding Bands', icon: '✨', desc: 'A band that will be worn every day of your shared life deserves to be perfectly yours.', href: '/ai-studio/step-1' },
  { name: 'Necklaces & Pendants', icon: '🌙', desc: 'Something worn close to the heart. A name, a shape, a symbol, a memory.', href: '/ai-studio/step-1' },
  { name: 'Earrings', icon: '🔸', desc: 'Statement pieces or whisper-fine studs — whatever your style calls for.', href: '/ai-studio/step-1' },
  { name: 'Bracelets & Bangles', icon: '⭕', desc: 'A piece for the wrist you reach for first each morning.', href: '/ai-studio/step-1' },
  { name: 'Hip Hop & Iced Out', icon: '🔷', desc: 'Custom chains, pendants, and fully iced-out pieces with VVS-grade stones. Your drip, your design.', href: '/ai-studio/step-1' },
];

const trust = [
  { label: 'Est.', value: '2008', sub: 'Surat, India' },
  { label: 'Certifications', value: 'GIA · IGI · SGL', sub: 'Certified diamonds' },
  { label: 'Craftsmanship', value: '100%', sub: 'Handmade by master goldsmiths' },
  { label: 'Response time', value: '48 hrs', sub: 'Personalised quote' },
];

const faqs = [
  {
    q: 'What is Riolls AI Studio?',
    a: 'Riolls AI Studio is an AI-powered jewellery design tool at riolls.com/ai-studio that lets anyone design their own fine jewellery without any design experience. Users describe their dream piece in plain words, answer a short style questionnaire, and receive three photorealistic AI-generated design concepts. The chosen design is then handcrafted in real gold by a master goldsmith at the Riolls atelier in Surat, India — the Diamond Capital of the World. It is free to design; costs apply only if you choose to have your piece physically made. Riolls AI Studio supports engagement rings, wedding bands, necklaces, earrings, bracelets, and custom hip-hop/iced-out jewellery.',
  },
  {
    q: 'Do I need any design experience to use Riolls AI Studio?',
    a: 'None at all. Riolls AI Studio is built for people who know what they want but don\'t know how to draw it. You describe your vision in plain language — the AI does the design work. If you can imagine it, we can begin crafting it.',
  },
  {
    q: 'Is AI-designed jewellery real jewellery?',
    a: 'Yes. The AI generates the design concept — a precise visual interpretation of your preferences. After that, everything is real: real 18k gold, real GIA/IGI/SGL certified diamonds, and real craftsmanship by a master goldsmith in our Surat atelier. AI designs the idea; human hands bring it to life.',
  },
  {
    q: 'How accurate are the AI-generated designs to the final piece?',
    a: 'The AI-generated concepts are photorealistic representations of your design direction. Your dedicated goldsmith uses these as the creative brief — working with you via our concierge team to translate the concept into a physically achievable masterpiece. Minor adaptations may occur during fabrication to ensure structural integrity and wearability.',
  },
  {
    q: 'Can I use AI to design an engagement ring?',
    a: 'Absolutely — and it is one of the most meaningful ways to use this tool. Instead of choosing from what already exists, you design a ring that has never existed before. Describe the occasion, the person, the feeling, and the AI will offer three concepts that bring your words to life. Our goldsmiths then craft it with the care that such a ring deserves.',
  },
  {
    q: 'How long does it take to get an AI-designed piece made?',
    a: 'Once you submit your quote request and approve the final specifications with our concierge team, your piece takes 8 to 12 weeks to handcraft. Rush commissions may be accommodated depending on complexity — please discuss at the consultation stage.',
  },
  {
    q: 'Can I design hip-hop and iced-out jewellery using AI Studio?',
    a: 'Yes. Riolls AI Studio has a dedicated Hip Hop & Iced Out design pathway, covering custom pendants, Cuban link chains, iced-out rings, and fully custom grillz. You choose the ice level, chain weight, pendant style, and metal — the AI generates your custom concept.',
  },
  {
    q: 'What happens if I don\'t like any of the three AI designs?',
    a: 'You can request variations with revision notes — tell us exactly what to adjust, and the AI generates new concepts incorporating your feedback. Our goal is for you to feel genuine excitement about the design before we ask any goldsmith to pick up their tools.',
  },
  {
    q: 'Who makes the jewellery after the AI designs it?',
    a: 'Your piece is made entirely by hand by a single master goldsmith at our atelier in Surat, Gujarat — the diamond capital of the world, home to the highest concentration of skilled jewellery craftspeople anywhere on earth. One piece. One goldsmith. Beginning to end.',
  },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Design Jewellery Using Riolls AI Studio',
  description: 'A step-by-step guide to designing and commissioning custom jewellery using the Riolls AI Studio — from describing your vision to receiving a handcrafted piece in gold.',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

export default function AIStudioPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Riolls AI Studio — AI Jewellery Design Tool',
    url: 'https://riolls.com/ai-studio',
    description: 'AI-powered jewellery design tool. Describe your dream piece, receive 3 photorealistic concepts, have it handcrafted in gold by master goldsmiths in Surat, India.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
        { '@type': 'ListItem', position: 2, name: 'AI Studio', item: 'https://riolls.com/ai-studio' },
      ],
    },
    provider: { '@id': 'https://riolls.com/#organization' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Riolls AI Studio',
    applicationCategory: 'DesignApplication',
    url: 'https://riolls.com/ai-studio',
    description: 'AI-powered custom jewellery design tool. Generate photorealistic design concepts from text descriptions, then have your chosen design handcrafted by master goldsmiths.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to use — costs apply for physical jewellery production.',
    },
    creator: { '@id': 'https://riolls.com/#organization' },
    operatingSystem: 'Web browser',
    featureList: [
      'AI-generated photorealistic jewellery design concepts',
      'Guided style questionnaire',
      'Supports rings, necklaces, earrings, bracelets, and hip-hop jewellery',
      'Metal, stone, and finish customisation',
      'Revision requests',
      'Quote request and goldsmith matching',
    ],
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={howToSchema} />

      {/* ── Hero ── */}
      <section style={{
        background: 'radial-gradient(ellipse at 35% 65%, #2a1a08, #0a0500 70%)',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative rings */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(700px, 90vw)', height: 'min(700px, 90vw)',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.06)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 70vw)', height: 'min(500px, 70vw)',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.10)',
          pointerEvents: 'none',
        }} />

        <span style={{ display: 'block', width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 1.5rem' }} />
        <span style={{ letterSpacing: '0.22em', fontSize: '0.7rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.4rem', display: 'block' }}>
          Intelligent Craftsmanship · Riolls AI Studio
        </span>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
          color: '#f5f0e8',
          fontWeight: 400,
          lineHeight: 1.15,
          maxWidth: '860px',
          margin: '0 0 1.8rem',
          letterSpacing: '-0.01em',
        }}>
          You imagine it.<br />
          AI designs it.<br />
          <em style={{ color: '#c9a96e', fontStyle: 'normal' }}>We craft it in gold.</em>
        </h1>

        <p style={{
          color: 'rgba(245,240,232,0.72)',
          maxWidth: '580px',
          lineHeight: 1.85,
          fontSize: '1.08rem',
          marginBottom: '2.8rem',
        }}>
          Riolls AI Studio is the world's most personal way to create fine jewellery. Describe your vision in plain words. Receive three photorealistic design concepts. Choose the one that moves you — and watch our master goldsmiths in Surat bring it to life in real gold and certified diamonds.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link href="/ai-studio/step-1" style={{
            background: 'linear-gradient(135deg, #c9a96e, #a88e5e)',
            color: '#1a0f00',
            padding: '1rem 2.8rem',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
          }}>
            Begin Designing ✦
          </Link>
          <a href="#how-it-works" style={{
            border: '1px solid rgba(201,169,110,0.4)',
            color: '#c9a96e',
            padding: '1rem 2.5rem',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            fontSize: '0.85rem',
          }}>
            See How It Works
          </a>
        </div>

        {/* Trust pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['No design experience needed', 'GIA-certified diamonds', 'Handcrafted in Surat', '48-hour quote turnaround'].map(t => (
            <span key={t} style={{
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.2)',
              color: 'rgba(245,240,232,0.7)',
              padding: '0.4rem 1rem',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── What Makes This Different ── */}
      <section style={{ background: '#fff', padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ letterSpacing: '0.18em', fontSize: '0.7rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
            A new kind of jeweller
          </span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.7rem,3vw,2.6rem)', color: '#1a0f00', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.3 }}>
            The only AI jewellery design tool where<br />your design is actually made by hand
          </h2>
          <p style={{ color: '#6b5c4e', lineHeight: 1.9, maxWidth: '640px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            Most AI jewellery tools stop at the image. Riolls AI Studio is different. Every design generated here is a commission brief — handed directly to a master goldsmith who will shape, set, and finish your piece with their own hands. You bring the imagination. We bring the gold.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {trust.map(t => (
              <div key={t.label} style={{ textAlign: 'center', padding: '2rem 1rem', background: '#faf7f3' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#c9a96e', marginBottom: '0.3rem' }}>{t.value}</div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a88e5e', marginBottom: '0.3rem' }}>{t.label}</div>
                <div style={{ fontSize: '0.82rem', color: '#8a7a6a' }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{ background: '#faf7f3', padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.7rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
              The process
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1a0f00', fontWeight: 400, lineHeight: 1.3 }}>
              From a thought in your mind<br />to a jewel in your hands
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                alignItems: 'start',
                padding: '2rem',
                background: '#fff',
                borderLeft: i === 2 ? '3px solid #c9a96e' : '3px solid transparent',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#c9a96e', display: 'block', lineHeight: 1 }}>{s.n}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: '#1a0f00', fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>{s.title}</strong>
                  <p style={{ color: '#6b5c4e', lineHeight: 1.8, margin: '0 0 0.6rem', fontSize: '0.95rem' }}>{s.body}</p>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#a88e5e', textTransform: 'uppercase' }}>{s.detail}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/ai-studio/step-1" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #c9a96e, #a88e5e)',
              color: '#1a0f00',
              padding: '1rem 3rem',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.1em',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
            }}>
              Start Your Design ✦
            </Link>
          </div>
        </div>
      </section>

      {/* ── What You Can Create ── */}
      <section style={{ background: '#fff', padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.7rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
              Design anything
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1a0f00', fontWeight: 400, lineHeight: 1.3 }}>
              Any piece. Any style.<br />Entirely yours.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {categories.map(c => (
              <Link key={c.name} href={c.href} style={{
                display: 'block',
                background: '#1a0f00',
                padding: '2.5rem 2rem',
                textDecoration: 'none',
                color: '#f5f0e8',
                transition: 'background 0.2s',
              }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.8rem' }}>{c.icon}</span>
                <strong style={{ display: 'block', marginBottom: '0.6rem', fontSize: '1rem', fontFamily: 'Georgia, serif' }}>{c.name}</strong>
                <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 1.2rem' }}>{c.desc}</p>
                <span style={{ color: '#c9a96e', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Design This →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emotional story block ── */}
      <section style={{
        background: 'radial-gradient(ellipse at 60% 40%, #2a1a08, #0a0500)',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span style={{ display: 'block', width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 2rem' }} />
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
            color: '#f5f0e8',
            fontWeight: 400,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            Some jewellery is found.<br /><em style={{ color: '#c9a96e', fontStyle: 'normal' }}>Yours is created.</em>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.75)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Every piece that has ever truly mattered — a grandmother's ring passed through generations, a necklace worn on the most important day of a life — was once just an idea in someone's heart. A feeling that had no shape yet, but was already deeply real.
          </p>
          <p style={{ color: 'rgba(245,240,232,0.75)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Riolls AI Studio exists for that feeling. For the person who knows, with quiet certainty, that what they are looking for doesn't exist in any shop window — because it hasn't been made yet. For the love that deserves more than a catalogue. For the story that has never been told in gold before.
          </p>
          <p style={{ color: 'rgba(245,240,232,0.75)', lineHeight: 1.9, marginBottom: '3rem', fontSize: '1.05rem' }}>
            You bring us the words. We bring eighteen years of goldsmithing devotion. Together, we make something that will outlast us both.
          </p>
          <Link href="/ai-studio/step-1" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #c9a96e, #a88e5e)',
            color: '#1a0f00',
            padding: '1.1rem 3.2rem',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
          }}>
            Begin Your Legacy ✦
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#fff', padding: '5.5rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ letterSpacing: '0.18em', fontSize: '0.7rem', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem', display: 'block' }}>
              Questions answered
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,2.8vw,2.3rem)', color: '#1a0f00', fontWeight: 400 }}>
              Everything you want to know about AI jewellery design
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e0d8', padding: '1.75rem 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.02rem', color: '#1a0f00', fontWeight: 400, marginBottom: '0.8rem', lineHeight: 1.5 }}>
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

      {/* ── Final CTA ── */}
      <section style={{ background: '#faf7f3', padding: '5rem 2rem', textAlign: 'center' }}>
        <span style={{ display: 'block', width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#1a0f00', fontWeight: 400, marginBottom: '1rem' }}>
          Your dream piece is three questions away.
        </h2>
        <p style={{ color: '#6b5c4e', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          No commitment, no cost to design. Begin your style profile, describe your vision, and receive your three AI-generated concepts — completely free. Only if you love one do we talk about bringing it to life.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/ai-studio/step-1" style={{
            background: 'linear-gradient(135deg, #c9a96e, #a88e5e)',
            color: '#1a0f00',
            padding: '1rem 2.8rem',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.1em',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
          }}>
            Begin Designing ✦
          </Link>
          <Link href="/bespoke" style={{
            border: '1px solid rgba(26,15,0,0.25)',
            color: '#1a0f00',
            padding: '1rem 2.5rem',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            fontSize: '0.85rem',
          }}>
            Prefer a personal consultation?
          </Link>
        </div>
      </section>
    </>
  );
}
