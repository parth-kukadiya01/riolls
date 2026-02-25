import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const IMAGES = {
    hero: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771997169/buddy-an-bUQZomnihtI-unsplash_gfm2y4.jpg",
    rings: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771998724/Button_Back_Rings_-_Web_-_3_Homepage_Images_tq1dwr.webp",
    bracelets: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999197/giustina-barison-yc8hHj3KqXA-unsplash_guq2lr.jpg",
};

export default function SizeGuide() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Client Services</span>
                    <h1 className={styles.heroH1}>Size Guide</h1>
                    <p className={styles.heroSub}>
                        When it comes to jewellery, comfort is key. We want yours to fit like a dream.
                        Discover our size guides below to find your perfect fit.
                    </p>
                </div>
            </section>

            {/* Hero Image */}
            <section className={styles.imageSection}>
                <div className={styles.fullImageWrapper}>
                    <Image
                        src={IMAGES.hero}
                        alt="Size Guide Hero"
                        fill
                        className={styles.fullImage}
                        unoptimized
                    />
                </div>
            </section>

            {/* ── Navigation Links ── */}
            <div className={styles.navMenu}>
                <div className={styles.navInner}>
                    <a href="#rings" className={styles.navLink}>Ring Size Chart</a>
                    <a href="#bracelets" className={styles.navLink}>Bracelet Size Chart</a>
                    <a href="#necklaces" className={styles.navLink}>Necklace Lengths</a>
                </div>
            </div>

            <div className={styles.content}>
                {/* ── Ring Sizing ── */}
                <section id="rings" className={styles.section}>
                    <div className={styles.splitLayout}>
                        <div className={styles.textContent}>
                            <h2 className={styles.sectionTitle}>Ring Size Chart</h2>
                            <div className={styles.tabsHeader}>
                                <span className={styles.tabActive}>Find your Size</span>
                                <span className={styles.tabMuted}>How to Measure</span>
                            </div>

                            <div className={styles.measureInstructions}>
                                <p>
                                    You may be able to find your ring size by measuring a ring you own that is a comfortable fit.
                                    Measure the <strong>inside diameter</strong> in millimeters and use the chart below.
                                </p>
                                <p>
                                    Alternatively, our jewellery experts are here to help. <Link href="/contact" className={styles.textLink}>Contact us</Link> or visit
                                    our boutique and we'll measure you perfectly.
                                </p>
                            </div>

                            <div className={styles.tableWrapper}>
                                <table className={styles.sizeTable}>
                                    <thead>
                                        <tr>
                                            <th>UK</th>
                                            <th>US</th>
                                            <th>EU</th>
                                            <th className={styles.alignRight}>⌀ Inside Diameter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Render standard sizes */}
                                        {[
                                            { uk: 'H', us: '4', eu: '46.5', dia: '15.0 mm' },
                                            { uk: 'I', us: '4.5', eu: '48', dia: '15.3 mm' },
                                            { uk: 'J', us: '5', eu: '49.5', dia: '15.6 mm' },
                                            { uk: 'K', us: '5.5', eu: '50.5', dia: '16.2 mm' },
                                            { uk: 'L', us: '6', eu: '52', dia: '16.6 mm' },
                                            { uk: 'M', us: '6.5', eu: '53', dia: '16.9 mm' },
                                            { uk: 'N', us: '7', eu: '54.5', dia: '17.2 mm' },
                                            { uk: 'O', us: '7.5', eu: '55.5', dia: '17.8 mm' },
                                            { uk: 'P', us: '8', eu: '57', dia: '18.1 mm' },
                                            { uk: 'Q', us: '8.5', eu: '58', dia: '18.5 mm' },
                                            { uk: 'R', us: '9', eu: '59.5', dia: '19.1 mm' },
                                            { uk: 'S', us: '9.5', eu: '61', dia: '19.4 mm' },
                                            { uk: 'T', us: '10', eu: '62', dia: '19.7 mm' },
                                        ].map((row) => (
                                            <tr key={row.uk}>
                                                <td>{row.uk}</td>
                                                <td>{row.us}</td>
                                                <td>{row.eu}</td>
                                                <td className={styles.alignRight}>⌀ {row.dia}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={styles.imageContent}>
                            <div className={styles.splitImageWrapper}>
                                <Image src={IMAGES.rings} alt="Ring Sizing" fill className={styles.splitImage} unoptimized />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Bracelet Sizing ── */}
                <section id="bracelets" className={`${styles.section} ${styles.bgCream}`}>
                    <div className={`${styles.splitLayout} ${styles.splitReverse}`}>
                        <div className={styles.textContent}>
                            <h2 className={styles.sectionTitle}>Bracelet Size Chart</h2>
                            <div className={styles.tabsHeader}>
                                <span className={styles.tabActive}>Find your Size</span>
                                <span className={styles.tabMuted}>How to Measure</span>
                            </div>

                            <div className={styles.measureInstructions}>
                                <p>
                                    To measure your wrist, use a tape measure or a piece of string.
                                    Wrap it around your wrist where you typically wear your bracelet and mark the place where it joins.
                                </p>
                                <p>
                                    If using string, lay it out on a flat surface and use a ruler to measure the length up to the mark.
                                </p>
                            </div>

                            <div className={styles.tableWrapper}>
                                <table className={styles.sizeTable}>
                                    <thead>
                                        <tr>
                                            <th>Style &amp; Size</th>
                                            <th>Wrist Measurement (Looser Fit)</th>
                                            <th>Wrist Measurement (Tighter Fit)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Bangle - Medium</strong></td>
                                            <td>140 - 147 mm</td>
                                            <td>150 - 158 mm</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bangle - Small</strong></td>
                                            <td>134 - 139 mm</td>
                                            <td>144 - 150 mm</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Chain Bracelet</strong></td>
                                            <td colSpan={2}>Standard adult length: 184 mm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={styles.imageContent}>
                            <div className={styles.splitImageWrapper}>
                                <Image src={IMAGES.bracelets} alt="Bracelet Sizing" fill className={styles.splitImage} unoptimized />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Necklace Sizing ── */}
                <section id="necklaces" className={styles.section}>
                    <div className={styles.centerContainer}>
                        <span className={styles.eyebrow}>Guide</span>
                        <h2 className={styles.sectionTitleCenter}>Necklace Lengths</h2>
                        <p className={styles.centerText}>
                            Our necklaces vary gracefully by design, intended to sit perfectly on the collarbone or cascade down the chest.
                            Standard chain lengths typically include <strong>16", 18", 20.5", 21", 30", 32", and 36"</strong>.
                        </p>
                        <p className={styles.centerText}>
                            When browsing, always refer to the specific product description for absolute length measurements,
                            and review the model imagery to see precisely how the piece rests when worn.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
