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

    const { userId, name, email, phone, preferredContact, pieceType, style, styleTags, additionalNotes, metalPreference, finalMetal, stonePreference, stoneCut, stoneSize, finish, wearOccasion, budget, estimatedPriceLow, estimatedPriceHigh, selectedImage } = request;

    const cName = name || (userId ? `${userId.firstName} ${userId.lastName}` : 'Anonymous');
    const cEmail = email || userId?.email || 'N/A';
    const cPhone = phone || userId?.phone || 'N/A';

    const formatCurrency = (val: number | null) => {
        if (!val) return 'Not quoted';
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(val);
    };

    const aiPromptReconstruction = `I want to design ${pieceType || 'a piece'} ${request.metal || 'in 18k gold'} ${request.stone || 'with diamonds'} ${request.designStyle || 'in an elegant style'} ${request.setting || 'with a classic setting'} ${budget ? `within ${budget}` : ''}.`;

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
                                {pieceType || 'Not specified'}
                                {style ? ` - ${style}` : ''}
                            </div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Inspiration & Notes</div>
                            <div className={styles.detailValue}>
                                {additionalNotes || 'No notes provided'}
                            </div>
                        </div>
                        <div className={styles.detailSection} style={{ marginTop: '0.5rem', background: '#fcfaf5', padding: '12px', border: '1px solid #eaddcf', borderRadius: '4px' }}>
                            <div className={styles.detailLabel} style={{ color: 'var(--rose)' }}>Generated AI Prompt</div>
                            <div className={styles.detailValue} style={{ fontStyle: 'italic', color: '#666', lineHeight: 1.5 }}>
                                "{aiPromptReconstruction}"
                            </div>
                        </div>
                        {styleTags && styleTags.length > 0 && (
                            <div className={styles.detailSection} style={{ marginTop: '0.5rem' }}>
                                <div className={styles.detailLabel}>Style Tags</div>
                                <div className={styles.detailValue} style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                                    {styleTags.map((tag: string) => (
                                        <span key={tag} style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '2px 8px', fontSize: '0.75rem', borderRadius: '4px' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedImage && (
                            <div className={styles.detailSection} style={{ marginTop: '1.5rem' }}>
                                <div className={styles.detailLabel}>Selected Concept Image</div>
                                <div className={styles.imageGrid}>
                                    <a href={selectedImage} target="_blank" rel="noopener noreferrer">
                                        <img src={selectedImage} className={styles.attachmentImg} alt="Selected AI Concept" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Material & Sizing Specs</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Preferred Metal</div>
                            <div className={styles.detailValue}>{metalPreference || finalMetal || 'Any / Open to suggestions'}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Stone Requirements</div>
                            <div className={styles.detailValue}>
                                {stonePreference ? `${stonePreference} ` : ''}
                                {stoneCut ? `(${stoneCut})` : ''}
                                {(!stonePreference && !stoneCut) && 'None specified'}
                            </div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Finish & Size</div>
                            <div className={styles.detailValue}>
                                {finish ? `Finish: ${finish}` : 'Standard Polish'}
                                {stoneSize ? ` | Stone Size: ${stoneSize}` : ''}
                            </div>
                        </div>
                        {request.engraving && (
                            <div className={styles.detailSection}>
                                <div className={styles.detailLabel}>Engraving</div>
                                <div className={styles.detailValue} style={{ fontStyle: 'italic', color: '#555' }}>
                                    "{request.engraving}"
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Budget & Occasion</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Expected Budget Range</div>
                            <div className={styles.detailValue} style={{ fontFamily: 'var(--font-secondary)', fontSize: '1rem' }}>
                                {budget || 'Not Specified'}
                            </div>
                        </div>
                        {(estimatedPriceLow || estimatedPriceHigh) && (
                            <div className={styles.detailSection}>
                                <div className={styles.detailValue} style={{ fontStyle: 'italic', color: '#666' }}>AI Estimate: £{estimatedPriceLow} - £{estimatedPriceHigh}</div>
                            </div>
                        )}
                        <div className={styles.detailSection} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                            <div className={styles.detailLabel}>Wear Occasion</div>
                            <div className={styles.detailValue}>
                                {wearOccasion || 'None'}
                            </div>
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
                            <div className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{preferredContact || 'Email'}</div>
                        </div>
                        {request.notes && (
                            <div className={styles.detailSection} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                <div className={styles.detailLabel}>Client Notes</div>
                                <div className={styles.detailValue} style={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{request.notes}</div>
                            </div>
                        )}
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
