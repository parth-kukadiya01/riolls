'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAdminToken } from '@/lib/adminAuth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = getAdminToken();
            const isLoginPage = pathname === '/admin/login';

            if (!token && !isLoginPage) {
                router.replace('/admin/login');
            } else if (token && isLoginPage) {
                router.replace('/admin');
            } else {
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (!isAuthorized) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf9f8' }}>
                <p style={{ fontFamily: 'var(--font-primary)', letterSpacing: '0.05em' }}>LOADING RIOLLS ADMIN...</p>
            </div>
        );
    }

    return <>{children}</>;
}
