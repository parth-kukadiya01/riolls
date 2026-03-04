import { NextRequest, NextResponse } from 'next/server';

// Only allow images from these trusted domains to be proxied
// Add your CDN/Cloudinary domain here
const ALLOWED_DOMAINS = [
    'res.cloudinary.com',
    'cloudinary.com',
    'images.unsplash.com',
    'via.placeholder.com',
    'storage.googleapis.com',
    'amazonaws.com',
    's3.amazonaws.com',
    // Add your own domain/CDN here
];

function isAllowedDomain(url: string): boolean {
    try {
        const parsed = new URL(url);
        return ALLOWED_DOMAINS.some(domain =>
            parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
        );
    } catch {
        return false;
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const encodedUrl = searchParams.get('url');

        if (!encodedUrl) {
            return new NextResponse('Missing url parameter', { status: 400 });
        }

        // Decode the base64-encoded real URL
        let realUrl: string;
        try {
            realUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
        } catch {
            return new NextResponse('Invalid url encoding', { status: 400 });
        }

        // Only allow http/https URLs (no file:// or data:// etc)
        if (!realUrl.startsWith('http://') && !realUrl.startsWith('https://')) {
            return new NextResponse('Invalid url scheme', { status: 400 });
        }

        // ✅ Domain allowlist — reject any URL not from our CDN
        if (!isAllowedDomain(realUrl)) {
            return new NextResponse('Domain not allowed', { status: 403 });
        }

        // Fetch the image from the real URL on the server side
        const upstream = await fetch(realUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RiollsProxy/1.0)',
            },
        });

        if (!upstream.ok) {
            return new NextResponse('Image not found', { status: 404 });
        }

        const contentType = upstream.headers.get('content-type') || 'image/jpeg';

        // Validate it's actually an image (not HTML/script)
        if (!contentType.startsWith('image/')) {
            return new NextResponse('Not an image', { status: 415 });
        }

        const buffer = await upstream.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'private, no-store, no-cache, must-revalidate',
                'Content-Disposition': 'inline',
                'X-Frame-Options': 'SAMEORIGIN',
                'Cross-Origin-Resource-Policy': 'same-origin',
            },
        });
    } catch (err) {
        console.error('[image proxy] error:', err);
        return new NextResponse('Internal error', { status: 500 });
    }
}
