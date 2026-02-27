import re

with open("src/app/checkout/page.tsx", "r") as f:
    content = f.read()

# Change Step type
content = re.sub(r"type Step = 1 \| 2 \| 3 \| 4;", "type Step = 1 | 2 | 3;", content)

# Change handlePlaceOrder
old_handle_place = """    const handlePlaceOrder = async (e: React.MouseEvent) => {
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
    };"""

new_handle_place = """    const handlePlaceOrder = async (e: React.MouseEvent) => {
        e.preventDefault();
        setOrderError('');
        setPlacing(true);
        try {
            const deliveryCostMap: Record<string, number> = { free: 0, express: 2500, next: 4500 };
            const deliveryCost = deliveryCostMap[form.delivery] ?? 0;
            
            if (getToken()) {
                await ordersApi.place({
                    contact: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
                    delivery: { address1: form.address1, address2: form.address2, city: form.city, postcode: form.postcode, country: form.country },
                    deliveryMethod: form.delivery,
                    deliveryCost: deliveryCost,
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

            let waText = `*New Order Details*\\n\\n`;
            waText += `*Name:* ${form.firstName} ${form.lastName}\\n`;
            waText += `*Email:* ${form.email}\\n`;
            if (form.phone) waText += `*Phone:* ${form.phone}\\n`;
            waText += `\\n*Delivery Address:*\\n${form.address1}\\n${form.address2 ? form.address2 + '\\n' : ''}${form.city}, ${form.postcode}\\n${form.country}\\n`;
            waText += `\\n*Delivery Method:* ${form.delivery} (${formatPrice(deliveryCost)})\\n\\n`;
            waText += `*Products:*\\n`;

            items.forEach((item, index) => {
                const prod = item.product as any;
                const name = prod?.name ?? 'Item';
                const priceStr = formatPrice(prod?.price ?? 0);
                waText += `${index + 1}. *${name}*\\n`;
                if (item.metal) waText += `   Metal: ${item.metal}\\n`;
                if (item.size) waText += `   Size: ${item.size}\\n`;
                if (item.quantity > 1) waText += `   Quantity: ${item.quantity}\\n`;
                waText += `   Price: ${priceStr}\\n`;
                const img = prod?.images?.[0];
                if (img) {
                    const fullImgUrl = img.startsWith('http') ? img : `https://riolls.in${img}`;
                    waText += `   Image: ${fullImgUrl}\\n`;
                }
                waText += `\\n`;
            });

            waText += `*Subtotal:* ${formatPrice(subtotal)}\\n`;
            waText += `*Delivery:* ${formatPrice(deliveryCost)}\\n`;
            waText += `*Total:* ${formatPrice(subtotal + deliveryCost)}\\n`;

            const encodedWaText = encodeURIComponent(waText);
            const waUrl = `https://wa.me/918320601190?text=${encodedWaText}`;

            window.location.href = waUrl;
        } catch (err: any) {
            setOrderError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setPlacing(false);
        }
    };"""

content = content.replace(old_handle_place, new_handle_place)

# Step bar change
old_step_bar = """            {/* Step bar */}
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
            </div>"""

new_step_bar = """            {/* Step bar */}
            <div className={styles.stepBar}>
                {(['Contact', 'Delivery', 'Review'] as const).map((label, i) => (
                    <div key={label} className={styles.stepBarItem}>
                        <button
                            className={`${styles.stepBarBtn} ${step === i + 1 ? styles.stepBarActive : ''} ${step > i + 1 ? styles.stepBarDone : ''}`}
                            onClick={() => step > i + 1 && setStep((i + 1) as Step)}
                        >{i + 1}. {label}</button>
                        {i < 2 && <span className={styles.stepBarSep}>›</span>}
                    </div>
                ))}
            </div>"""

content = content.replace(old_step_bar, new_step_bar)

# Button in step 2
content = content.replace("Continue to Payment →", "Continue to Review →")

# Remove Step 3 markup
# It starts at: {/* Step 3: Payment */} and ends before {/* Step 4: Review */}
old_step_3 = """                    {/* Step 3: Payment */}
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
                    )}"""

content = content.replace(old_step_3, "")

# Modify Step 4: Review to be Step 3: Review
old_step_4 = """                    {/* Step 4: Review */}
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
                    )}"""

new_step_3 = """                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div>
                            <h2 className={styles.stepH2}>Review your order</h2>
                            {[
                                { label: 'Contact', value: `${form.firstName} ${form.lastName} · ${form.email}`, s: 1 },
                                { label: 'Delivery', value: `${form.address1}, ${form.city} ${form.postcode} · ${form.delivery === 'free' ? 'Free Insured' : form.delivery === 'express' ? 'Express Insured' : 'Next Day'}`, s: 2 },
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
                                {placing ? 'Processing…' : `PLACE ORDER (WHATSAPP) · ${formatPrice(subtotal + (form.delivery === 'express' ? 2500 : form.delivery === 'next' ? 4500 : 0))}`}
                            </button>
                        </div>
                    )}"""

content = content.replace(old_step_4, new_step_3)

# Additional formatting cleanup might be needed, let's write to file
with open("src/app/checkout/page.tsx", "w") as f:
    f.write(content)

print("Replacement done!")
