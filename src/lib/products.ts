export type Metal = 'yellow-gold' | 'white-gold' | 'rose-gold';
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
  price9k?: number | null;
  price14k?: number | null;
  price18k?: number | null;
  price22k?: number | null;
  availableMetals?: string[];
}

export function getProductsByCategory(): Product[] {
  return []; // Return empty for legacy imports; application uses API
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return 'Price on Application';
  return `$ ${price.toLocaleString('en-US')}`;
}
