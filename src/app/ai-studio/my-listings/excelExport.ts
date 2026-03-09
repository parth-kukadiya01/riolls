// excelExport.ts
// Generates a beautifully structured Excel (.xlsx) file from all saved listings.
// Descriptions are human-emotional (NOT AI-generated copy) with trending hashtags.

import * as XLSX from 'xlsx';
import { type SavedListing, generateEtsyListing, buildHumanDescription, get, getAll } from './etsyGenerator';

// ─── Trending Hashtags by piece type ─────────────────────────────────────────

const TRENDING_HASHTAGS: Record<string, string[]> = {
    Ring: [
        '#EngagementRing', '#DiamondRing', '#LabGrownDiamond', '#BridalJewelry',
        '#ToiEtMoi', '#EastWestRing', '#VintageRing', '#MarquiseRing', '#FineJewelry',
        '#RingOfTheDay', '#WeddingRing', '#ProposeWithDiamonds', '#EtsyJewelry',
        '#DiamondEngagementRing', '#CustomRing',
    ],
    Necklace: [
        '#DiamondNecklace', '#FineJewelry', '#MinimalistJewelry', '#GoldNecklace',
        '#SolitairePendant', '#TennisNecklace', '#LayeredNecklace', '#EtsyFind',
        '#JewelryGift', '#NecklaceOfTheDay', '#LabGrownDiamond', '#DaintyJewelry',
        '#GiftForHer', '#FineGoldJewelry', '#LuxuryNecklace',
    ],
    Earrings: [
        '#DiamondEarrings', '#FineJewelry', '#StudEarrings', '#HuggiEarrings',
        '#BridalEarrings', '#GoldEarrings', '#EtsyJewelry', '#EarringOfTheDay',
        '#LuxuryEarrings', '#LabGrownDiamond', '#GiftForHer', '#MinimalistEarrings',
        '#WeddingEarrings', '#DiamondStuds', '#StatementEarrings',
    ],
    Bracelet: [
        '#DiamondBracelet', '#TennisBracelet', '#FineJewelry', '#GoldBracelet',
        '#BridalBracelet', '#EtsyJewelry', '#LuxuryBracelet', '#LabGrownDiamond',
        '#BraceletOfTheDay', '#GiftForHer', '#DiamondJewelry', '#WristStack',
        '#MinimalistBracelet', '#EternityBracelet', '#PavéBracelet',
    ],
    'Fine Jewelry Set': [
        '#BridalSet', '#JewelrySet', '#FineJewelry', '#DiamondSet', '#BridalJewelry',
        '#WeddingJewelry', '#LuxuryJewelry', '#EtsyBride', '#BridalGifts',
        '#LabGrownDiamond', '#GoldJewelry', '#BridalGiftIdeas', '#FineGoldJewelry',
        '#WeddingDay', '#HeirloomJewelry',
    ],
    'Stackable Ring Set': [
        '#StackableRings', '#RingStack', '#BandStack', '#EtsyJewelry', '#StackingRings',
        '#MinimalistRings', '#FineJewelry', '#GoldBands', '#DiamondBand',
        '#LabGrownDiamond', '#WeddingStack', '#RingOfTheDay', '#BridalStack',
        '#MixAndMatch', '#RingGoals',
    ],
};

const DEFAULT_HASHTAGS = [
    '#FineJewelry', '#DiamondJewelry', '#EtsyJewelry', '#LuxuryJewelry',
    '#LabGrownDiamond', '#GiftForHer', '#JewelryOfTheDay', '#CustomJewelry',
    '#HandcraftedJewelry', '#EtsyFinds', '#BridalJewelry', '#GoldJewelry',
    '#DiamondLove', '#FineGoldJewelry', '#UniqueJewelry',
];

function getHashtags(pieceType: string): string {
    const tags = TRENDING_HASHTAGS[pieceType] ?? DEFAULT_HASHTAGS;
    return tags.join(' ');
}

// ─── Trending Etsy SEO Description (short, emotional, for Etsy first 160 chars) ──

function buildShortDescription(saved: SavedListing): string {
    const { profile } = saved;
    const pt = get(profile.pieceType, 'Fine Jewelry');
    const diamond = getAll(profile.centerDiamond).filter((d: string) => d !== 'No Center Stone')[0] || 'Diamond';
    const metal = get(profile.metalColor, '14k Gold');
    const occasion = get(
        profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion ||
        profile.braceletOccasion || profile.setOccasion, ''
    );
    const isEngagement = occasion?.toLowerCase().includes('engagement') || occasion?.toLowerCase().includes('bridal');

    if (isEngagement) {
        return `She said yes & you want the ring to match that feeling. Custom ${diamond.replace(/\(.*\)/g, '').trim()} ${pt} in ${metal.replace(/\(.*\)/g, '').trim()}. Made to order, made with love.`;
    }
    return `Custom ${diamond.replace(/\(.*\)/g, '').trim()} ${pt} in ${metal.replace(/\(.*\)/g, '').trim()}. A piece she'll reach for every single day. Ethically made, beautifully crafted, uniquely yours.`;
}

// ─── Main Excel export function ───────────────────────────────────────────────

export function exportToExcel(listings: SavedListing[]): void {
    if (listings.length === 0) return;

    // Build the rows
    const rows = listings.map((saved, idx) => {
        const etsy = generateEtsyListing(saved);
        const pt = get(saved.profile.pieceType, 'Ring');
        const hashtags = getHashtags(pt);
        const humanDesc = buildHumanDescription(saved.profile);
        const shortDesc = buildShortDescription(saved);

        return {
            'No.': idx + 1,
            'Design Title': saved.concept.title,
            'Etsy Listing Title (SEO)': etsy.title,
            'Category': etsy.category,
            'Piece Type': pt,
            'Suggested Price (USD)': etsy.suggested_price_usd,
            'Metal': get(saved.profile.metalColor, ''),
            'Center Diamond': getAll(saved.profile.centerDiamond).filter((d: string) => d !== 'No Center Stone').join(', ') || 'None',
            'Stone Shape(s)': getAll(saved.profile.stoneShape).join(', '),
            'Color Diamond(s)': getAll(saved.profile.colorDiamond).filter((d: string) => d !== 'None').join(', ') || 'None',
            'Side Diamonds': getAll(saved.profile.sideDiamonds).filter((d: string) => d !== 'None').join(', ') || 'None',
            'Style Aesthetic': get(saved.profile.style, ''),
            'Occasion': get(
                saved.profile.ringOccasion || saved.profile.necklaceOccasion ||
                saved.profile.earringOccasion || saved.profile.braceletOccasion ||
                saved.profile.setOccasion, ''
            ),
            'Human Emotional Description (Main)': humanDesc,
            'Short Hook Description (First 160 chars)': shortDesc,
            'Etsy Tags (13)': etsy.tags.join(', '),
            'Trending Hashtags (Instagram/Pinterest)': hashtags,
            'AI Disclosure (Required by Etsy)': 'This design was created using the Riolls Jewels AI Design Studio with original human-crafted prompts. Each concept is unique. The physical piece is handcrafted to your specifications.',
            'Date Saved': new Date(saved.savedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            'Listing ID': saved.id,
        };
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    // Column widths
    const colWidths = [
        { wch: 5 },   // No.
        { wch: 35 },  // Design Title
        { wch: 55 },  // Etsy Title
        { wch: 30 },  // Category
        { wch: 20 },  // Piece Type
        { wch: 20 },  // Price
        { wch: 22 },  // Metal
        { wch: 28 },  // Center Diamond
        { wch: 28 },  // Stone Shapes
        { wch: 28 },  // Color Diamonds
        { wch: 28 },  // Side Diamonds
        { wch: 28 },  // Style
        { wch: 28 },  // Occasion
        { wch: 80 },  // Human Description
        { wch: 60 },  // Short Description
        { wch: 80 },  // Etsy Tags
        { wch: 80 },  // Hashtags
        { wch: 60 },  // AI Disclosure
        { wch: 22 },  // Date Saved
        { wch: 38 },  // Listing ID
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Etsy Listings');

    // Add a hashtag reference sheet
    const hashRows = Object.entries(TRENDING_HASHTAGS).map(([type, tags]) => ({
        'Piece Type': type,
        'Trending Hashtags': tags.join(' '),
        'Total Tags': tags.length,
    }));
    const hashWs = XLSX.utils.json_to_sheet(hashRows);
    hashWs['!cols'] = [{ wch: 22 }, { wch: 100 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, hashWs, 'Hashtag Reference');

    // Download
    const filename = `Riolls_Jewels_Etsy_Listings_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
}
