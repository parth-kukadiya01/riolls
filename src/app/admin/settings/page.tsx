'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Setting {
    key: string;
    values: string[];
    description: string;
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<Record<string, Setting>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [newInputs, setNewInputs] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                // Fetch all settings
                const res = await adminFetch(`/settings/`);
                const json = await res.json();
                if (res.ok) {
                    const dataObj: Record<string, Setting> = {};
                    json.data.forEach((s: Setting) => {
                        dataObj[s.key] = s;
                    });

                    // Force initialize structure if empty from DB
                    if (!dataObj['base_metals']) {
                        dataObj['base_metals'] = { key: 'base_metals', values: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'], description: 'Available metals for bespoke requests' };
                    }
                    if (!dataObj['primary_stones']) {
                        dataObj['primary_stones'] = { key: 'primary_stones', values: ['Diamond', 'Sapphire', 'Emerald', 'Ruby', 'Moissanite'], description: 'Primary stone options' };
                    }

                    setSettings(dataObj);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleRemoveValue = (key: string, valueToRemove: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                values: prev[key].values.filter(v => v !== valueToRemove)
            }
        }));
    };

    const handleAddValue = (e: React.FormEvent, key: string) => {
        e.preventDefault();
        const value = newInputs[key]?.trim();
        if (!value) return;

        if (!settings[key].values.includes(value)) {
            setSettings(prev => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    values: [...prev[key].values, value]
                }
            }));
        }

        setNewInputs(prev => ({ ...prev, [key]: '' }));
    };

    const handleSave = async (key: string) => {
        setSaving(key);
        try {
            const setting = settings[key];
            const res = await adminFetch(`/settings/admin/${key}`, {
                method: 'PUT',
                body: JSON.stringify({
                    values: setting.values,
                    description: setting.description
                })
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || 'Failed to save');
            }
            alert(`Saved ${key.replace('_', ' ')} successfully.`);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(null);
        }
    };

    const renderSettingCard = (settingKey: string, title: string) => {
        const setting = settings[settingKey];
        if (!setting) return null;

        return (
            <div className={styles.card} key={settingKey}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>{title}</h2>
                        <p className={styles.cardDesc}>{setting.description}</p>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Current Values</label>
                    <div className={styles.tagContainer}>
                        {setting.values.map(val => (
                            <div className={styles.tag} key={val}>
                                {val}
                                <button type="button" className={styles.removeTagBtn} onClick={() => handleRemoveValue(settingKey, val)}>&times;</button>
                            </div>
                        ))}
                        {setting.values.length === 0 && <span style={{ fontSize: '0.875rem', color: '#888' }}>No values specified.</span>}
                    </div>

                    <form onSubmit={(e) => handleAddValue(e, settingKey)} className={styles.addInputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Add a new value..."
                            value={newInputs[settingKey] || ''}
                            onChange={(e) => setNewInputs({ ...newInputs, [settingKey]: e.target.value })}
                        />
                        <button type="submit" className={styles.addBtn}>Add</button>
                    </form>
                </div>

                <button
                    className={styles.saveBtn}
                    onClick={() => handleSave(settingKey)}
                    disabled={saving === settingKey}
                >
                    {saving === settingKey ? 'Saving...' : 'Save Changes'}
                </button>
                <div style={{ clear: 'both' }}></div>
            </div>
        );
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>System Settings</h1>
                    <p className={styles.subtitle}>Configure global lists and options used across the store.</p>
                </div>
            </div>

            <div className={styles.container}>
                {renderSettingCard('base_metals', 'Metals')}
                {renderSettingCard('primary_stones', 'Gemstones & Diamonds')}
            </div>
        </div>
    );
}
