// etsyGenerator.ts
// Pure client-side utility: converts an AI Studio saved design into
// a complete, ready-to-paste Etsy listing (title, 13 tags, description, price range).

export interface SavedListing {
    id: string;
    savedAt: string;
    concept: {
        title: string;
        description: string;
        image_data?: string;
        hero_material?: string;
    };
    profile: Record<string, string | string[] | undefined>;
}

export interface EtsyListing {
    title: string;
    tags: string[];          // exactly 13
    description: string;
    suggested_price_usd: string;
    category: string;
    ai_disclosure: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Strip Etsy UI labels like "(Etsy #1)", "★ Trending", "(Most Popular)" from stored answer values */
const clean = (val: string): string =>
    val.replace(/\s*★[^,]*/g, '').replace(/\s*\(Etsy[^)]*\)/g, '').replace(/\s*\([^)]*\)/g, '').replace(/\s*#\d+\s*/g, '').replace(/\s*Most Popular/gi, '').trim();

export const get = (val: string | string[] | undefined, fallback = ''): string => {
    const raw = Array.isArray(val) ? val[0] ?? fallback : val ?? fallback;
    return clean(raw);
};

export const getAll = (val: string | string[] | undefined): string[] => {
    const arr = Array.isArray(val) ? val.filter(Boolean) : val ? [val] : [];
    return arr.map(clean);
};

// ─── Price estimation ────────────────────────────────────────────────────────

function suggestPrice(profile: Record<string, string | string[] | undefined>): string {
    const pt = get(profile.pieceType, 'Ring');
    const cd = get(profile.centerDiamond, '');
    const budget = get(profile.budget, '');
    const occasion = get(profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion || profile.braceletOccasion || profile.setOccasion, '');

    // Base ranges by piece type
    const base: Record<string, [number, number]> = {
        'Ring': [1200, 4500],
        'Necklace': [400, 2200],
        'Earrings': [500, 2800],
        'Bracelet': [600, 3000],
        'Fine Jewelry Set': [2500, 9000],
    };
    let [low, high] = base[pt] ?? [800, 3000];

    // Adjust for diamond type
    if (cd.includes('Natural') || cd.includes('GIA')) { low *= 1.4; high *= 1.6; }
    if (cd.includes('Lab')) { low *= 0.9; high *= 1.1; }
    if (cd.includes('Moissanite')) { low *= 0.5; high *= 0.6; }

    // Adjust for engagement/bridal
    if (occasion.toLowerCase().includes('engagement') || occasion.toLowerCase().includes('bridal')) {
        low *= 1.3; high *= 1.5;
    }

    // Budget hint from user
    if (budget.includes('30,000')) { high = Math.max(high, 30000); }
    if (budget.includes('15,000')) { high = Math.max(high, 15000); low = Math.max(low, 5000); }

    return `$${Math.round(low / 100) * 100} – $${Math.round(high / 100) * 100}`;
}

// ─── Title builder ───────────────────────────────────────────────────────────

function buildTitle(profile: Record<string, string | string[] | undefined>, conceptTitle: string): string {
    const pt = get(profile.pieceType, 'Ring');
    const centerDiamond = getAll(profile.centerDiamond).filter(v => v !== 'No Center Stone')[0] ?? '';
    const stoneShape = getAll(profile.stoneShape)[0] ?? '';
    const metal = get(profile.metalColor, '18k Gold');
    const occasion = get(profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion || profile.braceletOccasion, '');
    const style = get(profile.style, '');

    const parts: string[] = [];

    // Shape + stone
    if (stoneShape && stoneShape !== 'Round Brilliant') parts.push(stoneShape.replace('Elegant ', '').replace(' Cut', ' Cut'));
    if (centerDiamond.includes('Lab')) parts.push('Lab Grown Diamond');
    else if (centerDiamond.includes('Natural')) parts.push('Natural Diamond');
    else if (centerDiamond.includes('Moissanite')) parts.push('Moissanite');
    else if (centerDiamond) parts.push('Diamond');

    parts.push(pt);

    // Metal
    if (metal) parts.push('|', metal);

    // Occasion keyword
    if (occasion.toLowerCase().includes('engagement')) parts.push('| Engagement Ring');
    else if (occasion.toLowerCase().includes('anniversary')) parts.push('| Anniversary Ring');
    else if (occasion.toLowerCase().includes('bridal')) parts.push('| Bridal Jewelry');

    // Style
    if (style.includes('Vintage') || style.includes('Art Deco')) parts.push('| Vintage Inspired');
    if (style.includes('Minimalist')) parts.push('| Minimalist Fine Jewelry');
    if (style.includes('Hollywood') || style.includes('Park Avenue')) parts.push('| Luxury Fine Jewelry');

    const title = parts.join(' ').trim();
    // Etsy max 140 chars
    return title.length > 138 ? title.slice(0, 138) + '…' : title;
}

// ─── Tag builder ─────────────────────────────────────────────────────────────

function buildTags(profile: Record<string, string | string[] | undefined>): string[] {
    const pt = get(profile.pieceType, 'Ring');
    const centerDiamond = getAll(profile.centerDiamond).filter(v => v !== 'No Center Stone');
    const stoneShape = getAll(profile.stoneShape)[0] ?? '';
    const metal = get(profile.metalColor, '18k Gold');
    const style = get(profile.style, '');
    const occasion = get(profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion || profile.braceletOccasion || profile.setOccasion, '');
    const colorDiamond = getAll(profile.colorDiamond).filter(v => v !== 'None');
    const gender = get(profile.gender, '');
    const settingStyle = get(profile.ringStyle || profile.necklaceStyle || profile.earringStyle || profile.braceletStyle, '');
    const sideDiamonds = getAll(profile.sideDiamonds).filter(v => v !== 'None')[0] ?? '';

    const tags: string[] = [];

    // 1. Primary type tag
    if (pt === 'Ring') tags.push('diamond engagement ring');
    else if (pt === 'Necklace') tags.push('diamond necklace');
    else if (pt === 'Earrings') tags.push('diamond earrings');
    else if (pt === 'Bracelet') tags.push('diamond bracelet');
    else tags.push('fine jewelry set');

    // 2. Diamond origin
    if (centerDiamond.some(d => d.includes('Lab'))) tags.push('lab grown diamond ring');
    else if (centerDiamond.some(d => d.includes('Natural'))) tags.push('natural diamond ring');
    else if (centerDiamond.some(d => d.includes('Moissanite'))) tags.push('moissanite ring');
    else tags.push('fine diamond jewelry');

    // 3. Cut / shape
    if (stoneShape.includes('Oval')) tags.push('oval diamond ring');
    else if (stoneShape.includes('Emerald')) tags.push('emerald cut diamond ring');
    else if (stoneShape.includes('Cushion')) tags.push('cushion cut diamond ring');
    else if (stoneShape.includes('Pear')) tags.push('pear shaped diamond');
    else if (stoneShape.includes('Marquise')) tags.push('marquise diamond ring');
    else if (stoneShape.includes('Radiant')) tags.push('radiant cut engagement ring');
    else if (stoneShape.includes('Asscher')) tags.push('asscher cut diamond ring');
    else tags.push('round brilliant diamond');

    // 4. Metal
    if (metal.includes('Yellow Gold')) tags.push('yellow gold fine jewelry');
    else if (metal.includes('Rose Gold')) tags.push('rose gold engagement ring');
    else tags.push('white gold diamond ring');

    // 5. Occasion
    if (occasion.toLowerCase().includes('engagement')) tags.push('engagement ring for her');
    else if (occasion.toLowerCase().includes('anniversary')) tags.push('anniversary gift for wife');
    else if (occasion.toLowerCase().includes('bridal')) tags.push('bridal jewelry set');
    else if (pt === 'Earrings') tags.push('wedding earrings for bride');
    else tags.push('luxury jewelry gift for her');

    // 6. Style aesthetic
    if (style.includes('Vintage') || style.includes('Art Deco')) tags.push('vintage art deco ring');
    else if (style.includes('Minimalist')) tags.push('minimalist diamond jewelry');
    else if (style.includes('Halo') || settingStyle?.includes('Halo')) tags.push('diamond halo ring');
    else tags.push('custom fine jewelry');

    // 7. Audience
    if (gender === 'Gentlemen') tags.push('mens diamond jewelry');
    else tags.push('proposal ring for her');

    // 8. Color diamond
    if (colorDiamond.length > 0) {
        if (colorDiamond[0].includes('Pink')) tags.push('pink diamond ring');
        else if (colorDiamond[0].includes('Yellow')) tags.push('canary yellow diamond');
        else if (colorDiamond[0].includes('Blue')) tags.push('blue diamond accent ring');
        else tags.push('fancy color diamond ring');
    } else {
        tags.push('GIA certified diamond ring');
    }

    // 9. Setting style
    if (sideDiamonds.includes('Pavé') || sideDiamonds.includes('pave')) tags.push('pave diamond ring');
    else if (settingStyle?.includes('Halo')) tags.push('halo engagement ring');
    else if (settingStyle?.includes('Solitaire')) tags.push('solitaire engagement ring');
    else tags.push('bespoke diamond jewelry');

    // 10. Etsy keyword
    tags.push('luxury fine jewelry');

    // 11. Material signal
    tags.push('18k gold diamond ring');

    // 12. Shipping / market
    tags.push('ships worldwide');

    // 13. Brand + design
    tags.push('custom jewelry design');

    // Deduplicate and cap at 13
    const unique = Array.from(new Set(tags));
    while (unique.length < 13) unique.push('fine jewelry gift');
    return unique.slice(0, 13);
}

// ─── Human Emotional Description ─────────────────────────────────────────────

export function buildHumanDescription(profile: Record<string, string | string[] | undefined>): string {
    const pt = get(profile.pieceType, 'jewelry piece');
    const diamond = getAll(profile.centerDiamond).filter((d: string) => d !== 'No Center Stone');
    const shape = getAll(profile.stoneShape)[0] || '';
    const metal = get(profile.metalColor, 'gold');
    const style = get(profile.style, '');
    const occasion = get(
        profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion ||
        profile.braceletOccasion || profile.setOccasion, ''
    );
    const colorDiamond = getAll(profile.colorDiamond).filter((d: string) => d !== 'None');
    const sideDiamonds = getAll(profile.sideDiamonds).filter((d: string) => d !== 'None');

    const diamondPhrase = diamond.length
        ? diamond[0].includes('Lab') ? 'ethically sourced lab-grown diamond' : 'brilliant natural diamond'
        : 'sparkling diamond';

    const shapePhrase = shape ? `in a breathtaking ${shape.replace('Elegant ', '').replace(' (Etsy #1)', '').replace('(Classic)', '').trim()} cut` : '';
    const metalPhrase = metal ? `crafted in ${metal.replace('(Etsy #1)', '').replace('(Luxury)', '').replace('(Premium)', '').trim()}` : 'crafted in fine gold';
    const occasionPhrase = occasion
        ? occasion.includes('Engagement') ? 'made to mark the most beautiful moment of your life'
            : occasion.includes('Anniv') ? 'a timeless way to say "I love you" on your anniversary'
                : occasion.includes('Bridal') ? 'the perfect piece to complete your bridal look'
                    : occasion.includes('Gift') ? 'a heartfelt gift she will treasure forever'
                        : `perfect for ${occasion.toLowerCase()}`
        : 'a timeless piece she will treasure for a lifetime';

    const colorPhrase = colorDiamond.length
        ? ` A soft whisper of ${colorDiamond[0].replace('(Romantic)', '').replace('(Etsy Top Seller)', '').trim().toLowerCase()} adds an unforgettable touch of color.` : '';

    const sidePhrase = sideDiamonds.length
        ? ` Delicate ${sideDiamonds[0].replace('(Etsy Bestseller)', '').replace('(Vintage)', '').trim().toLowerCase()} catch every light.` : '';

    const stylePhrase = style
        ? style.includes('Vintage') ? 'Inspired by the romance of a bygone era.'
            : style.includes('Minimalist') ? 'Quietly luxurious, effortlessly elegant.'
                : style.includes('Romantic') ? 'Soft, feminine, and deeply romantic.'
                    : style.includes('Toi et Moi') ? 'Two stones, one story — a love made visible.'
                        : style.includes('Hollywood') ? 'Designed for the woman who deserves the spotlight.'
                            : ''
        : '';

    return [
        `A ${diamondPhrase} ${shapePhrase} — ${metalPhrase}, ${occasionPhrase}.`,
        colorPhrase,
        sidePhrase,
        stylePhrase,
        `Each piece is custom-made to order, tailored to your exact specifications. Because love deserves nothing less than perfect.`,
    ].filter(Boolean).join(' ').replace(/\s{2,}/g, ' ').trim();
}

// ─── Description builder ─────────────────────────────────────────────────────

function buildDescription(
    profile: Record<string, string | string[] | undefined>,
    concept: { title: string; description: string; hero_material?: string },
    suggestedPrice: string
): string {
    const pt = get(profile.pieceType, 'Ring');
    const centerDiamonds = getAll(profile.centerDiamond).filter(v => v !== 'No Center Stone');
    const stoneShapes = getAll(profile.stoneShape);
    const colorDiamonds = getAll(profile.colorDiamond).filter(v => v !== 'None');
    const sideDiamonds = getAll(profile.sideDiamonds).filter(v => v !== 'None');
    const metal = get(profile.metalColor, '18k Gold');
    const style = get(profile.style, 'Timeless & Classic');
    const budget = get(profile.budget, '');
    const occasion = get(
        profile.ringOccasion || profile.necklaceOccasion || profile.earringOccasion || profile.braceletOccasion || profile.setOccasion,
        ''
    );

    const diamondSpec = [
        centerDiamonds.length ? `✦ Center Stone: ${centerDiamonds.join(' + ')}` : null,
        stoneShapes.length ? `✦ Diamond Cut: ${stoneShapes.join(', ')}` : null,
        colorDiamonds.length ? `✦ Fancy Color Diamond: ${colorDiamonds.join(', ')}` : null,
        sideDiamonds.length ? `✦ Side Diamonds: ${sideDiamonds.join(', ')}` : null,
        `✦ Metal: ${metal}`,
    ].filter(Boolean).join('\n');

    const humanDesc = buildHumanDescription(profile);

    return `✦ ${concept.title}

${humanDesc}

━━━━━━━━━━━━━━━━━━━━━━━
DIAMOND SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━
${diamondSpec}

━━━━━━━━━━━━━━━━━━━━━━━
DESIGN AESTHETIC
━━━━━━━━━━━━━━━━━━━━━━━
Style: ${style}
${occasion ? `Occasion: ${occasion}` : ''}
${concept.hero_material ? `Signature Material: ${concept.hero_material}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMIZATION OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━
• Diamond: Natural (GIA Certified), Lab-Grown, or Moissanite
• Metal: 14k or 18k Yellow, White, or Rose Gold
• Diamond Cut: Any shape available
• Carat: 0.5ct to 3ct+
• Ring Size: US 4–12 / EU 47–67 (for rings)
• Additional engraving available on request

━━━━━━━━━━━━━━━━━━━━━━━
ORDERING PROCESS
━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ Purchase this listing
2️⃣ Send your customization details via Etsy message
3️⃣ We confirm specifications & begin creation (~3–5 weeks)
4️⃣ Shipped with tracking, gift packaging & authentication certificate

Suggested investment range: ${suggestedPrice}
${budget ? `Your selected budget tier: ${budget}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━
ABOUT THIS DESIGN
━━━━━━━━━━━━━━━━━━━━━━━
AI DESIGN DISCLOSURE: This is an original fine jewelry design concept created through the Riolls Jewels AI Design Studio using our exclusive, human-crafted design prompts. Each concept is unique and designed by our creative team. The physical piece is handcrafted to your specifications by our master jewelers.

This listing is for a custom bespoke ${pt.toLowerCase()} commission. The Etsy listing price is a deposit toward your custom piece — final quote provided after consultation.

━━━━━━━━━━━━━━━━━━━━━━━
Riolls Jewels — US Fine Jewelry Design Studio
Specializing in GIA Diamond, Lab-Grown & Fancy Color Jewelry
Ship worldwide | Fully insured | Certificate of authenticity included
`;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateEtsyListing(saved: SavedListing): EtsyListing {
    const { concept, profile } = saved;
    const suggestedPrice = suggestPrice(profile);

    return {
        title: buildTitle(profile, concept.title),
        tags: buildTags(profile),
        description: buildDescription(profile, concept, suggestedPrice),
        suggested_price_usd: suggestedPrice,
        category: profile.pieceType?.includes('Necklace') ? 'Jewelry > Necklaces'
            : profile.pieceType?.includes('Earrings') ? 'Jewelry > Earrings'
                : profile.pieceType?.includes('Bracelet') ? 'Jewelry > Bracelets'
                    : profile.pieceType?.includes('Set') ? 'Jewelry > Sets'
                        : 'Jewelry > Rings > Engagement Rings',
        ai_disclosure: 'AI-assisted design created using original Riolls Jewels prompts. Physical piece handcrafted by master jewelers.',
    };
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = 'riolls_saved_listings';

export function getSavedListings(): SavedListing[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

export function saveListing(listing: Omit<SavedListing, 'id' | 'savedAt'>): SavedListing {
    const all = getSavedListings();
    const newEntry: SavedListing = {
        ...listing,
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...all]));
    return newEntry;
}

export function deleteListing(id: string): void {
    const all = getSavedListings().filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
