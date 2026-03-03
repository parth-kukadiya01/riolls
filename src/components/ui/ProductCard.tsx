'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { wishlistApi, getToken } from '@/lib/api';
import styles from './ProductCard.module.css';
import ProtectedImage from './ProtectedImage';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const router = useRouter();
    const { addItem } = useCart();
    const [wishlisted, setWishlisted] = useState(product.is_wishlisted ?? false);

    // Prefer MongoDB _id when available (API products), fallback to static id
    const productId = product._id ?? product.id;

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button')) return; // Ignore if clicking a button
        router.push(`/product/${product.slug}`);
    };

    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = getToken();
        if (!token) {
            router.push('/login');
            return;
        }

        const newStatus = !wishlisted;
        setWishlisted(newStatus); // Optimistic UI update

        try {
            if (newStatus) {
                await wishlistApi.add(productId);
            } else {
                await wishlistApi.remove(productId);
            }
        } catch (err: any) {
            // Revert state on failure
            setWishlisted(!newStatus);
            console.error('Wishlist error:', err);
            alert(err.message || 'Failed to update wishlist. Please try again.');
        }
    };

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(productId);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/product/${product.slug}`);
    };

    // Show first image if available, else gradient
    const hasImage = product.images && product.images.length > 0;

    return (
        <div onClick={handleCardClick} className={styles.card} style={{ cursor: 'pointer' }}>
            {/* Image area */}
            <div className={styles.image}>
                {hasImage ? (
                    <ProtectedImage
                        src={product.images![0]}
                        alt={product.name}
                        className={styles.imgMain}
                        style={{ objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                ) : (
                    <>
                        <div className={styles.imgMain} style={{ background: product.gradient }} />
                        <div className={styles.imgHover} style={{ background: product.gradient_hover }} />
                    </>
                )}

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
                    <button className={styles.qaBtn} onClick={handleQuickAdd}>♡&nbsp;Add to Bag</button>
                    <div className={styles.qaDivider} />
                    <button className={styles.qaBtn} onClick={handleQuickView}>Quick View</button>
                </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
                <span className={styles.category}>{typeof product.category === 'string' ? product.category : product.category}</span>
                <div className={styles.name}>{product.name}</div>
                <span className={`${styles.price} ${product.price === null ? styles.poa : ''}`}>
                    {formatPrice(product.price)}
                </span>
            </div>
        </div>
    );
}
