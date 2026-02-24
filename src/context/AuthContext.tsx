'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import { authApi, userApi, getToken, setToken, removeToken } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserProfile>;
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<UserProfile>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load profile from stored token on first mount
    useEffect(() => {
        const stored = getToken();
        if (stored) {
            setTokenState(stored);
            userApi
                .getProfile()
                .then((res: any) => setUser(res.data))
                .catch(() => removeToken())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<UserProfile> => {
        const res: any = await authApi.login(email, password);
        const { token: jwt, user: userData } = res.data;
        setToken(jwt);
        setTokenState(jwt);
        setUser(userData);
        return userData;
    }, []);

    const register = useCallback(
        async (firstName: string, lastName: string, email: string, password: string): Promise<UserProfile> => {
            const res: any = await authApi.register(firstName, lastName, email, password);
            const { token: jwt, user: userData } = res.data;
            setToken(jwt);
            setTokenState(jwt);
            setUser(userData);
            return userData;
        },
        [],
    );

    const logout = useCallback(() => {
        removeToken();
        setTokenState(null);
        setUser(null);
    }, []);

    const refreshProfile = useCallback(async () => {
        const res: any = await userApi.getProfile();
        setUser(res.data);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
