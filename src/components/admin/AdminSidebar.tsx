'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { removeAdminToken } from '@/lib/adminAuth';
import styles from './AdminSidebar.module.css';

const navGroups = [
    {
        title: 'Overview',
        items: [
            { label: 'Dashboard', href: '/admin', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
        ]
    },
    {
        title: 'Commerce',
        items: [
            { label: 'Orders', href: '/admin/orders', icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /> },
            { label: 'Products', href: '/admin/products', icon: <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /> },
            { label: 'Categories', href: '/admin/categories', icon: <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" /> },
            { label: 'Users', href: '/admin/users', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /> },
        ]
    },
    {
        title: 'Customer Relations',
        items: [
            { label: 'Enquiries', href: '/admin/enquiries', icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" /> },
            { label: 'Appointments', href: '/admin/appointments', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
            { label: 'AI Studio Quotes', href: '/admin/designs', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
            { label: 'AI Product', href: '/admin/bespoke', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
            { label: 'Reviews', href: '/admin/reviews', icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /> },
        ]
    },
    {
        title: 'Content',
        items: [
            { label: 'Bespoke Portfolio', href: '/admin/bespoke', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
            { label: 'CMS / Banners', href: '/admin/cms', icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /> },
            { label: 'Blog', href: '/admin/blog', icon: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /> },
        ]
    },
    {
        title: 'System',
        items: [
            { label: 'AI Limits', href: '/admin/ai-limits', icon: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
            { label: 'Settings', href: '/admin/settings', icon: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> },
        ]
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        removeAdminToken();
        router.push('/admin/login');
    };

    return (
        <>
            <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
            <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <Link href="/admin" className={styles.logo} onClick={() => setMobileOpen(false)}>
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                            <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" />
                        </svg>
                        <span>ADMIN</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {navGroups.map((group, idx) => (
                        <div key={idx} className={styles.navGroup}>
                            <span className={styles.navGroupTitle}>{group.title}</span>
                            {group.items.map((item) => {
                                // Match exactly or if pathname starts with href/
                                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {item.icon}
                                        </svg>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                <div className={styles.footer}>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
