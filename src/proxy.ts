import { NextRequest, NextResponse } from 'next/server';

// ── In-memory rate limiter (per IP, resets every window) ────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 120;        // max requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute window

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true; // Allow
    }

    if (entry.count >= RATE_LIMIT) {
        return false; // Block
    }

    entry.count++;
    return true; // Allow
}

// ── Known bad bot / automation user-agent signatures ───────────────────────
const BOT_UA_PATTERNS = [
    /curl\//i,
    /wget\//i,
    /python-requests/i,
    /python-urllib/i,
    /scrapy/i,
    /httpclient/i,
    /go-http-client/i,
    /okhttp/i,
    /libwww-perl/i,
    /masscan/i,
    /zgrab/i,
    /nikto/i,
    /nmap/i,
    /sqlmap/i,
    /burpsuite/i,
    /dirbuster/i,
    /nuclei/i,
    /httpx\//i,
    /lighthouse/i,   // headless chrome scanner
    /phantomjs/i,
    /headlesschrome/i,
    /selenium/i,
    /webdriver/i,
    /puppeteer/i,
    /playwright/i,
    /cypress/i,
    /__pptr/i,
    // Note: removed generic /bot\b/ — too broad, catches some legit UAs
];

// Allow known good bots (search engines that respect robots.txt)
const ALLOWED_BOTS = [
    /googlebot/i,
    /bingbot/i,
    /applebot/i,
    /duckduckbot/i,
    /slurp/i,         // Yahoo
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
];

function isMaliciousBot(ua: string | null): boolean {
    if (!ua) return true; // No UA = block

    // Allow known good search engine bots
    if (ALLOWED_BOTS.some(p => p.test(ua))) return false;

    return BOT_UA_PATTERNS.some(p => p.test(ua));
}

// ── Detect headless browser fingerprints ───────────────────────────────────
function looksHeadless(req: NextRequest): boolean {
    // Headless browsers often lack these standard headers
    const acceptLang = req.headers.get('accept-language');
    const accept = req.headers.get('accept');

    // Real browsers always send accept and accept-language
    if (!acceptLang || !accept) return true;

    return false;
}

// ── Get client IP ───────────────────────────────────────────────────────────
function getClientIp(req: NextRequest): string {
    return (
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        req.headers.get('x-real-ip') ||
        '127.0.0.1'
    );
}

// ── Admin route protection ───────────────────────────────────────────────────
function hasAdminSession(req: NextRequest): boolean {
    const adminToken = req.cookies.get('admin_token')?.value;
    const authToken = req.cookies.get('token')?.value;
    const authHeader = req.headers.get('Authorization');
    return !!(adminToken || authToken || authHeader);
}

// ── Proxy (Next.js 16 — replaces middleware) ─────────────────────────────────
export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const ua = req.headers.get('user-agent');
    const ip = getClientIp(req);

    // Skip static assets and internal Next.js routes
    const isAsset =
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/favicon') ||
        /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|css|js|map)$/.test(pathname);

    if (isAsset) {
        return NextResponse.next();
    }

    // 1. Block malicious bots and automation tools
    if (isMaliciousBot(ua)) {
        return new NextResponse('Forbidden', {
            status: 403,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    // 2. Block headless browsers ONLY on page routes (not API routes, which may be server-side Next.js fetches)
    // DISABLED to prevent false positives blocking valid traffic
    if (false && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/') && looksHeadless(req)) {
        return new NextResponse('Forbidden', {
            status: 403,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    // 3. Rate limit — max 120 requests/minute per IP
    if (!checkRateLimit(ip)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Content-Type': 'text/plain',
                'Retry-After': '60',
                'X-RateLimit-Limit': String(RATE_LIMIT),
            },
        });
    }

    // 4. Admin route protection
    if (pathname.startsWith('/admin')) {
        if (!hasAdminSession(req)) {
            const loginUrl = req.nextUrl.clone();
            loginUrl.pathname = '/login';
            loginUrl.searchParams.set('next', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 5. Add security + tracing headers
    const res = NextResponse.next();
    res.headers.set('X-Request-Id', crypto.randomUUID());
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'DENY');

    return res;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
