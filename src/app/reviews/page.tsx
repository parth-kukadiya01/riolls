import type { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
    title: 'Customer Reviews',
    description: 'Read verified customer reviews of Riolls Jewels. See what clients say about our handcrafted diamond rings, bespoke commissions, and jewellery quality.',
    alternates: { canonical: 'https://riolls.com/reviews' },
};

export default function ReviewsPage() {
    return <ReviewsClient />;
}
