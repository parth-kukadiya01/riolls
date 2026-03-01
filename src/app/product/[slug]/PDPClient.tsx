'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { wishlistApi, getToken } from '@/lib/api';
import styles from './PDP.module.css';

export default function PDPClient({ product }: { product: Product }) {
    const router = useRouter();
    const { addItem } = useCart();
    const normalizedMetal = product.metal.toLowerCase().replace(/ゴールド|gold| /g, '').includes('yellow') ? 'yellow-gold' :
        product.metal.toLowerCase().includes('white') ? 'white-gold' :
            product.metal.toLowerCase().includes('rose') ? 'rose-gold' : 'yellow-gold';

    const [selectedMetal, setSelectedMetal] = useState(normalizedMetal);
    const [selectedPurity, setSelectedPurity] = useState('18k');
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [engraving, setEngraving] = useState('');
    const [stoneSize, setStoneSize] = useState(1.5);
    const [wishlisted, setWishlisted] = useState(product.is_wishlisted ?? false);
    const [added, setAdded] = useState(false);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const metals = [
        { id: 'yellow-gold', label: `${selectedPurity} Yellow Gold`, color: '#C9A96E' },
        { id: 'white-gold', label: `${selectedPurity} White Gold`, color: '#D8D8D8' },
        { id: 'rose-gold', label: `${selectedPurity} Rose Gold`, color: '#E8A898' },
    ];

    const handleAddToBag = () => {
        // Use MongoDB _id when available (API product), fall back to static id
        const productId = (product as any)._id ?? product.id;
        addItem(productId, {
            metal: metals.find(m => m.id === selectedMetal)?.label,
            purity: selectedPurity
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = async () => {
        const token = getToken();
        if (!token) {
            router.push('/login');
            return;
        }

        const newStatus = !wishlisted;
        setWishlisted(newStatus); // optimistic update

        try {
            const productId = (product as any)._id ?? product.id;
            if (newStatus) {
                await wishlistApi.add(productId);
            } else {
                await wishlistApi.remove(productId);
            }
        } catch (err: any) {
            setWishlisted(!newStatus);
            console.error('Wishlist error:', err);
            alert(err.message || 'Failed to update wishlist. Please try again.');
        }
    };

    const activeMetalLabel = metals.find(m => m.id === selectedMetal)?.label || '';
    const hasImages = product.images && product.images.length > 0;

    // Price calculation with fallback
    const currentPurityPrice =
        selectedPurity === '9k' ? product.price9k :
            selectedPurity === '14k' ? product.price14k :
                selectedPurity === '18k' ? product.price18k :
                    selectedPurity === '22k' ? product.price22k : null;

    const displayPrice = currentPurityPrice ?? product.price;

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
                    <div className={styles.mainImg} style={{ background: hasImages ? 'transparent' : product.gradient, position: 'relative', overflow: 'hidden' }}>
                        {hasImages && (
                            <img src={product.images![activeImageIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                        )}
                        {product.badge && (
                            <span className={styles.badge}>{product.badge}</span>
                        )}
                        <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
                            <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', color: hasImages ? 'var(--white)' : 'var(--stone)' }}>
                                METAL: <span style={{ color: hasImages ? 'var(--white)' : 'var(--charcoal)', fontWeight: 500 }}>{activeMetalLabel.toUpperCase()}</span>
                            </span>
                            {!product.badge?.includes('Band') && ( /* Only show size if it's likely a diamond piece */
                                <span style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', color: hasImages ? 'var(--white)' : 'var(--stone)' }}>
                                    SIZE: <span style={{ color: hasImages ? 'var(--white)' : 'var(--charcoal)', fontWeight: 500 }}>{stoneSize.toFixed(2)} CT</span>
                                </span>
                            )}
                        </div>
                    </div>
                    {hasImages && product.images!.length > 1 && (
                        <div className={styles.thumbs}>
                            {product.images!.map((img, i) => (
                                <div
                                    key={i}
                                    className={`${styles.thumb} ${i === activeImageIdx ? styles.thumbActive : ''}`}
                                    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}
                                    onClick={() => setActiveImageIdx(i)}
                                />
                            ))}
                        </div>
                    )}
                    {!hasImages && (
                        <div className={styles.thumbs}>
                            {[product.gradient, product.gradient_hover, product.gradient, product.gradient_hover].map((g, i) => (
                                <div key={i} className={`${styles.thumb} ${i === 0 ? styles.thumbActive : ''}`} style={{ background: g }} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Panel */}
                <div className={styles.panel}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.stoneDetail}>{product.stone_detail}</p>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>
                            {formatPrice(displayPrice)}
                        </span>
                        {displayPrice && <span className={styles.taxNote}>Inclusive of VAT</span>}
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

                    {/* Purity selector */}
                    <div className={styles.section}>
                        <span className={styles.sectionLabel}>Metal Purity</span>
                        <div className={styles.purityTags}>
                            {['9k', '14k', '18k', '22k'].map(purity => {
                                const purityPrice = purity === '9k' ? (product as any).price9k :
                                    purity === '14k' ? (product as any).price14k :
                                        purity === '18k' ? (product as any).price18k :
                                            (product as any).price22k;

                                return (
                                    <button
                                        key={purity}
                                        className={`${styles.purityTag} ${selectedPurity === purity ? styles.purityTagActive : ''}`}
                                        onClick={() => setSelectedPurity(purity)}
                                    >
                                        {purity.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
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

                    {/* Terms & Conditions */}
                    <div className={styles.termsRow}>
                        <label className={styles.termsLabel}>
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className={styles.termsCheckbox}
                            />
                            <span>
                                I accept the <Link href="/terms" className={styles.termsLink} target="_blank">Terms and Conditions</Link>, confirming I understand.
                            </span>
                        </label>
                    </div>

                    {/* CTAs */}
                    <div className={styles.ctas}>
                        <button
                            className={`${styles.addToBag} ${added ? styles.added : ''} ${!acceptedTerms ? styles.disabledBtn : ''}`}
                            onClick={handleAddToBag}
                            disabled={!acceptedTerms}
                        >
                            {added ? '✓ Added to Bag' : 'Add to Bag'}
                        </button>
                        <button
                            className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
                            onClick={handleWishlist}
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
