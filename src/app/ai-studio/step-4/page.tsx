'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

const metals = [
    { id: 'yellow', label: 'Yellow Gold', color: '#C9A96E' },
    { id: 'white', label: 'White Gold', color: '#D8D8D8' },
    { id: 'rose', label: 'Rose Gold', color: '#E8A898' },
    { id: 'silver', label: '925 Silver', color: '#C0C0C0' },
    { id: 'twotone', label: 'Two-Tone', color: 'linear-gradient(135deg,#C9A96E 50%,#D8D8D8 50%)' },
];

const cuts = ['Brilliant', 'Oval', 'Emerald', 'Pear', 'Cushion', 'Princess', 'Marquise', 'Asscher', 'Heart', 'Radiant'];

const finishes = [
    { id: 'hpol', label: 'High Polish' },
    { id: 'satin', label: 'Satin Matte' },
    { id: 'hammer', label: 'Hammered' },
    { id: 'brush', label: 'Brushed' },
    { id: 'sand', label: 'Sandblasted' },
];

// Hip Hop specific
const iceLevels = ['Fully Iced (VVS)', 'Heavy Ice', 'Semi-Iced', 'Solid Metal Only'];
const chainWeights = ['Lightweight (< 30g)', 'Medium (30–60g)', 'Heavy (60–100g)', 'Ultra Heavy (100g+)'];
const chainLengths = ['18" (Short)', '20" (Standard)', '22" (Medium Long)', '24" (Long)', '26"+ (Extra Long)'];

// Helper to normalize metal string to a metal id
function resolveMetalId(metalStr: string | undefined): string {
    if (!metalStr) return 'yellow';
    const s = metalStr.toLowerCase();
    if (s.includes('rose')) return 'rose';
    if (s.includes('white')) return 'white';
    if (s.includes('silver')) return 'silver';
    if (s.includes('two-tone') || s.includes('two tone')) return 'twotone';
    return 'yellow';
}

function resolveCut(stoneShape: string | undefined): string {
    if (!stoneShape) return 'Brilliant';
    if (stoneShape.includes('Oval')) return 'Oval';
    if (stoneShape.includes('Princess')) return 'Princess';
    if (stoneShape.includes('Emerald')) return 'Emerald';
    if (stoneShape.includes('Pear')) return 'Pear';
    if (stoneShape.includes('Cushion')) return 'Cushion';
    if (stoneShape.includes('Marquise')) return 'Marquise';
    if (stoneShape.includes('Asscher')) return 'Asscher';
    if (stoneShape.includes('Heart')) return 'Heart';
    if (stoneShape.includes('Radiant')) return 'Radiant';
    return 'Brilliant';
}

const get = (val: string | string[] | undefined) => (Array.isArray(val) ? val[0] : val) ?? '';

export default function AIStep4() {
    const router = useRouter();
    const { state, updateCustomisations } = useAIStudio();

    const p = state.profile;
    const pt = get(p.pieceType) || 'Ring';
    const isHipHop = pt === 'Hip Hop / Iced Out';

    // Scale can come from any piece type now
    const scaleString = get(p.scale) || '';
    const isChunky = scaleString.includes('Massive') || scaleString.includes('Oversized') || scaleString.includes('Chunky') || scaleString.includes('Heavy');
    const isDainty = scaleString.includes('Dainty') || scaleString.includes('Petite') || scaleString.includes('Minimal') || scaleString.includes('Thin') || scaleString.includes('Choker');

    const selectedConcept = state.selectedConceptIndex !== null ? state.generatedConcepts[state.selectedConceptIndex] : null;

    // Pre-fill from step-1 profile answers
    const [selectedMetal, setSelectedMetal] = useState(
        resolveMetalId(get(p.metalColor))
    );
    const [selectedCut, setSelectedCut] = useState(resolveCut(get(p.stoneShape)));
    const [selectedFinish, setSelectedFinish] = useState('hpol');
    const [stoneSize, setStoneSize] = useState(1.5);
    const [engraving, setEngraving] = useState('');

    // Weight / Scale specifics
    const [selectedIceLevel, setSelectedIceLevel] = useState(
        get(p.iceLevel)?.includes('Fully') ? 'Fully Iced (VVS)' :
            get(p.iceLevel)?.includes('Heavy') ? 'Heavy Ice' :
                get(p.iceLevel)?.includes('Semi') ? 'Semi-Iced' :
                    'Solid Metal Only'
    );
    const [selectedChainWeight, setSelectedChainWeight] = useState(
        isChunky ? 'Heavy (60–100g)' :
            isDainty ? 'Lightweight (< 30g)' :
                'Medium (30–60g)'
    );

    // Length specifics
    const [selectedChainLength, setSelectedChainLength] = useState(
        scaleString.includes('Choker') ? '18" (Short)' :
            scaleString.includes('Long') ? '24" (Long)' :
                scaleString.includes('Mid-Chest') ? '22" (Medium Long)' :
                    '20" (Standard)'
    );

    const basePrice = isHipHop ? 2200 : pt === 'Necklace' ? 1800 : pt === 'Bracelet' ? 2500 : pt === 'Earrings' ? 1500 : 3800;
    const priceMultiplier = metals.find(m => m.id === selectedMetal)?.id === 'plat' ? 1.45 : 1.1;
    const sizeMultiplier = isHipHop
        ? (selectedChainWeight === 'Ultra Heavy (100g+)' ? 2.2 : selectedChainWeight === 'Heavy (60–100g)' ? 1.7 : selectedChainWeight === 'Medium (30–60g)' ? 1.2 : 1)
        : 1 + (stoneSize - 0.5) * 0.4;
    const low = Math.round((basePrice * sizeMultiplier) / 100) * 100;
    const high = Math.round((basePrice * sizeMultiplier * priceMultiplier * 1.3) / 100) * 100;

    const handleContinue = (e: React.MouseEvent) => {
        e.preventDefault();
        const metalLabel = metals.find(m => m.id === selectedMetal)?.label || 'Yellow Gold';
        const finishLabel = finishes.find(f => f.id === selectedFinish)?.label || 'High Polish';

        if (isHipHop) {
            updateCustomisations({
                finalMetal: metalLabel,
                iceLevel: selectedIceLevel,
                chainWeight: selectedChainWeight,
                chainLength: selectedChainLength,
                finish: finishLabel,
                engraving,
                estimatedPriceLow: low,
                estimatedPriceHigh: high,
            });
        } else {
            updateCustomisations({
                finalMetal: metalLabel,
                stoneCut: selectedCut,
                stoneSize,
                finish: finishLabel,
                engraving,
                estimatedPriceLow: low,
                estimatedPriceHigh: high,
            });
        }
        router.push('/ai-studio/step-5');
    };

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '80%' }} /></div>

            <div className={styles.twoCol}>
                {/* Design preview */}
                <div className={styles.preview}>
                    <div
                        className={styles.previewImg}
                        style={{
                            background: selectedConcept?.image_data ? `url(${selectedConcept.image_data})` : 'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {!selectedConcept?.image_data && (
                            <svg width="80" height="96" viewBox="0 0 80 96" fill={`${metals.find(m => m.id === selectedMetal)?.color}33`} stroke={metals.find(m => m.id === selectedMetal)?.color} strokeWidth="0.6">
                                <polygon points="40,4 76,24 62,92 18,92 4,24" />
                                <polygon points="40,4 62,24 40,36 18,24" />
                                <line x1="18" y1="24" x2="62" y2="24" />
                            </svg>
                        )}
                    </div>
                    <div className={styles.priceEstimate}>
                        <span className={styles.priceLabel}>Estimated Range</span>
                        <span className={styles.priceValue}>${low.toLocaleString()} – ${high.toLocaleString()}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.builder}>
                    <button type="button" onClick={() => router.push('/ai-studio/step-3')} className={styles.backBtn}>← Back</button>
                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>{isHipHop ? 'Finalise Your Custom Piece' : 'Customise Your Piece'}</span>
                        <h2 className={styles.builderH2}>{isHipHop ? 'Lock in every detail.' : 'Finalise every detail.'}</h2>
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

                    {isHipHop ? (
                        <>
                            {/* Ice Level */}
                            <div className={styles.controlSection}>
                                <span className={styles.controlLabel}>Ice Level</span>
                                <div className={styles.cutGrid}>
                                    {iceLevels.map(lvl => (
                                        <button
                                            key={lvl}
                                            className={`${styles.cutBtn} ${selectedIceLevel === lvl ? styles.cutBtnActive : ''}`}
                                            onClick={() => setSelectedIceLevel(lvl)}
                                        >{lvl}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Chain Weight */}
                            <div className={styles.controlSection}>
                                <span className={styles.controlLabel}>Chain / Piece Weight</span>
                                <div className={styles.cutGrid}>
                                    {chainWeights.map(w => (
                                        <button
                                            key={w}
                                            className={`${styles.cutBtn} ${selectedChainWeight === w ? styles.cutBtnActive : ''}`}
                                            onClick={() => setSelectedChainWeight(w)}
                                        >{w}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Chain Length */}
                            <div className={styles.controlSection}>
                                <span className={styles.controlLabel}>Chain Length</span>
                                <div className={styles.cutGrid}>
                                    {chainLengths.map(l => (
                                        <button
                                            key={l}
                                            className={`${styles.cutBtn} ${selectedChainLength === l ? styles.cutBtnActive : ''}`}
                                            onClick={() => setSelectedChainLength(l)}
                                        >{l}</button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Stone Cut & Size - Only show if piece isn't a plain ring / has no center stone */}
                            {(!get(p.primaryStone) || (get(p.primaryStone) !== 'No Center Stone / All Metal' && get(p.primaryStone) !== 'Solid High-Polish Metal' && get(p.primaryStone) !== 'Solid High-Polish Gold' && get(p.primaryStone) !== 'Pearl' && get(p.primaryStone) !== 'Lustrous Pearl')) && (
                                <>
                                    {/* Stone Cut */}
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

                                    {/* Stone Size */}
                                    {/* <div className={styles.controlSection}>
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
                                    </div> */}
                                </>
                            )}
                        </>
                    )}

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
                        <span className={styles.controlLabel}>{isHipHop ? 'Custom Inscription / Name' : 'Engraving'}</span>
                        <input
                            type="text"
                            maxLength={30}
                            value={engraving}
                            onChange={e => setEngraving(e.target.value)}
                            placeholder={isHipHop ? 'Name, initials, date, or phrase…' : 'An initial, date, or phrase…'}
                            className={styles.engravingField}
                        />
                    </div>

                    <button className={styles.continueBtn} onClick={handleContinue}>
                        Request a Quote →
                    </button>
                </div>
            </div>
        </div>
    );
}
