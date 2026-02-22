'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, subtotal } = useCart();

    return (
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={closeCart} />
            <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} role="dialog" aria-label="Shopping cart">
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>
                        <span className={styles.titleText}>YOUR BAG</span>
                        <span className={styles.count}>({items.length} item{items.length !== 1 ? 's' : ''})</span>
                    </div>
                    <button onClick={closeCart} className={styles.closeBtn} aria-label="Close cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className={styles.items}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8C8278" strokeWidth="1">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <p className={styles.emptyText}>Your bag is empty</p>
                            <button className={styles.continueBtn} onClick={closeCart}>Continue Browsing →</button>
                        </div>
                    ) : (
                        <>
                            {items.map(item => (
                                <div key={item.product.id} className={styles.item}>
                                    <div
                                        className={styles.itemImg}
                                        style={{ background: item.product.gradient }}
                                    />
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemCategory}>{item.product.category}</span>
                                        <span className={styles.itemName}>{item.product.name}</span>
                                        {item.metal && <span className={styles.itemOpts}>{item.metal}{item.size ? ` · Size ${item.size}` : ''}</span>}
                                        <span className={styles.itemPrice}>{formatPrice(item.product.price)}</span>
                                        <button className={styles.removeBtn} onClick={() => removeItem(item.product.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.freeShip}>✓ &nbsp;Free insured delivery on all orders</div>
                        </>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotalRow}>
                            <span className={styles.subLabel}>Subtotal</span>
                            <span className={styles.subAmount}>{formatPrice(subtotal)}</span>
                        </div>
                        <p className={styles.deliveryNote}>Free insured worldwide delivery included.</p>
                        <Link href="/checkout" onClick={closeCart} className={styles.checkoutBtn}>
                            Proceed to Checkout →
                        </Link>
                        <button className={styles.continueShop} onClick={closeCart}>Continue Shopping</button>
                    </div>
                )}
            </div>
        </>
    );
}
