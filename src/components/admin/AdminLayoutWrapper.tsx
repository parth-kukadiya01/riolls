'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayoutWrapper.module.css';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        document.body.classList.add('admin-mode');
        return () => document.body.classList.remove('admin-mode');
    }, []);

    if (isLoginPage) {
        return <div className={styles.loginWrapper}>{children}</div>;
    }

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
