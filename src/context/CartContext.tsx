'use client';

import React, {
    createContext, useContext, useState, useEffect,
    useCallback, ReactNode,
} from 'react';
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
    addItem: (productId: string, opts?: { size?: string; metal?: string; quantity?: number; stoneSize?: number; engraving?: string }) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    updateItem: (itemId: string, data: { quantity?: number; size?: string; metal?: string }) => Promise<void>;
    clearCart: () => Promise<void>;
    refetch: () => Promise<void>;
    totalItems: number;
    subtotal: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        if (!getToken()) {
            // guest: load from localStorage
            try {
                const raw = localStorage.getItem('rj_guest_cart');
                if (raw) setItems(JSON.parse(raw));
            } catch { }
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

    // Persist guest cart to localStorage
    useEffect(() => {
        if (!getToken()) {
            localStorage.setItem('rj_guest_cart', JSON.stringify(items));
        }
    }, [items]);

    const addItem = useCallback(async (
        productId: string,
        opts?: { size?: string; metal?: string; quantity?: number; stoneSize?: number; engraving?: string },
    ) => {
        if (!getToken()) {
            // Guest: local state only
            setItems(prev => {
                const exists = prev.find(i => i.product._id === productId);
                if (exists) {
                    return prev.map(i =>
                        i.product._id === productId
                            ? { ...i, quantity: i.quantity + (opts?.quantity ?? 1) }
                            : i,
                    );
                }
                return [...prev, {
                    _id: productId + Date.now(),
                    product: { _id: productId, slug: '', name: 'Product', price: null },
                    quantity: opts?.quantity ?? 1,
                    size: opts?.size,
                    metal: opts?.metal,
                }];
            });
            setIsOpen(true);
            return;
        }
        try {
            const res: any = await cartApi.add(productId, opts);
            setItems(res.data?.items ?? []);
            setIsOpen(true);
        } catch (err: any) {
            console.error('Add to cart error:', err.message);
        }
    }, []);

    const removeItem = useCallback(async (itemId: string) => {
        if (!getToken()) {
            setItems(prev => prev.filter(i => i._id !== itemId));
            return;
        }
        const res: any = await cartApi.remove(itemId);
        setItems(res.data?.items ?? []);
    }, []);

    const updateItem = useCallback(async (itemId: string, data: { quantity?: number; size?: string; metal?: string }) => {
        if (!getToken()) {
            setItems(prev =>
                data.quantity === 0
                    ? prev.filter(i => i._id !== itemId)
                    : prev.map(i => i._id === itemId ? { ...i, ...data } : i),
            );
            return;
        }
        const res: any = await cartApi.update(itemId, data);
        setItems(res.data?.items ?? []);
    }, []);

    const clearCart = useCallback(async () => {
        if (!getToken()) {
            setItems([]);
            return;
        }
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
