import type {TypeTheme} from './typeTheme.ts';
import { lightTheme } from './lightTheme.ts';
import {darkTheme} from "./darktheme.ts";
import {createContext, type ReactNode, useContext, useState} from "react";

type ThemeContextData = {
    theme: TypeTheme;
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider
            value={{
        theme,
            isDark,
            toggleTheme,
    }}
>
    {children}
    </ThemeContext.Provider>
);
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
}