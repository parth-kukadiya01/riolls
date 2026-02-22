'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import styles from './page.module.css';

type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
    const { items, subtotal } = useCart();
    const [step, setStep] = useState<Step>(1);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address1: '', address2: '', city: '', postcode: '', country: 'United Kingdom',
        cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
        delivery: 'free',
    });
    const [payTab, setPayTab] = useState('Card');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>RIOLLS JEWELS</Link>
                <div className={styles.secure}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Secure Checkout
                </div>
            </header>

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
                                    <label>First Name *</label>
                                    <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Sarah" />
                                </div>
                                <div className={styles.field}>
                                    <label>Last Name *</label>
                                    <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Williams" />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Email *</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="sarah@email.com" />
                            </div>
                            <div className={styles.field}>
                                <label>Phone</label>
                                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+44 ..." />
                            </div>
                            <button className={styles.next} onClick={() => setStep(2)}>Continue to Delivery →</button>
                        </div>
                    )}

                    {/* Step 2: Delivery */}
                    {step === 2 && (
                        <div>
                            <h2 className={styles.stepH2}>Delivery address</h2>
                            <div className={styles.field}>
                                <label>Address *</label>
                                <input name="address1" value={form.address1} onChange={handleChange} placeholder="14 Mayfair Gardens" />
                            </div>
                            <div className={styles.field}>
                                <label>Address Line 2</label>
                                <input name="address2" value={form.address2} onChange={handleChange} placeholder="Apt / Suite" />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>City *</label>
                                    <input name="city" value={form.city} onChange={handleChange} placeholder="London" />
                                </div>
                                <div className={styles.field}>
                                    <label>Postcode *</label>
                                    <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="W1K 1AA" />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Country</label>
                                <select name="country" value={form.country} onChange={handleChange}>
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
                                <label>Card Number</label>
                                <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}><label>Expiry</label><input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY" /></div>
                                <div className={styles.field}><label>CVC</label><input name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" /></div>
                            </div>
                            <div className={styles.field}><label>Name on Card</label><input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Sarah Williams" /></div>
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
                            <Link href="/confirmation" className={styles.placeOrder}>
                                PLACE ORDER · {formatPrice(subtotal)}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right: Summary */}
                <aside className={styles.right}>
                    <p className={styles.summaryTitle}>Order Summary</p>
                    {items.map(item => (
                        <div key={item.product.id} className={styles.summaryItem}>
                            <div className={styles.summaryImg} style={{ background: item.product.gradient }} />
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryName}>{item.product.name}</span>
                                {item.metal && <span className={styles.summaryMeta}>{item.metal}</span>}
                            </div>
                            <span className={styles.summaryPrice}>{formatPrice(item.product.price)}</span>
                        </div>
                    ))}
                    <div className={styles.summaryDivider} />
                    <div className={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                    <div className={styles.summaryRow}><span>Delivery</span><span>FREE</span></div>
                    <div className={styles.summaryTotal}><span>Total</span><span>{formatPrice(subtotal)}</span></div>
                </aside>
            </div>
        </div>
    );
}
