'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './step.module.css';

const tokens = [
    { id: 'piece', label: 'Piece', options: ['a ring', 'a necklace', 'earrings', 'a bracelet'] },
    { id: 'metal', label: 'Metal', options: ['in 18k yellow gold', 'in 18k white gold', 'in platinum', 'in rose gold'] },
    { id: 'stone', label: 'Stone', options: ['with a brilliant diamond', 'with a sapphire', 'with an emerald', 'with pearls'] },
    { id: 'style', label: 'Style', options: ['in a vintage style', 'with a modern aesthetic', 'in a minimalist design', 'with sculptural forms'] },
    { id: 'band', label: 'Setting', options: ['and a pavé band', 'and a solitaire setting', 'and a halo setting', 'and a bezel setting'] },
];

const STYLE_TAGS = ['Romantic', 'Bold', 'Minimal', 'Editorial', 'Celestial', 'Vintage', 'Maximalist', 'Architectural'];

export default function AIStep2() {
    const [selected, setSelected] = useState<Record<string, string>>({
        piece: tokens[0].options[0],
        metal: tokens[1].options[0],
        stone: tokens[2].options[0],
        style: tokens[3].options[0],
        band: tokens[4].options[0],
    });
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [freeText, setFreeText] = useState('');

    const sentence = `I want ${selected.piece} ${selected.metal} ${selected.stone} ${selected.style} ${selected.band}.`;

    const toggleTag = (tag: string) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
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
                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>Describe Your Vision</span>
                        <h2 className={styles.builderH2}>Build your design prompt.</h2>
                    </div>

                    {tokens.map(tok => (
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

                    <Link href="/ai-studio/step-3" className={styles.generateBtn}>Generate My Designs →</Link>
                </div>
            </div>
        </div>
    );
}
