import { createContext, useContext, useEffect, useState } from "react";
import Api from "../services/Api.ts";
import type {User} from "../interfaces/entities.ts";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

interface AuthResponse {
    accessToken: string,
    user: {
        id: number
        name: string,
        email: string,
    },
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
        const validate = async () => {
            const token = localStorage.getItem("token");
            if (!token) { setLoading(false); return; }

            try {
                const { data } = await Api.get<User>("/auth/me");
                setUser(data);
                setCache(data);
            } catch {
                clearCache();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (!user) validate();
    }, []);

    const login = async (email: string, senha: string) => {
        const { data } = await Api.post<AuthResponse>("/auth/login", { email, password: senha });
        localStorage.setItem("token", data.accessToken);

        const { data: me } = await Api.get<User>("/auth/me");
        setUser(me);
        setCache(me);
    };

    const logout = () => { clearCache(); setUser(null); };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);