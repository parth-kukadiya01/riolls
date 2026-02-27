'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminFetch, ADMIN_API_URL, getAdminToken } from '@/lib/adminAuth';
import styles from './page.module.css';

interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    metal?: string;
    stone?: string;
    ringSize?: string;
    engravingText?: string;
}

interface Order {
    _id: string;
    orderNumber: string;
    userId: any;
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    shippingMethod: string;
    trackingNumber: string;
    adminNotes: string;
    shippingAddress: any;
    billingAddress: any;
    createdAt: string;
}

export default function AdminOrderDetails({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Status update state
    const [updateStatus, setUpdateStatus] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [adminNotes, setAdminNotes] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await adminFetch(`/admin/orders/${resolvedParams.id}`);
                const json = await res.json();
                if (res.ok) {
                    setOrder(json.data);
                    setUpdateStatus(json.data.status);
                    setTrackingNumber(json.data.trackingNumber || '');
                    setAdminNotes(json.data.adminNotes || '');
                } else {
                    setError(json.message || 'Failed to load order');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [resolvedParams.id]);

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await adminFetch(`/admin/orders/${resolvedParams.id}/status`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: updateStatus,
                    trackingNumber,
                    adminNotes
                })
            });
            const json = await res.json();
            if (res.ok) {
                setOrder(json.data);
                alert('Order updated successfully');
            } else {
                throw new Error(json.message || 'Update failed');
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleDownloadInvoice = () => {
        const token = getAdminToken();
        const url = `${ADMIN_API_URL}/admin/orders/${resolvedParams.id}/invoice`;

        // Basic fetch to download as blob because it requires Authorization header
        fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                if (!res.ok) throw new Error('Invoice generation failed');
                return res.blob();
            })
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `Invoice_${order?.orderNumber}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(err => alert(err.message));
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading order details...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!order) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(val);
    };

    const user = typeof order.userId === 'object' ? order.userId : null;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <Link href="/admin/orders" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                        ← Back to Orders
                    </Link>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Order {order.orderNumber}</h1>
                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase().replace(' ', '-')]}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className={styles.subtitle}>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnSecondary} onClick={handleDownloadInvoice}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Invoice
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {/* Left Column */}
                <div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Order Items</h2>
                        <table className={styles.itemsTable}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th style={{ textAlign: 'right' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className={styles.itemInfo}>
                                                <img src={item.productImage || 'https://via.placeholder.com/60'} alt={item.productName} className={styles.itemImg} />
                                                <div>
                                                    <div className={styles.itemName}>{item.productName}</div>
                                                    <div className={styles.itemMeta}>
                                                        {item.metal && <span>{item.metal}</span>}
                                                        {item.stone && <span> | {item.stone}</span>}
                                                        {item.ringSize && <span> | Size {item.ringSize}</span>}
                                                    </div>
                                                    {item.engravingText && (
                                                        <div className={styles.itemMeta} style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>
                                                            Engraving: "{item.engravingText}"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatCurrency(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>{formatCurrency(order.subtotal)}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Shipping ({order.shippingMethod})</span>
                                <span>{formatCurrency(order.shippingCost)}</span>
                            </div>
                            <div className={`${styles.totalRow} ${styles.grand}`}>
                                <span>Total</span>
                                <span>{formatCurrency(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Update Status</h2>
                        <form onSubmit={handleUpdateStatus}>
                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Order Status</label>
                                <select
                                    className={styles.select}
                                    value={updateStatus}
                                    onChange={e => setUpdateStatus(e.target.value)}
                                >
                                    <option value="confirmed">Confirmed</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            {(updateStatus === 'shipped' || updateStatus === 'delivered') && (
                                <div className={styles.formGroup}>
                                    <label className={styles.detailLabel}>Tracking Number</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={trackingNumber}
                                        onChange={e => setTrackingNumber(e.target.value)}
                                        placeholder="e.g. tracking code..."
                                    />
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label className={styles.detailLabel}>Admin Notes (Internal)</label>
                                <textarea
                                    className={styles.textarea}
                                    value={adminNotes}
                                    onChange={e => setAdminNotes(e.target.value)}
                                    placeholder="Add any internal notes about fulfillment..."
                                />
                            </div>

                            <button type="submit" className={styles.btnPrimary} style={{ marginTop: '0.5rem' }} disabled={updating}>
                                {updating ? 'Saving...' : 'Update Order'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Customer</h2>
                        {user ? (
                            <>
                                <div className={styles.detailSection}>
                                    <div className={styles.detailLabel}>Contact Info</div>
                                    <div className={styles.detailValue}>
                                        <strong>{user.firstName} {user.lastName}</strong><br />
                                        <a href={`mailto:${user.email}`} style={{ color: 'var(--gold)' }}>{user.email}</a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={styles.detailSection}>Guest or Deleted User</div>
                        )}
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Shipping Address</h2>
                        <div className={styles.detailSection}>
                            {order.shippingAddress ? (
                                <div className={styles.detailValue}>
                                    {order.shippingAddress.name}<br />
                                    {order.shippingAddress.line1}<br />
                                    {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}<br />
                                    {order.shippingAddress.phone}
                                </div>
                            ) : (
                                <div className={styles.detailValue} style={{ color: '#888' }}>No shipping address provided.</div>
                            )}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Payment info</h2>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Method</div>
                            <div className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{(order.paymentMethod || 'N/A').replace('_', ' ')}</div>
                        </div>
                        <div className={styles.detailSection}>
                            <div className={styles.detailLabel}>Status</div>
                            <div className={styles.detailValue}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    background: order.paymentStatus === 'paid' ? '#e8f5e9' : '#fff8e1',
                                    color: order.paymentStatus === 'paid' ? '#2e7d32' : '#f57c00',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    fontWeight: 500
                                }}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
