'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import { ordersApi, getToken } from '@/lib/api';
import styles from './page.module.css';

type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address1: '', address2: '', city: '', postcode: '', country: 'United Kingdom',
        cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
        delivery: 'free',
    });
    const [payTab, setPayTab] = useState('Card');
    const [placing, setPlacing] = useState(false);
    const [orderError, setOrderError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = async (e: React.MouseEvent) => {
        e.preventDefault();
        setOrderError('');
        setPlacing(true);
        try {
            if (getToken()) {
                const deliveryCostMap: Record<string, number> = { free: 0, express: 2500, next: 4500 };
                await ordersApi.place({
                    contact: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
                    delivery: { address1: form.address1, address2: form.address2, city: form.city, postcode: form.postcode, country: form.country },
                    deliveryMethod: form.delivery,
                    deliveryCost: deliveryCostMap[form.delivery] ?? 0,
                    items: items.map(item => ({
                        productId: item.product._id,
                        quantity: item.quantity,
                        size: item.size,
                        metal: item.metal,
                        stoneSize: item.stoneSize,
                        engraving: item.engraving,
                    })),
                });
                await clearCart();
            }
            router.push('/confirmation');
        } catch (err: any) {
            setOrderError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className={styles.page}>


            {/* Step bar */}
            <div className={styles.stepBar}>
                {(['Contact', 'Delivery', 'Payment', 'Review'] as const).map((label, i) => (
                    <div key={label} className={styles.stepBarItem}>
                        <button
                            className={`${styles.stepBarBtn} ${step === i + 1 ? styles.stepBarActive : ''} ${step > i + 1 ? styles.stepBarDone : ''}`}
                            onClick={() => step > i + 1 && setStep((i + 1) as Step)}
                        >{i + 1}. {label}</button>
                        {i < 3 && <span className={styles.stepBarSep}>›</span>}
                    </div>
                ))}
            </div>

            <div className={styles.layout}>
                {/* Left */}
                <div className={styles.left}>
                    {/* Step 1: Contact */}
                    {step === 1 && (
                        <div>
                            <h2 className={styles.stepH2}>Contact details</h2>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="firstName">First Name *</label>
                                    <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Sarah" autoComplete="given-name" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Williams" autoComplete="family-name" />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">Email *</label>
                                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="sarah@email.com" autoComplete="email" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+44 ..." autoComplete="tel" />
                            </div>
                            <button className={styles.next} onClick={() => setStep(2)}>Continue to Delivery →</button>
                        </div>
                    )}

                    {/* Step 2: Delivery */}
                    {step === 2 && (
                        <div>
                            <h2 className={styles.stepH2}>Delivery address</h2>
                            <div className={styles.field}>
                                <label htmlFor="address1">Address *</label>
                                <input id="address1" name="address1" value={form.address1} onChange={handleChange} placeholder="14 Mayfair Gardens" autoComplete="address-line1" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="address2">Address Line 2</label>
                                <input id="address2" name="address2" value={form.address2} onChange={handleChange} placeholder="Apt / Suite" autoComplete="address-line2" />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="city">City *</label>
                                    <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="London" autoComplete="address-level2" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="postcode">Postcode *</label>
                                    <input id="postcode" name="postcode" value={form.postcode} onChange={handleChange} placeholder="W1K 1AA" autoComplete="postal-code" />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="country">Country</label>
                                <select id="country" name="country" value={form.country} onChange={handleChange} autoComplete="country-name">
                                    {['United Kingdom', 'United States', 'France', 'Germany', 'Australia'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            {[
                                { id: 'free', label: 'Free Insured Delivery', desc: '7–10 working days', price: 'FREE' },
                                { id: 'express', label: 'Express Insured', desc: '2–3 working days', price: '£ 25' },
                                { id: 'next', label: 'Next Day', desc: 'Order before 12pm', price: '£ 45' },
                            ].map(d => (
                                <div
                                    key={d.id}
                                    className={`${styles.deliveryOpt} ${form.delivery === d.id ? styles.deliveryActive : ''}`}
                                    onClick={() => setForm(f => ({ ...f, delivery: d.id }))}
                                >
                                    <div className={styles.deliveryInfo}>
                                        <span className={styles.deliveryName}>{d.label}</span>
                                        <span className={styles.deliveryDesc}>{d.desc}</span>
                                    </div>
                                    <span className={styles.deliveryPrice}>{d.price}</span>
                                </div>
                            ))}
                            <button className={styles.next} onClick={() => setStep(3)}>Continue to Payment →</button>
                        </div>
                    )}

                    {/* Step 3: Payment */}
                    {step === 3 && (
                        <div>
                            <h2 className={styles.stepH2}>Payment</h2>
                            <div className={styles.payTabs}>
                                {['Card', 'Bank Transfer', 'Klarna'].map(t => (
                                    <button
                                        key={t}
                                        className={`${styles.payTab} ${payTab === t ? styles.payTabActive : ''}`}
                                        onClick={() => setPayTab(t)}
                                    >{t}</button>
                                ))}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" autoComplete="cc-number" />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="cardExpiry">Expiry</label>
                                    <input id="cardExpiry" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY" autoComplete="cc-exp" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="cardCvc">CVC</label>
                                    <input id="cardCvc" name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" autoComplete="cc-csc" />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="cardName">Name on Card</label>
                                <input id="cardName" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Sarah Williams" autoComplete="cc-name" />
                            </div>
                            <p className={styles.stripNote}>🔒 Secured by Stripe. We never store card details.</p>
                            <button className={styles.next} onClick={() => setStep(4)}>Continue to Review →</button>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div>
                            <h2 className={styles.stepH2}>Review your order</h2>
                            {[
                                { label: 'Contact', value: `${form.firstName} ${form.lastName} · ${form.email}`, s: 1 },
                                { label: 'Delivery', value: `${form.address1}, ${form.city} ${form.postcode} · Free Insured`, s: 2 },
                                { label: 'Payment', value: 'Visa ending ···· 3456', s: 3 },
                            ].map(r => (
                                <div key={r.label} className={styles.reviewGroup}>
                                    <div className={styles.reviewRow}>
                                        <span className={styles.reviewLabel}>{r.label}</span>
                                        <button className={styles.reviewEdit} onClick={() => setStep(r.s as Step)}>Edit</button>
                                    </div>
                                    <p className={styles.reviewValue}>{r.value || <span style={{ color: 'var(--stone)' }}>Not filled</span>}</p>
                                </div>
                            ))}
                            {orderError && <p style={{ color: '#c0392b', marginBottom: '0.75rem', fontSize: '0.85rem' }}>{orderError}</p>}
                            <button className={styles.placeOrder} onClick={handlePlaceOrder} disabled={placing}>
                                {placing ? 'Placing Order…' : `PLACE ORDER · ${formatPrice(subtotal)}`}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Summary */}
                <aside className={styles.right}>
                    <p className={styles.summaryTitle}>Order Summary</p>
                    {items.map(item => {
                        const prod = item.product as any;
                        const name = prod?.name ?? 'Item';
                        const price = prod?.price ?? null;
                        const img = prod?.images?.[0];
                        const gradient = prod?.gradient ?? 'linear-gradient(145deg,#ddd5c4,#c8bba8)';
                        return (
                            <div key={item._id} className={styles.summaryItem}>
                                <div
                                    className={styles.summaryImg}
                                    style={img
                                        ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                        : { background: gradient }}
                                />
                                <div className={styles.summaryInfo}>
                                    <span className={styles.summaryName}>{name}</span>
                                    {item.metal && <span className={styles.summaryMeta}>{item.metal}</span>}
                                </div>
                                <span className={styles.summaryPrice}>{formatPrice(price)}</span>
                            </div>
                        );
                    })}
                    <div className={styles.summaryDivider} />
                    <div className={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                    <div className={styles.summaryRow}><span>Delivery</span><span>FREE</span></div>
                    <div className={styles.summaryTotal}><span>Total</span><span>{formatPrice(subtotal)}</span></div>
                </aside>
            </div>
        </div>
    );
}
