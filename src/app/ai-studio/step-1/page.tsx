'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';
import multiStyles from './page.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

// ─── Question type ─────────────────────────────────────────────────────────────
type Question = {
    id: string;
    question: string;
    answers: string[];
    multi?: boolean; // if true → multi-select with Continue button
    hint?: string;   // optional subtitle for multi-select questions
};

// ─── Static question definitions ──────────────────────────────────────────────

const Q_PIECE_TYPE: Question = {
    id: 'pieceType',
    question: 'What type of piece are you commissioning?',
    answers: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'],
};

const Q_GENDER: Question = {
    id: 'gender',
    question: 'Who will be wearing this creation?',
    answers: ["Women's Collection", "Men's Collection", "Gender-Neutral"],
};

// ─── Diamond questions (multi-select) ─────────────────────────────────────────

const Q_CENTER_DIAMOND: Question = {
    id: 'centerDiamond',
    question: 'Select your center diamond type(s)',
    answers: ['Lab-Grown Diamond (Most Popular)', 'Natural Diamond (GIA Certified)', 'Moissanite (Budget Luxury)', 'No Center Stone'],
    multi: true,
    hint: 'Lab-grown = #1 Etsy trend 2025 — ethical, identical, up to 70% less cost',
};

const Q_STONE_SHAPE: Question = {
    id: 'stoneShape',
    question: 'Which diamond cut(s) capture your imagination?',
    answers: ['Elegant Oval (Etsy #1)', 'Round Brilliant (Classic)', 'Emerald Cut (Statement)', 'Marquise (2025 Trending)', 'Cushion Cut (Romantic)', 'Pear Shape (Unique)', 'Toi et Moi Duo (Two Stones)', 'Radiant Cut (Bold)', 'Asscher Cut (Art Deco)', 'East-West Horizontal'],
    multi: true,
    hint: 'Oval + Marquise = most searched Etsy shapes in 2025. Select all you love.',
};

const Q_COLOR_DIAMOND: Question = {
    id: 'colorDiamond',
    question: 'Add Fancy Color Diamonds to your piece',
    answers: ['None', 'Canary Yellow (Etsy Top Seller)', 'Pink Diamond (Romantic)', 'Blue Diamond (Rare Luxury)', 'Champagne Diamond (Warm Glow)', 'Black Diamond (Bold & Modern)', 'Teal / Green Diamond (Trending)', 'Orange Diamond (Unique)'],
    multi: true,
    hint: 'Canary Yellow + Pink = top color diamond searches on Etsy USA',
};

const Q_SIDE_DIAMONDS: Question = {
    id: 'sideDiamonds',
    question: 'Select your side & accent diamond styles',
    answers: ['None', 'Round Micro Pavé (Etsy Bestseller)', 'Channel-Set Baguettes (Vintage)', 'Tapered Baguettes (Art Deco)', 'Trillion Accents (Bold)', 'Half-Moon Accents (Unique)', 'Pavé Halo (Classic Glamour)', 'Bezel-Set Accents (Modern)', 'Milgrain Pavé (Trending UK/Europe)'],
    multi: true,
    hint: 'Pavé + Baguettes = most-saved combo on Etsy bridal boards',
};

function buildFlow(answers: Record<string, string | string[]>) {
    const flow: Question[] = [Q_PIECE_TYPE, Q_GENDER];

    const pt = Array.isArray(answers['pieceType']) ? answers['pieceType'][0] : answers['pieceType'];
    const g = Array.isArray(answers['gender']) ? answers['gender'][0] : answers['gender'];

    if (!pt || !g) return flow;
    const isMens = g === "Men's Collection";

    switch (pt) {
        case 'Ring':
            if (isMens) {
                flow.push({
                    id: 'ringOccasion',
                    question: 'What is the purpose of this ring?',
                    answers: ['Wedding / Commitment Band', 'Signature / Signet Ring', 'Everyday Band', 'Statement Right-Hand Ring']
                });
                const rOccasion = answers['ringOccasion'];
                if (!rOccasion) break;

                flow.push({
                    id: 'ringStyle',
                    question: 'Which silhouette describes your vision?',
                    answers: ['Classic Flat / D-Shape Band', 'Textured / Brushed Metal', 'Beveled Edge', 'Bold Signet (Oval/Square)', 'Diamond Accent / Channel Set']
                });

                const rStyle = Array.isArray(answers['ringStyle']) ? answers['ringStyle'][0] : answers['ringStyle'];
                if (!rStyle) break;

                if (rStyle === 'Diamond Accent / Channel Set') {
                    flow.push(Q_CENTER_DIAMOND, Q_STONE_SHAPE, Q_SIDE_DIAMONDS);
                }

                flow.push({
                    id: 'scale',
                    question: 'What is your preferred scale for the band?',
                    answers: ['Refined (~4mm)', 'Classic width (~6mm)', 'Substantial & Heavy (8mm+)']
                });
            } else {
                flow.push({
                    id: 'ringOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Engagement / Proposal', 'Wedding / Anniversary', 'Promise / Meaningful', 'Signet / Heritage', 'Statement / Cocktail', 'Everyday Fine']
                });

                const occasion = Array.isArray(answers['ringOccasion']) ? answers['ringOccasion'][0] : answers['ringOccasion'];
                if (!occasion) break;

                if (occasion === 'Engagement / Proposal' || occasion === 'Promise / Meaningful') {
                    flow.push({ id: 'ringStyle', question: 'Which ring silhouette is trending for you?', answers: ['Toi et Moi (Two Stone) ★ Trending', 'East-West Setting ★ Trending', 'Classic Solitaire (Timeless)', 'Radiant / Hidden Halo (Glamour)', 'Three-Stone', 'Vintage / Art Deco Milgrain'] });
                } else if (occasion === 'Wedding / Anniversary') {
                    flow.push({ id: 'ringStyle', question: 'Which silhouette describes your vision?', answers: ['Full Eternity Band', 'Half-Eternity', 'Classic Solid Band', 'Curved / Contour Fit', 'Five-Stone Statement', 'Cigar Band'] });
                } else if (occasion === 'Signet / Heritage') {
                    flow.push({ id: 'ringStyle', question: 'Which heritage style do you prefer?', answers: ['Heritage Signet (Oval/Square)', 'Classic Initial Signet', 'Modern Recessed Signet'] });
                } else {
                    flow.push({ id: 'ringStyle', question: 'Which silhouette describes your vision?', answers: ['Statement Cocktail Ring', 'Sculptural / Organic Form', 'Multi-Stone Cluster', 'Dome Ring'] });
                }

                const rStyle = Array.isArray(answers['ringStyle']) ? answers['ringStyle'][0] : answers['ringStyle'];
                const isPlainBand = rStyle === 'Classic Solid Band' || rStyle === 'Cigar Band' || (rStyle || '').includes('Signet') || rStyle === 'Dome Ring';

                if (!isPlainBand) {
                    flow.push(Q_CENTER_DIAMOND);
                    const cDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
                    const hasNoCenterStone = !cDiamond || cDiamond.includes('No Center Stone') && cDiamond.length === 1;
                    if (!hasNoCenterStone) {
                        flow.push(Q_STONE_SHAPE);
                        flow.push(Q_COLOR_DIAMOND);
                    }
                    flow.push(Q_SIDE_DIAMONDS);
                    flow.push({
                        id: 'settingProfile',
                        question: 'How should the stone sit on the hand?',
                        answers: ['Elevated & Prominent (Max Light)', 'Low Profile & Flush (Practical)', 'Secure Bezel Setting', 'Modern Tension Setting']
                    });
                }

                flow.push({
                    id: 'bandStyle',
                    question: 'How should the band be finished?',
                    answers: ['Flawless Polished Metal', 'Diamond Pavé Encrusted', 'Vintage Milgrain Detailing', 'Elegant Split Shank', 'Twisted / Braided Shank']
                });

                flow.push({
                    id: 'scale',
                    question: 'What is your preferred scale for the band?',
                    answers: ['Delicate & Minimal (~1.5mm)', 'Timeless & Classic (~2.0mm)', 'Bold & Substantial (3mm+)']
                });
            }
            break;

        case 'Necklace':
            if (isMens) {
                flow.push({
                    id: 'necklaceStyle',
                    question: 'Which silhouette do you envision?',
                    answers: ['Heavy Solid Chain', 'Dog Tag / Shield Pendant', 'Subtle Minimalist Pendant', 'Religious / Symbolic Cross']
                });
                const nStyle = Array.isArray(answers['necklaceStyle']) ? answers['necklaceStyle'][0] : answers['necklaceStyle'];
                if (!nStyle) break;
                flow.push(
                    { id: 'chainStyle', question: 'Which chain style do you prefer?', answers: ['Cuban Link', 'Rope Chain', 'Franco', 'Figaro', 'Box Chain'] },
                    { id: 'settingProfile', question: 'What finishing touches matter most?', answers: ['High-Polish Finish', 'Matte/Brushed Finish', 'Blackened / Oxidized Detailing'] }
                );
            } else {
                flow.push({
                    id: 'necklaceOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Everyday Minimalist', 'Bridal / Gala', 'Meaningful Gift', 'Statement Piece']
                });
                const nOccasion = Array.isArray(answers['necklaceOccasion']) ? answers['necklaceOccasion'][0] : answers['necklaceOccasion'];
                if (!nOccasion) break;

                if (nOccasion === 'Bridal / Gala' || nOccasion === 'Statement Piece') {
                    flow.push({ id: 'necklaceStyle', question: 'Which silhouette do you envision?', answers: ['Diamond Riviera / Tennis ★ Trending', 'Statement Lariat / Y-Drop', 'Elaborate Choker', 'Pear Drop Pendant', 'Station Necklace'] });
                } else {
                    flow.push({ id: 'necklaceStyle', question: 'Which silhouette do you envision?', answers: ['Delicate Solitaire Pendant ★ Etsy #1', 'Diamond Bar Necklace', 'Layered Chains (Stack)', 'Initials / Letter Pendant'] });
                }

                const nStyleVal = Array.isArray(answers['necklaceStyle']) ? answers['necklaceStyle'][0] : answers['necklaceStyle'];
                const isPlainChain = nStyleVal === 'Layered Chains' || nStyleVal === 'Diamond Bar Necklace';
                if (!isPlainChain) {
                    flow.push(Q_CENTER_DIAMOND);
                    const cDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
                    if (!cDiamond?.includes('No Center Stone') || cDiamond.length > 1) {
                        flow.push(Q_STONE_SHAPE, Q_COLOR_DIAMOND);
                    }
                    flow.push(Q_SIDE_DIAMONDS);
                    flow.push({ id: 'settingProfile', question: 'What finishing touches matter most?', answers: ['Four-Prong Classic', 'Secure Bezel Setting', 'Diamond Halo', 'Vintage Milgrain', 'Invisible Setting'] });
                }
                flow.push(
                    { id: 'chainStyle', question: 'Which chain style do you prefer?', answers: ['Classic Cable', 'Twisted Rope', 'Modern Paperclip', 'Eternity Tennis Chain', 'Solid Box', 'Delicate Snake'] },
                    { id: 'scale', question: 'How should the piece drape?', answers: ['Collar / Choker (14-16")', 'Classic Standard (18")', 'Elegant Mid-Chest (20-22")', 'Dramatic Long (24"+)'] }
                );
            }
            break;

        case 'Earrings':
            if (isMens) {
                flow.push(
                    { id: 'earringOccasion', question: 'What best describes the occasion?', answers: ['Everyday Signature', 'Statement / Event', 'Subtle Accent'] }
                );
                if (!answers['earringOccasion']) break;
                flow.push(
                    { id: 'format', question: 'How will these be worn?', answers: ['Single Earring (Left)', 'Single Earring (Right)', 'Matching Pair'] },
                    { id: 'earringStyle', question: 'Which silhouette do you envision?', answers: ['Solitaire Diamond Stud(s)', 'Classic Gold Huggie(s)', 'Pavé Cluster Stud(s)'] },
                    Q_CENTER_DIAMOND, Q_STONE_SHAPE
                );
            } else {
                flow.push({ id: 'earringOccasion', question: 'What milestone does this piece celebrate?', answers: ['Everyday Elegance', 'Bridal / Evening', 'Standout Statement', 'Bespoke Gift'] });
                if (!answers['earringOccasion']) break;
                const eOcc = Array.isArray(answers['earringOccasion']) ? answers['earringOccasion'][0] : answers['earringOccasion'];

                if (eOcc === 'Bridal / Evening' || eOcc === 'Standout Statement') {
                    flow.push({ id: 'earringStyle', question: 'Which silhouette do you envision?', answers: ['Diamond Chandelier', 'Elegant Drop / Teardrop', 'Diamond Cluster', 'Statement Hoops'] });
                } else {
                    flow.push({ id: 'earringStyle', question: 'Which silhouette do you envision?', answers: ['Classic Solitaire Studs', 'Diamond Huggies', 'Modern Ear Cuffs / Climbers'] });
                }

                flow.push(Q_CENTER_DIAMOND);
                const cDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
                if (!cDiamond?.includes('No Center Stone') || cDiamond.length > 1) {
                    flow.push(Q_STONE_SHAPE, Q_COLOR_DIAMOND);
                }
                flow.push(
                    Q_SIDE_DIAMONDS,
                    { id: 'settingProfile', question: 'What finishing touches matter most?', answers: ['Secure Bezel Setting', 'Minimalist Prong Setting', 'Pavé Diamond Halo', 'Vintage Milgrain', 'Invisible Setting'] },
                    { id: 'scale', question: 'What statement should these make?', answers: ['Petite / Minimal', 'Classic Proportions', 'Bold / Dramatic Statement'] }
                );
            }
            break;

        case 'Bracelet':
            if (isMens) {
                flow.push({ id: 'braceletOccasion', question: 'What best describes the occasion?', answers: ['Everyday Wear', 'Formal / Watch Stacker', 'Bold Statement Piece'] });
                if (!answers['braceletOccasion']) break;
                flow.push(
                    { id: 'braceletStyle', question: 'Which silhouette do you prefer?', answers: ['Heavy Link Chain', 'Solid Architect Cuff', 'Classic ID Bracelet', 'Woven Chain'] },
                    { id: 'settingProfile', question: 'What finishing touches matter most?', answers: ['High-Polish Gold', 'Brushed / Matte Finish', 'Subtle Diamond Accents'] }
                );
            } else {
                flow.push({ id: 'braceletOccasion', question: 'What milestone does this piece celebrate?', answers: ['Everyday Wear', 'Bridal / Red Carpet', 'Meaningful Gift'] });
                if (!answers['braceletOccasion']) break;
                const bOcc = Array.isArray(answers['braceletOccasion']) ? answers['braceletOccasion'][0] : answers['braceletOccasion'];

                if (bOcc === 'Bridal / Red Carpet') {
                    flow.push({ id: 'braceletStyle', question: 'Which silhouette do you prefer?', answers: ['Diamond Tennis Bracelet ★ Trending', 'Elaborate Diamond Cuff', 'Graduated Diamond Bangle'] });
                } else {
                    flow.push({ id: 'braceletStyle', question: 'Which silhouette do you prefer?', answers: ['Solid Gold Bangle', 'Classic Chain Link', 'Station Diamond Bracelet', 'Subtle Pavé Bar'] });
                }

                const bStyle = Array.isArray(answers['braceletStyle']) ? answers['braceletStyle'][0] : answers['braceletStyle'];
                const isPlainBracelet = bStyle === 'Solid Gold Bangle' || bStyle === 'Classic Chain Link';
                if (!isPlainBracelet) {
                    flow.push(Q_CENTER_DIAMOND);
                    const cDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
                    if (!cDiamond?.includes('No Center Stone') || cDiamond.length > 1) {
                        flow.push(Q_STONE_SHAPE, Q_COLOR_DIAMOND);
                    }
                    flow.push(Q_SIDE_DIAMONDS);
                }
                flow.push(
                    { id: 'bandStyle', question: 'How should the band be finished?', answers: ['Continuous Diamond (Tennis)', 'Flawless Solid Metal', 'Curated Charm Accents', 'Diamond Pavé Links', 'Milgrain Edge Detailing'] },
                    { id: 'scale', question: 'How should the piece fit on the wrist?', answers: ['Delicate & Fluid', 'Classic Standard', 'Substantial Solid Cuff'] }
                );
            }
            break;

        case 'Fine Jewelry Set':
            flow.push(
                { id: 'setOccasion', question: 'What occasion calls for this set?', answers: ['Bridal Suite (Engagement + Band) ★ #1', 'Wedding Jewelry Set', 'Heirloom Investment Set', 'Everyday Luxury Stack'] }
            );
            if (!answers['setOccasion']) break;
            flow.push(
                { id: 'setStyle', question: 'Which pieces comprise your set?', answers: ['Ring + Earrings (Most Popular)', 'Ring + Necklace', 'Ring + Earrings + Necklace', 'Full Bridal (Ring+Earrings+Necklace+Bracelet)'] },
                { id: 'ringStyle', question: 'Which core aesthetic anchors the collection?', answers: ['Classic Solitaire (Timeless)', 'Toi et Moi ★ Trending', 'Vintage / Art Deco', 'Radiant / Hidden Halo'] }
            );
            flow.push(Q_CENTER_DIAMOND);
            const sCDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
            if (!sCDiamond?.includes('No Center Stone') || sCDiamond.length > 1) {
                flow.push(Q_STONE_SHAPE, Q_COLOR_DIAMOND);
            }
            flow.push(
                Q_SIDE_DIAMONDS,
                { id: 'settingProfile', question: 'What unifying setting style ties the collection?', answers: ['Elevated Prong (Max Brilliance)', 'Secure Bezel (Modern)', 'Pavé Throughout', 'Vintage Milgrain Border', 'Mixed Setting (Designer Choice)'] },
                { id: 'scale', question: 'What scale defines this collection?', answers: ['Understated Elegance', 'Classic Proportions', 'Grand & Statement-Making'] }
            );
            break;

        case 'Stackable Ring Set':
            flow.push(
                { id: 'ringOccasion', question: 'What milestone does this stackable set celebrate?', answers: ['Engagement + Wedding Stack (Bridal)', 'Anniversary / Meaningful Stack', 'Mix & Match Fashion Stack'] }
            );
            if (!answers['ringOccasion']) break;
            flow.push(
                { id: 'stackCount', question: 'How many bands in the stack?', answers: ['2 Bands (Minimal)', '3 Bands (Classic)', '4–5 Bands (Statement)', 'Designer Choice'] },
                { id: 'bandStyle', question: 'Which band styles should be combined?', answers: ['All Diamond Pavé', 'Pavé + Plain Mixed', 'Twisted + Plain', 'Milgrain + Plain (Vintage)', 'All Plain Polished', 'Mix of All Styles'] }
            );
            flow.push(Q_CENTER_DIAMOND);
            const stackCDiamond = Array.isArray(answers['centerDiamond']) ? answers['centerDiamond'] : [answers['centerDiamond']];
            if (!stackCDiamond?.includes('No Center Stone') || stackCDiamond.length > 1) {
                flow.push(Q_STONE_SHAPE, Q_COLOR_DIAMOND);
            }
            flow.push(Q_SIDE_DIAMONDS);
            break;
    }

    // ─── Shared Ending ───
    flow.push(
        { id: 'metalColor', question: 'Which precious metal do you prefer?', answers: ['14k Yellow Gold (Etsy #1)', '14k White Gold', '18k Yellow Gold (Luxury)', '18k White Gold', '18k Rose Gold (Trending)', '14k Rose Gold', 'Platinum (Heirloom)', 'Bespoke Two-Tone'] },
        { id: 'style', question: 'Which defined aesthetic speaks to your style?', answers: ['Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'] },
        { id: 'budget', question: 'What is your comfortable investment range?', answers: ['Under $500', '$500 – $1,500', '$1,500 – $3,000', '$3,000 – $7,500', '$7,500 – $15,000', '$15,000+', 'I prefer not to set a limit'] }
    );

    return flow;
}

export const questions = [Q_PIECE_TYPE];

export default function AIStep1() {
    const router = useRouter();
    const { updateProfile } = useAIStudio();
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [multiSelected, setMultiSelected] = useState<string[]>([]);
    const [localAnswers, setLocalAnswers] = useState<Record<string, string | string[]>>({});

    const flow = buildFlow(localAnswers);
    const total = flow.length;
    const progress = (currentQ / total) * 100;
    const q = flow[Math.min(currentQ, total - 1)] || flow[flow.length - 1];
    const isMulti = q.multi === true;

    // ── Single-select answer ──
    const handleAnswer = (ans: string) => {
        setSelected(ans);
        const newAnswers = { ...localAnswers, [q.id]: ans };
        setLocalAnswers(newAnswers);
        updateProfile({ [q.id]: ans });

        setTimeout(() => {
            setSelected(null);
            const newFlow = buildFlow(newAnswers);
            if (currentQ < newFlow.length - 1) {
                setCurrentQ(c => c + 1);
            } else {
                router.push('/ai-studio/step-2');
            }
        }, 400);
    };

    // ── Multi-select toggle ──
    const toggleMulti = (ans: string) => {
        if (ans === 'None' || ans === 'No Center Stone') {
            setMultiSelected([ans]);
        } else {
            setMultiSelected(prev => {
                const filtered = prev.filter(a => a !== 'None' && a !== 'No Center Stone');
                return filtered.includes(ans) ? filtered.filter(a => a !== ans) : [...filtered, ans];
            });
        }
    };

    // ── Confirm multi-select and advance ──
    const handleMultiContinue = () => {
        const selection = multiSelected.length > 0 ? multiSelected : [q.answers[0]];
        const newAnswers = { ...localAnswers, [q.id]: selection };
        setLocalAnswers(newAnswers);
        updateProfile({ [q.id]: selection });
        setMultiSelected([]);

        const newFlow = buildFlow(newAnswers);
        if (currentQ < newFlow.length - 1) {
            setCurrentQ(c => c + 1);
        } else {
            router.push('/ai-studio/step-2');
        }
    };

    const handleSkip = () => {
        setMultiSelected([]);
        if (currentQ < total - 1) {
            setCurrentQ(c => c + 1);
        } else {
            router.push('/ai-studio/step-2');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.container}>
                <div className={styles.stepHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className={styles.stepMeta}>
                        <span className={styles.stepCount}>Question {currentQ + 1} of {total}</span>
                    </div>
                    <button
                        onClick={handleSkip}
                        style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.9rem', padding: '0.5rem' }}
                    >
                        Skip
                    </button>
                </div>

                <h2 className={styles.question}>{q.question}</h2>

                {isMulti && q.hint && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--stone)', marginBottom: '28px', marginTop: '-24px', fontStyle: 'italic', opacity: 0.8 }}>
                        {q.hint}
                    </p>
                )}

                {isMulti ? (
                    /* ── Multi-select grid of pill toggles ── */
                    <div>
                        <div className={multiStyles.multiGrid}>
                            {q.answers.map(ans => {
                                const isChosen = multiSelected.includes(ans);
                                return (
                                    <button
                                        key={ans}
                                        onClick={() => toggleMulti(ans)}
                                        className={`${multiStyles.multiPill} ${isChosen ? multiStyles.multiPillActive : ''}`}
                                    >
                                        <span className={multiStyles.multiCheck}>{isChosen ? '✓' : '+'}</span>
                                        <span>{ans}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'center' }}>
                            {multiSelected.length > 0 && (
                                <div style={{ fontFamily: 'var(--font-sc)', fontSize: '10px', letterSpacing: '0.15em', color: '#A88E5E', alignSelf: 'center' }}>
                                    {multiSelected.length} selected
                                </div>
                            )}
                            <button
                                onClick={handleMultiContinue}
                                style={{
                                    padding: '14px 48px',
                                    background: multiSelected.length > 0 ? '#A88E5E' : 'transparent',
                                    border: '1px solid #A88E5E',
                                    color: multiSelected.length > 0 ? '#fff' : '#A88E5E',
                                    fontFamily: 'var(--font-sc)',
                                    fontSize: '11px',
                                    letterSpacing: '0.25em',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                {multiSelected.length > 0 ? 'CONTINUE →' : 'SKIP'}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* ── Single-select answer cards ── */
                    <div className={styles.answerGrid}>
                        {q.answers.map(ans => (
                            <button
                                key={ans}
                                className={`${styles.answerCard} ${selected === ans ? styles.selected : ''}`}
                                onClick={() => handleAnswer(ans)}
                            >
                                <span className={styles.answerText}>{ans}</span>
                                <span className={styles.answerCheck}>✓</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
