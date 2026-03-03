import React from 'react';

export default function HomeTrustStrip() {
    const features = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12l5 5L20 7" />
                </svg>
            ),
            title: 'Certified Authentic',
            desc: 'GIA/IGI certified diamonds & hallmarked gold.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
            ),
            title: 'Free Insured Delivery',
            desc: 'Worldwide secure shipping on all orders.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            title: 'Lifetime Warranty',
            desc: 'Our commitment to uncompromising quality.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
            ),
            title: 'Secure Payments',
            desc: 'Encrypted & protected transactions.'
        }
    ];

    return (
        <section style={{
            background: 'var(--cream, #F9F5F0)',
            padding: '48px 24px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '32px',
                textAlign: 'center'
            }}>
                {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'var(--white)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            color: 'var(--gold)'
                        }}>
                            {f.icon}
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-sc)',
                            fontSize: '12px',
                            letterSpacing: '0.15em',
                            fontWeight: 600,
                            color: 'var(--charcoal)',
                            marginBottom: '8px',
                            textTransform: 'uppercase'
                        }}>
                            {f.title}
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: 'var(--stone)',
                            lineHeight: 1.5,
                            margin: 0
                        }}>
                            {f.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
