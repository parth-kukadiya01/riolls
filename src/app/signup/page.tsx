import Link from 'next/link';
import styles from '../login/page.module.css'; // Re-use auth styles

export default function SignupPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.container}>
                <div className={styles.authBox}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>Client Account</span>
                        <h1 className={styles.title}>Register</h1>
                        <p className={styles.subtitle}>Create an account to track orders and save your favourite bespoke designs.</p>
                    </div>

                    <form className={styles.form} action="/profile">
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName" className={styles.label}>First Name</label>
                            <input type="text" id="firstName" className={styles.input} required placeholder="Jane" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName" className={styles.label}>Last Name</label>
                            <input type="text" id="lastName" className={styles.input} required placeholder="Doe" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input type="email" id="email" className={styles.input} required placeholder="name@example.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input type="password" id="password" className={styles.input} required placeholder="••••••••" minLength={8} />
                        </div>

                        <button type="submit" className={styles.submitBtn}>Create Account</button>
                    </form>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>Already have an account?</span>
                        <Link href="/login" className={styles.footerLink}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
