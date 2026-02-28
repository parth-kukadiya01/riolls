'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

export const questions = [
    {
        id: 'pieceType',
        question: 'What type of jewelry are you looking for?',
        answers: ['Ring', 'Necklace', 'Earrings', 'Bracelet'],
    },
    {
        id: 'gender',
        question: 'Who is this piece for?',
        answers: ['Men', 'Women', 'Unisex'],
    },
    {
        id: 'style',
        question: 'Which aesthetic speaks to you most?',
        answers: ['Romantic & Delicate', 'Bold & Statement', 'Classic & Timeless', 'Avant-Garde & Modern', 'Minimalist & Architectural', 'Bohemian & Earthy', 'Vintage & Art Deco', 'Organic & Molten'],
    },
    {
        id: 'metalPreference',
        question: 'Your preferred metal?',
        answers: ["9k Yellow Gold", "9k White Gold", "9k Rose Gold", "14k Yellow Gold", "14k White Gold", "14k Rose Gold", "18k Yellow Gold", '18k White Gold', '18k Rose Gold', "22k Rose Gold", "22k Yellow Gold", "22k White Gold", "925 Silver"],
    },
    {
        id: 'stonePreference',
        question: 'What draws your eye?',
        answers: ['Brilliant Diamonds', 'Vivid Coloured Gems', 'Pearls & Organics', 'Mixed & Layered'],
    },
    {
        id: 'wearOccasion',
        question: 'How will this piece be worn?',
        answers: ['Daily & Everyday', 'Special Occasions', 'Bridal & Ceremony', 'Collectible & Heirloom'],
    },
    {
        id: 'budget',
        question: 'What is your approximate budget?',
        answers: ['Under £1,000', "£1,000 - £2,000", '£2,000 – £5,000', '£5,000 – £8,000', '£8,000 - £12,000', 'I prefer not to set a limit'],
    },
];

export default function AIStep1() {
    const router = useRouter();
    const { updateProfile } = useAIStudio();
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);

    const progress = ((currentQ) / questions.length) * 100;
    const q = questions[Math.min(currentQ, questions.length - 1)];

    const handleAnswer = (ans: string) => {
        setSelected(ans);

        // Push answers to global context instantly
        updateProfile({ [q.id]: ans });

        setTimeout(() => {
            setSelected(null);
            if (currentQ < questions.length - 1) {
                setCurrentQ(c => c + 1);
            } else {
                router.push('/ai-studio/step-2');
            }
        }, 400);
    };

    const handleSkip = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
        } else {
            router.push('/ai-studio/step-2');
        }
    };

    return (
        <div className={styles.page} >
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.container}>
                <div className={styles.stepHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className={styles.stepMeta}>
                        <span className={styles.stepCount}>Question {currentQ + 1} of {questions.length}</span>
                    </div>
                    <button
                        onClick={handleSkip}
                        style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.9rem', padding: '0.5rem' }}
                    >
                        Skip
                    </button>
                </div>
                <h2 className={styles.question}>{q.question}</h2>

                <div className={styles.answerGrid}>
                    {q.answers.map(ans => (
                        <button
                            key={ans}
                            className={`${styles.answerCard} ${selected === ans ? styles.selected : ''}`}
                            onClick={() => handleAnswer(ans)}
                        >
                            <span className={styles.answerText}>{ans}</span>
                            <span className={styles.answerCheck}>✓</span>
                        </button>
                    ))}
                </div>
            </div>
        </div >
    );
}
