'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

export default function AdminDesignRequestDetails({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Status update state
    const [updateStatus, setUpdateStatus] = useState('');
    const [quotedPrice, setQuotedPrice] = useState<number | string>('');
    const [adminNotes, setAdminNotes] = useState('');
    const [goldsmith, setGoldsmith] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                // Assuming we have to fetch all and filter since `GET /admin/designs/{id}` isn't explicit
                // Wait, examining the `designs.py` router from earlier grep, it only has `/admin/designs` and `/admin/designs/{design_id}` (PUT).
                // Let's just fetch all and filter.
                const res = await adminFetch('/admin/designs');
                const json = await res.json();
                if (res.ok) {
                    const found = json.data.find((r: any) => r._id === resolvedParams.id);
                    if (found) {
                        setRequest(found);
                        setUpdateStatus(found.status);
                        setQuotedPrice(found.quotedPrice || '');
                        setAdminNotes(found.adminNotes || '');
                        setGoldsmith(found.assignedGoldsmith || '');
                    } else {
                        setError('Design request not found');
                    }
                } else {
                    setError('Failed to load request');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [resolvedParams.id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await adminFetch(`/admin/designs/${resolvedParams.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: updateStatus,
                    finalPrice: quotedPrice ? Number(quotedPrice) : null,
                    goldsmith: goldsmith,
                    adminNotes: adminNotes
                })
            });

            const json = await res.json();
            if (res.ok) {
                setRequest({
                    ...request,
                    status: updateStatus,
                    finalPrice: quotedPrice ? Number(quotedPrice) : null,
                    goldsmith: goldsmith,
                    adminNotes: adminNotes
                });
                alert('Request updated successfully');
            } else {
                throw new Error(json.message || 'Update failed');
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading request details...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!request) return null;

    const { styleProfile, materialSpec, budgetRange, timeline, contactDetails, userId } = request;

    const cName = contactDetails ? `${contactDetails.firstName} ${contactDetails.lastName}` : (userId ? `${userId.firstName} ${userId.lastName}` : 'Anonymous');
    const cEmail = contactDetails?.email || userId?.email || 'N/A';
    const cPhone = contactDetails?.phone || userId?.phone || 'N/A';

    const formatCurrency = (val: number | null) => {
        if (!val) return 'Not quoted';
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(val);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <Link href="/admin/designs" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                        ← Back to Design Requests
                    </Link>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Design Request</h1>
                        <span className={`${styles.statusBadge} ${styles[request.status.replace('_', '-')]}`}>
                            {request.status.replace('_', ' ')}
                        </span>
                    </div>
                    <p className={styles.subtitle}>
                        Submitted {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                {/* Left Column */}
                <div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Style Profile</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Type & Aesthetic</div>
                            <div className={styles.detailValue}>
                                {styleProfile?.jewelryType?.replace('_', ' ') || 'Not specified'}
                                {styleProfile?.aesthetic ? ` - ${styleProfile.aesthetic}` : ''}
                            </div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Inspiration</div>
                            <div className={styles.detailValue}>
                                {styleProfile?.inspirationNotes || 'No notes provided'}
                            </div>
                        </div>

                        {styleProfile?.referenceImages && styleProfile.referenceImages.length > 0 && (
                            <div className={styles.detailSection} style={{ marginTop: '1.5rem' }}>
                                <div className={styles.detailLabel}>Reference Images</div>
                                <div className={styles.imageGrid}>
                                    {styleProfile.referenceImages.map((src: string, idx: number) => (
                                        <a href={src} target="_blank" rel="noopener noreferrer" key={idx}>
                                            <img src={src} className={styles.attachmentImg} alt={`Ref ${idx}`} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Material & Sizing Specs</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Preferred Metal</div>
                            <div className={styles.detailValue}>{materialSpec?.metalPreference || 'Any / Open to suggestions'}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Stone Requirements</div>
                            <div className={styles.detailValue}>
                                {materialSpec?.stonePreference ? `${materialSpec.stonePreference} ` : ''}
                                {materialSpec?.stoneShape ? `(${materialSpec.stoneShape})` : ''}
                                {(!materialSpec?.stonePreference && !materialSpec?.stoneShape) && 'None specified'}
                            </div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Ring Size</div>
                            <div className={styles.detailValue}>{materialSpec?.ringSize || 'N/A'}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Engraving / Personalization</div>
                            <div className={styles.detailValue}>{materialSpec?.engravingText || 'None'}</div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Budget & Timeline</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Expected Budget Range</div>
                            <div className={styles.detailValue} style={{ fontFamily: 'var(--font-secondary)', fontSize: '1rem' }}>
                                {budgetRange?.range || 'Not Specified'}
                            </div>
                        </div>
                        {budgetRange?.isFlexible && (
                            <div className={styles.detailSection}>
                                <div className={styles.detailValue} style={{ fontStyle: 'italic', color: '#666' }}>* Client indicated budget is flexible.</div>
                            </div>
                        )}
                        <div className={styles.detailSection} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                            <div className={styles.detailLabel}>Required By</div>
                            <div className={styles.detailValue}>
                                {timeline?.targetDate ? new Date(timeline.targetDate).toLocaleDateString() : 'No specific date'}
                            </div>
                            {timeline?.isStrict && <div style={{ color: '#c62828', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500 }}>Strict Deadline</div>}
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Special Occasion</div>
                            <div className={styles.detailValue}>{timeline?.occasion || 'None'}</div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Contact Details</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Client Name</div>
                            <div className={styles.detailValue}>{cName}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Email</div>
                            <div className={styles.detailValue}>
                                <a href={`mailto:${cEmail}`} style={{ color: 'var(--gold)' }}>{cEmail}</a>
                            </div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Phone</div>
                            <div className={styles.detailValue}>{cPhone}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Best Contact Method</div>
                            <div className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{contactDetails?.preferredContactMethod || 'Email'}</div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Production Tracking</h2>
                        <form onSubmit={handleUpdate}>
                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Status</label>
                                <select
                                    className={styles.select}
                                    value={updateStatus}
                                    onChange={e => setUpdateStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="quoted">Quoted</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="in_production">In Production</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Quoted Price (£)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={quotedPrice}
                                    onChange={e => setQuotedPrice(e.target.value)}
                                    placeholder="e.g. 5000"
                                />
                                {request.quotedPrice && (
                                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                                        Current: {formatCurrency(request.quotedPrice)}
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Assigned Goldsmith</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={goldsmith}
                                    onChange={e => setGoldsmith(e.target.value)}
                                    placeholder="Internal production ref..."
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Admin Notes</label>
                                <textarea
                                    className={styles.textarea}
                                    value={adminNotes}
                                    onChange={e => setAdminNotes(e.target.value)}
                                    placeholder="Internal notes, meetings, updates..."
                                />
                            </div>

                            <button type="submit" className={styles.btnPrimary} style={{ marginTop: '0.5rem' }} disabled={updating}>
                                {updating ? 'Saving...' : 'Update Request Tracker'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
