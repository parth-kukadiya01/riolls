import styles from './page.module.css';
import Link from 'next/link';

export default function CareersPage() {
    const vacancies = [
        {
            title: 'Jewellery Designer',
            department: 'Creative & Design',
            location: 'Surat / London',
            type: 'Full-time'
        },
        {
            title: 'Web Developer',
            department: 'Technology',
            location: 'Remote / Surat',
            type: 'Full-time'
        },
        {
            title: 'Marketing Person',
            department: 'Growth & Social',
            location: 'London',
            type: 'Full-time'
        },
        {
            title: 'Accountant',
            department: 'Finance',
            location: 'Surat',
            type: 'Full-time'
        }
    ];

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Our Company</span>
                    <h1 className={styles.heroH1}>Careers at Riolls</h1>
                    <p className={styles.heroSub}>
                        Join our atelier of craftspeople, creatives, and innovators. We are constantly seeking passionate individuals to help us shape the future of modern luxury jewellery.
                    </p>
                </div>
            </section>

            {/* ── Vacancies ── */}
            <section className={styles.vacancies}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Open Vacancies</h2>
                        <p className={styles.sectionIntro}>Explore our current opportunities below.</p>
                    </div>

                    <div className={styles.grid}>
                        {vacancies.map((job, index) => (
                            <div key={index} className={styles.jobCard}>
                                <div className={styles.jobHeader}>
                                    <span className={styles.jobDept}>{job.department}</span>
                                    <span className={styles.jobType}>{job.type}</span>
                                </div>
                                <h3 className={styles.jobTitle}>{job.title}</h3>
                                <div className={styles.jobFooter}>
                                    <span className={styles.jobLocation}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {job.location}
                                    </span>
                                    <Link href="/contact" className={styles.applyBtn}>Apply Now →</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.speculative}>
                        <p>Don't see a role that fits? We are always open to hearing from talented individuals.</p>
                        <Link href="/contact" className={styles.speculativeLink}>Send a speculative application</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
