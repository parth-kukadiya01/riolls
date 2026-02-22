'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './step.module.css';

const metals = [
    { id: 'yellow', label: 'Yellow Gold', color: '#C9A96E' },
    { id: 'white', label: 'White Gold', color: '#D8D8D8' },
    { id: 'rose', label: 'Rose Gold', color: '#E8A898' },
    { id: 'plat', label: 'Platinum', color: '#BCBCBC' },
];

const cuts = ['Brilliant', 'Oval', 'Emerald', 'Pear', 'Cushion', 'Princess'];

const finishes = [
    { id: 'hpol', label: 'High Polish' },
    { id: 'satin', label: 'Satin Matte' },
    { id: 'hammer', label: 'Hammered' },
    { id: 'brush', label: 'Brushed' },
];

export default function AIStep4() {
    const [selectedMetal, setSelectedMetal] = useState('yellow');
    const [selectedCut, setSelectedCut] = useState('Brilliant');
    const [selectedFinish, setSelectedFinish] = useState('hpol');
    const [stoneSize, setStoneSize] = useState(1.5);
    const [engraving, setEngraving] = useState('');

    const basePrice = 3800;
    const priceMultiplier = metals.find(m => m.id === selectedMetal)?.id === 'plat' ? 1.45 : 1.1;
    const sizeMultiplier = 1 + (stoneSize - 0.5) * 0.4;
    const low = Math.round((basePrice * sizeMultiplier) / 100) * 100;
    const high = Math.round((basePrice * sizeMultiplier * priceMultiplier * 1.3) / 100) * 100;

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '80%' }} /></div>

            <div className={styles.twoCol}>
                {/* Design preview */}
                <div className={styles.preview}>
                    <div className={styles.previewImg} style={{ background: 'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)' }}>
                        <svg width="80" height="96" viewBox="0 0 80 96" fill={`${metals.find(m => m.id === selectedMetal)?.color}33`} stroke={metals.find(m => m.id === selectedMetal)?.color} strokeWidth="0.6">
                            <polygon points="40,4 76,24 62,92 18,92 4,24" />
                            <polygon points="40,4 62,24 40,36 18,24" />
                            <line x1="18" y1="24" x2="62" y2="24" />
                        </svg>
                    </div>
                    <div className={styles.priceEstimate}>
                        <span className={styles.priceLabel}>Estimated Range</span>
                        <span className={styles.priceValue}>£{low.toLocaleString()} – £{high.toLocaleString()}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.builder}>
                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>Customise Your Piece</span>
                        <h2 className={styles.builderH2}>Finalise every detail.</h2>
                    </div>

                    {/* Metal */}
                    <div className={styles.controlSection}>
                        <span className={styles.controlLabel}>Metal</span>
                        <div className={styles.metalRow}>
                            {metals.map(m => (
                                <button
                                    key={m.id}
                                    className={`${styles.metalBtn} ${selectedMetal === m.id ? styles.metalBtnActive : ''}`}
                                    onClick={() => setSelectedMetal(m.id)}
                                >
                                    <span className={styles.metalDot} style={{ background: m.color }} />
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cut */}
                    <div className={styles.controlSection}>
                        <span className={styles.controlLabel}>Stone Cut</span>
                        <div className={styles.cutGrid}>
                            {cuts.map(c => (
                                <button
                                    key={c}
                                    className={`${styles.cutBtn} ${selectedCut === c ? styles.cutBtnActive : ''}`}
                                    onClick={() => setSelectedCut(c)}
                                >{c}</button>
                            ))}
                        </div>
                    </div>

                    {/* Stone size */}
                    <div className={styles.controlSection}>
                        <div className={styles.sliderHeader}>
                            <span className={styles.controlLabel}>Stone Size</span>
                            <span className={styles.sliderVal}>{stoneSize.toFixed(2)} ct</span>
                        </div>
                        <input
                            type="range" min="0.5" max="3.0" step="0.25"
                            value={stoneSize}
                            onChange={e => setStoneSize(+e.target.value)}
                            className={styles.slider}
                        />
                    </div>

                    {/* Finish */}
                    <div className={styles.controlSection}>
                        <span className={styles.controlLabel}>Finish</span>
                        <div className={styles.finishRow}>
                            {finishes.map(f => (
                                <button
                                    key={f.id}
                                    className={`${styles.finishBtn} ${selectedFinish === f.id ? styles.finishBtnActive : ''}`}
                                    onClick={() => setSelectedFinish(f.id)}
                                >{f.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Engraving */}
                    <div className={styles.controlSection}>
                        <span className={styles.controlLabel}>Engraving</span>
                        <input
                            type="text"
                            maxLength={25}
                            value={engraving}
                            onChange={e => setEngraving(e.target.value)}
                            placeholder="An initial, date, or phrase…"
                            className={styles.engravingField}
                        />
                    </div>

                    <Link href="/ai-studio/step-5" className={styles.continueBtn}>Request a Quote →</Link>
                </div>
            </div>
        </div>
    );
}
