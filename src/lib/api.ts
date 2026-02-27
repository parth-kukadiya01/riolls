/**
 * Riolls Jewels — centralised API client
 * All frontend ↔ backend communication goes through here.
 */

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ─── Token helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('rj_token');
}

export function setToken(token: string): void {
    if (typeof window !== 'undefined') localStorage.setItem('rj_token', token);
}

export function removeToken(): void {
    if (typeof window !== 'undefined') localStorage.removeItem('rj_token');
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

export async function apiFetch<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
): Promise<{ success: boolean; data?: T; message?: string; pagination?: { page: number; limit: number; total: number; totalPages: number } }> {
    const token = getToken();

    const headers: Record<string, string> = {
        ...(options.body instanceof FormData
            ? {}
            : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string> | undefined),
    };

    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    // 401 → clear token so UI can redirect
    if (res.status === 401) {
        removeToken();
    }

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        const msg =
            json?.detail ||
            json?.message ||
            `Request failed (${res.status})`;
        throw new Error(msg);
    }

    return json;
}

// ─── Typed API helpers ────────────────────────────────────────────────────────

/** Auth */
export const authApi = {
    login: (email: string, password: string) =>
        apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
    register: (firstName: string, lastName: string, email: string, password: string) =>
        apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
        }),
    verifyOtp: (email: string, otp: string) =>
        apiFetch('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp }),
        }),
    googleLogin: (credential: string) =>
        apiFetch('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ credential }),
        }),
    forgotPassword: (email: string) =>
        apiFetch('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),
    resetPassword: (token: string, newPassword: string) =>
        apiFetch('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
        }),
};

/** User / Profile */
export const userApi = {
    getProfile: () => apiFetch('/user/me'),
    updateProfile: (data: Record<string, unknown>) =>
        apiFetch('/user/profile', { method: 'PUT', body: JSON.stringify(data) }),
    changePassword: (currentPassword: string, newPassword: string) =>
        apiFetch('/user/change-password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        }),
    getDesigns: () => apiFetch('/user/designs'),
    getEnquiries: () => apiFetch('/user/enquiries'),
};

/** Products */
export const productsApi = {
    list: (params?: Record<string, string | number>) => {
        const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
        return apiFetch(`/products${qs}`);
    },
    getBySlug: (slug: string) => apiFetch(`/products/${slug}`),
    search: (q: string, page = 1, limit = 12) =>
        apiFetch(`/products/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
};

/** Cart */
export const cartApi = {
    get: () => apiFetch('/cart'),
    add: (productId: string, opts?: { quantity?: number; size?: string; metal?: string; stoneSize?: number; engraving?: string }) =>
        apiFetch('/cart', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity: 1, ...opts }),
        }),
    update: (itemId: string, data: { quantity?: number; size?: string; metal?: string }) =>
        apiFetch(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (itemId: string) =>
        apiFetch(`/cart/${itemId}`, { method: 'DELETE' }),
    clear: () => apiFetch('/cart', { method: 'DELETE' }),
};

/** Wishlist */
export const wishlistApi = {
    get: () => apiFetch('/wishlist'),
    add: (productId: string) =>
        apiFetch('/wishlist', { method: 'POST', body: JSON.stringify({ productId }) }),
    remove: (productId: string) =>
        apiFetch(`/wishlist/${productId}`, { method: 'DELETE' }),
};

/** Orders */
export const ordersApi = {
    list: (page = 1, limit = 10) => apiFetch(`/orders?page=${page}&limit=${limit}`),
    get: (orderId: string) => apiFetch(`/orders/${orderId}`),
    place: (body: Record<string, unknown>) =>
        apiFetch('/orders', { method: 'POST', body: JSON.stringify(body) }),
    deliveryOptions: () => apiFetch('/delivery-options'),
};

/** Addresses */
export const addressesApi = {
    list: () => apiFetch('/user/addresses'),
    add: (data: Record<string, unknown>) =>
        apiFetch('/user/addresses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, unknown>) =>
        apiFetch(`/user/addresses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) =>
        apiFetch(`/user/addresses/${id}`, { method: 'DELETE' }),
};

/** Reviews */
export const reviewsApi = {
    list: (params?: { page?: number; limit?: number; sort?: string; productId?: string }) => {
        const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
        return apiFetch(`/reviews${qs}`);
    },
    submit: (data: { productId?: string; orderId?: string; rating: number; title: string; body: string; images?: string[] }) =>
        apiFetch('/reviews', { method: 'POST', body: JSON.stringify(data) }),
    uploadImage: async (file: File): Promise<string> => {
        const token = getToken();
        const form = new FormData();
        form.append('file', file);
        const res = await fetch(`${API_URL}/reviews/upload-image`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: form,
        });
        if (!res.ok) throw new Error('Image upload failed');
        const json = await res.json();
        return json.data?.url as string;
    },
};

/** Blog */
export const blogApi = {
    list: (params?: { page?: number; limit?: number; category?: string; featured?: boolean }) => {
        const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
        return apiFetch(`/blog${qs}`);
    },
    getBySlug: (slug: string) => apiFetch(`/blog/${slug}`),
};

/** Newsletter */
export const newsletterApi = {
    subscribe: (email: string) =>
        apiFetch('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
};

/** Contact */
export const contactApi = {
    submit: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
        apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) }),
};

/** Categories */
export const categoriesApi = {
    list: () => apiFetch('/categories'),
};

export const bespokeApi = {
    list: (activeOnly: boolean = true) => apiFetch(`/bespoke?active_only=${activeOnly}`),
    adminListAiConcepts: () => apiFetch('/bespoke/admin/ai-concepts'),
    create: (data: any) => apiFetch('/bespoke/admin', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/bespoke/admin/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/bespoke/admin/${id}`, { method: 'DELETE' }),
};

/** AI Studio */
export const aiStudioApi = {
    generateIdeas: (data: any) => apiFetch('/ai-studio/generate-ideas', { method: 'POST', body: JSON.stringify(data) }),
    requestQuote: (data: any) => apiFetch('/designs/quote-request', { method: 'POST', body: JSON.stringify(data) }),
};

/** Appointments */
export const appointmentApi = {
    book: (data: any) => apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) }),
};
