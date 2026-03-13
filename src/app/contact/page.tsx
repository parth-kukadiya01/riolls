import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact & Private Consultations',
    description: 'Reach Riolls Jewels for bespoke commissions, private viewings, and consultations. Available Monday to Saturday, 10am–7pm. Contact us by email, phone, or WhatsApp.',
    alternates: { canonical: 'https://riolls.com/contact' },
};

export default function ContactPage() {
    return <ContactClient />;
}
