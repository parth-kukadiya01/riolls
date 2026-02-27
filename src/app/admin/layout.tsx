import type { Metadata } from 'next';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export const metadata: Metadata = {
    title: 'Admin Dashboard — Riolls Jewels',
    description: 'Management portal for Riolls Jewels',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <AdminLayoutWrapper>
                {children}
            </AdminLayoutWrapper>
        </AdminGuard>
    );
}
