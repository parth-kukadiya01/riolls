import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.container}>
                <div className={styles.authBox}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>Client Account</span>
                        <h1 className={styles.title}>Sign In</h1>
                        <p className={styles.subtitle}>Enter your details to access your bespoke orders and preferences.</p>
                    </div>

                    <form className={styles.form} action="/profile">
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input type="email" id="email" className={styles.input} required placeholder="name@example.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.passwordHeader}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <Link href="#" className={styles.forgotLink}>Forgot Password?</Link>
                            </div>
                            <input type="password" id="password" className={styles.input} required placeholder="••••••••" />
                        </div>

                        <button type="submit" className={styles.submitBtn}>Sign In</button>
                    </form>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>New to Riolls Jewels?</span>
                        <Link href="/signup" className={styles.footerLink}>Create an Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
