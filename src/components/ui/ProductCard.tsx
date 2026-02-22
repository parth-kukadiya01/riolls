'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { addItem } = useCart();
    const [wishlisted, setWishlisted] = useState(product.is_wishlisted ?? false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        setWishlisted(w => !w);
    };

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    return (
        <Link href={`/product/${product.slug}`} className={styles.card}>
            {/* Image area */}
            <div className={styles.image}>
                <div className={styles.imgMain} style={{ background: product.gradient }} />
                <div className={styles.imgHover} style={{ background: product.gradient_hover }} />

                {product.badge && (
                    <span className={`${styles.badge} ${product.badge === 'Last Piece' ? styles.badgeLast : styles.badgeNew}`}>
                        {product.badge}
                    </span>
                )}

                <button
                    className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                <div className={styles.quickActions}>
                    <button className={styles.qaBtn} onClick={handleQuickAdd}>♡ &nbsp;Add to Bag</button>
                    <div className={styles.qaDivider} />
                    <button className={styles.qaBtn} onClick={e => e.preventDefault()}>Quick View</button>
                </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <div className={styles.name}>{product.name}</div>
                <span className={`${styles.price} ${product.price === null ? styles.poa : ''}`}>
                    {formatPrice(product.price)}
                </span>
            </div>
        </Link>
    );
}
