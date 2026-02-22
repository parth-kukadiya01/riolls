'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function DeliveryReturnsPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Riolls Jewels</span>
                    <h1 className={styles.heroH1}>Delivery &amp; Returns</h1>
                    <p className={styles.heroSub}>
                        Everything you need to know about processing, shipping, and our Return &amp; Exchange policy.
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className={styles.content}>
                <div className={styles.article}>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Return &amp; Exchange Policy</h2>
                        <p className={styles.text}>
                            At Riolls, we strive to provide you with fine jewellery that is beautifully crafted and of the highest quality. Every piece undergoes strict quality checks before shipping. However, if you are not completely satisfied with your purchase, we offer a simple and transparent Return &amp; Exchange Policy.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Shipping Policy</h2>

                        <h3 className={styles.subTitle}>Processing &amp; Shipping</h3>
                        <p className={styles.text}>
                            Orders are usually processed and shipped within 48 hours. Personalized and custom-made items may take longer. If your order contains both personalized and non-personalized items, they may be shipped separately.
                        </p>

                        <h3 className={styles.subTitle}>Shipping Charges</h3>
                        <ul className={styles.list}>
                            <li><strong>India:</strong> Free shipping on all orders above ₹449.</li>
                            <li><strong>International:</strong> Shipping charges apply. Returns on international orders will not be free.</li>
                        </ul>

                        <h3 className={styles.subTitle}>Tracking &amp; Delivery</h3>
                        <ul className={styles.list}>
                            <li><strong>Tracking:</strong> Once shipped, you will receive tracking details via WhatsApp, Email, and SMS.</li>
                            <li><strong>Split Shipments:</strong> Orders with gold jewellery or customized products may arrive in parts.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Returns &amp; Exchanges</h2>
                        <ul className={styles.list}>
                            <li>You may request a return or exchange within 48 hours of delivery (only applicable to eligible products).</li>
                            <li>The product must be returned in its original condition — unworn, with all original packaging, certificates, and tags intact.</li>
                            <li>Returns will be rejected if product tags are removed, altered, or if the item shows signs of wear.</li>
                        </ul>

                        <h3 className={styles.subTitle}>Non-Returnable Items</h3>
                        <ul className={styles.list}>
                            <li>Customized / Personalized jewellery</li>
                            <li>Made-to-order pieces</li>
                            <li>Final sale or discounted products</li>
                        </ul>
                        <p className={styles.textNote}>
                            <em>Note:</em> Slight variations may occur since many of our designs are handcrafted by artisans in Jaipur &amp; Kolkata. Stone colours may also vary slightly due to natural properties. These are not considered defects.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Refund Policy</h2>
                        <ul className={styles.list}>
                            <li>Refunds will be processed only after the returned product passes our quality check at our warehouse.</li>
                            <li>Refunds will be made to your original payment method within 7–10 business days.</li>
                            <li>If an order included free gifts (such as coins or accessories), these must also be returned. Missing items may result in deduction of the full MRP of the item from the refund.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Exchange Policy</h2>
                        <ul className={styles.list}>
                            <li>Exchanges are allowed for eligible products within 7 days.</li>
                            <li>You may exchange for a different size, design, or product of equal or higher value.</li>
                            <li>Price differences (if any) must be paid by the customer.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Return Process</h2>
                        <ul className={styles.list}>
                            <li>Initiate a return request via <Link href="/contact" className={styles.link}>Riolls.com or contact our Customer Support Team</Link>.</li>
                            <li>Our logistics partner will arrange a reverse pick-up. Please be available at the scheduled time and answer calls from the delivery agent. Missed pick-ups will require rebooking.</li>
                            <li>If your pincode is not reverse serviceable, we may request you to ship the item via a reliable courier (e.g., India Post). We will reimburse shipping costs up to ₹70 for such cases.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Important Notes</h2>
                        <ul className={styles.list}>
                            <li><strong>Empty Parcel/Missing Product Claims:</strong> Report within 48 hours of delivery along with a 360° opening video of the parcel. Without video proof or in case of tampering signs, claims may be rejected.</li>
                            <li><strong>International Returns:</strong> Customers must bear return shipping costs, customs duties, and handling fees (if applicable).</li>
                            <li><strong>Final Decision:</strong> Riolls reserves the right to approve or reject returns based on the condition of the product.</li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
}
