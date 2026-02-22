import Link from 'next/link';
import styles from './layout.module.css';

export default function AIStudioLayout({ children }: { children: React.ReactNode }) {
    const steps = [
        { n: 1, label: 'Style' },
        { n: 2, label: 'Describe' },
        { n: 3, label: 'Generate' },
        { n: 4, label: 'Customise' },
        { n: 5, label: 'Quote' },
    ];

    return (
        <div className={styles.shell}>
            {/* Top bar */}
            <div className={styles.topBar}>
                <Link href="/" className={styles.back}>← Back to Shop</Link>
                <div className={styles.stepList}>
                    {steps.map((s, i) => (
                        <div key={s.n} className={styles.stepItem}>
                            <Link href={`/ai-studio/step-${s.n}`} className={styles.stepLink}>
                                <span className={styles.stepNum}>{s.n}</span>
                                <span className={styles.stepLabel}>{s.label}</span>
                            </Link>
                            {i < steps.length - 1 && <span className={styles.stepConnector} />}
                        </div>
                    ))}
                </div>
                <span className={styles.brand}>AI Studio</span>
            </div>
            <main>{children}</main>
        </div>
    );
}
