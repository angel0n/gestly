import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const CACHE_KEY = "auth_cache";
const CACHE_TTL = 1000 * 60 * 60;

function getCache(): User | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { user, expiresAt } = JSON.parse(raw);
        if (Date.now() > expiresAt) { localStorage.removeItem(CACHE_KEY); return null; }
        return user;
    } catch { return null; }
}

function setCache(user: User) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ user, expiresAt: Date.now() + CACHE_TTL }));
}

function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem("token");
}


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(getCache());
    const [loading, setLoading] = useState(!getCache());

    useEffect(() => {
        if (user) return;

        const token = localStorage.getItem("token");
        if (!token) { setLoading(false); return; }

        fetch("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json() as Promise<User>;
            })
            .then(data => { setUser(data); setCache(data); })
            .catch(() => { clearCache(); setUser(null); })
            .finally(() => setLoading(false));
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setLoading(true);

        fetch("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json() as Promise<User>)
            .then(data => { setUser(data); setCache(data); })
            .finally(() => setLoading(false));
    };

    const logout = () => { clearCache(); setUser(null); };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);