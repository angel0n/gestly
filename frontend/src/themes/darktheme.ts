import type {TypeTheme} from "./typeTheme";

export const darkTheme: TypeTheme = {
    colors: {
        // Fundo principal (azul bem escuro)
        background: '#0B0F2A',
        backgroundSecondary: '#12163D',

        // Cards, listas, superfícies
        surface: '#161A3F',

        // Destaque principal (ações, botões, foco)
        primary: '#FF8A00', // laranja da imagem

        // Secundária (links, badges leves)
        secondary: '#3B82F6', // azul vivo discreto

        // Texto principal
        text: '#F9FAFB',

        // Texto secundário / labels
        textSecondary: '#9CA3AF',

        // Bordas e divisões sutis
        border: '#2A2E5E',

        // Estados
        success: '#22C55E',
        error: '#EF4444',
        warning: '#FBBF24',
    },
};