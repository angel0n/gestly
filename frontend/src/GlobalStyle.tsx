import {createGlobalStyle} from "styled-components";
import type {TypeTheme} from "./themes/typeTheme.ts";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'DM Sans', sans-serif;
        background: ${({theme}: { theme: TypeTheme }) => theme.colors.background};
        color: ${({theme}: { theme: TypeTheme }) => theme.colors.text};
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
        height: 100vh;
    }

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({theme}: { theme: TypeTheme }) => theme.colors.border};
        border-radius: 4px;
    }
`;