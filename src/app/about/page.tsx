'use client';

import Image from 'next/image';
import styles from './page.module.css';

// Admin can easily swap these image URLs later from a CMS or local public folder
const ABOUT_IMAGES = {
    hero: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23EFEFEF'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23A0A0A0' font-family='sans-serif' font-size='14'%3EAdmin Image 1 (Hero)%3C/text%3E%3C/svg%3E",
    craft: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750'%3E%3Crect width='100%25' height='100%25' fill='%23E6E6E6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23A0A0A0' font-family='sans-serif' font-size='14'%3EAdmin Image 2 (Craftsmanship)%3C/text%3E%3C/svg%3E",
    gold: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750'%3E%3Crect width='100%25' height='100%25' fill='%23E6E6E6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23A0A0A0' font-family='sans-serif' font-size='14'%3EAdmin Image 3 (Gold)%3C/text%3E%3C/svg%3E"
};

export default function AboutPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Our Story</span>
                    <h1 className={styles.heroH1}>About Riolls</h1>
                </div>
            </section>

            {/* Main Hero Image */}
            <section className={styles.imageSection}>
                <div className={styles.fullImageWrapper}>
                    <Image
                        src={"https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png"}
                        alt="About Riolls"
                        fill
                        className={styles.fullImage}
                        unoptimized
                    />
                </div>
            </section>

            {/* ── Content ── */}
            <section className={styles.content}>

                {/* Intro */}
                <div className={styles.textBlockCenter}>
                    <h2 className={styles.sectionTitle}>A Regal Heritage</h2>
                    <p className={styles.textLead}>
                        Our name, Riolls, is inspired by words that evoke majesty: Rio (meaning king) and lls (an homage to royals). This name carries our brand's spirit—regal elegance woven into every design.
                    </p>
                    <p className={styles.text}>
                        Since 2008, Riolls has been dedicated to crafting jewelry that feels both timeless and intimate, a reflection of personal greatness in everyday moments. We believe every person has a sovereign shine, and our pieces are created to honor that inner royalty.
                    </p>
                </div>

                {/* 50/50 Split 1 */}
                <div className={styles.splitBlock}>
                    <div className={styles.splitText}>
                        <h2 className={styles.sectionTitle}>Our Journey and Vision</h2>
                        <p className={styles.text}>
                            Founded in 2008, Riolls was born from a desire to blend tradition with modern life. Our founder envisioned a brand where age-old techniques meet contemporary style, making luxury wearable every day. Over two decades later, we remain true to that vision.
                        </p>
                        <p className={styles.text}>
                            We cherish our roots in classic craftsmanship while embracing the dreams of a vibrant community. Each year of experience deepens our commitment to quality, authenticity, and heartfelt service.
                        </p>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Handcrafted Excellence</h2>
                        <p className={styles.text}>
                            Every piece at Riolls is 100% handmade by dedicated artisans who pour their devotion into each creation. Our craftsmen and women use time-honored techniques—from careful sculpting to hand engraving—ensuring no detail is overlooked. This isn't just production; it's personal devotion.
                        </p>
                        <p className={styles.text}>
                            With gentle hands and patient hearts, our artisans transform pure gold into wearable art, infusing each jewel with care and character. The result is a collection of pieces that are unique, alive with story, and destined to become cherished heirlooms.
                        </p>
                    </div>
                    <div className={styles.splitImage}>
                        <Image
                            src={"https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772123328/In_Mexico_a_Family_Focused_on_Twists_of_Silver_Filigree_ohuo6h.jpg"}
                            alt="Craftsmanship"
                            fill
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                </div>

                {/* 50/50 Split 2 (Reversed) */}
                <div className={`${styles.splitBlock} ${styles.reversed}`}>
                    <div className={styles.splitText}>
                        <h2 className={styles.sectionTitle}>Pure, Responsibly Sourced Gold</h2>
                        <p className={styles.text}>
                            At Riolls, quality begins with the purity of materials. We use only the finest pure gold, carefully sourced from certified, ethical mines. Our gold is responsibly obtained — we partner with trusted suppliers who share our commitment to environmental stewardship and fair labor practices.
                        </p>
                        <p className={styles.text}>
                            This transparency in sourcing means you can wear Riolls jewelry with absolute confidence. Each piece carries the gleam of pure metal and the peace of mind that it was made honestly, from the ground up.
                        </p>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Trust, Transparency, and Quality</h2>
                        <p className={styles.text}>
                            Honesty is the cornerstone of the Riolls experience. We stand by every piece we create with full transparency and rigorous quality assurance. Each jewel is hallmarked to certify its purity, and we openly share details about our craftsmanship and materials. Our promise is simple: you deserve to know exactly what you're wearing.
                        </p>
                        <p className={styles.text}>
                            From the first selection of raw gold to the final polish, we document our process and welcome any questions. When you choose Riolls, you join a community built on mutual trust and integrity.
                        </p>
                    </div>
                    <div className={styles.splitImage}>
                        <Image
                            src={"https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772123321/Jaubalet_Paris_Joaillerie_tukwhe.jpg"}
                            alt="Responsibly Sourced Gold"
                            fill
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                </div>

                {/* Closing Block */}
                <div className={styles.textBlockCenter} style={{ marginTop: '40px' }}>
                    <h2 className={styles.sectionTitle}>Everyday Elegance for Life</h2>
                    <p className={styles.text}>
                        Riolls jewelry is designed to be part of your daily story. We believe that elegance shouldn't be reserved for special occasions alone, but woven into every day. Each design blends classic timelessness with modern comfort, so pieces can be worn as effortlessly with jeans and a blouse as with a formal gown.
                    </p>
                    <p className={styles.text}>
                        Crafted to withstand daily adventures, Riolls pieces are robust yet refined—made to stand the test of time. These are not fleeting trends; they are treasures meant to grow with you, becoming cherished keepsakes of every moment.
                    </p>

                    <ul className={styles.list}>
                        <li><strong>Timeless Design:</strong> Classic motifs that endure changing fashions.</li>
                        <li><strong>Durable Craftsmanship:</strong> Solid construction to last a lifetime.</li>
                        <li><strong>Effortless Wear:</strong> Comfort and versatility for every occasion.</li>
                    </ul>

                    <p className={styles.text}>
                        Our jewelry is more than an accessory — it's a constant companion through life's milestones, from the quietest mornings to the grandest celebrations.
                    </p>

                    <h2 className={styles.sectionTitle} style={{ marginTop: '60px' }}>Community and Connection</h2>
                    <p className={styles.text}>
                        At the heart of Riolls is a warm community of customers, artisans, and friends. We see you as part of the Riolls family. Every message, every story of a Riolls jewel at a wedding or as a daily talisman, inspires us to keep creating.
                    </p>
                    <p className={styles.text}>
                        We celebrate our customers' journeys and strive to be there for you through all of life's moments. When you hold a Riolls piece, know that it was made with love by people who care — for you, for the craft, and for our world.
                    </p>

                    <p className={styles.closingText}>
                        We invite you to share your story with us.
                        <br /><br />
                        <em>Embrace your crown. Shine with Riolls.</em>
                    </p>
                </div>

            </section>
        </div>
    );
}
