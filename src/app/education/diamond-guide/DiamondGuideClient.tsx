'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

// Using constants for images so they can be easily managed by an admin later
const IMAGES = {
    hero: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772000100/paige-johnson-Xk0wo4HtM-g-unsplash_kghwev.jpg",
    cert_gia: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999683/gia_q8l69s.png",
    cert_igi: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999686/igi_t8apni.png",
    cert_sgl: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999685/sgl_i8alev.png",
    cert_bis: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999682/bis_r6ea6g.png"
};

export default function DiamondBuyingGuide() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Education</span>
                    <h1 className={styles.heroH1}>Diamond Buying Guide</h1>
                    <p className={styles.heroSub}>
                        Discover the secrets behind a diamond's sparkle. Learn about the 4Cs, diamond shapes, and our commitment to certified authenticity.
                    </p>
                </div>
            </section>

            {/* Hero Image */}
            <section className={styles.imageSection}>
                <div className={styles.fullImageWrapper}>
                    <Image
                        src={IMAGES.hero}
                        alt="Diamond Guide"
                        fill
                        className={styles.fullImage}
                        unoptimized
                    />
                </div>
            </section>

            {/* ── Menu / Tabs (Static visual representation for the guide) ── */}
            <div className={styles.tabsMenu}>
                <div className={styles.tabsInner}>
                    <span className={styles.tabActive}>Diamond Guide</span>
                    <Link href="#" className={styles.tabLink}>Gem Guide</Link>
                </div>
            </div>

            {/* ── Content ── */}
            <section className={styles.content}>

                {/* The 4Cs */}
                <div className={styles.article}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>The 4Cs of Diamond Quality</h2>
                        <p className={styles.sectionIntro}>
                            Every diamond is unique, yet all share certain structural features that determine their value and beauty. Understanding Cut, Color, Clarity, and Carat weight will empower you to find the perfect stone.
                        </p>
                    </div>

                    <div className={styles.grid2}>
                        {/* Cut */}
                        <div className={styles.csCard}>
                            <div className={styles.csIcon}>C1</div>
                            <h3 className={styles.csTitle}>Cut</h3>
                            <p className={styles.text}>
                                <em>The most important factor affecting sparkle and brilliance.</em><br /><br />
                                Cut determines how light enters the stone and reflects back to the eye. An Excellent cut ensures maximum brilliance and fire, reflecting nearly all light. A Poor cut results in a dull appearance.
                            </p>
                            <div className={styles.proTip}>
                                <strong>Pro Tip:</strong> Prioritize cut over other factors for maximum sparkle. An Excellent cut makes lower color or clarity grades appear brighter and clearer.
                            </div>
                        </div>

                        {/* Color */}
                        <div className={styles.csCard}>
                            <div className={styles.csIcon}>C2</div>
                            <h3 className={styles.csTitle}>Color</h3>
                            <p className={styles.text}>
                                <em>Measures the absence of color in a diamond.</em><br /><br />
                                Diamonds are graded from D (colorless) to Z (light yellow). The less color a diamond has, the higher its grade and value. G-H grades offer fantastic value, appearing colorless to the naked eye.
                            </p>
                            <div className={styles.proTip}>
                                <strong>Pro Tip:</strong> If you are setting the diamond in yellow gold, you can safely choose an I-J color grade, as the gold setting naturally masks slight color tints.
                            </div>
                        </div>

                        {/* Clarity */}
                        <div className={styles.csCard}>
                            <div className={styles.csIcon}>C3</div>
                            <h3 className={styles.csTitle}>Clarity</h3>
                            <p className={styles.text}>
                                <em>Measures the absence of internal (inclusions) and external (blemishes) flaws.</em><br /><br />
                                Grades range from FL (Flawless) to I3 (Included). VVS and VS stones have minute inclusions very difficult to see under 10x magnification.
                            </p>
                            <div className={styles.proTip}>
                                <strong>Pro Tip:</strong> VS2 is considered the "sweet spot" for balancing perfection and budget. SI1-SI2 stones often appear eye-clean and offer excellent value.
                            </div>
                        </div>

                        {/* Carat */}
                        <div className={styles.csCard}>
                            <div className={styles.csIcon}>C4</div>
                            <h3 className={styles.csTitle}>Carat Weight</h3>
                            <p className={styles.text}>
                                <em>Measures the diamond's physical weight (1 carat = 200mg).</em><br /><br />
                                Carat weight affects price exponentially, not linearly. Prices jump significantly at "magic weights" such as 0.50, 0.75, and 1.00 carats.
                            </p>
                            <div className={styles.proTip}>
                                <strong>Pro Tip:</strong> Focus on cut quality over pure carat size. A brilliantly cut 0.90ct stone will often appear larger and more beautiful than a poorly cut 1.00ct stone.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diamond Shapes */}
                <div className={`${styles.article} ${styles.grayBlock}`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Diamond Shapes</h2>
                        <p className={styles.sectionIntro}>
                            The shape of a diamond is an expression of personal style. From the classic round to the romantic vintage cuts.
                        </p>
                    </div>

                    <div className={styles.shapesGrid}>
                        {[
                            { name: "Round Brilliant", desc: "Most popular, maximum sparkle." },
                            { name: "Princess", desc: "Square shape with pointed corners." },
                            { name: "Cushion", desc: "Square with rounded corners, vintage appeal." },
                            { name: "Oval", desc: "Elongated shape, creates illusion of larger size." },
                            { name: "Emerald", desc: "Rectangular step-cut, 'hall of mirrors' effect." },
                            { name: "Pear", desc: "Teardrop shape, combines round and marquise." },
                        ].map((shape, i) => (
                            <div key={i} className={styles.shapeCard}>
                                <div className={styles.shapeIconMock}>
                                    {/* Generic shape placeholder for the design */}
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                                    </svg>
                                </div>
                                <h4 className={styles.shapeName}>{shape.name}</h4>
                                <p className={styles.shapeDesc}>{shape.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certification & Authenticity */}
                <div className={styles.article}>
                    <div className={styles.sectionHeaderCenter}>
                        <h2 className={styles.sectionTitle}>Certification &amp; Authenticity</h2>
                        <p className={styles.textCenter}>
                            At Riolls Jewels, transparency is our guarantee. We partner with the world's leading, independent gemological laboratories to ensure that every diamond and piece of gold jewelry you purchase is authentic, ethically sourced, and precisely graded.
                        </p>
                    </div>

                    <div className={styles.certGrid}>

                        <div className={styles.certCard}>
                            <div className={styles.certImageWrap}>
                                <Image src={IMAGES.cert_gia} alt="GIA Certification" fill className={styles.certImage} unoptimized />
                            </div>
                            <h4 className={styles.certName}>GIA Certified</h4>
                            <p className={styles.certDesc}>The Gemological Institute of America is the world's foremost authority on diamonds, colored stones, and pearls.</p>
                        </div>

                        <div className={styles.certCard}>
                            <div className={styles.certImageWrap}>
                                <Image src={IMAGES.cert_igi} alt="IGI Certification" fill className={styles.certImage} unoptimized />
                            </div>
                            <h4 className={styles.certName}>IGI Certified</h4>
                            <p className={styles.certDesc}>The International Gemological Institute is the largest independent laboratory for grading diamonds and fine jewelry.</p>
                        </div>

                        <div className={styles.certCard}>
                            <div className={styles.certImageWrap}>
                                <Image src={IMAGES.cert_sgl} alt="SGL Certification" fill className={styles.certImage} unoptimized />
                            </div>
                            <h4 className={styles.certName}>SGL Certified</h4>
                            <p className={styles.certDesc}>Solitaire Gemological Laboratories provides internationally recognized diamond and gemstone certification.</p>
                        </div>

                        <div className={styles.certCard}>
                            <div className={styles.certImageWrap}>
                                <Image src={IMAGES.cert_bis} alt="BIS Hallmark" fill className={styles.certImage} unoptimized />
                            </div>
                            <h4 className={styles.certName}>BIS Hallmarked Gold</h4>
                            <p className={styles.certDesc}>The Bureau of Indian Standards hallmark guarantees the exact purity and fineness of the gold used in your jewelry.</p>
                        </div>

                    </div>
                </div>

                {/* FAQ Section */}
                <div className={`${styles.article} ${styles.grayBlock}`}>
                    <div className={styles.sectionHeaderCenter}>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <p className={styles.textCenter}>Common questions about choosing the perfect diamond.</p>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                        {[
                            {
                                q: "Are Lab-Grown diamonds real diamonds?",
                                a: "Yes. Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. The only difference is their origin. They even receive the same certifications from the GIA and IGI."
                            },
                            {
                                q: "Which of the 4Cs is most important?",
                                a: "Cut is universally considered the most important of the 4Cs. A poorly cut diamond will seem dull even with perfect color and clarity, while an Excellent cut makes lower color/clarity grades appear much brighter by maximizing light reflection."
                            },
                            {
                                q: "What does 'eye-clean' mean?",
                                a: "An 'eye-clean' diamond means that no inclusions or blemishes are visible to the naked eye without magnification. VS2, SI1, and sometimes SI2 diamonds can be perfectly eye-clean, offering substantial value."
                            },
                            {
                                q: "Do you offer conflict-free natural diamonds?",
                                a: "Absolutely. All our natural diamonds are sourced through suppliers adhering to the strict guidelines of the Kimberley Process, ensuring they are conflict-free."
                            }
                        ].map((faq, i) => (
                            <div key={i} className={styles.faqItem}>
                                <button
                                    className={styles.faqTrigger}
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                >
                                    {faq.q}
                                    <span className={styles.faqIcon}>
                                        {activeFaq === i ? '−' : '+'}
                                    </span>
                                </button>
                                {activeFaq === i && (
                                    <p className={styles.faqBody}>{faq.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
}
