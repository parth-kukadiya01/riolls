import styles from './page.module.css';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Legal</span>
                    <h1 className={styles.heroH1}>Privacy Policy</h1>
                    <p className={styles.heroSub}>
                        Effective Date: February 2026
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.textBlock}>
                        <p className={styles.intro}>
                            Riolls Jewels (“we,” “our,” or “us”) values your trust and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website, make a purchase, or interact with our services.
                        </p>
                        <p className={styles.intro}>
                            By using our website or services, you agree to the terms of this Privacy Policy.
                        </p>

                        <h2 className={styles.heading}>1. INFORMATION WE COLLECT</h2>
                        <p>We collect different types of information to provide a seamless shopping experience and improve our services:</p>

                        <h3 className={styles.subheading}>a) Personal Information</h3>
                        <ul className={styles.list}>
                            <li>Full name</li>
                            <li>Contact details (email, phone number, shipping/billing address)</li>
                            <li>Payment information (processed securely via trusted payment gateways)</li>
                            <li>Account credentials (username, password, and authentication details)</li>
                        </ul>

                        <h3 className={styles.subheading}>b) Non-Personal Information</h3>
                        <ul className={styles.list}>
                            <li>Device details (browser type, operating system, device model)</li>
                            <li>IP address and geolocation (where applicable)</li>
                            <li>Website usage data (collected via cookies, pixels, or analytics tools)</li>
                            <li>Log files (time of visit, pages viewed, referring websites)</li>
                        </ul>

                        <h3 className={styles.subheading}>c) Information You Provide Voluntarily</h3>
                        <ul className={styles.list}>
                            <li>Preferences and interests (e.g., wishlist items, product reviews)</li>
                            <li>Communication with customer support</li>
                            <li>Participation in promotions, surveys, or feedback forms</li>
                        </ul>

                        <h2 className={styles.heading}>2. HOW WE USE YOUR INFORMATION</h2>
                        <p>Your information is used solely for legitimate business purposes, including:</p>
                        <ul className={styles.list}>
                            <li>Processing and fulfilling your orders</li>
                            <li>Delivering products and managing returns/exchanges</li>
                            <li>Providing personalized recommendations and a tailored shopping experience</li>
                            <li>Communicating with you regarding orders, offers, and updates</li>
                            <li>Offering customer support and resolving issues</li>
                            <li>Sending promotional emails, newsletters, or marketing campaigns (with your consent)</li>
                            <li>Analyzing trends and improving our website, products, and services</li>
                            <li>Complying with legal obligations</li>
                        </ul>

                        <h2 className={styles.heading}>3. COOKIES AND TRACKING TECHNOLOGIES</h2>
                        <p>We use cookies, pixels, and analytics tools to:</p>
                        <ul className={styles.list}>
                            <li>Recognize returning visitors</li>
                            <li>Save your preferences (e.g., cart items, login info)</li>
                            <li>Track website usage and performance</li>
                            <li>Deliver targeted advertisements and promotional offers</li>
                        </ul>
                        <p>You can manage or disable cookies through your browser settings, but some site features may not function properly without them.</p>

                        <h2 className={styles.heading}>4. SHARING YOUR INFORMATION</h2>
                        <p>We respect your privacy and never sell or rent your data. Your information may only be shared with:</p>
                        <ul className={styles.list}>
                            <li><strong>Payment Gateways & Processors:</strong> To securely process transactions</li>
                            <li><strong>Shipping & Delivery Partners:</strong> To deliver your orders efficiently</li>
                            <li><strong>IT & Cloud Storage Providers:</strong> To securely store and manage data</li>
                            <li><strong>Marketing & Advertising Platforms:</strong> To send personalized promotional offers</li>
                            <li><strong>Analytics Services:</strong> To monitor site usage and improve functionality</li>
                            <li><strong>Legal & Regulatory Authorities:</strong> When required by law, court order, or to protect our legal rights</li>
                        </ul>
                        <p>All third-party providers are bound by confidentiality and data protection agreements.</p>

                        <h2 className={styles.heading}>5. DATA SECURITY</h2>
                        <p>We employ industry-standard security measures to safeguard your data, including:</p>
                        <ul className={styles.list}>
                            <li>SSL (Secure Socket Layer) encryption</li>
                            <li>Secure servers and firewalls</li>
                            <li>Regular monitoring and security audits</li>
                            <li>Limited access to sensitive data (only authorized personnel)</li>
                        </ul>
                        <p>While we take all reasonable precautions, no method of transmission over the internet is 100% secure.</p>

                        <h2 className={styles.heading}>6. YOUR RIGHTS</h2>
                        <p>In compliance with Indian data protection laws and international standards (GDPR, where applicable), you have the right to:</p>
                        <ul className={styles.list}>
                            <li>Access, update, or correct your personal data</li>
                            <li>Request deletion of your data (unless required for legal/contractual purposes)</li>
                            <li>Opt out of marketing communications at any time</li>
                            <li>Withdraw consent for data processing (where applicable)</li>
                            <li>Request a copy of your stored information</li>
                        </ul>
                        <p>To exercise these rights, please <Link href="/contact" className={styles.link}>contact us</Link>.</p>

                        <h2 className={styles.heading}>7. DATA RETENTION</h2>
                        <p>We retain personal information only as long as necessary to:</p>
                        <ul className={styles.list}>
                            <li>Fulfill the purposes outlined in this policy</li>
                            <li>Comply with legal and regulatory requirements</li>
                            <li>Resolve disputes and enforce agreements</li>
                        </ul>
                        <p>Once no longer required, your data is securely deleted or anonymized.</p>

                        <h2 className={styles.heading}>8. CHILDREN’S PRIVACY</h2>
                        <p>Our website and services are not intended for children under the age of 18. We do not knowingly collect data from minors. If you believe a child has provided us with personal information, please contact us immediately, and we will delete it.</p>

                        <h2 className={styles.heading}>9. THIRD-PARTY LINKS</h2>
                        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies before providing any personal information.</p>

                        <h2 className={styles.heading}>10. INTERNATIONAL DATA TRANSFER</h2>
                        <p>If you access our services from outside India, your data may be transferred to and processed in India or other jurisdictions. By using our services, you consent to such transfers.</p>

                        <h2 className={styles.heading}>11. CHANGES TO THIS POLICY</h2>
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The “Effective Date” will always indicate the latest version.</p>

                        <h2 className={styles.heading}>12. CONTACT US</h2>
                        <p>If you have questions, concerns, or requests regarding this Privacy Policy, you may contact us at:</p>
                        <div className={styles.contactBlock}>
                            <p><strong>Riolls Jewels</strong></p>
                            <p>Email: <a href="mailto:riollsjewels@gmail.com" className={styles.link}>riollsjewels@gmail.com</a></p>
                            <p>Phone: <a href="tel:+917041071431" className={styles.link}>+91 7041071431</a></p>
                            <p>Address: B-812 IT PARK NEAR AIR MALL SURAT 394101</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
