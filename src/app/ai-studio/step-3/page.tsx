'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

const loadingMessages = [
    'Analysing your style profile…',
    'Consulting our design library…',
    'Composing structures and forms…',
    'Applying goldsmith techniques…',
    'Finalising your designs…',
];

const gradients = [
    'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)',
    'radial-gradient(ellipse at 55%,#1a2420,#0a1210)',
    'radial-gradient(ellipse at 50%,#2a1e2e,#130e17)'
];

export default function AIStep3() {
    const router = useRouter();
    const { state, generateIdeas, setSelectedConcept } = useAIStudio();

    // phase: loading -> results, but if it fails we can show error
    const [phase, setPhase] = useState<'loading' | 'results' | 'error'>('loading');
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        let mounted = true;

        const startGeneration = async () => {
            if (state.generatedConcepts.length > 0) {
                // Already generated (user went back and forward)
                setPhase('results');
                return;
            }

            const success = await generateIdeas();
            if (mounted) {
                if (success) {
                    setPhase('results');
                } else {
                    setPhase('error');
                }
            }
        };

        startGeneration();

        return () => { mounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cycling loading message effect
    useEffect(() => {
        if (phase !== 'loading') return;
        const interval = setInterval(() => {
            setMsgIdx(i => i >= loadingMessages.length - 1 ? i : i + 1);
        }, 1500);
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '60%' }} /></div>

            {phase === 'loading' && (
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
            )}

            {phase === 'error' && (
                <div className={styles.loading}>
                    <h2 className={styles.resultsH2}>Generation Failed</h2>
                    <p>{state.error}</p>
                    <div className={styles.resultsActions} style={{ marginTop: '2rem' }}>
                        <button className={styles.regenBtn} onClick={() => { setPhase('loading'); generateIdeas(); }}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {phase === 'results' && (
                <div className={styles.results}>
                    <button type="button" onClick={() => router.push('/ai-studio/step-2')} className={styles.backBtn}>
                        ← Back
                    </button>
                    <div className={styles.resultsHeader}>
                        <span className={styles.eyebrow}>Your Designs</span>
                        <h2 className={styles.resultsH2}>Interpretations of your vision.</h2>
                        <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
                            {state.styleAnalysis}
                        </p>
                    </div>
                    <div className={styles.designGrid}>
                        {state.generatedConcepts.map((d, idx) => (
                            <button
                                key={idx}
                                className={`${styles.designCard} ${state.selectedConceptIndex === idx ? styles.designSelected : ''}`}
                                onClick={() => setSelectedConcept(idx)}
                            >
                                <div
                                    className={styles.designImg}
                                    style={!d.image_data ? {
                                        backgroundImage: gradients[idx % gradients.length],
                                    } : undefined}
                                >
                                    {d.image_data && (
                                        <img
                                            src={d.image_data}
                                            alt={d.title || `Design ${idx + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            }}
                                        />
                                    )}
                                    <span className={styles.designBadge}>Idea {idx + 1}</span>
                                    {state.selectedConceptIndex === idx && <span className={styles.selectedMark}>✓</span>}
                                </div>
                                <span className={styles.designLabel}>{d.title}</span>
                                <span className={styles.designSub}>{d.description}</span>
                            </button>
                        ))}
                    </div>

                    {state.recommendedMaterials.length > 0 && (
                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <span className={styles.eyebrow}>Recommended Materials</span>
                            <div className={styles.tagRow} style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                {state.recommendedMaterials.map(m => (
                                    <span key={m} className={styles.tag}>{m}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.resultsActions} style={{ marginTop: '4rem' }}>
                        <button className={styles.regenBtn} onClick={() => { setPhase('loading'); generateIdeas(); }}>
                            ↻ Regenerate
                        </button>
                        <Link
                            href="/ai-studio/step-4"
                            className={`${styles.continueBtn} ${state.selectedConceptIndex === null ? styles.continueBtnDisabled : ''}`}
                        >
                            Customise This Design →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
