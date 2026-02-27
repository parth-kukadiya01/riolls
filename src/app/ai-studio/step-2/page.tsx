'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';
import { useAuth } from '@/context/AuthContext';

const STYLE_TAGS = ['Romantic', 'Bold', 'Minimal', 'Editorial', 'Celestial', 'Vintage', 'Maximalist', 'Architectural'];

export default function AIStep2() {
    const router = useRouter();
    const { state, updateProfile, resetGeneration } = useAIStudio();
    const { user } = useAuth();

    const dynamicTokens = useMemo(() => {
        const p = state.profile;
        const formatPiece = (val?: string) => val === 'Earrings' ? 'earrings' : `a ${val?.toLowerCase() || 'ring'}`;
        const formatMetal = (val?: string) => `in ${val?.toLowerCase() || '18k yellow gold'}`;
        const formatStone = (val?: string) => {
            if (!val) return 'with a brilliant diamond';
            if (val === 'Moissanite' || val === 'CZ') return `with ${val}`;
            return `with ${val.toLowerCase()}`;
        };
        const formatStyle = (val?: string) => {
            if (!val) return 'in a classic style';
            const main = val.split(' & ')[0].toLowerCase();
            if (main === 'avant-garde') return 'with an avant-garde aesthetic';
            if (main === 'organic') return 'in an organic style';
            return `in a ${main} style`;
        };
        const formatBudget = (val?: string) => {
            if (!val || val.includes('not to set')) return 'with no strict budget';
            return `with a budget ${val.toLowerCase()}`;
        };

        const defaultPiece = formatPiece(Array.isArray(p.pieceType) ? p.pieceType[0] : p.pieceType);
        const defaultMetal = formatMetal(Array.isArray(p.metalPreference) ? p.metalPreference[0] : p.metalPreference);
        const defaultStone = formatStone(Array.isArray(p.stonePreference) ? p.stonePreference[0] : p.stonePreference);
        const defaultStyle = formatStyle(Array.isArray(p.style) ? p.style[0] : p.style);
        const defaultBudget = formatBudget(Array.isArray(p.budget) ? p.budget[0] : p.budget);

        const optionsPiece = Array.from(new Set([defaultPiece, 'a ring', 'a necklace', 'a earrings', 'a bracelet']));
        const optionsMetal = Array.from(new Set([defaultMetal, 'in 9k yellow gold', 'in 9k rose gold', 'in 9k white gold', 'in 14k yellow gold', 'in 14k rose gold', 'in 14k white gold', 'in 18k yellow gold', 'in 18k rose gold', 'in 18k white gold', 'in 925 silver']));
        const optionsStone = Array.from(new Set([defaultStone, 'with brilliant diamonds', 'Vivid Coloured Gems', 'Pearls & Organics', 'Mixed & Layered']));
        const optionsStyle = Array.from(new Set([defaultStyle, 'in a romantic style', 'in a classic style', 'with a modern aesthetic', 'in a minimalist design', 'with sculptural forms']));
        const optionsSetting = ['and a pavé band', 'and a solitaire setting', 'and a halo setting', 'and a bezel setting', 'and a tension setting', 'and a channel setting', 'and a trilogy setting', 'and a cluster setting'];
        const optionsBudget = Array.from(new Set([defaultBudget, 'with a budget under £1,000', 'with a budget £1,000 – £2,000', 'with a budget £2,000 – £4,000', 'with a budget £4,000 – £6,000', 'with a budget £6,000 – £8,000', 'with a budget over £5,000', 'with no strict budget']));

        return [
            { id: 'pieceType', label: 'Piece', options: optionsPiece },
            { id: 'metal', label: 'Metal', options: optionsMetal },
            { id: 'stone', label: 'Stone', options: optionsStone },
            { id: 'designStyle', label: 'Style', options: optionsStyle },
            { id: 'setting', label: 'Setting', options: optionsSetting },
            { id: 'budget', label: 'Budget', options: optionsBudget },
        ];
    }, [state.profile]);

    const [selected, setSelected] = useState<Record<string, string>>({
        pieceType: dynamicTokens[0].options[0],
        metal: dynamicTokens[1].options[0],
        stone: dynamicTokens[2].options[0],
        designStyle: dynamicTokens[3].options[0],
        setting: dynamicTokens[4].options[0],
        budget: dynamicTokens[5].options[0],
    });

    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [freeText, setFreeText] = useState('');
    const [referenceImage, setReferenceImage] = useState<string | null>(null);
    const sentence = `I want ${selected.pieceType} ${selected.metal} ${selected.stone} ${selected.designStyle} ${selected.setting} ${selected.budget}.`;

    const toggleTag = (tag: string) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setReferenceImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleGenerate = (e: React.MouseEvent) => {
        e.preventDefault();

        // Save current selections before doing anything else
        updateProfile({
            pieceType: selected.pieceType,
            metal: selected.metal,
            stone: selected.stone,
            designStyle: selected.designStyle,
            setting: selected.setting,
            weight: selected.weight,
            budget: selected.budget,
            styleTags: activeTags,
            additionalNotes: freeText,
            ...(referenceImage ? { referenceImage } : {})
        });

        resetGeneration();

        if (!user) {
            // User is not logged in. Use the existing login page flow.
            // Pass the callback URL so they come back to step 3 after authenticating.
            router.push(`/login?callbackUrl=${encodeURIComponent('/ai-studio/step-3')}`);
            return;
        }

        // Already logged in, proceed to generate
        router.push('/ai-studio/step-3');
    };

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '40%' }} /></div>

            <div className={styles.twoCol}>
                {/* Preview */}
                <div className={styles.preview}>
                    <div className={styles.previewBox}>
                        <div className={styles.previewPrompt}>{sentence}</div>
                    </div>
                    <div className={styles.tagRow}>
                        {STYLE_TAGS.map(t => (
                            <button
                                key={t}
                                className={`${styles.tag} ${activeTags.includes(t) ? styles.tagActive : ''}`}
                                onClick={() => toggleTag(t)}
                            >{t}</button>
                        ))}
                    </div>
                </div>

                {/* Builder */}
                <div className={styles.builder}>
                    <button type="button" onClick={() => router.push('/ai-studio/step-1')} className={styles.backBtn}>
                        ← Back
                    </button>
                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>Describe Your Vision</span>
                        <h2 className={styles.builderH2}>Build your design prompt.</h2>
                    </div>

                    {dynamicTokens.map(tok => (
                        <div key={tok.id} className={styles.tokenRow}>
                            <span className={styles.tokenLabel}>{tok.label}</span>
                            <select
                                className={styles.tokenSelect}
                                value={selected[tok.id]}
                                onChange={e => setSelected(s => ({ ...s, [tok.id]: e.target.value }))}
                            >
                                {tok.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}

                    <div className={styles.freeText}>
                        <span className={styles.tokenLabel}>Additional Notes</span>
                        <textarea
                            className={styles.freeTextArea}
                            placeholder="Describe any specific inspirations, references, or details..."
                            value={freeText}
                            onChange={e => setFreeText(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className={styles.freeText} style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <span className={styles.tokenLabel}>Reference Image (Optional)</span>
                        <div style={{ border: '2px dashed var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center', position: 'relative', background: 'var(--off-white)', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                            />
                            {referenceImage ? (
                                <img src={referenceImage} alt="Reference" style={{ maxHeight: '150px', objectFit: 'contain', borderRadius: '4px' }} />
                            ) : (
                                <div style={{ color: 'var(--muted)', fontSize: '0.9rem', pointerEvents: 'none' }}>
                                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📸</span>
                                    Click or drop an image here
                                </div>
                            )}
                        </div>
                    </div>

                    <button className={styles.generateBtn} onClick={handleGenerate}>Generate My Designs →</button>
                </div>
            </div>
        </div>
    );
}
