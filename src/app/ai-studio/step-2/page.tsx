'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';
import { useAuth } from '@/context/AuthContext';

// ─── US Luxury Style Tags ──────────────────────────────────────────────────────
const STYLE_TAGS = ['Old Money', 'Romantic', 'Minimal', 'Coastal', 'Hollywood', 'Editorial', 'Heritage', 'Celestial', 'Vintage', 'Park Avenue', 'Maximalist', 'Architectural'];

const get = (val: string | string[] | undefined) => (Array.isArray(val) ? val[0] : val) ?? '';
const getAll = (val: string | string[] | undefined): string[] => Array.isArray(val) ? val : val ? [val] : [];
const joinAll = (val: string | string[] | undefined, fallback = '') => {
    const arr = getAll(val);
    return arr.length > 0 ? arr.filter(v => v !== 'None' && v !== 'No Center Stone').join(', ') || arr[0] : fallback;
};


export default function AIStep2() {
    const router = useRouter();
    const { state, updateProfile, generateIdeas } = useAIStudio();
    const { user } = useAuth();

    const p = state.profile;

    const dynamicTokens = useMemo(() => {
        const pt = get(p.pieceType) || 'Ring';
        const metalColor = get(p.metalColor) || '18k Yellow Gold';
        const style = get(p.style) || 'Timeless & Classic';
        const scale = get(p.scale) || 'Classic Standard (18")';
        const centerDiamond = get(p.centerDiamond) || 'Natural Diamond (GIA Certified)';
        const colorDiamond = get(p.colorDiamond) || 'None';
        const sideDiamonds = get(p.sideDiamonds) || 'Round Micro Pavé';
        const stoneShape = get(p.stoneShape) || 'Round Brilliant';

        // ── Diamond tokens shared across most piece types ──
        // Multi-selected values shown as read-only pills; user can go back to change
        const allCenterDiamonds = getAll(p.centerDiamond);
        const allStoneShapes = getAll(p.stoneShape);
        const allColorDiamonds = getAll(p.colorDiamond).filter(v => v !== 'None');
        const allSideDiamonds = getAll(p.sideDiamonds).filter(v => v !== 'None');

        const diamondTokens = [
            { id: 'centerDiamond', label: 'Center Diamond', options: Array.from(new Set([centerDiamond, 'Natural Diamond (GIA Certified)', 'Lab-Grown Diamond', 'Moissanite', 'No Center Stone'])), multi: true, selected: allCenterDiamonds },
            { id: 'stoneShape', label: 'Diamond Cut', options: Array.from(new Set([stoneShape, 'Round Brilliant', 'Elegant Oval', 'Emerald Cut', 'Cushion Cut', 'Pear Shape', 'Radiant Cut', 'Princess Cut', 'Marquise', 'Asscher Cut'])), multi: true, selected: allStoneShapes },
            { id: 'colorDiamond', label: 'Color Diamond', options: Array.from(new Set([colorDiamond, 'None', 'Canary Yellow Diamond', 'Pink Diamond', 'Blue Diamond', 'Champagne Diamond', 'Black Diamond', 'Green Diamond', 'Orange Diamond'])), multi: true, selected: allColorDiamonds },
            { id: 'sideDiamonds', label: 'Side Diamonds', options: Array.from(new Set([sideDiamonds, 'None', 'Round Micro Pavé', 'Channel-Set Baguettes', 'Tapered Baguettes', 'Trillion Accents', 'Half-Moon Accents', 'Pavé Halo', 'Bezel-Set Accents'])), multi: true, selected: allSideDiamonds },
        ];


        if (pt === 'Necklace') {
            const nOccasion = get(p.necklaceOccasion) || 'Everyday Minimalist';
            const pieceStyle = get(p.necklaceStyle) || 'Delicate Solitaire Pendant';
            const chainType = get(p.chainStyle) || 'Classic Cable';
            const settingProfile = get(p.settingProfile) || 'Four-Prong Classic';
            const isMens = get(p.gender) === "Men's Collection";

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) }
            ];

            if (isMens) {
                tokens.push(
                    { id: 'necklaceStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Heavy Solid Chain', 'Dog Tag / Shield Pendant', 'Subtle Minimalist Pendant', 'Religious / Symbolic Cross'])) },
                    { id: 'chainStyle', label: 'Chain', options: Array.from(new Set([chainType, 'Cuban Link', 'Rope Chain', 'Franco', 'Figaro', 'Box Chain'])) },
                    { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'High-Polish Finish', 'Matte/Brushed Finish', 'Blackened / Oxidized Detailing'])) }
                );
            } else {
                tokens.push(
                    { id: 'necklaceOccasion', label: 'Occasion', options: Array.from(new Set([nOccasion, 'Everyday Minimalist', 'Bridal / Gala', 'Meaningful Gift', 'Statement Piece'])) },
                    { id: 'necklaceStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Diamond Riviera / Tennis', 'Statement Lariat / Y-Drop', 'Elaborate Choker', 'Pear Drop Pendant', 'Station Necklace', 'Delicate Solitaire Pendant', 'Diamond Bar Necklace', 'Layered Chains', 'Initials / Letter Pendant'])) }
                );
                const isPlainChain = pieceStyle === 'Layered Chains' || pieceStyle === 'Diamond Bar Necklace' || pieceStyle.includes('Initials');
                if (!isPlainChain) {
                    tokens.push(...diamondTokens);
                    tokens.push({ id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Four-Prong Classic', 'Secure Bezel Setting', 'Diamond Halo', 'Vintage Milgrain', 'Invisible Setting'])) });
                }
                tokens.push(
                    { id: 'chainStyle', label: 'Chain', options: Array.from(new Set([chainType, 'Classic Cable', 'Twisted Rope', 'Modern Paperclip', 'Eternity Tennis Chain', 'Solid Box', 'Delicate Snake'])) },
                    { id: 'scale', label: 'Length', options: Array.from(new Set([scale, 'Collar / Choker (14-16")', 'Classic Standard (18")', 'Elegant Mid-Chest (20-22")', 'Dramatic Long (24"+)'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
            );
            return tokens;
        }

        if (pt === 'Earrings') {
            const occasion = get(p.earringOccasion) || 'Everyday Elegance';
            const pieceStyle = get(p.earringStyle) || 'Classic Solitaire Studs';
            const settingProfile = get(p.settingProfile) || 'Minimalist Prong Setting';
            const format = get(p.format) || 'Matching Pair';
            const isMens = get(p.gender) === "Men's Collection";

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) }
            ];

            if (isMens) {
                tokens.push(
                    { id: 'earringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Signature', 'Statement / Event', 'Subtle Accent'])) },
                    { id: 'format', label: 'Format', options: Array.from(new Set([format, 'Single Earring (Left)', 'Single Earring (Right)', 'Matching Pair'])) },
                    { id: 'earringStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Solitaire Diamond Stud(s)', 'Classic Gold Huggie(s)', 'Pavé Cluster Stud(s)'])) },
                    ...diamondTokens
                );
            } else {
                tokens.push(
                    { id: 'earringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Elegance', 'Bridal / Evening', 'Standout Statement', 'Bespoke Gift'])) },
                    { id: 'earringStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Classic Solitaire Studs', 'Diamond Huggies', 'Modern Ear Cuffs / Climbers', 'Diamond Chandelier', 'Elegant Drop / Teardrop', 'Diamond Cluster', 'Statement Hoops'])) },
                    ...diamondTokens,
                    { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Secure Bezel Setting', 'Minimalist Prong Setting', 'Pavé Diamond Halo', 'Vintage Milgrain', 'Invisible Setting'])) },
                    { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Petite / Minimal', 'Classic Proportions', 'Bold / Dramatic Statement'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
            );
            return tokens;
        }

        if (pt === 'Bracelet') {
            const occasion = get(p.braceletOccasion) || 'Everyday Wear';
            const pieceStyle = get(p.braceletStyle) || 'Diamond Tennis Bracelet';
            const bandStyle = get(p.bandStyle) || 'Continuous Diamond (Tennis)';
            const settingProfile = get(p.settingProfile) || 'High-Polish Gold';
            const isMens = get(p.gender) === "Men's Collection";

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) }
            ];

            if (isMens) {
                tokens.push(
                    { id: 'braceletOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Wear', 'Formal / Watch Stacker', 'Bold Statement Piece'])) },
                    { id: 'braceletStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Heavy Link Chain', 'Solid Architect Cuff', 'Classic ID Bracelet', 'Woven Chain'])) },
                    { id: 'settingProfile', label: 'Finish', options: Array.from(new Set([settingProfile, 'High-Polish Gold', 'Brushed / Matte Finish', 'Subtle Diamond Accents'])) }
                );
            } else {
                tokens.push(
                    { id: 'braceletOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Everyday Wear', 'Bridal / Red Carpet', 'Meaningful Gift'])) },
                    { id: 'braceletStyle', label: 'Style', options: Array.from(new Set([pieceStyle, 'Diamond Tennis Bracelet', 'Elaborate Diamond Cuff', 'Graduated Diamond Bangle', 'Solid Gold Bangle', 'Classic Chain Link', 'Station Diamond Bracelet', 'Subtle Pavé Bar'])) }
                );
                const isPlainBracelet = pieceStyle === 'Solid Gold Bangle' || pieceStyle === 'Classic Chain Link';
                if (!isPlainBracelet) {
                    tokens.push(...diamondTokens);
                }
                tokens.push(
                    { id: 'bandStyle', label: 'Detail', options: Array.from(new Set([bandStyle, 'Continuous Diamond (Tennis)', 'Flawless Solid Metal', 'Curated Charm Accents', 'Diamond Pavé Links', 'Milgrain Edge Detailing'])) },
                    { id: 'scale', label: 'Fit', options: Array.from(new Set([scale, 'Delicate & Fluid', 'Classic Standard', 'Substantial Solid Cuff'])) }
                );
            }

            tokens.push(
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
            );
            return tokens;
        }

        if (pt === 'Fine Jewelry Set') {
            const setOccasion = get(p.setOccasion) || 'Bridal Suite (Engagement + Band)';
            const setStyle = get(p.setStyle) || 'Ring + Earrings';
            const ringStyle = get(p.ringStyle) || 'Classic Solitaire';
            const settingProfile = get(p.settingProfile) || 'Elevated Prong (Max Brilliance)';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) },
                { id: 'setOccasion', label: 'Occasion', options: Array.from(new Set([setOccasion, 'Bridal Suite (Engagement + Band)', 'Wedding Jewelry Set', 'Heirloom Investment Set', 'Everyday Luxury Stack'])) },
                { id: 'setStyle', label: 'Pieces', options: Array.from(new Set([setStyle, 'Ring + Earrings', 'Ring + Necklace', 'Ring + Earrings + Necklace', 'Full Bridal (Ring+Earrings+Necklace+Bracelet)'])) },
                { id: 'ringStyle', label: 'Ring Style', options: Array.from(new Set([ringStyle, 'Classic Solitaire', 'Toi et Moi', 'Vintage / Art Deco', 'Radiant / Hidden Halo'])) },
                ...diamondTokens,
                { id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Elevated Prong (Max Brilliance)', 'Secure Bezel (Modern)', 'Pavé Throughout', 'Vintage Milgrain Border', 'Mixed Setting (Designer Choice)'])) },
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Understated Elegance', 'Classic Proportions', 'Grand & Statement-Making'])) },
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
            ];
            return tokens;
        }

        if (pt === 'Stackable Ring Set') {
            const stackOccasion = get(p.ringOccasion) || 'Mix & Match Fashion Stack';
            const stackCount = get(p.stackCount) || '3 Bands (Classic)';
            const bandStyle = get(p.bandStyle) || 'All Diamond Pavé';

            const tokens = [
                { id: 'pieceType', label: 'Type', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) },
                { id: 'ringOccasion', label: 'Occasion', options: Array.from(new Set([stackOccasion, 'Engagement + Wedding Stack (Bridal)', 'Anniversary / Meaningful Stack', 'Mix & Match Fashion Stack'])) },
                { id: 'stackCount', label: 'Stack Size', options: Array.from(new Set([stackCount, '2 Bands (Minimal)', '3 Bands (Classic)', '4–5 Bands (Statement)', 'Designer Choice'])) },
                { id: 'bandStyle', label: 'Compositions', options: Array.from(new Set([bandStyle, 'All Diamond Pavé', 'Pavé + Plain Mixed', 'Twisted + Plain', 'Milgrain + Plain (Vintage)', 'All Plain Polished', 'Mix of All Styles'])) },
                ...diamondTokens,
                { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
                { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
            ];
            return tokens;
        }

        // ── Ring (default) ──
        const occasion = get(p.ringOccasion) || 'Engagement / Proposal';
        const ringStyle = get(p.ringStyle) || 'Classic Solitaire';
        const settingProfile = get(p.settingProfile) || 'Elevated & Prominent (Max Light)';
        const bandStyle = get(p.bandStyle) || 'Flawless Polished Metal';
        const isMens = get(p.gender) === "Men's Collection";

        const ringTokens = [
            { id: 'pieceType', label: 'Piece', options: Array.from(new Set([pt, 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Fine Jewelry Set', 'Stackable Ring Set'])) }
        ];

        if (isMens) {
            ringTokens.push(
                { id: 'ringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Wedding / Commitment Band', 'Signature / Signet Ring', 'Everyday Band', 'Statement Right-Hand Ring'])) },
                { id: 'ringStyle', label: 'Style', options: Array.from(new Set([ringStyle, 'Classic Flat / D-Shape Band', 'Textured / Brushed Metal', 'Beveled Edge', 'Bold Signet (Oval/Square)', 'Diamond Accent / Channel Set'])) }
            );
            if (ringStyle.includes('Diamond')) {
                ringTokens.push(...diamondTokens);
            }
            ringTokens.push(
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Refined (~4mm)', 'Classic width (~6mm)', 'Substantial & Heavy (8mm+)'])) }
            );
        } else {
            ringTokens.push(
                { id: 'ringOccasion', label: 'Occasion', options: Array.from(new Set([occasion, 'Engagement / Proposal', 'Wedding / Anniversary', 'Promise / Meaningful', 'Signet / Heritage', 'Statement / Cocktail', 'Everyday Fine'])) },
                { id: 'ringStyle', label: 'Style', options: Array.from(new Set([ringStyle, 'Classic Solitaire', 'Toi et Moi', 'East-West Setting', 'Radiant / Hidden Halo', 'Three-Stone', 'Vintage / Art Deco Milgrain', 'Full Eternity Band', 'Half-Eternity', 'Classic Solid Band', 'Curved / Contour Fit', 'Five-Stone Statement', 'Cigar Band', 'Heritage Signet', 'Sculptural / Organic Form', 'Multi-Stone Cluster', 'Dome Ring'])) }
            );
            const isPlainBand = ringStyle === 'Classic Solid Band' || ringStyle === 'Cigar Band' || ringStyle.includes('Signet') || ringStyle === 'Dome Ring';
            if (!isPlainBand) {
                ringTokens.push(...diamondTokens);
                ringTokens.push({ id: 'settingProfile', label: 'Setting', options: Array.from(new Set([settingProfile, 'Elevated & Prominent (Max Light)', 'Low Profile & Flush (Practical)', 'Secure Bezel Setting', 'Modern Tension Setting'])) });
            }
            ringTokens.push(
                { id: 'bandStyle', label: 'Band', options: Array.from(new Set([bandStyle, 'Flawless Polished Metal', 'Diamond Pavé Encrusted', 'Vintage Milgrain Detailing', 'Elegant Split Shank', 'Twisted / Braided Shank'])) },
                { id: 'scale', label: 'Scale', options: Array.from(new Set([scale, 'Delicate & Minimal (~1.5mm)', 'Timeless & Classic (~2.0mm)', 'Bold & Substantial (3mm+)'])) }
            );
        }

        ringTokens.push(
            { id: 'metalColor', label: 'Metal', options: Array.from(new Set([metalColor, '14k Yellow Gold', '14k White Gold', '18k Yellow Gold', '18k White Gold', '18k Rose Gold', '14k Rose Gold', 'Platinum', 'Bespoke Two-Tone'])) },
            { id: 'style', label: 'Aesthetic', options: Array.from(new Set([style, 'Vintage & Art Deco', 'Minimalist & Dainty', 'Old Money Quiet Luxury', 'Romantic & Delicate', 'Hollywood Glamour', 'Architectural & Modern', 'Coastal & Nature-Inspired'])) }
        );

        return ringTokens;
    }, [state.profile]);

    // For multi diamonds, we sync back to profile using the arrays from step-1
    // The selected state for non-diamond tokens
    const [selected, setSelected] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {};
        dynamicTokens.forEach(t => {
            if (!(t as any).multi) { init[t.id] = t.options[0]; }
        });
        return init;
    });

    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [freeText, setFreeText] = useState('');
    const [referenceImage, setReferenceImage] = useState<string | null>(null);

    // Build sentence dynamically based on exact tokens
    const sentence = useMemo(() => {
        const pt = get(p.pieceType) || 'Ring';
        const isMens = get(p.gender) === "Men's Collection";

        const hasCenterDiamond = !!p.centerDiamond && !getAll(p.centerDiamond).every(v => v === 'No Center Stone');
        const centerDiamondStr = joinAll(p.centerDiamond, 'Natural Diamond (GIA Certified)');
        const stoneShapeStr = joinAll(p.stoneShape, 'Round Brilliant');
        const colorDiamondStr = joinAll(p.colorDiamond);
        const sideDiamondsStr = joinAll(p.sideDiamonds);

        const hasColorDiamond = !!colorDiamondStr;
        const hasSideDiamonds = !!sideDiamondsStr;

        let diamondFragment = '';
        if (hasCenterDiamond) {
            diamondFragment = `featuring a ${stoneShapeStr || 'Round Brilliant'} ${centerDiamondStr}`;
            if (hasColorDiamond) {
                diamondFragment += `, accented with ${colorDiamondStr}`;
            }
            if (hasSideDiamonds) {
                diamondFragment += ` and ${sideDiamondsStr} side stones`;
            }
            diamondFragment += ', ';
        }

        if (pt === 'Fine Jewelry Set') {
            return `I am commissioning a ${selected.scale || 'Classic Proportions'} ${selected.setStyle || 'Bridal Suite'} for a ${selected.setOccasion || 'Wedding'}. The collection centers on a ${selected.ringStyle || 'Classic Solitaire'} ring, ${diamondFragment}all masterfully crafted in ${selected.metalColor || '18k White Gold'} with a ${selected.settingProfile || 'Elevated Prong'} setting, exuding a ${selected.style || 'Timeless & Classic'} aesthetic.`;
        }
        if (pt === 'Stackable Ring Set') {
            return `I am commissioning a Stackable Ring Set featuring ${selected.stackCount || '3 Bands'} for an ${selected.ringOccasion || 'Anniversary Stack'}. I envision a composition of ${selected.bandStyle || 'Mixed Styles'}, ${diamondFragment}crafted in ${selected.metalColor || '18k Yellow Gold'} and reflecting a ${selected.style || 'Minimalist'} aesthetic.`;
        }
        if (pt === 'Necklace') {
            if (isMens) {
                return `I am commissioning a ${selected.necklaceStyle || 'Heavy Solid Chain'} featuring a ${selected.chainStyle || 'Cuban Link'} design. I envision it with a ${selected.settingProfile || 'High-Polish Finish'} in ${selected.metalColor || '18k Yellow Gold'}, exuding a ${selected.style || 'Architectural'} aesthetic.`;
            } else {
                const isPlainChain = selected.necklaceStyle === 'Layered Chains' || selected.necklaceStyle === 'Diamond Bar Necklace' || (selected.necklaceStyle || '').includes('Initials');
                return `I am commissioning a ${selected.scale || 'Classic Standard'} ${selected.necklaceStyle || 'Statement Pendant'} for a ${selected.necklaceOccasion || 'meaningful occasion'}, ${!isPlainChain ? diamondFragment : ''}on a ${selected.chainStyle || 'Classic Cable'} chain. Crafted in ${selected.metalColor || '18k White Gold'}, it exudes a ${selected.style || 'Romantic'} aesthetic.`;
            }
        }
        if (pt === 'Earrings') {
            if (isMens) {
                return `I am commissioning a ${selected.format || 'Matching Pair'} of ${selected.earringStyle || 'Solitaire Diamond Studs'} for an ${selected.earringOccasion || 'Everyday Signature'}. I envision ${diamondFragment}crafted in ${selected.metalColor || '18k Yellow Gold'}, reflecting a ${selected.style || 'Architectural'} aesthetic.`;
            } else {
                return `I am commissioning a pair of ${selected.scale || 'Classic Proportions'} ${selected.earringStyle || 'Studs'} for a ${selected.earringOccasion || 'Everyday Elegance'}. I envision ${diamondFragment}in a ${selected.settingProfile || 'Minimalist Prong'} setting, crafted in ${selected.metalColor || '18k White Gold'} with a ${selected.style || 'Classic'} aesthetic.`;
            }
        }
        if (pt === 'Bracelet') {
            if (isMens) {
                return `I am commissioning a ${selected.braceletStyle || 'Heavy Link Chain'} for a ${selected.braceletOccasion || 'Everyday Wear'}. I envision it finished with ${selected.settingProfile || 'High-Polish Gold'} details, expertly crafted in ${selected.metalColor || '18k Yellow Gold'} with a ${selected.style || 'Architectural'} aesthetic.`;
            } else {
                const isPlainBracelet = selected.braceletStyle === 'Solid Gold Bangle' || selected.braceletStyle === 'Classic Chain Link';
                return `I am commissioning a ${selected.scale || 'Classic Standard'} ${selected.braceletStyle || 'Diamond Tennis Bracelet'} for a ${selected.braceletOccasion || 'Everyday Wear'}. I envision it ${!isPlainBracelet ? diamondFragment : ''}finished with ${selected.bandStyle || 'Continuous Diamond'} details in ${selected.metalColor || '18k White Gold'}, exuding a ${selected.style || 'Vintage & Art Deco'} aesthetic.`;
            }
        }

        // Ring (default)
        if (isMens) {
            return `I am commissioning a ${selected.scale || 'Classic width (~6mm)'} ${selected.ringOccasion || 'Everyday Band'} in ${selected.metalColor || '18k Yellow Gold'}. I envision a ${selected.ringStyle || 'Classic Flat Band'}, exuding a ${selected.style || 'Architectural & Modern'} aesthetic.`;
        } else {
            const isPlainBand = selected.ringStyle === 'Classic Solid Band' || selected.ringStyle === 'Cigar Band' || (selected.ringStyle || '').includes('Signet') || selected.ringStyle === 'Dome Ring';
            if (!isPlainBand) {
                return `I am commissioning a ${selected.scale || 'Timeless & Classic'} ${selected.ringStyle || 'Classic Solitaire'} ring for an ${selected.ringOccasion || 'Engagement'} in ${selected.metalColor || '18k White Gold'}. I envision ${diamondFragment}in a ${selected.settingProfile || 'Elevated Profile'} with a ${selected.bandStyle || 'Flawless Metal'} band, exuding a ${selected.style || 'Romantic & Delicate'} aesthetic.`;
            } else {
                return `I am commissioning a ${selected.scale || 'Timeless & Classic'} ${selected.ringOccasion || 'Wedding / Anniversary'} band in ${selected.metalColor || '18k Yellow Gold'}. I envision a ${selected.ringStyle || 'Classic Solid Band'} exuding a ${selected.style || 'Vintage & Art Deco'} aesthetic.`;
            }
        }
    }, [p.pieceType, p.gender, selected, p.centerDiamond, p.stoneShape, p.colorDiamond, p.sideDiamonds]);

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
            ...Object.fromEntries(Object.entries(selected).filter(([k]) => !['centerDiamond', 'stoneShape', 'colorDiamond', 'sideDiamonds'].includes(k)))
        };

        const mergedProfile = { ...state.profile, ...profileUpdate };
        updateProfile(profileUpdate);

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
                        <span className={styles.builderEyebrow}>Refine Your Vision</span>
                        <h2 className={styles.builderH2}>Build your US luxury design prompt.</h2>
                    </div>

                    {dynamicTokens.map(tok => {
                        const isMultiTok = (tok as any).multi;
                        const multiSelected: string[] = (tok as any).selected || [];
                        if (isMultiTok) {
                            // Display multi-selected values as read-only pill tags
                            return (
                                <div key={tok.id} className={styles.tokenRow}>
                                    <span className={styles.tokenLabel}>{tok.label}</span>
                                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '6px 0' }}>
                                        {multiSelected.length > 0 ? multiSelected.map(v => (
                                            <span key={v} style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                padding: '5px 12px',
                                                border: '1px solid rgba(201,169,110,0.45)',
                                                background: 'rgba(201,169,110,0.1)',
                                                fontFamily: 'var(--font-sc)', fontSize: '9px',
                                                letterSpacing: '0.12em', color: 'var(--gold)',
                                                borderRadius: '2px',
                                            }}>
                                                ✓ {v}
                                            </span>
                                        )) : (
                                            <span style={{ fontSize: '13px', color: 'var(--stone)', fontStyle: 'italic' }}>None selected (go back to add)</span>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return (
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
                        );
                    })}

                    <div className={styles.freeText}>
                        <span className={styles.tokenLabel}>Additional Notes</span>
                        <textarea
                            className={styles.freeTextArea}
                            placeholder="Describe any specific inspirations, carat preferences, size, or bespoke requests…"
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
                        Generate My Designs →
                    </button>
                </div>
            </div>
        </div>
    );
}
