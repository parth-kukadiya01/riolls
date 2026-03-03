import React from 'react';

const MaterialGuarantee = () => {
    return (
        <div style={{
            background: 'var(--cream, #F9F5F0)',
            border: '1px solid var(--border, #E5E5E5)',
            borderRadius: '8px',
            padding: '24px',
            marginTop: '32px',
            marginBottom: '32px'
        }}>
            <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                color: 'var(--charcoal, #2C2622)',
                marginBottom: '16px',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                Authenticity & Material Guarantee
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                textAlign: 'center'
            }}>
                {/* Certifications */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #B49A5A)" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--charcoal, #2C2622)' }}>Certified Gems</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--stone, #5C4A43)' }}>All diamonds & gemstones are GIA/IGI certified.</span>
                </div>

                {/* Material Transparency */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #B49A5A)" strokeWidth="1.5">
                        <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                        <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                        <path d="M3 15h6" />
                        <path d="M3 18h6" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--charcoal, #2C2622)' }}>Solid Precious Metals</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--stone, #5C4A43)' }}>Crafted in solid 14k/18k Gold, Platinum, or 925 Silver.</span>
                </div>

                {/* Hallmarking */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #B49A5A)" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--charcoal, #2C2622)' }}>Legally Hallmarked</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--stone, #5C4A43)' }}>Every piece is tested & hallmarked for purity.</span>
                </div>
            </div>
        </div>
    );
};

export default MaterialGuarantee;
