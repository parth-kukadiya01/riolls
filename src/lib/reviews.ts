export interface Review {
    id: string;
    name: string;
    location: string;
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    body: string;
    product: string;
    date: string;
    verified: boolean;
}

export const REVIEWS: Review[] = [
    {
        id: 'r1',
        name: 'Charlotte M.',
        location: 'London, UK',
        rating: 5,
        title: 'Beyond every expectation',
        body: 'My Celestine engagement ring arrived today — I am utterly speechless. The craftsmanship is extraordinary. I could see exactly how each grain of metal had been worked by hand. Worth every penny and then some.',
        product: 'Celestine Solitaire Ring',
        date: 'February 14, 2026',
        verified: true,
    },
    {
        id: 'r2',
        name: 'James W.',
        location: 'Edinburgh, UK',
        rating: 5,
        title: 'The bespoke process was magical',
        body: 'We worked with James at the London atelier to design a sapphire necklace for our 25th anniversary. The whole process — from the first sketch to collection day — felt genuinely personal. Our goldsmith sent us progress photos. It was unforgettable.',
        product: 'Bespoke Sapphire Necklace',
        date: 'January 30, 2026',
        verified: true,
    },
    {
        id: 'r3',
        name: 'Isabelle F.',
        location: 'Paris, France',
        rating: 5,
        title: 'Parfait, comme toujours',
        body: 'This is the third piece I have purchased from Riolls Jewels. The Tempest Halo ring is breathtaking — the diamonds catch every light brilliantly. Shipped securely to Paris in four days, with beautiful packaging.',
        product: 'Tempest Halo Ring',
        date: 'January 20, 2026',
        verified: true,
    },
    {
        id: 'r4',
        name: 'Priya K.',
        location: 'Mumbai, India',
        rating: 5,
        title: 'An heirloom in the making',
        body: 'I wanted something I could pass to my daughter one day. The team at Riolls understood exactly what I meant. They designed a ruby bracelet that feels simultaneously modern and timeless. I receive compliments every single day I wear it.',
        product: 'Ruby Pavé Bracelet',
        date: 'January 8, 2026',
        verified: true,
    },
    {
        id: 'r5',
        name: 'Thomas R.',
        location: 'New York, USA',
        rating: 5,
        title: 'Effortless luxury from 3,000 miles away',
        body: 'The AI Studio helped me articulate the exact style I wanted. The team then created something I could have never described on my own. Delivered securely to New York in under 10 days. Exceptional service end to end.',
        product: 'Aurora Pavé Band',
        date: 'December 28, 2025',
        verified: true,
    },
    {
        id: 'r6',
        name: 'Amelia H.',
        location: 'Sydney, Australia',
        rating: 5,
        title: 'Wore it to the opera, heads turned all evening',
        body: 'The Celestine drop earrings are an absolute statement. My partner proposed just three months ago and I wanted something dramatic to celebrate. These are perfect — the stones shimmer differently in every light.',
        product: 'Celestine Drop Earrings',
        date: 'December 10, 2025',
        verified: true,
    },
];

export const STATS = {
    average: 4.97,
    total: 847,
    breakdown: [
        { stars: 5, count: 821, pct: 97 },
        { stars: 4, count: 21, pct: 2.5 },
        { stars: 3, count: 4, pct: 0.5 },
        { stars: 2, count: 1, pct: 0.1 },
        { stars: 1, count: 0, pct: 0 },
    ],
};
