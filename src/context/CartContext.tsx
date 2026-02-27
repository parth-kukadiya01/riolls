'use client';

import React, {
    createContext, useContext, useState, useEffect,
    useCallback, ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { cartApi, getToken } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartProduct {
    _id: string;
    slug: string;
    name: string;
    price: number | null;
    images?: string[];
    category?: { name: string; slug: string };
    // Legacy fields kept for backward compat with static-data screens
    id?: string;
    gradient?: string;
    gradient_hover?: string;
    metal?: string;
    stone?: string;
    badge?: string;
    description?: string;
    stone_detail?: string;
    is_wishlisted?: boolean;
}

export interface CartItem {
    _id: string;           // item id in MongoDB cart doc
    product: CartProduct;
    size?: string;
    metal?: string;
    purity?: string;
    quantity: number;
    stoneSize?: number;
    engraving?: string;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    loading: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (productId: string, opts?: { size?: string; metal?: string; purity?: string; quantity?: number; stoneSize?: number; engraving?: string }) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    updateItem: (itemId: string, data: { quantity?: number; size?: string; metal?: string; purity?: string }) => Promise<void>;
    clearCart: () => Promise<void>;
    refetch: () => Promise<void>;
    totalItems: number;
    subtotal: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        if (!getToken()) {
            return;
        }
        try {
            setLoading(true);
            const res: any = await cartApi.get();
            setItems(res.data?.items ?? []);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load cart when component mounts
    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addItem = useCallback(async (
        productId: string,
        opts?: { size?: string; metal?: string; purity?: string; quantity?: number; stoneSize?: number; engraving?: string },
    ) => {
        if (!getToken()) {
            router.push('/login');
            return;
        }
        try {
            const res: any = await cartApi.add(productId, opts);
            setItems(res.data?.items ?? []);
            setIsOpen(true);
        } catch (err: any) {
            console.error('Add to cart error:', err.message);
        }
    }, [router]);

    const removeItem = useCallback(async (itemId: string) => {
        if (!getToken()) return;
        const res: any = await cartApi.remove(itemId);
        setItems(res.data?.items ?? []);
    }, []);

    const updateItem = useCallback(async (itemId: string, data: { quantity?: number; size?: string; metal?: string; purity?: string }) => {
        if (!getToken()) return;
        const res: any = await cartApi.update(itemId, data);
        setItems(res.data?.items ?? []);
    }, []);

    const clearCart = useCallback(async () => {
        if (!getToken()) return;
        await cartApi.clear();
        setItems([]);
    }, []);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + (i.product.price ?? 0) * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, isOpen, loading,
            openCart, closeCart,
            addItem, removeItem, updateItem, clearCart, refetch: fetchCart,
            totalItems, subtotal,
        }}>
            {children}
        </CartContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
