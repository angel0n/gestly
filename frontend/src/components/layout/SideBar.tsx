import React, {useState} from "react";
import styled, {type DefaultTheme} from "styled-components";
import {NavAvatar} from "./NavBar.tsx";

type SideBarProps = {
    menuOpen: boolean;
}
export function SideBar({ menuOpen }: SideBarProps): React.ReactNode {
    const [activeNav, setActiveNav] = useState("Dashboard");

    const navItems: Array<{label: string, icon: string, badge: string}> = [
        {
            label: "Dashboard",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            badge: "",
        },
        // {
        //     label: "Atendimentos",
        //     icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        //     badge: "12",
        //     badgeVariant: "danger" as const
        // },
        // {
        //     label: "Ordens de serviço",
        //     icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
        //     badge: "5"
        // },
        // {
        //     label: "Clientes",
        //     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
        // },
        // {
        //     label: "Cobranças",
        //     icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
        //     badge: "3",
        //     badgeVariant: "warning" as const
        // },
    ];
    const navSecondary: Array<{label: string, icon: string}> = [
        // {
        //     label: "Relatórios",
        //     icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        // },
        // {label: "Catálogo", icon: "M4 6h16M4 10h16M4 14h16M4 18h16"},
        // {
        //     label: "Configurações",
        //     icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        // },
    ];
    return (
        <SidebarComponent open={menuOpen}>
            <SideSection>
                <SideLabel>Principal</SideLabel>
                {navItems.map(item => (
                    <NavItem
                        key={item.label}
                        active={activeNav === item.label}
                        onClick={() => setActiveNav(item.label)}
                    >
                        <Icon d={item.icon} size={15}/>
                        {item.label}
                        {item.badge && (
                            <NavItemBadge>{item.badge}</NavItemBadge>
                        )}
                    </NavItem>
                ))}
            </SideSection>

            <SideSection>
                <SideLabel>Análises</SideLabel>
                {navSecondary.map(item => (
                    <NavItem key={item.label} onClick={() => setActiveNav(item.label)} active={activeNav === item.label}>
                        <Icon d={item.icon} size={15}/>
                        {item.label}
                    </NavItem>
                ))}
            </SideSection>

            <SideBottom>
                <UserCard>
                    <NavAvatar style={{width: 32, height: 32, fontSize: 12, borderRadius: 8}}>LM</NavAvatar>
                    <UserInfo>
                        <p>Lucas Mendes</p>
                        <p>Administrador</p>
                    </UserInfo>
                    <OnlineDot/>
                </UserCard>
            </SideBottom>
        </SidebarComponent>
    )
}

const SidebarComponent = styled.aside<{open:boolean}>`
    grid-area: side;
    background: ${({ theme }) => theme.colors.bgPanel};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 768px) {
        position: fixed;
        top: ${({ theme }) => theme.sizes.navH};
        left: ${({open}) => open ? "0" : "-260px"};
        width: 260px;
        height: calc(100vh - ${({ theme }) => theme.sizes.navH});
        z-index: 200;
        transition: left 0.25s ease;
    }
`;

const SideSection = styled.div`
    padding: 20px 12px 8px;

    &:not(&:first-child) {
        border-top: 1px solid ${({theme}) => theme.colors.border};
        margin-top: 4px;
    }
`;

const Icon = ({d, size = 16}: { d: string; size?: number }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75"
         strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={d}/>
    </svg>
);

const SideLabel = styled.p`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({theme}) => theme.colors.textMuted};
    padding: 0 8px 8px;
`;

const NavItem = styled.button<{ active?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: ${({active, theme}) => active ? theme.colors.accentSoft : "transparent"};
    color: ${({active, theme}) => active ? theme.colors.accent : theme.colors.textSecondary};
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: ${({active}) => active ? "500" : "400"};
    text-align: left;
    transition: all 0.15s;
    position: relative;

    &:hover {
        background: ${({active, theme}) => active ? theme.colors.accentSoft : theme.colors.bgCard};
        color: ${({theme}) => theme.colors.textPrimary};
    }

    ${({active}) => active && `
    &::before {
      content: '';
      position: absolute;
      left: 0; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 18px;
      background: ${({theme}: { theme: DefaultTheme }) => theme.colors.accent};
      border-radius: 0 3px 3px 0;
    }
  `}
`;

const NavItemBadge = styled.span<{ variant?: "default" | "danger" | "success" }>`
    margin-left: auto;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    padding: 1px 7px;
    border-radius: 20px;
    background: ${({variant, theme}) =>
            variant === "danger" ? theme.colors.dangerSoft :
                    variant === "success" ? theme.colors.successSoft :
                            theme.colors.bgHover};
    color: ${({variant, theme}) =>
            variant === "danger" ? theme.colors.danger :
                    variant === "success" ? theme.colors.success :
                            theme.colors.textMuted};
`;

const SideBottom = styled.div`
    margin-top: auto;
    padding: 12px;
    border-top: 1px solid ${({theme}) => theme.colors.border};
`;

const UserCard = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background: ${({theme}) => theme.colors.bgCard};
    border: 1px solid ${({theme}) => theme.colors.border};
    cursor: pointer;
    transition: border-color 0.15s;

    &:hover {
        border-color: ${({theme}) => theme.colors.borderLight};
    }
`;

const UserInfo = styled.div`
    flex: 1;
    min-width: 0;

    & p:first-child {
        font-size: 13px;
        font-weight: 500;
        color: ${({theme}) => theme.colors.textPrimary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & p:last-child {
        font-size: 11px;
        color: ${({theme}) => theme.colors.textMuted};
    }
`;

const OnlineDot = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.success};
    flex-shrink: 0;
`;