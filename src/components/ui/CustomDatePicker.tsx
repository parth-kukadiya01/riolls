'use client';

import { useState, useMemo } from 'react';
import styles from '@/app/contact/page.module.css';

interface CustomDatePickerProps {
    value?: string; // YYYY-MM-DD format
    onChange: (date: string) => void;
    minDate?: string; // YYYY-MM-DD format
}

export default function CustomDatePicker({ value, onChange, minDate }: CustomDatePickerProps) {
    // Current viewed month/year
    const initDate = value ? new Date(value) : new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(initDate.getFullYear(), initDate.getMonth(), 1));

    const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const monthYearLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const days = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid: { day: number; dateStr: string; isPast: boolean; isEmpty: boolean }[] = [];

        // Fill empty slots before 1st day
        for (let i = 0; i < firstDay; i++) {
            grid.push({ day: 0, dateStr: '', isPast: true, isEmpty: true });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            // Local string format YYYY-MM-DD
            const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let isPast = false;

            if (minDate && dStr < minDate) {
                isPast = true; // Before minDate allowed
            }

            grid.push({
                day,
                dateStr: dStr,
                isPast,
                isEmpty: false
            });
        }
        return grid;
    }, [currentMonth, minDate]);

    return (
        <div className={styles.datePickerWrap}>
            <div className={styles.datePickerHeader}>
                <button type="button" onClick={prevMonth} className={styles.dateNavBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <span className={styles.dateMonthYear}>{monthYearLabel}</span>
                <button type="button" onClick={nextMonth} className={styles.dateNavBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            <div className={styles.dateGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className={styles.dateHeaderCell}>{d}</div>
                ))}

                {days.map((cell, idx) => {
                    if (cell.isEmpty) {
                        return <div key={`empty-${idx}`} className={styles.dateCellEmpty} />;
                    }

                    const isSelected = cell.dateStr === value;
                    const isToday = cell.dateStr === todayStr;

                    let classes = styles.dateCell;
                    if (cell.isPast) classes += ` ${styles.dateCellPast}`;
                    if (isSelected) classes += ` ${styles.dateCellSelected}`;
                    if (isToday && !isSelected) classes += ` ${styles.dateCellToday}`;

                    return (
                        <button
                            key={cell.dateStr}
                            type="button"
                            disabled={cell.isPast}
                            className={classes}
                            onClick={() => onChange(cell.dateStr)}
                        >
                            {cell.day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
