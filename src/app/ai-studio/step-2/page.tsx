'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';
import { useAuth } from '@/context/AuthContext';

// Style tags — standard & hip-hop specific
const STYLE_TAGS_STANDARD = ['Romantic', 'Bold', 'Minimal', 'Editorial', 'Celestial', 'Vintage', 'Maximalist', 'Architectural'];
const STYLE_TAGS_HIPHOP = ['Street', 'Iced Out', 'Custom', 'Drip', 'Luxury', 'Old School', 'Timeless', 'Statement'];

const get = (val: string | string[] | undefined) => (Array.isArray(val) ? val[0] : val) ?? '';

export default function AIStep2() {
    const router = useRouter();
    const { state, updateProfile, generateIdeas } = useAIStudio();
    const { user } = useAuth();

    const p = state.profile;
    const isHipHop = get(p.pieceType) === 'Hip Hop / Iced Out';

    const dynamicTokens = useMemo(() => {
        const pt = get(p.pieceType) || 'Ring';
        const metalColor = get(p.metalColor) || '18k Yellow Gold';
        const style = get(p.style) || 'Timeless & Classic';
        const scale = get(p.scale) || 'Classic Standard (18")';

        if (pt === 'Hip Hop / Iced Out') {
            const iceLevel = get(p.iceLevel) || 'Flawless VVS Fully Iced';
            const chainStyle = get(p.chainStyle) || 'Heavyweight Cuban Link';
            const pendant = get(p.pendantType) || 'Bespoke Nameplate';
            const hipHopStyle = get(p.hipHopStyle) || 'Custom Pendant & Chain';
            const ringStyle = get(p.ringStyle) || 'Championship Style Ring';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'])) },
                { id: 'hipHopStyle', label: 'Piece', options: Array.from(new Set([hipHopStyle, 'Custom Pendant & Chain', 'Heavyweight Chain Only', 'Precision Grillz', 'Statement Watch / Bracelet', 'Iced Out Rings'])) }
            ];

            if (hipHopStyle === 'Custom Pendant & Chain' || hipHopStyle === 'Heavyweight Chain Only') {
                tokens.push({ id: 'chainStyle', label: 'Chain Style', options: Array.from(new Set([chainStyle, 'Heavyweight Cuban Link', 'Miami Cuban Link', 'Diamond Rope Chain', 'Eternity Tennis Chain', 'Franco Link', 'Figaro Link'])) });
                if (hipHopStyle === 'Custom Pendant & Chain') {
                    tokens.push({ id: 'pendantType', label: 'Pendant', options: Array.from(new Set([pendant, 'Bespoke Nameplate', 'Custom Logo / Brand Icon', 'Meaningful Cross / Religious', 'Classic Symbols'])) });
                }
            } else if (hipHopStyle === 'Iced Out Rings') {
                tokens.push({ id: 'ringStyle', label: 'Ring', options: Array.from(new Set([ringStyle, 'Pinky Ring', 'Championship Style Ring', 'Multi-Finger Ring', 'Bespoke Concept'])) });
            }

            tokens.push(
                { id: 'iceLevel', label: 'Ice Level', options: Array.from(new Set([iceLevel, 'Flawless VVS Fully Iced', 'Heavy Diamond Accents', 'Subtle Diamond Shimmer', 'Solid High-Polish Metal'])) },
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Classic Proportions', 'Oversized & Bold', 'Massive Heavyweight'])) },
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Silver', 'Bespoke Two-Tone'])) }
            );

            return tokens;
        }

        if (pt === 'Necklace') {
            const nOccasion = get(p.necklaceOccasion) || 'Everyday Signature';
            const pieceStyle = get(p.necklaceStyle) || 'Statement Pendant';
            const chainType = get(p.chainStyle) || 'Classic Cable';
            const primaryStone = get(p.primaryStone) || 'Natural Diamond';
            const stoneShape = get(p.stoneShape) || 'Round Brilliant';
            const settingProfile = get(p.settingProfile) || 'Four-Prong Classic';
            const isGentlemen = get(p.gender) === 'Gentlemen';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'])) }
            ];

            if (isGentlemen) {
                tokens.push(
                    { id: 'necklaceStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Heavy Solid Chain', 'Dog Tag / Shield Pendant', 'Subtle Minimalist Pendant', 'Religious / Symbolic Cross', 'Classic Mid-Weight Chain'])) },
                    { id: 'chainStyle', label: 'Chain', options: Array.from(new Set([chainType, 'Cuban Link', 'Rope Chain', 'Franco', 'Figaro', 'Box Chain'])) },
                    { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'High-Polish Finish', 'Matte/Brushed Finish', 'Blackened / Oxidized Detailing', 'Diamond/Gemstone Accents'])) }
                );
            } else {
                tokens.push(
                    { id: 'necklaceOccasion', label: 'Occasion', options: Array.from(new Set([nOccasion, 'Bridal / Gala', 'Personal Milestone', 'Everyday Signature', 'Meaningful Gift', 'Bespoke Concept'])) },
                    { id: 'necklaceStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Diamond Riviera', 'Statement Y-Drop', 'Elaborate Choker', 'Pear Drop Pendant', 'Delicate Solitaire', 'Classic Paperclip', 'Layered Chains', 'Initials / Zodiac'])) }
                );
                const isPlainChain = pieceStyle === 'Classic Paperclip' || pieceStyle === 'Layered Chains';
                if (!isPlainChain) {
                    tokens.push({ id: 'primaryStone', label: 'Stone', options: Array.from(new Set([primaryStone, 'Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal'])) });
                    if (primaryStone !== 'Solid High-Polish Metal' && primaryStone !== 'Lustrous Pearl') {
                        tokens.push({ id: 'stoneShape', label: 'Cut', options: Array.from(new Set([stoneShape, 'Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut', 'Radiant Cut'])) });
                    }
                    tokens.push({ id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Four-Prong Classic', 'Secure Bezel Setting', 'Diamond Halo', 'Vintage Milgrain'])) });
                }
                tokens.push(
                    { id: 'chainStyle', label: 'Chain', options: Array.from(new Set([chainType, 'Classic Cable', 'Twisted Rope', 'Modern Paperclip', 'Eternity Tennis Chain', 'Solid Box', 'Fluid Snake'])) },
                    { id: 'scale', label: 'Length', options: Array.from(new Set([scale, 'Collar / Choker (14-16")', 'Classic Standard (18")', 'Elegant Mid-Chest (20-22")', 'Dramatic Long (24"+)'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '9k Rose Gold', '9k White Gold', '9k Yellow Gold', '14k Rose Gold', '14k White Gold', '14k Yellow Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Silver', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Timeless & Classic', 'Bold & Unapologetic', 'Romantic & Delicate', 'Architectural & Minimalist', 'Vintage & Art Deco', 'Avant-Garde & Modern'])) }
            );
            return tokens;
        }

        if (pt === 'Earrings') {
            const occasion = get(p.earringOccasion) || 'Everyday Elegance';
            const pieceStyle = get(p.earringStyle) || 'Classic Solitaire Studs';
            const primaryStone = get(p.primaryStone) || 'Natural Diamond';
            const stoneShape = get(p.stoneShape) || 'Round Brilliant';
            const settingProfile = get(p.settingProfile) || 'Minimalist Prong Setting';
            const format = get(p.format) || 'Matching Pair';
            const isGentlemen = get(p.gender) === 'Gentlemen';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'])) }
            ];

            if (isGentlemen) {
                tokens.push(
                    { id: 'earringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Signature', 'Statement / Event', 'Subtle Accent'])) },
                    { id: 'earringStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Solitaire Diamond Stud(s)', 'Classic Gold Huggie(s)', 'Modern Ear Cuff', 'Dangling Cross / Motif', 'Pavé Cluster Stud(s)'])) },
                    { id: 'format', label: 'Format', options: Array.from(new Set([format, 'Single Earring (Left)', 'Single Earring (Right)', 'Matching Pair'])) },
                    { id: 'primaryStone', label: 'Stone', options: Array.from(new Set([primaryStone, 'Brilliant White Diamond', 'Striking Black Diamond', 'Sleek Onyx', 'Solid High-Polish Gold'])) }
                );
            } else {
                tokens.push(
                    { id: 'earringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Bridal / Black Tie', 'Everyday Elegance', 'Statement / Editorial', 'Bespoke Gift'])) },
                    { id: 'earringStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Diamond Chandelier', 'Elegant Teardrop / Drop', 'Diamond Cluster', 'Classic Pearl Drop', 'Classic Solitaire Studs', 'Subtle Huggies', 'Statement Hoops', 'Modern Ear Cuffs', 'Bespoke Concept'])) },
                    { id: 'primaryStone', label: 'Stone', options: Array.from(new Set([primaryStone, 'Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal'])) }
                );

                if (primaryStone !== 'Solid High-Polish Metal' && primaryStone !== 'Lustrous Pearl') {
                    tokens.push({ id: 'stoneShape', label: 'Cut', options: Array.from(new Set([stoneShape, 'Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut', 'Radiant Cut'])) });
                }

                tokens.push(
                    { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Secure Bezel Setting', 'Minimalist Prong Setting', 'Pavé Diamond Halo', 'Vintage Milgrain'])) },
                    { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Petite & Minimal Everyday', 'Timeless Classic Proportions', 'Bold & Dramatic Statement'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '9k Yellow Gold', '9k White Gold', '9k Rose Gold', '14k Yellow Gold', '14k White Gold', '14k Rose Gold', 'Silver', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Timeless & Classic', 'Bold & Unapologetic', 'Romantic & Delicate', 'Architectural & Minimalist', 'Vintage & Art Deco', 'Avant-Garde & Modern'])) }
            );
            return tokens;
        }

        if (pt === 'Bracelet') {
            const occasion = get(p.braceletOccasion) || 'Everyday Signature';
            const pieceStyle = get(p.braceletStyle) || 'Eternity Tennis Bracelet';
            const primaryStone = get(p.primaryStone) || 'Natural Diamond';
            const stoneShape = get(p.stoneShape) || 'Round Brilliant';
            const bandStyle = get(p.bandStyle) || 'Continuous Diamond (Tennis)';
            const settingProfile = get(p.settingProfile) || 'High-Polish Gold';
            const isGentlemen = get(p.gender) === 'Gentlemen';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'])) }
            ];

            if (isGentlemen) {
                tokens.push(
                    { id: 'braceletOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Signature', 'Formal / Watch Stacker', 'Bold Statement Piece'])) },
                    { id: 'braceletStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Heavyweight Cuban Link', 'Solid Architectual Cuff', 'Classic ID Bracelet', 'Woven Chain / Leather Integration', 'Diamond Tennis Bracelet (Mens)'])) },
                    { id: 'settingProfile', label: 'Finish', options: Array.from(new Set([settingProfile, 'High-Polish Gold', 'Brushed / Matte Finish', 'Subtle Black Diamond Accents', 'Heavy Iced-Out Links'])) }
                );
            } else {
                tokens.push(
                    { id: 'braceletOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Bridal / Red Carpet', 'Everyday Signature', 'Meaningful Milestone', 'Bespoke Gift'])) },
                    { id: 'braceletStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Four-Prong Tennis Bracelet', 'Bezel-Set Tennis Bracelet', 'Elaborate Diamond Cuff', 'Solid Gold Bangle', 'Classic Chain Link', 'Subtle Pavé Bar', 'Custom Charm Bracelet', 'Bespoke Concept'])) }
                );

                const isPlainBracelet = pieceStyle === 'Solid Gold Bangle' || pieceStyle === 'Classic Chain Link';
                if (!isPlainBracelet) {
                    tokens.push({ id: 'primaryStone', label: 'Stone', options: Array.from(new Set([primaryStone, 'Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lustrous Pearl', 'Solid High-Polish Metal'])) });
                    if (primaryStone !== 'Solid High-Polish Metal' && primaryStone !== 'Lustrous Pearl') {
                        tokens.push({ id: 'stoneShape', label: 'Cut', options: Array.from(new Set([stoneShape, 'Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Princess Cut'])) });
                    }
                }

                tokens.push(
                    { id: 'bandStyle', label: 'Detail', options: Array.from(new Set([bandStyle, 'Continuous Diamond (Tennis)', 'Flawless Solid Metal', 'Curated Charm Accents', 'Diamond Pavé Links'])) },
                    { id: 'scale', label: 'Fit', options: Array.from(new Set([scale, 'Delicate & Fluid', 'Timeless Everyday Wear', 'Substantial Solid Cuff'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '9k Yellow Gold', '9k White Gold', '9k Rose Gold', '14k Yellow Gold', '14k White Gold', '14k Rose Gold', 'Silver', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Timeless & Classic', 'Bold & Unapologetic', 'Romantic & Delicate', 'Architectural & Minimalist', 'Vintage & Art Deco', 'Avant-Garde & Modern'])) }
            );
            return tokens;
        }

        // Ring
        const occasion = get(p.ringOccasion) || 'Engagement';
        const ringStyle = get(p.ringStyle) || 'Classic Solitaire';
        const primaryStone = get(p.primaryStone) || 'Natural Diamond';
        const stoneShape = get(p.stoneShape) || 'Round Brilliant';
        const settingProfile = get(p.settingProfile) || 'Elevated & Prominent (Max Light)';
        const bandStyle = get(p.bandStyle) || 'Flawless Polished Metal';
        const isGentlemen = get(p.gender) === 'Gentlemen';

        const ringTokens = [
            { id: 'pieceType', label: 'Piece', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Hip Hop / Iced Out'])) }
        ];

        if (isGentlemen) {
            ringTokens.push(
                { id: 'ringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Wedding / Commitment Band', 'Signature / Signet Core', 'Statement Pinky / Right Hand', 'Bespoke Gift'])) },
                { id: 'ringStyle', label: 'Style', options: Array.from(new Set([ringStyle, 'Classic Flat / D-Shape Band', 'Textured / Brushed Metal', 'Diamond Accent / Channel Set', 'Bold Signet (Oval/Square)', 'Multi-stone Chunky'])) },
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Refined (~4mm)', 'Classic width (~6mm)', 'Substantial & Heavy (8mm+)'])) }
            );
        } else {
            ringTokens.push(
                { id: 'ringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Engagement', 'Wedding / Anniversary', 'Personal Collection', 'Promise / Meaning', 'Signet / Heritage'])) },
                { id: 'ringStyle', label: 'Style', options: Array.from(new Set([ringStyle, 'Classic Solitaire', 'Radiant Halo', 'Full Eternity Band', 'Statement Cocktail Ring', 'Classic Signet'])) }
            );

            // Add stone tokens if applicable
            if (primaryStone && primaryStone !== 'Solid High-Polish Metal') {
                ringTokens.push(
                    { id: 'primaryStone', label: 'Stone', options: Array.from(new Set([primaryStone, 'Natural Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Lab-Grown / Moissanite', 'Lustrous Pearl'])) }
                );
                if (primaryStone !== 'Lustrous Pearl') {
                    ringTokens.push(
                        { id: 'stoneShape', label: 'Cut', options: Array.from(new Set([stoneShape, 'Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Pear Shape', 'Cushion Cut', 'Princess Cut'])) }
                    );
                }
                ringTokens.push(
                    { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Elevated & Prominent (Max Light)', 'Low Profile & Flush (Practicality)', 'Secure Bezel Setting', 'Modern Tension Setting'])) }
                );
            }

            ringTokens.push(
                { id: 'bandStyle', label: 'Band', options: Array.from(new Set([bandStyle, 'Flawless Polished Metal', 'Diamond Pavé Encrusted', 'Vintage Milgrain Detailing', 'Elegant Split Shank', 'Interlocking / Braided'])) },
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Delicate & Minimal (~1.5mm)', 'Timeless & Classic (~2.0mm)', 'Bold & Substantial (3mm+)'])) }
            );
        }

        ringTokens.push(
            { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '18k Yellow Gold', '18k White Gold', '18k Rose Gold', ' / Silver', 'Bespoke Two-Tone'])) },
            { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Timeless & Classic', 'Bold & Unapologetic', 'Romantic & Delicate', 'Architectural & Minimalist', 'Vintage & Art Deco', 'Avant-Garde & Modern'])) }
        );

        return ringTokens;
    }, [state.profile]);

    const [selected, setSelected] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {};
        dynamicTokens.forEach(t => { init[t.id] = t.options[0]; });
        return init;
    });

    const STYLE_TAGS = isHipHop ? STYLE_TAGS_HIPHOP : STYLE_TAGS_STANDARD;
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [freeText, setFreeText] = useState('');
    const [referenceImage, setReferenceImage] = useState<string | null>(null);

    // Build sentence dynamically based on exact tokens
    const sentence = useMemo(() => {
        const pt = get(p.pieceType) || 'Ring';
        const isGentlemen = get(p.gender) === 'Gentlemen';

        if (pt === 'Hip Hop / Iced Out') {
            let featureText = '';
            if (selected.hipHopStyle === 'Custom Pendant & Chain') {
                featureText = `featuring a ${selected.pendantType || 'Bespoke Nameplate'} on a ${selected.chainStyle || 'Heavyweight Cuban'}`;
            } else if (selected.hipHopStyle === 'Heavyweight Chain Only') {
                featureText = `featuring a ${selected.chainStyle || 'Heavyweight Cuban'} link`;
            } else if (selected.hipHopStyle === 'Iced Out Rings') {
                featureText = `featuring a ${selected.ringStyle || 'Championship Style Ring'}`;
            } else if (selected.hipHopStyle === 'Precision Grillz') {
                featureText = `featuring a details for ${get(p.grillz) || 'Full Set (Top + Bottom)'}`;
            }

            return `I am commissioning a ${selected.scale || 'Classic Proportions'} ${selected.hipHopStyle || 'Custom Pendant & Chain'}, ${featureText}. I envision it ${selected.iceLevel || 'Flawless VVS Fully Iced'}, masterfully crafted in ${selected.metalColor || '18k Yellow Gold'}.`;
        }
        if (pt === 'Necklace') {
            if (isGentlemen) {
                return `I am commissioning a ${selected.necklaceStyle || 'Heavy Solid Chain'} featuring a ${selected.chainStyle || 'Cuban Link'} design. I envision it with a ${selected.settingProfile || 'High-Polish Finish'} in ${selected.metalColor || '18k Yellow Gold'}, exuding a ${selected.style || 'Bold'} aesthetic.`;
            } else {
                const isPlainChain = selected.necklaceStyle === 'Classic Paperclip' || selected.necklaceStyle === 'Layered Chains';
                let stoneText = '';
                if (!isPlainChain) {
                    stoneText = `featuring a ${selected.stoneShape || 'Round'} ${selected.primaryStone || 'Natural Diamond'} in a ${selected.settingProfile || 'Four-Prong Classic'} setting `;
                }
                return `I am commissioning a ${selected.scale || 'Classic Standard (18")'} ${selected.necklaceStyle || 'Statement Pendant'} for a ${selected.necklaceOccasion || 'Everyday Signature'}, ${stoneText}on a ${selected.chainStyle || 'Classic Cable'} chain. Crafted in ${selected.metalColor || '18k Yellow Gold'}, it exudes a ${selected.style || 'Timeless'} aesthetic.`;
            }
        }
        if (pt === 'Earrings') {
            if (isGentlemen) {
                return `I am commissioning a ${selected.format || 'Matching Pair'} of ${selected.earringStyle || 'Solitaire Diamond Studs'} for an ${selected.earringOccasion || 'Everyday Signature'}. I envision ${selected.primaryStone || 'Brilliant White Diamond'} crafted in ${selected.metalColor || '18k Yellow Gold'}, reflecting a ${selected.style || 'Bold'} aesthetic.`;
            } else {
                const stoneText = selected.primaryStone && selected.primaryStone !== 'Solid High-Polish Metal' ? `a ${selected.stoneShape || 'Round'} ${selected.primaryStone || 'Natural Diamond'}` : 'radiant details';
                return `I am commissioning a pair of ${selected.scale || 'Petite'} ${selected.earringStyle || 'Classic Studs'} for a ${selected.earringOccasion || 'Everyday Elegance'}. I envision ${stoneText} in a ${selected.settingProfile || 'Minimalist Prong Setting'} setting, crafted in ${selected.metalColor || '18k Yellow Gold'} with a ${selected.style || 'Timeless'} aesthetic.`;
            }
        }
        if (pt === 'Bracelet') {
            if (isGentlemen) {
                return `I am commissioning a ${selected.braceletStyle || 'Heavyweight Cuban Link'} for a ${selected.braceletOccasion || 'Everyday Signature'}. I envision it finished with ${selected.settingProfile || 'High-Polish Gold'} details, expertly crafted in ${selected.metalColor || '18k Yellow Gold'} with a ${selected.style || 'Classic'} aesthetic.`;
            } else {
                const isPlainBracelet = selected.braceletStyle === 'Solid Gold Bangle' || selected.braceletStyle === 'Classic Chain Link';
                let stoneText = '';
                if (!isPlainBracelet) {
                    stoneText = `featuring a ${selected.stoneShape || 'Round'} ${selected.primaryStone || 'Natural Diamond'}, `;
                }
                return `I am commissioning a ${selected.scale || 'Classic'} ${selected.braceletStyle || 'Eternity Tennis Bracelet'} for a ${selected.braceletOccasion || 'Everyday Signature'}. I envision it ${stoneText}finished with ${selected.bandStyle || 'Continuous Diamond'} details in ${selected.metalColor || '18k Yellow Gold'}, exuding a ${selected.style || 'Timeless'} aesthetic.`;
            }
        }

        // Ring
        if (isGentlemen) {
            return `I am commissioning a ${selected.scale || 'Refined (~4mm)'} ${selected.ringOccasion || 'Signature / Signet Core'} ring in ${selected.metalColor || '18k Yellow Gold'}. I envision a ${selected.ringStyle || 'Classic Flat / D-Shape Band'}, exuding a ${selected.style || 'Timeless'} aesthetic.`;
        } else {
            const hasStone = selected.primaryStone && selected.primaryStone !== 'No Center Stone / All Metal' && selected.primaryStone !== 'Solid High-Polish Metal';
            if (hasStone) {
                return `I am commissioning a ${selected.scale || 'Timeless & Classic'} ${selected.ringOccasion || 'Engagement'} ring in ${selected.metalColor || '18k Yellow Gold'}. I envision a ${selected.stoneShape || 'Round'} ${selected.primaryStone || 'Natural Diamond'} in a ${selected.settingProfile || 'Elevated Profile'} with a ${selected.bandStyle || 'Flawless Metal'} band, exuding a ${selected.style || 'Timeless'} aesthetic.`;
            } else {
                return `I am commissioning a ${selected.scale || 'Timeless & Classic'} ${selected.ringOccasion || 'Wedding'} band in ${selected.metalColor || '18k Yellow Gold'}. I envision a ${selected.ringStyle || 'Classic Solid Band'} exuding a ${selected.style || 'Timeless'} aesthetic.`;
            }
        }
    }, [p.pieceType, p.gender, p.grillz, selected]);

    const toggleTag = (tag: string) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => { setReferenceImage(reader.result as string); };
        reader.readAsDataURL(file);
    };

    const handleGenerate = (e: React.MouseEvent) => {
        e.preventDefault();

        const profileUpdate: Record<string, string | string[]> = {
            styleTags: activeTags,
            additionalNotes: freeText,
            ...(referenceImage ? { referenceImage } : {}),
            ...selected // Spread everything directly
        };

        const mergedProfile = { ...state.profile, ...profileUpdate };
        updateProfile(profileUpdate);

        // Call generation immediately with the exact merged profile so we don't 
        // rely on React's async state to flush before step 3 mounts
        generateIdeas(mergedProfile);

        if (!user) {
            router.push(`/login?callbackUrl=${encodeURIComponent('/ai-studio/step-3')}`);
            return;
        }
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
                        <span className={styles.builderEyebrow}>{isHipHop ? 'Describe Your Piece' : 'Describe Your Vision'}</span>
                        <h2 className={styles.builderH2}>{isHipHop ? 'Build your Hip Hop design.' : 'Build your design prompt.'}</h2>
                    </div>

                    {dynamicTokens.map(tok => (
                        <div key={tok.id} className={styles.tokenRow}>
                            <span className={styles.tokenLabel}>{tok.label}</span>
                            <select
                                className={styles.tokenSelect}
                                value={selected[tok.id] ?? tok.options[0]}
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
                            placeholder={isHipHop ? 'Custom inscription, size, chain length, special requests…' : 'Describe any specific inspirations, references, or details...'}
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

                    <button className={styles.generateBtn} onClick={handleGenerate}>
                        {isHipHop ? 'Generate My Custom Piece →' : 'Generate My Designs →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
