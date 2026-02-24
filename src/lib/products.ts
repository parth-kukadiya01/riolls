export type Metal = 'yellow-gold' | 'white-gold' | 'rose-gold' | 'platinum';
export type Stone = 'diamond' | 'ruby' | 'sapphire' | 'emerald' | 'pearl';
export type Category = 'rings' | 'necklaces' | 'earrings' | 'bracelets';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category | string; // string for API category slugs
  price: number | null; // null = Price on Application
  metal: Metal | string;
  stone: Stone | string;
  badge?: 'New In' | 'Last Piece' | string;
  description: string;
  stone_detail: string;
  gradient: string; // CSS gradient for placeholder
  gradient_hover: string;
  is_wishlisted?: boolean;
  // API fields
  _id?: string;        // MongoDB id from backend
  images?: string[];   // product image URLs from backend
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'celestine-solitaire-ring',
    name: 'Celestine Solitaire Ring',
    category: 'rings',
    price: 8500,
    metal: 'yellow-gold',
    stone: 'diamond',
    badge: 'New In',
    description: 'A singular 2.10ct brilliant-cut diamond, cradled in hand-formed 18k yellow gold. Crafted individually in our London atelier over eight weeks by a single goldsmith.',
    stone_detail: '2.10ct · D Colour · VS1 Clarity · Brilliant Cut',
    gradient: 'linear-gradient(145deg,#ddd5c4,#c8bba8,#b8a898)',
    gradient_hover: 'linear-gradient(145deg,#c8b89a,#b8a880,#a09070)',
    is_wishlisted: false,
  },
  {
    id: 'p2',
    slug: 'tempest-halo-ring',
    name: 'Tempest Halo Ring',
    category: 'rings',
    price: 6750,
    metal: 'white-gold',
    stone: 'diamond',
    description: 'A radiant halo of pavé-set diamonds encircle a brilliant-cut centre stone. Set in cool 18k white gold, the Tempest is architecture for the hand.',
    stone_detail: '1.40ct · E Colour · VVS2 Clarity · Round Brilliant',
    gradient: 'linear-gradient(145deg,#d4cbbc,#c0b5a0,#ada593)',
    gradient_hover: 'linear-gradient(145deg,#c0b2a2,#ad9f8e,#9d8f80)',
    is_wishlisted: false,
  },
  {
    id: 'p3',
    slug: 'aurora-pave-band',
    name: 'Aurora Pavé Band',
    category: 'rings',
    price: 3200,
    metal: 'yellow-gold',
    stone: 'diamond',
    badge: 'Last Piece',
    description: 'A continuous river of pavé-set brilliant diamonds set in 18k yellow gold. Worn alone or stacked — it glitters from every angle.',
    stone_detail: '0.65ct total · F-G Colour · VS Clarity',
    gradient: 'linear-gradient(145deg,#e2d6c6,#cfbfad,#bfaf9d)',
    gradient_hover: 'linear-gradient(145deg,#cfbfad,#bcad9a,#aca087)',
    is_wishlisted: false,
  },
  {
    id: 'p4',
    slug: 'midnight-cluster-ring',
    name: 'Midnight Cluster Ring',
    category: 'rings',
    price: 9800,
    metal: 'yellow-gold',
    stone: 'sapphire',
    description: 'A deep-blue sapphire surrounded by a starburst of brilliant diamonds creates a piece as bold as it is timeless.',
    stone_detail: '2.80ct Oval Kashmir Sapphire · Diamond surround 0.90ct',
    gradient: 'linear-gradient(145deg,#c8bfb0,#b8afa0,#a89f90)',
    gradient_hover: 'linear-gradient(145deg,#b8afa0,#a89f90,#988f80)',
    is_wishlisted: false,
  },
  {
    id: 'p5',
    slug: 'soleil-solitaire',
    name: 'Soleil Solitaire',
    category: 'rings',
    price: 5400,
    metal: 'yellow-gold',
    stone: 'diamond',
    badge: 'New In',
    description: 'A radiant-cut diamond mounted on an ultra-fine four-claw setting. Minimal architecture, maximum sparkle.',
    stone_detail: '1.80ct · D Colour · IF Clarity · Radiant Cut',
    gradient: 'linear-gradient(145deg,#d8cfc0,#c5baa8,#b5aa98)',
    gradient_hover: 'linear-gradient(145deg,#c5baa8,#b2a796,#a29584)',
    is_wishlisted: true,
  },
  {
    id: 'p6',
    slug: 'luna-bezel-ring',
    name: 'Luna Bezel Ring',
    category: 'rings',
    price: 4100,
    metal: 'white-gold',
    stone: 'diamond',
    description: 'A full-bezel oval diamond set low and flush — clean, modern, everyday luxury.',
    stone_detail: '1.10ct · E Colour · VS1 Clarity · Oval Cut',
    gradient: 'linear-gradient(145deg,#cfc6b8,#bcb2a4,#aca298)',
    gradient_hover: 'linear-gradient(145deg,#bcb2a4,#a99f91,#998f81)',
    is_wishlisted: false,
  },
  {
    id: 'p7',
    slug: 'heritage-signet',
    name: 'Heritage Signet',
    category: 'rings',
    price: null,
    metal: 'yellow-gold',
    stone: 'diamond',
    description: 'A modern interpretation of the classic signet. Engraved to order, in 18k yellow gold, with a diamond inlay.',
    stone_detail: 'Engraved to order',
    gradient: 'linear-gradient(145deg,#d0c8ba,#bdb4a6,#ada496)',
    gradient_hover: 'linear-gradient(145deg,#bdb4a6,#aaa196,#9a9186)',
    is_wishlisted: false,
  },
  {
    id: 'p8',
    slug: 'orbit-sculptural-ring',
    name: 'Orbit Sculptural Ring',
    category: 'rings',
    price: 7200,
    metal: 'platinum',
    stone: 'diamond',
    description: 'An architectural study in negative space — a free-form platinum band orbiting a single brilliant-cut diamond.',
    stone_detail: '1.50ct · F Colour · VVS1 Clarity · Brilliant Cut',
    gradient: 'linear-gradient(145deg,#c6bdb0,#b4ab9e,#a49b8e)',
    gradient_hover: 'linear-gradient(145deg,#b4ab9e,#a1988b,#91887b)',
    is_wishlisted: false,
  },
  {
    id: 'p9',
    slug: 'blossom-floral-ring',
    name: 'Blossom Floral Ring',
    category: 'rings',
    price: 5900,
    metal: 'rose-gold',
    stone: 'ruby',
    badge: 'New In',
    description: 'A bloom of rose-gold petals cradles a vivid Burmese ruby, surrounded by white diamond dew-drops.',
    stone_detail: '1.20ct Burmese Ruby · Diamond surround 0.45ct',
    gradient: 'linear-gradient(145deg,#dbd2c4,#c8bfb0,#b8afa0)',
    gradient_hover: 'linear-gradient(145deg,#c8bfb0,#b5ac9d,#a59c8d)',
    is_wishlisted: false,
  },
  {
    id: 'p10',
    slug: 'aurora-diamond-necklace',
    name: 'Aurora Diamond Necklace',
    category: 'necklaces',
    price: 4200,
    metal: 'white-gold',
    stone: 'diamond',
    description: 'A cascading line of brilliant diamonds suspended on an almost invisible 18k white gold chain. Day-to-night elegance.',
    stone_detail: '0.95ct total · E-F Colour · VS Clarity',
    gradient: 'linear-gradient(145deg,#2a3830,#1a2820)',
    gradient_hover: 'linear-gradient(145deg,#1a2820,#0f1810)',
    is_wishlisted: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(cat?: Category): Product[] {
  if (!cat) return PRODUCTS;
  return PRODUCTS.filter(p => p.category === cat);
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price on Application';
  return `£ ${price.toLocaleString('en-GB')}`;
}
