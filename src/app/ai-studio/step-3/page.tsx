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

const loadingMessagesHipHop = [
    'Decoding your drip preferences…',
    'Sourcing VVS-grade inspiration…',
    'Laying out the chain links…',
    'Icing out every focal point…',
    'Finalising your custom piece…',
];

const loadingSubMessagesHipHop = [
    'Locking in the perfect ice configuration',
    'Calculating gram weight and dimensions',
    'Selecting the right link style for your vision',
    'Polishing each stone to max brilliance',
    'Rendering your custom bespoke piece',
];


const gradients = [
    'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)',
    'radial-gradient(ellipse at 55%,#1a2420,#0a1210)',
    'radial-gradient(ellipse at 50%,#2a1e2e,#130e17)'
];

export default function AIStep3() {
    const router = useRouter();
    const { state, generateIdeas, setSelectedConcept, generateVariations, updateProfile, fetchGenerationStatus } = useAIStudio();

    const isHipHop = (Array.isArray(state.profile.pieceType) ? state.profile.pieceType[0] : state.profile.pieceType) === 'Hip Hop / Iced Out';
    const msgs = isHipHop ? loadingMessagesHipHop : loadingMessages;
    const subMsgs = isHipHop ? loadingSubMessagesHipHop : loadingSubMessages;

    const [phase, setPhase] = useState<'loading' | 'results' | 'error' | 'limit_reached'>('loading');
    const [msgIdx, setMsgIdx] = useState(0);

    const [showVariationPrompt, setShowVariationPrompt] = useState(false);
    const [variationNotes, setVariationNotes] = useState('');

    useEffect(() => {
        // Fetch generation status first; if limit reached, show message without generating
        const init = async () => {
            await fetchGenerationStatus();
        };
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // If status loaded and limit exhausted (and no concepts yet), show limit message
        if (state.generationStatus && state.generationStatus.remaining === 0 && state.generatedConcepts.length === 0) {
            setPhase('limit_reached');
            return;
        }

        if (state.generatedConcepts.length === 0 && !state.isGenerating && !state.error && phase !== 'limit_reached') {
            generateIdeas();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.generationStatus]);

    useEffect(() => {
        if (state.error && state.error.toLowerCase().includes('limit')) {
            setPhase('limit_reached');
        } else if (state.generatedConcepts.length > 0) {
            setPhase('results');
        } else if (state.error) {
            setPhase('error');
        } else if (phase !== 'limit_reached') {
            setPhase('loading');
        }
    }, [state.generatedConcepts, state.error, state.isGenerating]);

    useEffect(() => {
        if (phase !== 'loading') return;
        const interval = setInterval(() => {
            setMsgIdx(i => i >= loadingMessages.length - 1 ? i : i + 1);
        }, 3000);
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
                        <h3 className={styles.loadingMsg}>{msgs[msgIdx]}</h3>
                        <p className={styles.loadingSubmsg}>{subMsgs[msgIdx]}</p>
                        <div className={styles.dots}>
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                        </div>
                    </div>
                </div>
            )}

            {phase === 'limit_reached' && (
                <div className={styles.loading}>
                    <div className={styles.loadingDiamond} style={{ animation: 'none', opacity: 0.6 }}>
                        <svg width="80" height="96" viewBox="0 0 80 96" fill="rgba(201,169,110,0.08)" stroke="#C9A96E" strokeWidth="0.8">
                            <polygon points="40,4 76,24 62,92 18,92 4,24" />
                            <polygon points="40,4 62,24 40,36 18,24" />
                            <line x1="18" y1="24" x2="62" y2="24" />
                        </svg>
                    </div>
                    <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 1rem' }}>
                        <h2 className={styles.resultsH2} style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.6rem' }}>
                            Generation Limit Reached
                        </h2>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.06))',
                            border: '1px solid rgba(201,169,110,0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem 2rem',
                            marginBottom: '1.5rem',
                        }}>
                            <p style={{ color: 'var(--stone)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
                                You have reached your image generation limit
                                {state.generationStatus ? ` (${state.generationStatus.used}/${state.generationStatus.limit} used)` : ''}.
                            </p>
                            <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1rem', marginTop: '0.75rem', marginBottom: 0 }}>
                                Please contact the Riolls team to increase your limit.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a
                                href="mailto:hello@riolls.com"
                                style={{
                                    display: 'inline-block',
                                    padding: '0.75rem 1.75rem',
                                    background: 'linear-gradient(135deg, #C9A96E, #a8824a)',
                                    color: '#0a0a0a',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.04em',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Contact Riolls Team
                            </a>
                            <button className={styles.backBtn} onClick={() => router.push('/ai-studio/step-2')} style={{ margin: 0 }}>
                                ← Back to Profile
                            </button>
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
                    <div className={styles.resultsActions} style={{ marginTop: '1rem', justifyContent: 'center' }}>
                        <button className={styles.backBtn} onClick={() => router.push('/ai-studio/step-2')}>
                            ← Back to Style Profile
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
                        <span className={styles.eyebrow}>{isHipHop ? 'Your Custom Pieces' : 'Your Designs'}</span>
                        <h2 className={styles.resultsH2}>{isHipHop ? 'Your iced-out concepts.' : 'Interpretations of your vision.'}</h2>
                        <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
                            {state.styleAnalysis}
                        </p>
                    </div>

                    {/* Generation usage indicator */}
                    {state.generationStatus && (
                        <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{
                                fontSize: '0.8rem',
                                color: state.generationStatus.remaining === 0 ? '#c0392b' : 'var(--stone)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(201,169,110,0.15)',
                                borderRadius: '20px',
                                padding: '0.3rem 0.9rem',
                                letterSpacing: '0.03em',
                            }}>
                                {state.generationStatus.remaining === 0
                                    ? '✦ Generation limit reached'
                                    : `✦ ${state.generationStatus.used} of ${state.generationStatus.limit} generations used`}
                            </span>
                        </div>
                    )}

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

                    {state.isGenerating && (
                        <div className={styles.loading} style={{ position: 'relative', minHeight: '300px', marginTop: '3rem', height: 'auto', background: 'transparent' }}>
                            <div className={styles.loaderAssembly} style={{ marginBottom: '2rem' }}>
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
                                <h3 className={styles.loadingMsg} style={{ fontSize: '1.2rem' }}>{msgs[msgIdx]}</h3>
                                <div className={styles.dots} style={{ marginTop: '0.5rem' }}>
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                </div>
                            </div>
                        </div>
                    )}

                    {!state.isGenerating && (
                        <div className={styles.resultsActions} style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <Link
                                href="/ai-studio/step-4"
                                className={`${styles.continueBtn} ${state.selectedConceptIndex === null ? styles.continueBtnDisabled : ''}`}
                                style={{ width: '100%', maxWidth: '400px' }}
                            >
                                Customise This Design →
                            </Link>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                                {!showVariationPrompt && state.generationStatus?.remaining !== 0 ? (
                                    <button
                                        className={styles.regenBtn}
                                        onClick={() => setShowVariationPrompt(true)}
                                    >
                                        ✧ Explore Different Variations
                                    </button>
                                ) : !showVariationPrompt && state.generationStatus?.remaining === 0 ? (
                                    <span style={{ fontSize: '0.85rem', color: 'var(--stone)', fontStyle: 'italic' }}>
                                        Generation limit reached — contact the Riolls team for more.
                                    </span>
                                ) : null}
                                <button
                                    className={styles.backBtn}
                                    onClick={() => router.push('/ai-studio/step-2')}
                                    style={{ margin: 0 }}
                                >
                                    ← Change My Preferences
                                </button>
                            </div>

                            {showVariationPrompt && (
                                <div className={styles.variationPromptContainer}>
                                    <p className={styles.variationPromptText}>
                                        To help our AI goldsmith perfectly refine your vision, please respectfully share what specific details you would like to adjust or explore in these new variations:
                                    </p>
                                    <textarea
                                        className={styles.variationTextarea}
                                        value={variationNotes}
                                        onChange={(e) => setVariationNotes(e.target.value)}
                                        placeholder="e.g., 'Make the band slightly thicker', 'Try a more vintage aesthetic', or 'Focus more on the diamond cluster...'"
                                    />
                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                        <button
                                            className={styles.backBtn}
                                            onClick={() => setShowVariationPrompt(false)}
                                            style={{ margin: 0 }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={styles.regenBtn}
                                            onClick={() => {
                                                if (variationNotes.trim()) {
                                                    const currentNotes = (state.profile.additionalNotes as string) || '';
                                                    const updatedNotes = currentNotes
                                                        ? `${currentNotes}\n\nClient Revision Details: ${variationNotes}`
                                                        : `Client Revision Details: ${variationNotes}`;
                                                    updateProfile({ additionalNotes: updatedNotes });
                                                }
                                                setShowVariationPrompt(false);
                                                setVariationNotes('');
                                                generateVariations();
                                            }}
                                            disabled={!variationNotes.trim()}
                                            style={{ opacity: !variationNotes.trim() ? 0.5 : 1 }}
                                        >
                                            Submit Revision →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
