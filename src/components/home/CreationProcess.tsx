'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CreationProcess.module.css';

const steps = [
    {
        num: '1',
        title: 'Consultation',
        desc: 'Meet our experts virtually or in-studio to discuss your ideas, budget, and timeline.'
    },
    {
        num: '2',
        title: 'Design & CAD',
        desc: 'See your vision come to life with detailed 3D renderings before production begins.'
    },
    {
        num: '3',
        title: 'Stone Selection',
        desc: 'Hand-pick GIA/IGI certified diamonds and gemstones that match your criteria.'
    },
    {
        num: '4',
        title: 'Production & Finish',
        desc: 'Your piece is created and finished using BIS hallmarked gold with strict quality checks.'
    },
    {
        num: '5',
        title: 'Delivery',
        desc: 'Your masterpiece is insured and delivered safely with all authenticity certificates.'
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
                    <span className={styles.eyebrow}>How We Work</span>
                    <h2 className={styles.title}>Our Creation Process</h2>
                    <p className={styles.subtitle}>
                        From your first spark of inspiration to the final reveal, we ensure a transparent and collaborative journey.
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
                                src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771992601/kateryna-hliznitsova-ceSCZzjTReg-unsplash_zjqcr7.jpg"
                                alt="Our Creation Process"
                                fill
                                className={styles.image}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
