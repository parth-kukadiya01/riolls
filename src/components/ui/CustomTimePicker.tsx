'use client';

import styles from '@/app/contact/page.module.css';

interface CustomTimePickerProps {
    value?: string; // HH:mm format
    onChange: (time: string) => void;
}

export default function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {

    // Helper to generate HH:mm
    const timeSlots = [
        // Morning
        { label: '10:00 am', val: '10:00', cat: 'Morning' },
        { label: '10:30 am', val: '10:30', cat: 'Morning' },
        { label: '11:00 am', val: '11:00', cat: 'Morning' },
        { label: '11:30 am', val: '11:30', cat: 'Morning' },

        // Afternoon
        { label: '12:00 pm', val: '12:00', cat: 'Afternoon' },
        { label: '12:30 pm', val: '12:30', cat: 'Afternoon' },
        { label: '01:00 pm', val: '13:00', cat: 'Afternoon' },
        { label: '01:30 pm', val: '13:30', cat: 'Afternoon' },
        { label: '02:00 pm', val: '14:00', cat: 'Afternoon' },
        { label: '02:30 pm', val: '14:30', cat: 'Afternoon' },
        { label: '03:00 pm', val: '15:00', cat: 'Afternoon' },
        { label: '03:30 pm', val: '15:30', cat: 'Afternoon' },

        // Evening
        { label: '04:00 pm', val: '16:00', cat: 'Evening' },
        { label: '04:30 pm', val: '16:30', cat: 'Evening' },
        { label: '05:00 pm', val: '17:00', cat: 'Evening' },
        { label: '05:30 pm', val: '17:30', cat: 'Evening' },
        { label: '06:00 pm', val: '18:00', cat: 'Evening' },
        { label: '06:30 pm', val: '18:30', cat: 'Evening' },
        { label: '07:00 pm', val: '19:00', cat: 'Evening' },
    ];

    const morning = timeSlots.filter(t => t.cat === 'Morning');
    const afternoon = timeSlots.filter(t => t.cat === 'Afternoon');
    const evening = timeSlots.filter(t => t.cat === 'Evening');

    return (
        <div className={styles.timePickerWrap}>

            {/* Morning */}
            <div className={styles.timeGroupHeader}>
                <span className={styles.timeGroupLine} />
                <span className={styles.timeGroupTitle}>Morning</span>
                <span className={styles.timeGroupLine} />
            </div>
            <div className={styles.timeGrid}>
                {morning.map(t => (
                    <button
                        key={t.val}
                        type="button"
                        onClick={() => onChange(t.val)}
                        className={`${styles.timeSlot} ${value === t.val ? styles.timeSlotActive : ''}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Afternoon */}
            <div className={styles.timeGroupHeader} style={{ marginTop: '24px' }}>
                <span className={styles.timeGroupLine} />
                <span className={styles.timeGroupTitle}>Afternoon</span>
                <span className={styles.timeGroupLine} />
            </div>
            <div className={styles.timeGrid}>
                {afternoon.map(t => (
                    <button
                        key={t.val}
                        type="button"
                        onClick={() => onChange(t.val)}
                        className={`${styles.timeSlot} ${value === t.val ? styles.timeSlotActive : ''}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Evening */}
            <div className={styles.timeGroupHeader} style={{ marginTop: '24px' }}>
                <span className={styles.timeGroupLine} />
                <span className={styles.timeGroupTitle}>Evening</span>
                <span className={styles.timeGroupLine} />
            </div>
            <div className={styles.timeGrid}>
                {evening.map(t => (
                    <button
                        key={t.val}
                        type="button"
                        onClick={() => onChange(t.val)}
                        className={`${styles.timeSlot} ${value === t.val ? styles.timeSlotActive : ''}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

        </div>
    );
}
