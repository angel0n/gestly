import React from "react";
import styled, {keyframes} from "styled-components";
import {Menu} from "lucide-react";
import {useTheme} from "../../themes/ThemeContext.tsx";

type NavBarProps = {
    setMenuOpen: (menuOpen: boolean) => void;
    menuOpen: boolean;
}
export function NavBar({ setMenuOpen, menuOpen }: NavBarProps): React.ReactNode {
    const { theme } = useTheme()
    return (
        <NavBarComponent>
            <HamburgerBtn onClick={() => setMenuOpen(!menuOpen)}>
                <Menu color={theme.colors.textPrimary}/>
            </HamburgerBtn>

            <NavLogo>
                <LogoMark>Ge</LogoMark>
                <LogoText>Gestly</LogoText>
            </NavLogo>

            <NavSpacer/>

            <NavActions>
                <NavAvatar title="Meu perfil">LM</NavAvatar>
            </NavActions>
        </NavBarComponent>
    )
}
export const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const NavBarComponent = styled.header`
    grid-area: nav;
    background: ${({ theme }) => theme.colors.bg};
    border-bottom: 1px solid ${({ theme }) =>theme.colors.border};
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    gap: 12px;
    z-index: 100;
    animation: ${fadeUp} 0.4s ease both;
`;

const HamburgerBtn = styled.button`
    width: 34px;
    height: 34px;
    background: ${({theme}) => theme.colors.bgCard};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 8px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 10px;

    @media (max-width: 768px) {
        display: flex;
    }
`;


const NavLogo = styled.div`
    width: ${({theme}) =>theme.sizes.sidebarW};
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    border-right: 1px solid ${({ theme }) =>theme.colors.border};
    height: 100%;
`;

const LogoMark = styled.div`
    width: 32px;
    height: 32px;
    background: ${({theme}) => theme.colors.accent};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 16px ${({theme}) =>theme.colors.accentGlow};
`;

const LogoText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) =>theme.colors.textPrimary};
    letter-spacing: -0.3px;
`;


// const NavSearch = styled.div`
//     flex: 1;
//     max-width: 380px;
//     height: 34px;
//     background: ${({theme}) =>theme.colors.bgCard};
//     border: 1px solid ${({ theme }) =>theme.colors.border};
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     padding: 0 12px;
//     gap: 8px;
//     cursor: text;
//     transition: border-color 0.2s;
//
//     &:hover {
//         border-color: ${({theme}) =>theme.colors.borderLight};
//     }
//
//     span {
//         font-size: 13px;
//         color: ${({theme}) => theme.colors.textMuted};
//     }
//
//     kbd {
//         margin-left: auto;
//         font-family: 'DM Mono', monospace;
//         font-size: 11px;
//         color: ${({theme}) => theme.colors.textMuted};
//         background: ${({ theme }) =>theme.colors.border};
//         padding: 2px 6px;
//         border-radius: 4px;
//     }
// `;
//
// const SearchIcon = () => (
//     <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
//          style={{color: "#505870", flexShrink: 0}}>
//         <circle cx="11" cy="11" r="8"/>
//         <path d="m21 21-4.35-4.35"/>
//     </svg>
// );

const NavSpacer = styled.div`
    flex: 1;
`;

const NavActions = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

// const IconBtn = styled.button<{ dot?: boolean }>`
//     width: 34px;
//     height: 34px;
//     background: ${({theme}) =>theme.colors.bgCard};
//     border: 1px solid ${({ theme }) =>theme.colors.border};
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     color: ${({theme}) =>theme.colors.textSecondary};
//     position: relative;
//     transition: all 0.15s;
//
//     &:hover {
//         background: ${({theme}) => theme.colors.bgHover};
//         color: ${({theme}) => theme.colors.textPrimary};
//         border-color: ${({theme}) => theme.colors.borderLight};
//     }
//
//     &::after {
//         content: '';
//         position: absolute;
//         top: 6px;
//         right: 6px;
//         width: 7px;
//         height: 7px;
//         background: ${({theme}) => theme.colors.danger};
//         border-radius: 50%;
//         border: 2px solid ${({theme}) => theme.colors.bgPanel};
//     }
// `;

export const NavAvatar = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: linear-gradient(135deg, #4F7FFF 0%, #22C97B 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    margin-left: 6px;
`;