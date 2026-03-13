import type { Metadata } from 'next';
import DiamondBuyingGuide from './DiamondGuideClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Diamond Buying Guide — The 4Cs, Shapes & Certification',
    description: 'Complete diamond buying guide from Riolls Jewels. Learn the 4Cs (cut, colour, clarity, carat), diamond shapes, and how to read GIA, IGI, and SGL certificates.',
    alternates: { canonical: 'https://riolls.com/education/diamond-guide' },
};

const diamondFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What are the 4Cs of diamonds?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The 4Cs of diamonds are Cut, Colour, Clarity, and Carat weight — the four universally accepted standards for grading diamond quality, established by the Gemological Institute of America (GIA). Cut refers to how well a diamond\'s facets interact with light; Colour grades the absence of colour on a scale from D (colourless) to Z (light yellow or brown); Clarity measures internal and external imperfections called inclusions and blemishes; and Carat weight is the diamond\'s mass, where one carat equals 0.2 grams.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is GIA certification for diamonds?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A GIA certificate (officially called a GIA Diamond Grading Report) is an independent assessment of a diamond\'s quality issued by the Gemological Institute of America — the world\'s foremost authority on diamonds. It grades the stone on the 4Cs (cut, colour, clarity, carat weight), provides plot diagrams of inclusions, and confirms whether the diamond is natural or lab-grown. At Riolls Jewels, every diamond comes with a GIA, IGI, or SGL grading report so customers have full confidence in their purchase.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the best diamond cut for brilliance?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Round Brilliant cut is widely considered the best diamond cut for maximum brilliance, fire, and scintillation. Its 57 or 58 facets are mathematically optimised to reflect and refract the maximum amount of light. GIA grades round brilliant cuts as Excellent, Very Good, Good, Fair, or Poor — an Excellent cut grade is recommended for the most brilliant result. Among fancy shapes, the Oval and Cushion cuts also deliver high brilliance while offering a larger visual footprint per carat.',
            },
        },
        {
            '@type': 'Question',
            name: 'What diamond clarity is considered eye-clean?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'An eye-clean diamond is one where inclusions are not visible to the naked eye when viewed from a normal viewing distance of approximately 15–30 cm. On the GIA clarity scale, VS2 (Very Slightly Included 2) and above are virtually always eye-clean. SI1 (Slightly Included 1) diamonds are often eye-clean depending on the type and position of the inclusion, but SI2 and below may show visible inclusions. For engagement rings where the diamond will be viewed closely, VS2 or VS1 is generally recommended as the best value for an eye-clean stone.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between diamond colour grades?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The GIA diamond colour scale runs from D to Z. D, E, and F are Colourless — the rarest and most valuable, showing no detectable colour to a trained grader. G, H, I, and J are Near Colourless — these appear white to the naked eye in a face-up position and represent excellent value. K, L, and M show a faint yellow tint visible to the untrained eye. For white gold or platinum settings, D–H is recommended; for yellow gold settings, J or K can appear just as white due to the warm metal colour reflecting up into the stone.',
            },
        },
        {
            '@type': 'Question',
            name: 'How many carats should an engagement ring diamond be?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'There is no single correct carat weight for an engagement ring diamond — it depends on finger size, setting style, budget, and personal preference. The average engagement ring diamond sold globally is approximately 0.9–1.2 carats. A well-cut 0.7-carat diamond with an excellent cut grade will appear larger and more brilliant than a poorly cut 1-carat diamond. At Riolls Jewels, we recommend prioritising cut quality above carat weight, then choosing the largest well-cut stone within your budget. Halo settings can also make a smaller centre stone appear significantly larger.',
            },
        },
    ],
};

const diamondGuideSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://riolls.com/education/diamond-guide#article',
    headline: 'Diamond Buying Guide — The 4Cs, Shapes & Certification',
    description: 'Complete diamond buying guide covering the 4Cs (cut, colour, clarity, carat), diamond shapes, and how to read GIA, IGI, and SGL grading certificates. Written by the master goldsmiths and gemology experts at Riolls Jewels, Surat.',
    url: 'https://riolls.com/education/diamond-guide',
    image: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
    datePublished: '2024-01-01',
    dateModified: '2026-03-13',
    inLanguage: 'en',
    author: [
        {
            '@type': 'Person',
            name: 'Riolls Master Goldsmiths',
            jobTitle: 'Master Goldsmith & Gemology Expert',
            worksFor: {
                '@type': 'Organization',
                name: 'Riolls Jewels',
                url: 'https://riolls.com',
            },
            knowsAbout: [
                'Diamond 4Cs',
                'GIA diamond grading',
                'IGI certification',
                'Diamond cut quality',
                'Gemstone setting',
                'Fine jewellery manufacturing',
                'Surat diamond trade',
            ],
            description: 'The master goldsmiths and gemology specialists at Riolls Jewels in Surat, Gujarat, India, with over 18 years of expertise in fine jewellery craftsmanship and certified diamond selection.',
        },
        {
            '@type': 'Organization',
            '@id': 'https://riolls.com/#organization',
            name: 'Riolls Jewels',
            url: 'https://riolls.com',
        },
    ],
    publisher: {
        '@type': 'Organization',
        name: 'Riolls Jewels',
        url: 'https://riolls.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://riolls.com/icon.png',
            width: 512,
            height: 512,
        },
    },
    about: [
        { '@type': 'Thing', name: 'Diamond 4Cs' },
        { '@type': 'Thing', name: 'GIA Diamond Certification' },
        { '@type': 'Thing', name: 'Diamond Cut Grades' },
        { '@type': 'Thing', name: 'Diamond Colour Scale' },
        { '@type': 'Thing', name: 'Diamond Clarity Scale' },
        { '@type': 'Thing', name: 'Carat Weight' },
    ],
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://riolls.com/education/diamond-guide',
    },
    breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
            { '@type': 'ListItem', position: 2, name: 'Education', item: 'https://riolls.com/education' },
            { '@type': 'ListItem', position: 3, name: 'Diamond Buying Guide', item: 'https://riolls.com/education/diamond-guide' },
        ],
    },
};

export default function DiamondGuidePage() {
    return (
        <>
            <JsonLd data={diamondFaqSchema} />
            <JsonLd data={diamondGuideSchema} />
            <DiamondBuyingGuide />
        </>
    );
}
