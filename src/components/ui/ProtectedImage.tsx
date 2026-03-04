'use client';

import React from 'react';

interface ProtectedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    /** If true, skip the proxy (e.g. for admin pages where protection isn't needed) */
    unprotected?: boolean;
}

/**
 * Drop-in replacement for <img> that:
 * 1. Routes the src through /api/image proxy — hides the real CDN URL in Network tab
 * 2. Disables right-click context menu (blocks "Save Image As")
 * 3. Disables drag (blocks drag-to-desktop saving)
 * 4. Sets draggable=false
 */
export default function ProtectedImage({
    src,
    alt,
    unprotected = false,
    style,
    className,
    ...rest
}: ProtectedImageProps) {
    // Encode the real URL so it's not visible to users
    const proxiedSrc = unprotected || !src
        ? src
        : `/api/image?url=${btoa(src)}`;

    const blockEvent = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <img
            src={proxiedSrc}
            alt={alt}
            draggable={false}
            onContextMenu={blockEvent}
            onDragStart={blockEvent}
            className={className}
            style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                ...style,
            }}
            {...rest}
        />
    );
}

/**
 * Utility: encode any image URL for manual use in CSS background or other places
 */
export function proxyImageUrl(src: string): string {
    if (!src) return src;
    return `/api/image?url=${btoa(src)}`;
}
