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
import { setAdminToken, removeAdminToken } from '@/lib/adminAuth';

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
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<UserProfile>;
    googleLogin: (credential: string) => Promise<UserProfile>;
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
        if (userData.role === 'admin') {
            setAdminToken(jwt);
        }
        return userData;
    }, []);

    const register = useCallback(
        async (firstName: string, lastName: string, email: string, password: string): Promise<void> => {
            await authApi.register(firstName, lastName, email, password);
            // Registration now requires OTP step, so we don't set user/token yet.
        },
        [],
    );

    const verifyOtp = useCallback(
        async (email: string, otp: string): Promise<UserProfile> => {
            const res: any = await authApi.verifyOtp(email, otp);
            const { token: jwt, user: userData } = res.data;
            setToken(jwt);
            setTokenState(jwt);
            setUser(userData);
            if (userData.role === 'admin') {
                setAdminToken(jwt);
            }
            return userData;
        },
        [],
    );

    const googleLogin = useCallback(
        async (credential: string): Promise<UserProfile> => {
            const res: any = await authApi.googleLogin(credential);
            const { token: jwt, user: userData } = res.data;
            setToken(jwt);
            setTokenState(jwt);
            setUser(userData);
            if (userData.role === 'admin') {
                setAdminToken(jwt);
            }
            return userData;
        },
        [],
    );

    const logout = useCallback(() => {
        removeToken();
        removeAdminToken();
        setTokenState(null);
        setUser(null);
    }, []);

    const refreshProfile = useCallback(async () => {
        const res: any = await userApi.getProfile();
        setUser(res.data);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, verifyOtp, googleLogin, logout, refreshProfile }}>
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
