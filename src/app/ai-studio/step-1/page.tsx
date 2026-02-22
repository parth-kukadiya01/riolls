'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';

const questions = [
    {
        id: 'style',
        question: 'Which aesthetic speaks to you most?',
        answers: ['Romantic & Delicate', 'Bold & Statement', 'Classic & Timeless', 'Avant-Garde & Modern'],
    },
    {
        id: 'metal',
        question: 'Your preferred metal?',
        answers: ['18k Yellow Gold', '18k White Gold', '18k Rose Gold', 'Platinum'],
    },
    {
        id: 'stone',
        question: 'What draws your eye?',
        answers: ['Brilliant Diamonds', 'Vivid Coloured Gems', 'Pearls & Organics', 'Mixed & Layered'],
    },
    {
        id: 'wear',
        question: 'How will this piece be worn?',
        answers: ['Daily & Everyday', 'Special Occasions', 'Bridal & Ceremony', 'Collectible & Heirloom'],
    },
    {
        id: 'budget',
        question: 'What is your approximate budget?',
        answers: ['Under £2,000', '£2,000 – £6,000', '£6,000 – £15,000', 'I prefer not to set a limit'],
    },
];

export default function AIStep1() {
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [selected, setSelected] = useState<string | null>(null);

    const progress = ((currentQ) / questions.length) * 100;
    const q = questions[currentQ];

    const handleAnswer = (ans: string) => {
        setSelected(ans);
        const next = { ...answers, [q.id]: ans };
        setAnswers(next);
        setTimeout(() => {
            setSelected(null);
            if (currentQ < questions.length - 1) {
                setCurrentQ(c => c + 1);
            } else {
                router.push('/ai-studio/step-2');
            }
        }, 400);
    };

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.container}>
                <div className={styles.stepMeta}>
                    <span className={styles.stepCount}>Question {currentQ + 1} of {questions.length}</span>
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
        </div>
    );
}
