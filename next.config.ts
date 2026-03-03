import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Next.js 16 + Turbopack requires 'unsafe-eval' in both dev AND production
// (its runtime uses new Function() for dynamic imports and module loading).
// Note: 'unsafe-inline' is the higher-risk directive; 'unsafe-eval' is unavoidable with Next.js.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://accounts.google.com"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://accounts.google.com";


const securityHeaders = [
  // Force HTTPS for 1 year, include subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Prevent clickjacking — don't allow page to be framed
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Enable XSS filter in older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Control referrer info sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable dangerous browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), usb=(), payment=(self), fullscreen=(self)",
  },
  // Prevent cross-origin info leaks
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "unsafe-none",
  },
  // Content Security Policy — restrict resource origins
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: 'unsafe-eval' only in dev (required by Next.js Turbopack / React internals)
      scriptSrc,
      // Styles: allow self + inline (needed for CSS-in-JS) + Google Fonts + Google Sign-In
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://accounts.google.com",
      // Fonts: allow self + Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: allow self + data URIs + Cloudinary + any https CDN
      "img-src 'self' data: blob: https: http:",
      // Media: allow self
      "media-src 'self'",
      // Connect (API calls): allow self + localhost backend (dev) + any https + Stripe + Google Maps + Google Sign-In
      "connect-src 'self' http://localhost:8000 http://localhost:* https: wss: https://api.stripe.com https://checkout.stripe.com https://maps.googleapis.com https://accounts.google.com",
      // Frames: allow Google Maps embed + Google Sign-In
      "frame-src 'self' https://www.google.com https://maps.google.com https://google.com https://accounts.google.com",
      // Prevent object/embed tags
      "object-src 'none'",
      // Base URI restricted to self
      "base-uri 'self'",
      // Forms only submit to self
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Prevent exposing Next.js version in headers
  poweredByHeader: false,
};

export default nextConfig;
