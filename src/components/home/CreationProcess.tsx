'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CreationProcess.module.css';

const steps = [
    {
        num: '1',
        title: 'Bespoke Consultation',
        desc: 'An intimate dialogue with our artisans to understand your distinct vision, desires, and legacy.'
    },
    {
        num: '2',
        title: 'Artistic Rendering',
        desc: 'Witness your imagination materialize through impeccable 3D artistry and precision CAD modeling.'
    },
    {
        num: '3',
        title: 'Gemstone Curation',
        desc: 'Select from an exclusive cache of globally sourced, ethically verified diamonds and rare gemstones.'
    },
    {
        num: '4',
        title: 'Masterful Artistry',
        desc: 'Our master goldsmiths forge your jewel with uncompromising dedication to perfection and heritage techniques.'
    },
    {
        num: '5',
        title: 'Prestigious Presentation',
        desc: 'Your heirloom is securely hand-delivered, accompanied by distinguished certificates of authenticity and valor.'
    }
];

export default function CreationProcess() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
                    <span className={styles.eyebrow}>The Art of Perfection</span>
                    <h2 className={styles.title}>The Journey to Mastery</h2>
                    <p className={styles.subtitle}>
                        From your first spark of inspiration to the sublime final reveal, we curate an exclusive, highly personalized experience defined by unwavering trust and absolute discretion.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.stepsColumn}>
                        {steps.map((step, index) => (
                            <div
                                key={step.num}
                                className={`${styles.stepCard} ${isVisible ? styles.stepAnimateIn : ''}`}
                                style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
                            >
                                <div className={styles.stepNum}>{step.num}</div>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`${styles.imageColumn} ${isVisible ? styles.imageAnimateIn : ''}`}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1773423990/Honoring_Heritage_Craftsmanship_version_1_iltnsk.png"
                                alt="Our Creation Process"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
