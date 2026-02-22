'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function ProductCarePage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Riolls Jewels</span>
                    <h1 className={styles.heroH1}>Jewellery Care</h1>
                    <p className={styles.heroSub}>
                        We hope you love your new jewellery purchase. At Riolls Jewels, we believe jewellery should last longer than a single lifetime, and caring for it properly is the best way to ensure that generations to come will get to wear and love it too.
                    </p>
                </div>
            </section>

            {/* ── Content Sections ── */}
            <section className={styles.content}>
                <div className={styles.article}>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>How to best care for your jewellery</h2>
                        <ul className={styles.list}>
                            <li>Clean your jewellery at home with warm, mildly soapy water and a very soft brush - we recommend a soft toothbrush and a dash of mild dish soap. Dry with a soft, lint-free cloth.</li>
                            <li>When it comes to storage, jewellery's worst enemy is other jewellery! Keep your items separate by wrapping them in tissue or cloth when travelling, or stored in separate compartments of a jewellery box. This includes separating each earring in a pair.</li>
                            <li>Remove rings and bracelets before doing any task that might knock or rub them, such as working out or heavy lifting.</li>
                            <li>Save the best for last. Put jewellery on after applying makeup, perfume, and hair products to avoid chemical buildup.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Looking after your Diamonds &amp; Gemstones</h2>
                        <ul className={styles.list}>
                            <li>Make it click! If you have bought a pair of our signature hoop earrings, please make sure you listen for the click to ensure they are properly closed.</li>
                            <li>As part of our after-care service we recommend a yearly check-up on your diamond settings. Just drop us a line when you'd like them serviced and we'll coordinate the rest to ensure stones remain secure.</li>
                            <li>While diamonds are the hardest known mineral, they can still chip upon hard impact. Treat your diamond pieces with the respect they deserve.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>How to best care for your jewellery box</h2>
                        <ul className={styles.list}>
                            <li>Your Riolls heirloom box should be stored away from direct sunlight and any heat source (e.g., radiators, fires, underfloor heating).</li>
                            <li>For dusting, lightly wipe with a soft dry cloth.</li>
                            <li>Once or twice a year we recommend polishing the wooden parts of your box with a wood furniture wax and a soft cloth, rubbing in circular motions. Any polish on brass areas can be polished off with a soft, dry cloth afterwards.</li>
                            <li>When necessary, clean the mirror very carefully with a little white vinegar on a soft cloth, ensuring no liquid touches the interior or exterior of the box.</li>
                            <li>The hand embroidery and velvet will fade if exposed to direct sunlight for extended periods.</li>
                        </ul>
                    </div>

                    <div className={styles.ctaSection}>
                        <h3 className={styles.ctaTitle}>Request a Service</h3>
                        <p className={styles.ctaText}>
                            We know how much meaning your favourite pieces hold and offer a range of services to keep your pieces as beautiful as day one, including cleaning, polishing, fit alterations and more.
                        </p>
                        <Link href="/bespoke" className={styles.ctaBtn}>
                            Book an Appointment
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
