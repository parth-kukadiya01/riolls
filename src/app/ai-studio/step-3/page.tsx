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

const loadingSubMessages = [
    'Comparing classical motifs with avant-garde forms',
    'Calculating proportions for maximum brilliance',
    'Selecting the optimal setting for your stones',
    'Refining the silhouette and metal textures',
    'Polishing the final photorealistic render',
];

const gradients = [
    'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)',
    'radial-gradient(ellipse at 55%,#1a2420,#0a1210)',
    'radial-gradient(ellipse at 50%,#2a1e2e,#130e17)'
];

export default function AIStep3() {
    const router = useRouter();
    const { state, generateIdeas, setSelectedConcept } = useAIStudio();

    const [phase, setPhase] = useState<'loading' | 'results' | 'error'>('loading');
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        if (state.generatedConcepts.length === 0 && !state.isGenerating && !state.error) {
            generateIdeas();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (state.generatedConcepts.length > 0) {
            setPhase('results');
        } else if (state.error) {
            setPhase('error');
        } else {
            setPhase('loading');
        }
    }, [state.generatedConcepts, state.error, state.isGenerating]);

    useEffect(() => {
        if (phase !== 'loading') return;
        const interval = setInterval(() => {
            setMsgIdx(i => i >= loadingMessages.length - 1 ? i : i + 1);
        }, 3000); // Slower interval for readability
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '60%' }} /></div>

            {phase === 'loading' && (
                <div className={styles.loading}>
                    <div className={styles.loaderAssembly}>
                        <div className={styles.loaderRing}></div>
                        <div className={styles.loaderRing2}></div>
                        <div className={styles.loadingDiamond}>
                            <svg width="60" height="72" viewBox="0 0 80 96" fill="rgba(201,169,110,0.15)" stroke="#C9A96E" strokeWidth="1">
                                <polygon points="40,4 76,24 62,92 18,92 4,24" />
                                <polygon points="40,4 62,24 40,36 18,24" />
                                <line x1="18" y1="24" x2="62" y2="24" />
                            </svg>
                        </div>
                    </div>

                    <div className={styles.loadingMsgContainer}>
                        <h3 className={styles.loadingMsg}>{loadingMessages[msgIdx]}</h3>
                        <p className={styles.loadingSubmsg}>{loadingSubMessages[msgIdx]}</p>
                        <div className={styles.dots}>
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                        </div>
                    </div>
                </div>
            )}

            {phase === 'error' && (
                <div className={styles.loading}>
                    <div className={styles.loadingDiamond} style={{ animation: 'none', opacity: 0.5 }}>
                        <svg width="80" height="96" viewBox="0 0 80 96" fill="rgba(168,142,94,0.05)" stroke="#A88E5E" strokeWidth="0.6">
                            <polygon points="40,4 76,24 62,92 18,92 4,24" />
                            <polygon points="40,4 62,24 40,36 18,24" />
                            <line x1="18" y1="24" x2="62" y2="24" />
                        </svg>
                    </div>
                    <div>
                        <h2 className={styles.resultsH2} style={{ textAlign: 'center', marginBottom: '12px' }}>Generation Paused</h2>
                        <p style={{ color: 'var(--stone)', textAlign: 'center', maxWidth: '400px' }}>
                            {state.error || "We encountered an issue while crafting your designs. Our AI goldsmith needs a moment."}
                        </p>
                    </div>
                    <div className={styles.resultsActions} style={{ marginTop: '1rem' }}>
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
