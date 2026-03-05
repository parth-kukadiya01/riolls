'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

// ─── Static question definitions ──────────────────────────────────────────────

/** First two questions are always shown */
const Q_PIECE_TYPE = {
    id: 'pieceType',
    question: 'What type of piece are you commissioning?',
    answers: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'],
};

const Q_GENDER = {
    id: 'gender',
    question: 'Who will be wearing this creation?',
    answers: ['Gentlemen', 'Ladies', 'Unisex / Universal'],
};

function buildFlow(answers: Record<string, string>) {
    const flow: { id: string; question: string; answers: string[] }[] = [
        Q_PIECE_TYPE,
        Q_GENDER,
    ];

    const pt = answers['pieceType'];
    const g = answers['gender'];

    if (!pt || !g) return flow;

    switch (pt) {
        case 'Ring':
            if (g === 'Gentlemen') {
                flow.push({
                    id: 'ringOccasion',
                    question: 'What is the purpose of this ring?',
                    answers: ['Wedding / Commitment Band', 'Signature / Signet Core', 'Statement Pinky / Right Hand', 'Bespoke Gift']
                });
                const rOccasion = answers['ringOccasion'];
                if (!rOccasion) break;

                flow.push({
                    id: 'ringStyle',
                    question: 'Which silhouette describes your vision?',
                    answers: ['Classic Flat / D-Shape Band', 'Textured / Brushed Metal', 'Diamond Accent / Channel Set', 'Bold Signet (Oval/Square)', 'Multi-stone Chunky']
                });

                const rStyle = answers['ringStyle'] || '';
                if (!rStyle) break;

                flow.push({
                    id: 'scale',
                    question: 'What is your preferred scale for the band?',
                    answers: ['Refined (~4mm)', 'Classic width (~6mm)', 'Substantial & Heavy (8mm+)']
                });
            } else {
                // 1. Occasion / Purpose
                flow.push({
                    id: 'ringOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Engagement', 'Wedding / Anniversary', 'Personal Collection', 'Promise / Meaning', 'Signet / Heritage', 'A Gift for Someone Special']
                });

                const occasion = answers['ringOccasion'];
                if (!occasion) break;

                // 2. Ring Style (Branching based on Occasion)
                if (occasion === 'Engagement' || occasion === 'Promise / Meaning') {
                    flow.push({ id: 'ringStyle', question: 'Which silhouette describes your vision?', answers: ['Classic Solitaire', 'Radiant Halo', 'Hidden Halo Details', 'Three-Stone / Trinity', 'Toi et Moi (Two Stone)', 'Vintage / Art Deco', 'Bespoke Concept'] });
                } else if (occasion === 'Wedding / Anniversary') {
                    flow.push({ id: 'ringStyle', question: 'Which silhouette describes your vision?', answers: ['Full Eternity Band', 'Half-Eternity', 'Classic Solid Band', 'Curved / Contour Fit', 'Five-Stone statement', 'Bespoke Concept'] });
                } else if (occasion === 'Signet / Heritage') {
                    flow.push({ id: 'ringStyle', question: 'Which heritage style do you prefer?', answers: ['Classic Oval / Round', 'Modern Square / Cushion', 'Heritage Shield / Crest', 'Bespoke Concept'] });
                } else { // Fashion or Gift
                    flow.push({ id: 'ringStyle', question: 'Which silhouette describes your vision?', answers: ['Statement Cocktail Ring', 'Classic Signet', 'Refined Pinky Ring', 'Bold Cigar Band', 'Multi-Stone Cluster', 'Bespoke Concept'] });
                }

                // 3. Primary Stone Type
                const rStyle = answers['ringStyle'] || '';
                const isPlainBand = rStyle === 'Classic Solid Band' || rStyle.includes('Signet') || rStyle === 'Bold Cigar Band';

                if (!isPlainBand) {
                    flow.push({
                        id: 'primaryStone',
                        question: 'Which center stone do you desire?',
                        answers: ['Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lab-Grown / Moissanite', 'Lustrous Pearl', 'Solid High-Polish Metal']
                    });

                    // 4. Stone Cut
                    const pStone = answers['primaryStone'];
                    if (pStone && pStone !== 'Solid High-Polish Metal' && pStone !== 'Lustrous Pearl') {
                        flow.push({
                            id: 'stoneShape',
                            question: 'Which cut captures your imagination?',
                            answers: ['Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut', 'Radiant Cut', 'Marquise', 'Asscher Cut']
                        });
                    }

                    // 5. Setting Profile & Details
                    flow.push({
                        id: 'settingProfile',
                        question: 'How should the stone sit on the hand?',
                        answers: ['Elevated & Prominent (Max Light)', 'Low Profile & Flush (Practicality)', 'Secure Bezel Setting', 'Modern Tension Setting', 'Trust the Designer']
                    });
                }

                // 6. Band / Shank Style
                flow.push({
                    id: 'bandStyle',
                    question: 'How should the band be finished?',
                    answers: ['Flawless Polished Metal', 'Diamond Pavé Encrusted', 'Vintage Milgrain Detailing', 'Elegant Split Shank', 'Interlocking / Braided']
                });

                // 7. Band Thickness / Scale
                flow.push({
                    id: 'scale',
                    question: 'What is your preferred scale for the band?',
                    answers: ['Delicate & Minimal (~1.5mm)', 'Timeless & Classic (~2.0mm)', 'Bold & Substantial (3mm+)']
                });
            }
            break;

        case 'Necklace':
            if (g === 'Gentlemen') {
                flow.push({
                    id: 'necklaceStyle',
                    question: 'Which silhouette do you envision?',
                    answers: ['Heavy Solid Chain', 'Dog Tag / Shield Pendant', 'Subtle Minimalist Pendant', 'Religious / Symbolic Cross', 'Classic Mid-Weight Chain']
                });

                const nStyle = answers['necklaceStyle'] || '';
                if (!nStyle) break;

                flow.push({
                    id: 'chainStyle',
                    question: 'Which chain style do you prefer?',
                    answers: ['Cuban Link', 'Rope Chain', 'Franco', 'Figaro', 'Box Chain']
                });

                flow.push({
                    id: 'settingProfile',
                    question: 'What finishing touches matter most?',
                    answers: ['High-Polish Finish', 'Matte/Brushed Finish', 'Blackened / Oxidized Detailing', 'Diamond/Gemstone Accents']
                });
            } else {
                // 1. Occasion / Purpose
                flow.push({
                    id: 'necklaceOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Bridal / Gala', 'Personal Milestone', 'Everyday Signature', 'Meaningful Gift', 'Bespoke Concept']
                });

                const nOccasion = answers['necklaceOccasion'];
                if (!nOccasion) break;

                // 2. Necklace Style (Branching based on Occasion)
                if (nOccasion === 'Bridal / Gala') {
                    flow.push({ id: 'necklaceStyle', question: 'Which silhouette do you envision?', answers: ['Diamond Riviera', 'Statement Y-Drop', 'Elaborate Choker', 'Pear Drop Pendant', 'Bespoke Concept'] });
                } else {
                    flow.push({ id: 'necklaceStyle', question: 'Which silhouette do you envision?', answers: ['Delicate Solitaire', 'Classic Paperclip', 'Layered Chains', 'Initials / Zodiac', 'Bespoke Concept'] });
                }

                // 3. Primary Stone Type
                const nStyle = answers['necklaceStyle'] || '';
                const isPlainChain = nStyle === 'Classic Paperclip' || nStyle === 'Layered Chains';

                if (!isPlainChain) {
                    flow.push({
                        id: 'primaryStone',
                        question: 'Which center stone do you desire?',
                        answers: ['Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal']
                    });

                    // 4. Stone Cut
                    const pStone = answers['primaryStone'];
                    if (pStone && pStone !== 'Solid High-Polish Metal' && pStone !== 'Lustrous Pearl') {
                        flow.push({
                            id: 'stoneShape',
                            question: 'Which cut captures your imagination?',
                            answers: ['Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut', 'Radiant Cut']
                        });
                    }

                    // 5. Setting / Pendant Details
                    flow.push({
                        id: 'settingProfile',
                        question: 'What finishing touches matter most?',
                        answers: ['Four-Prong Classic', 'Secure Bezel Setting', 'Diamond Halo', 'Vintage Milgrain']
                    });
                }

                // 6. Chain Style
                flow.push({
                    id: 'chainStyle',
                    question: 'Which chain style do you prefer?',
                    answers: ['Classic Cable', 'Twisted Rope', 'Modern Paperclip', 'Eternity Tennis Chain', 'Solid Box', 'Fluid Snake']
                });

                // 7. Length / Scale
                flow.push({
                    id: 'scale',
                    question: 'How should the piece drape?',
                    answers: ['Collar / Choker (14-16")', 'Classic Standard (18")', 'Elegant Mid-Chest (20-22")', 'Dramatic Long (24"+)']
                });
            }
            break;

        case 'Earrings':
            if (g === 'Gentlemen') {
                flow.push({
                    id: 'earringOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Everyday Signature', 'Statement / Event', 'Subtle Accent']
                });
                const eOccasion = answers['earringOccasion'];
                if (!eOccasion) break;

                flow.push({
                    id: 'earringStyle',
                    question: 'Which silhouette do you envision?',
                    answers: ['Solitaire Diamond Stud(s)', 'Classic Gold Huggie(s)', 'Modern Ear Cuff', 'Dangling Cross / Motif', 'Pavé Cluster Stud(s)']
                });

                flow.push({
                    id: 'format',
                    question: 'How will these be worn?',
                    answers: ['Single Earring (Left)', 'Single Earring (Right)', 'Matching Pair']
                });

                flow.push({
                    id: 'primaryStone',
                    question: 'Which stone or finish do you desire?',
                    answers: ['Brilliant White Diamond', 'Striking Black Diamond', 'Sleek Onyx', 'Solid High-Polish Gold']
                });
            } else {
                // 1. Occasion / Purpose
                flow.push({
                    id: 'earringOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Bridal / Black Tie', 'Everyday Elegance', 'Statement / Editorial', 'Bespoke Gift']
                });

                const eOccasion = answers['earringOccasion'];
                if (!eOccasion) break;

                // 2. Earring Style
                if (eOccasion === 'Bridal / Black Tie') {
                    flow.push({ id: 'earringStyle', question: 'Which silhouette do you envision?', answers: ['Diamond Chandelier', 'Elegant Teardrop / Drop', 'Diamond Cluster', 'Classic Pearl Drop', 'Bespoke Concept'] });
                } else {
                    flow.push({ id: 'earringStyle', question: 'Which silhouette do you envision?', answers: ['Classic Solitaire Studs', 'Subtle Huggies', 'Statement Hoops', 'Modern Ear Cuffs', 'Bespoke Concept'] });
                }

                // 3. Primary Stone Type
                flow.push({
                    id: 'primaryStone',
                    question: 'Which center stone do you desire?',
                    answers: ['Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal']
                });

                // 4. Stone Cut
                const eStone = answers['primaryStone'];
                if (eStone && eStone !== 'Solid High-Polish Metal' && eStone !== 'Lustrous Pearl') {
                    flow.push({
                        id: 'stoneShape',
                        question: 'Which cut captures your imagination?',
                        answers: ['Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut', 'Radiant Cut']
                    });
                }

                // 5. Setting Profile & Details
                flow.push({
                    id: 'settingProfile',
                    question: 'What finishing touches matter most?',
                    answers: ['Secure Bezel Setting', 'Minimalist Prong Setting', 'Pavé Diamond Halo', 'Vintage Milgrain']
                });

                // 6. Size / Scale
                flow.push({
                    id: 'scale',
                    question: 'What statement should these make?',
                    answers: ['Petite & Minimal Everyday', 'Timeless Classic Proportions', 'Bold & Dramatic Statement']
                });
            }
            break;

        case 'Bracelet':
            if (g === 'Gentlemen') {
                flow.push({
                    id: 'braceletOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Everyday Signature', 'Formal / Watch Stacker', 'Bold Statement Piece']
                });

                const bOccasion = answers['braceletOccasion'];
                if (!bOccasion) break;

                flow.push({
                    id: 'braceletStyle',
                    question: 'Which silhouette do you prefer?',
                    answers: ['Heavyweight Cuban Link', 'Solid Architectual Cuff', 'Classic ID Bracelet', 'Woven Chain / Leather Integration', 'Diamond Tennis Bracelet (Mens)']
                });

                flow.push({
                    id: 'settingProfile',
                    question: 'What finishing touches matter most?',
                    answers: ['High-Polish Gold', 'Brushed / Matte Finish', 'Subtle Black Diamond Accents', 'Heavy Iced-Out Links']
                });
            } else {
                // 1. Occasion / Purpose
                flow.push({
                    id: 'braceletOccasion',
                    question: 'What milestone does this piece celebrate?',
                    answers: ['Bridal / Red Carpet', 'Everyday Signature', 'Meaningful Milestone', 'Bespoke Gift']
                });

                const bOccasion = answers['braceletOccasion'];
                if (!bOccasion) break;

                // 2. Bracelet Style
                if (bOccasion === 'Bridal / Red Carpet') {
                    flow.push({ id: 'braceletStyle', question: 'Which silhouette do you prefer?', answers: ['Four-Prong Tennis Bracelet', 'Bezel-Set Tennis Bracelet', 'Elaborate Diamond Cuff', 'Bespoke Concept'] });
                } else {
                    flow.push({ id: 'braceletStyle', question: 'Which silhouette do you prefer?', answers: ['Solid Gold Bangle', 'Classic Chain Link', 'Subtle Pavé Bar', 'Custom Charm Bracelet', 'Bespoke Concept'] });
                }

                // 3. Primary Stone Type
                const bStyle = answers['braceletStyle'] || '';
                const isPlainBracelet = bStyle === 'Solid Gold Bangle' || bStyle === 'Classic Chain Link';

                if (!isPlainBracelet) {
                    flow.push({
                        id: 'primaryStone',
                        question: 'Which center stone do you desire?',
                        answers: ['Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal']
                    });

                    // 4. Stone Cut
                    const bStone = answers['primaryStone'];
                    if (bStone && bStone !== 'Solid High-Polish Metal' && bStone !== 'Lustrous Pearl') {
                        flow.push({
                            id: 'stoneShape',
                            question: 'Which cut captures your imagination?',
                            answers: ['Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Princess Cut']
                        });
                    }
                }

                // 5. Detailing / Link Style
                flow.push({
                    id: 'bandStyle',
                    question: 'How should the band be finished?',
                    answers: ['Continuous Diamond (Tennis)', 'Flawless Solid Metal', 'Curated Charm Accents', 'Diamond Pavé Links']
                });

                // 6. Fit / Scale
                flow.push({
                    id: 'scale',
                    question: 'How should the piece fit on the wrist?',
                    answers: ['Delicate & Fluid', 'Timeless Everyday Wear', 'Substantial Solid Cuff']
                });
            }
            break;

        case 'Hip Hop / Iced Out':
            // 1. Core Focus
            flow.push({
                id: 'hipHopStyle',
                question: 'Which statement piece are you commissioning?',
                answers: ['Custom Pendant & Chain', 'Heavyweight Chain Only', 'Precision Grillz', 'Statement Watch / Bracelet', 'Iced Out Rings']
            });

            const hs = answers['hipHopStyle'] || '';
            if (!hs) break;

            const isChainOrPendantHH = hs === 'Custom Pendant & Chain' || hs === 'Heavyweight Chain Only';
            const isGrillz = hs === 'Precision Grillz';
            const isHHRing = hs === 'Iced Out Rings';

            if (isChainOrPendantHH) {
                flow.push({
                    id: 'chainStyle',
                    question: 'Which link style commands attention?',
                    answers: ['Heavyweight Cuban Link', 'Miami Cuban Link', 'Diamond Rope Chain', 'Eternity Tennis Chain', 'Franco Link', 'Figaro Link']
                });

                if (hs === 'Custom Pendant & Chain') {
                    flow.push({
                        id: 'pendantType',
                        question: 'What centerpiece should we craft?',
                        answers: ['Bespoke Nameplate', 'Custom Logo / Brand Icon', 'Meaningful Cross / Religious', 'Classic Symbols']
                    });
                }
            } else if (isGrillz) {
                flow.push({
                    id: 'grillz',
                    question: 'How should we build the Grillz?',
                    answers: ['Full Set (Top + Bottom)', 'Top Only', 'Bottom Only', 'Custom Diamond Fangs']
                });
            } else if (isHHRing) {
                flow.push({
                    id: 'ringStyle',
                    question: 'Which silhouette describes your vision?',
                    answers: ['Pinky Ring', 'Championship Style Ring', 'Multi-Finger Ring', 'Bespoke Concept']
                });
            }

            // Ice & Scale
            flow.push(
                { id: 'iceLevel', question: 'What level of brilliance do you desire?', answers: ['Flawless VVS Fully Iced', 'Heavy Diamond Accents', 'Subtle Diamond Shimmer', 'Solid High-Polish Metal'] },
                { id: 'scale', question: 'How substantial should the piece be?', answers: ['Classic Proportions', 'Oversized & Bold', 'Massive Heavyweight'] }
            );
            break;
    }

    // ─── Shared Ending (All paths get this) ───
    flow.push(
        {
            id: 'metalColor',
            question: 'Which precious metal do you prefer?',
            answers: ['18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Silver', 'Bespoke Two-Tone']
        },
        {
            id: 'style',
            question: 'Which design philosophy speaks to you?',
            answers: ['Timeless & Classic', 'Bold & Unapologetic', 'Romantic & Delicate', 'Architectural & Minimalist', 'Vintage & Art Deco', 'Avant-Garde & Modern']
        },
        {
            id: 'budget',
            question: 'What is your comfortable investment range?',
            answers: ['Under $1,000', '$1,000 - $2,000', '$2,000 – $5,000', '$5,000 – $8,000', '$8,000+', 'I prefer not to set a limit']
        }
    );

    return flow;
}

// Dummy export for references if needed, though dynamically built
export const questions = [Q_PIECE_TYPE];

export default function AIStep1() {
    const router = useRouter();
    const { updateProfile } = useAIStudio();
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [localAnswers, setLocalAnswers] = useState<Record<string, string>>({});

    // Dynamic flow re-builds based on current answers
    const flow = buildFlow(localAnswers);
    const total = flow.length;
    const progress = (currentQ / total) * 100;
    const q = flow[Math.min(currentQ, total - 1)] || flow[flow.length - 1];

    const handleAnswer = (ans: string) => {
        setSelected(ans);

        const newAnswers = { ...localAnswers, [q.id]: ans };
        setLocalAnswers(newAnswers);

        // Push to global context
        updateProfile({ [q.id]: ans });

        setTimeout(() => {
            setSelected(null);
            // Re-evaluate the flow length with the new answers
            const newFlow = buildFlow(newAnswers);
            if (currentQ < newFlow.length - 1) {
                setCurrentQ(c => c + 1);
            } else {
                router.push('/ai-studio/step-2');
            }
        }, 400);
    };

    const handleSkip = () => {
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
            </div>
        </div>
    );
}
