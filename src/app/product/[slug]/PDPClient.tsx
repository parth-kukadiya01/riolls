'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import styles from './PDP.module.css';

export default function PDPClient({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [selectedMetal, setSelectedMetal] = useState(product.metal);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [engraving, setEngraving] = useState('');
    const [stoneSize, setStoneSize] = useState(1.5);
    const [wishlisted, setWishlisted] = useState(false);
    const [added, setAdded] = useState(false);

    const metals = [
        { id: 'yellow-gold', label: '18k Yellow Gold', color: '#C9A96E' },
        { id: 'white-gold', label: '18k White Gold', color: '#D8D8D8' },
        { id: 'rose-gold', label: '18k Rose Gold', color: '#E8A898' },
    ];

    const handleAddToBag = () => {
        // Use MongoDB _id when available (API product), fall back to static id
        const productId = (product as any)._id ?? product.id;
        addItem(productId, {
            metal: metals.find(m => m.id === selectedMetal)?.label,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const activeMetalLabel = metals.find(m => m.id === selectedMetal)?.label || '';

    return (
        <div className={styles.page}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="breadcrumb">
                <Link href="/">Home</Link>
                <span className={styles.sep}>/</span>
                <Link href="/shop">Shop</Link>
                <span className={styles.sep}>/</span>
                <Link href={`/shop?cat=${product.category}`} style={{ textTransform: 'capitalize' }}>{product.category}</Link>
                <span className={styles.sep}>/</span>
                <span className={styles.current}>{product.name}</span>
            </nav>

            <div className={styles.layout}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.mainImg} style={{ background: product.gradient, position: 'relative' }}>
                        {product.badge && (
                            <span className={styles.badge}>{product.badge}</span>
                        )}
                        <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
                            <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--stone)' }}>
                                METAL: <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>{activeMetalLabel.toUpperCase()}</span>
                            </span>
                            {!product.badge?.includes('Band') && ( /* Only show size if it's likely a diamond piece */
                                <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--stone)' }}>
                                    SIZE: <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>{stoneSize.toFixed(2)} CT</span>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={styles.thumbs}>
                        {[product.gradient, product.gradient_hover, product.gradient, product.gradient_hover].map((g, i) => (
                            <div key={i} className={`${styles.thumb} ${i === 0 ? styles.thumbActive : ''}`} style={{ background: g }} />
                        ))}
                    </div>
                </div>

                {/* Info Panel */}
                <div className={styles.panel}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.stoneDetail}>{product.stone_detail}</p>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>{formatPrice(product.price)}</span>
                        {product.price && <span className={styles.taxNote}>Inclusive of VAT</span>}
                    </div>

                    {/* Metal selector */}
                    <div className={styles.section}>
                        <span className={styles.sectionLabel}>Metal</span>
                        <div className={styles.metalCircles}>
                            {metals.map(m => (
                                <button
                                    key={m.id}
                                    className={`${styles.metalCircle} ${selectedMetal === m.id ? styles.metalActive : ''}`}
                                    style={{ background: m.color }}
                                    onClick={() => setSelectedMetal(m.id as typeof selectedMetal)}
                                    title={m.label}
                                    aria-label={m.label}
                                />
                            ))}
                        </div>
                        <span className={styles.selectedMetal}>
                            {metals.find(m => m.id === selectedMetal)?.label}
                        </span>
                    </div>

                    {/* Stone size */}
                    <div className={styles.section}>
                        <div className={styles.sectionRow}>
                            <span className={styles.sectionLabel}>Stone Size</span>
                            <span className={styles.sectionValue}>{stoneSize.toFixed(2)} ct</span>
                        </div>
                        <input
                            type="range"
                            min="0.5" max="3.0" step="0.25"
                            value={stoneSize}
                            onChange={e => setStoneSize(+e.target.value)}
                            className={styles.slider}
                        />
                        <div className={styles.sliderBounds}>
                            <span>0.50 ct</span><span>3.00 ct</span>
                        </div>
                    </div>

                    {/* Engraving */}
                    <div className={styles.section}>
                        <span className={styles.sectionLabel}>Engraving (Optional)</span>
                        <div className={styles.engravingRow}>
                            <input
                                type="text"
                                maxLength={25}
                                value={engraving}
                                onChange={e => setEngraving(e.target.value)}
                                placeholder="A date, initials, or message..."
                                className={styles.engravingInput}
                            />
                            <span className={styles.charCount}>{engraving.length}/25</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className={styles.description}>{product.description}</p>

                    {/* CTAs */}
                    <div className={styles.ctas}>
                        <button
                            className={`${styles.addToBag} ${added ? styles.added : ''}`}
                            onClick={handleAddToBag}
                        >
                            {added ? '✓ Added to Bag' : 'Add to Bag'}
                        </button>
                        <button
                            className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
                            onClick={() => setWishlisted(w => !w)}
                            aria-label="Add to wishlist"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>

                    <Link href="/bespoke" className={styles.bespokeLink}>Or commission a bespoke version →</Link>

                    {/* Trust strip */}
                    <div className={styles.trustStrip}>
                        {[
                            { icon: '🔒', text: 'Secure Payment' },
                            { icon: '📦', text: 'Free Insured Delivery' },
                            { icon: '✦', text: 'Certified Authentic' },
                        ].map(t => (
                            <div key={t.text} className={styles.trustItem}>
                                <span className={styles.trustIcon}>{t.icon}</span>
                                <span className={styles.trustText}>{t.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Accordion */}
                    <div className={styles.accordion}>
                        {[
                            { id: 'specs', title: 'Specifications', body: `Stone: ${product.stone_detail}. Metal: 18k gold. Handcrafted in London.` },
                            { id: 'delivery', title: 'Delivery & Returns', body: 'Free insured worldwide delivery within 7-10 working days. Returns accepted within 30 days.' },
                            { id: 'care', title: 'Care Instructions', body: 'Store in the provided pouch. Clean gently with a soft cloth. Avoid exposure to harsh chemicals.' },
                        ].map(acc => (
                            <div key={acc.id} className={styles.accItem}>
                                <button className={styles.accTrigger} onClick={() => setActiveTab(at => at === acc.id ? null : acc.id)}>
                                    {acc.title}
                                    <span className={styles.accIcon}>{activeTab === acc.id ? '−' : '+'}</span>
                                </button>
                                {activeTab === acc.id && (
                                    <p className={styles.accBody}>{acc.body}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
