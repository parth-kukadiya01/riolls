export const ADMIN_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export function getAdminToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_token');
    }
    return null;
}

export function setAdminToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', token);
    }
}

export function removeAdminToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
    }
}

export async function adminFetch(endpoint: string, options: RequestInit = {}) {
    // Helper function for authenticating admin API calls.
    const token = getAdminToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    } as Record<string, string>;

    // If body is FormData, do not set Content-Type header so browser boundary works
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(`${ADMIN_API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401 || response.status === 403) {
        removeAdminToken();
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
        }
    }

    return response;
}
