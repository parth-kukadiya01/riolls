'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './step.module.css';

const loadingMessages = [
    'Analysing your style profile…',
    'Consulting our design library…',
    'Composing structures and forms…',
    'Applying goldsmith techniques…',
    'Finalising your designs…',
];

const designs = [
    { id: 'A', label: 'Design A', subtitle: 'Vintage Milgrain Solitaire', gradient: 'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)' },
    { id: 'B', label: 'Design B', subtitle: 'Clean Floating Bezel', gradient: 'radial-gradient(ellipse at 55%,#1a2420,#0a1210)' },
    { id: 'C', label: 'Design C', subtitle: 'Sculptural Twisted Band', gradient: 'radial-gradient(ellipse at 50%,#2a1e2e,#130e17)' },
    { id: 'D', label: 'Design D', subtitle: 'Grand Pavé Halo', gradient: 'radial-gradient(ellipse at 50%,#2d2416,#141008)' },
];

export default function AIStep3() {
    const [phase, setPhase] = useState<'loading' | 'results'>('loading');
    const [msgIdx, setMsgIdx] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        if (phase !== 'loading') return;
        const interval = setInterval(() => {
            setMsgIdx(i => {
                if (i >= loadingMessages.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setPhase('results'), 500);
                    return i;
                }
                return i + 1;
            });
        }, 900);
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '60%' }} /></div>

            {phase === 'loading' ? (
                <div className={styles.loading}>
                    <div className={styles.loadingDiamond}>
                        <svg width="80" height="96" viewBox="0 0 80 96" fill="rgba(201,169,110,0.15)" stroke="#C9A96E" strokeWidth="0.6">
                            <polygon points="40,4 76,24 62,92 18,92 4,24" />
                            <polygon points="40,4 62,24 40,36 18,24" />
                            <line x1="18" y1="24" x2="62" y2="24" />
                        </svg>
                    </div>
                    <p className={styles.loadingMsg}>{loadingMessages[msgIdx]}</p>
                    <div className={styles.dots}>
                        <span className={styles.dot} style={{ animationDelay: '0s' }} />
                        <span className={styles.dot} style={{ animationDelay: '0.2s' }} />
                        <span className={styles.dot} style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            ) : (
                <div className={styles.results}>
                    <div className={styles.resultsHeader}>
                        <span className={styles.eyebrow}>Your Designs</span>
                        <h2 className={styles.resultsH2}>Four interpretations of your vision.</h2>
                    </div>
                    <div className={styles.designGrid}>
                        {designs.map(d => (
                            <button
                                key={d.id}
                                className={`${styles.designCard} ${selected === d.id ? styles.designSelected : ''}`}
                                onClick={() => setSelected(d.id)}
                            >
                                <div className={styles.designImg} style={{ background: d.gradient }}>
                                    <span className={styles.designBadge}>{d.id}</span>
                                    {selected === d.id && <span className={styles.selectedMark}>✓</span>}
                                </div>
                                <span className={styles.designLabel}>{d.label}</span>
                                <span className={styles.designSub}>{d.subtitle}</span>
                            </button>
                        ))}
                    </div>
                    <div className={styles.resultsActions}>
                        <button className={styles.regenBtn} onClick={() => { setPhase('loading'); setMsgIdx(0); setSelected(null); }}>
                            ↻ Regenerate
                        </button>
                        <Link
                            href="/ai-studio/step-4"
                            className={`${styles.continueBtn} ${!selected ? styles.continueBtnDisabled : ''}`}
                        >
                            Customise This Design →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
