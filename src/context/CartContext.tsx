'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product } from '@/lib/products';

export interface CartItem {
    product: Product;
    size?: string;
    metal?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (product: Product, opts?: Partial<Pick<CartItem, 'size' | 'metal'>>) => void;
    removeItem: (productId: string) => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([
        // Prefill with demo items
        {
            product: {
                id: 'p1', slug: 'celestine-solitaire-ring', name: 'Celestine Solitaire Ring',
                category: 'rings', price: 8500, metal: 'yellow-gold', stone: 'diamond',
                badge: 'New In',
                description: '', stone_detail: '',
                gradient: 'linear-gradient(145deg,#ddd5c4,#c8bba8)',
                gradient_hover: 'linear-gradient(145deg,#c8b89a,#b8a880)',
            },
            size: 'N', metal: '18k Yellow Gold', quantity: 1,
        },
        {
            product: {
                id: 'p10', slug: 'aurora-diamond-necklace', name: 'Aurora Diamond Necklace',
                category: 'necklaces', price: 4200, metal: 'white-gold', stone: 'diamond',
                description: '', stone_detail: '',
                gradient: 'linear-gradient(145deg,#2a3830,#1a2820)',
                gradient_hover: 'linear-gradient(145deg,#1a2820,#0f1810)',
            },
            metal: '18k White Gold', quantity: 1,
        },
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const addItem = useCallback((product: Product, opts?: Partial<Pick<CartItem, 'size' | 'metal'>>) => {
        setItems(prev => {
            const exists = prev.find(i => i.product.id === product.id);
            if (exists) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { product, quantity: 1, ...opts }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems(prev => prev.filter(i => i.product.id !== productId));
    }, []);

    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + (i.product.price ?? 0) * i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
