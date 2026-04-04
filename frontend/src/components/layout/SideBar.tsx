import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useAuth} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

type NavItem = {label: string; icon: string; badge: string; path: string;}
type SideBarProps = {menuOpen: boolean; active?: string}

export function SideBar({ menuOpen, active }: SideBarProps): React.ReactNode {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [activeNav, setActiveNav] = useState(active ?? "Dashboard");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const onClick = (item: NavItem)=> {
        setActiveNav(item.label)
        navigate(item.path)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navItems: Array<NavItem> = [
        {
            label: "Dashboard",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            badge: "",
            path: "/dashboard",
        },
    ];
    const navSecondary: Array<{label: string, icon: string}> = [];
    const userMenuItems = [
        {
            label: "Meu Perfil",
            icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
            onClick: () => { navigate("/profile"); setUserMenuOpen(false); }
        },
        { divider: true },
        {
            label: "Sair",
            icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
            danger: true,
            onClick: () => { logout(); setUserMenuOpen(false); }
        },
    ];
    return (
        <SidebarComponent open={menuOpen}>
            <SideSection>
                <SideLabel>Principal</SideLabel>
                {navItems.map(item => (
                    <NavItemButton
                        key={item.label}
                        active={activeNav === item.label}
                        onClick={() => onClick(item)}
                    >
                        <Icon d={item.icon} size={15}/>
                        {item.label}
                        {item.badge && (
                            <NavItemBadge>{item.badge}</NavItemBadge>
                        )}
                    </NavItemButton>
                ))}
            </SideSection>

            <SideSection>
                <SideLabel>Análises</SideLabel>
                {navSecondary.map(item => (
                    <NavItemButton key={item.label} onClick={() => setActiveNav(item.label)} active={activeNav === item.label}>
                        <Icon d={item.icon} size={15}/>
                        {item.label}
                    </NavItemButton>
                ))}
            </SideSection>

            <SideBottom ref={userMenuRef}>
                <UserPopover open={userMenuOpen}>
                    <PopoverHeader>
                        <NavAvatar style={{ width: 36, height: 36, fontSize: 13, borderRadius: 10 }}>
                            {user?.name?.substring(0, 2).toUpperCase() ?? "US"}
                        </NavAvatar>
                        <PopoverUserInfo>
                            <strong>{user?.name ?? "User"}</strong>
                            <span>{user?.email ?? "user@email.com"}</span>
                        </PopoverUserInfo>
                    </PopoverHeader>

                    <PopoverDivider />

                    {userMenuItems.map((item, i) =>
                        "divider" in item && item.divider
                            ? <PopoverDivider key={i} />
                            : (
                                <PopoverItem key={i} danger={"danger" in item && item.danger} onClick={"onClick" in item ? item.onClick : undefined}>
                                    <Icon d={item.icon ?? ""} size={14} />
                                    {"label" in item ? item.label : ""}
                                </PopoverItem>
                            )
                    )}
                </UserPopover>

                <UserCard onClick={() => setUserMenuOpen(v => !v)} active={userMenuOpen}>
                    <NavAvatar style={{ width: 32, height: 32, fontSize: 12, borderRadius: 8 }}>
                        {user?.name?.substring(0, 2).toUpperCase() ?? "US"}
                    </NavAvatar>
                    <UserInfo>
                        <p>{user?.name ?? "User"}</p>
                    </UserInfo>
                    <ChevronIcon open={userMenuOpen}>
                        <Icon d="M5 15l7-7 7 7" size={14} />
                    </ChevronIcon>
                    <OnlineDot />
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

const NavItemButton = styled.button<{ active: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: ${({ active, theme }) => active ? theme.colors.accentSoft : "transparent"};
    color: ${({ active, theme }) => active ? theme.colors.accent : theme.colors.textSecondary};
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: ${({ active }) => active ? "500" : "400"};
    text-align: left;
    transition: all 0.15s;
    position: relative;

    &:hover {
        background: ${({ active, theme }) => active ? theme.colors.accentSoft : theme.colors.bgCard};
        color: ${({ theme }) => theme.colors.textPrimary};
    }

    ${({ active }) => active && `
        &::before {
            content: '';
            position: absolute;
            left: 0; top: 50%;
            transform: translateY(-50%);
            width: 3px; height: 18px;
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
    position: relative;
`;

const UserPopover = styled.div<{ open: boolean }>`
    position: absolute;
    bottom: calc(100% - 8px);
    left: 12px;
    right: 12px;
    background: ${({ theme }) => theme.colors.bgPanel};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    padding: 6px;
    z-index: 300;

    /* Animação */
    opacity: ${({ open }) => open ? 1 : 0};
    transform: ${({ open }) => open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)"};
    pointer-events: ${({ open }) => open ? "all" : "none"};
    transition: opacity 0.18s ease, transform 0.18s ease;
    transform-origin: bottom center;
`;

const PopoverHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 8px 10px;
`;

const PopoverUserInfo = styled.div`
    flex: 1;
    min-width: 0;

    strong {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.textPrimary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span {
        display: block;
        font-size: 11px;
        color: ${({ theme }) => theme.colors.textMuted};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const PopoverDivider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin: 4px 2px;
`;

const PopoverItem = styled.button<{ danger?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: ${({ danger, theme }) => danger ? theme.colors.danger : theme.colors.textSecondary};
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    text-align: left;
    transition: all 0.12s;

    &:hover {
        background: ${({ danger, theme }) => danger ? theme.colors.dangerSoft : theme.colors.bgCard};
        color: ${({ danger, theme }) => danger ? theme.colors.danger : theme.colors.textPrimary};
    }
`;

const UserCard = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.bgCard};
    border: 1px solid ${({ active, theme }) => active ? theme.colors.accent : theme.colors.border};
    cursor: pointer;
    transition: border-color 0.15s;
    position: relative;

    &:hover {
        border-color: ${({ theme }) => theme.colors.borderLight};
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

const ChevronIcon = styled.span<{ open: boolean }>`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textMuted};
    transition: transform 0.2s ease;
    transform: ${({ open }) => open ? "rotate(0deg)" : "rotate(180deg)"};
`;

const OnlineDot = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.success};
    flex-shrink: 0;
`;

const NavAvatar = styled.button`
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