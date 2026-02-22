export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: 'Guides' | 'Behind the Craft' | 'Inspiration' | 'News';
    date: string;
    readTime: string;
    author: string;
    gradient: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'b1',
        slug: 'how-to-choose-an-engagement-ring',
        title: 'How to Choose the Perfect Engagement Ring',
        excerpt: 'From diamond cuts to metal types, our guide covers everything you need to know before making the most important jewellery purchase of your life.',
        category: 'Guides',
        date: 'February 18, 2026',
        readTime: '8 min read',
        author: 'Eleanor Sinclair',
        gradient: 'linear-gradient(135deg, #F5EAE7 0%, #EDD8D1 100%)',
    },
    {
        id: 'b2',
        slug: 'the-art-of-hand-engraving',
        title: 'The Ancient Art of Hand Engraving',
        excerpt: 'Discover how our goldsmiths preserve a centuries-old tradition, using hand-held burins to carve intricate patterns into precious metal.',
        category: 'Behind the Craft',
        date: 'February 10, 2026',
        readTime: '6 min read',
        author: 'James Whitmore',
        gradient: 'linear-gradient(135deg, #E8EEF5 0%, #D4E0ED 100%)',
    },
    {
        id: 'b3',
        slug: 'sapphire-jewellery-guide',
        title: 'The Enduring Allure of Sapphire',
        excerpt: 'Blue sapphires have captivated royalty and collectors for millennia. We explore what makes this gemstone so extraordinary, and how to select the finest specimens.',
        category: 'Guides',
        date: 'January 28, 2026',
        readTime: '5 min read',
        author: 'Eleanor Sinclair',
        gradient: 'linear-gradient(135deg, #E8EDF8 0%, #C8D4F0 100%)',
    },
    {
        id: 'b4',
        slug: 'bespoke-commission-behind-the-scenes',
        title: 'Inside a Bespoke Commission: From Sketch to Stone',
        excerpt: 'Follow an 11-week journey as goldsmith Thomas Reid transforms a client\'s vision — a ring celebrating a 25th anniversary — into a wearable heirloom.',
        category: 'Behind the Craft',
        date: 'January 15, 2026',
        readTime: '10 min read',
        author: 'James Whitmore',
        gradient: 'linear-gradient(135deg, #F0EEF8 0%, #E0DBF0 100%)',
    },
    {
        id: 'b5',
        slug: 'spring-jewellery-trends-2026',
        title: 'Spring 2026: Jewellery Trends to Know',
        excerpt: 'From delicate layered chains to sculptural statement rings, here are the looks defining luxury jewellery this season.',
        category: 'Inspiration',
        date: 'January 5, 2026',
        readTime: '4 min read',
        author: 'Sophia Lane',
        gradient: 'linear-gradient(135deg, #F5EEE8 0%, #EDD8C8 100%)',
    },
    {
        id: 'b6',
        slug: 'riolls-jewels-london-boutique',
        title: 'Visit Our Mayfair Boutique',
        excerpt: 'Our London townhouse is now open for private appointments. Step inside to view our full collection and meet the goldsmith behind your next piece.',
        category: 'News',
        date: 'December 20, 2025',
        readTime: '2 min read',
        author: 'Riolls Jewels',
        gradient: 'linear-gradient(135deg, #F2F5EE 0%, #DDE8D4 100%)',
    },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find(p => p.slug === slug);
}
