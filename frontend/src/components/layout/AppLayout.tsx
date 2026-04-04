import styled from "styled-components";
import {NavBar} from "./NavBar.tsx";
import {SideBar} from "./SideBar.tsx";
import {MainContent} from "./MainContent.tsx";
import {Sizes} from "../../constants/Sizes.ts";
import {useState} from "react";

export function AppLayout({ children, active }: { children: React.ReactNode, active?: string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <AppLayoutComponent>
            <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen}/>
            <SideBar menuOpen={menuOpen} active={active} />
            <MainContent children={children} />
        </AppLayoutComponent>
    )
}

const AppLayoutComponent = styled.div`
    display: grid;
    grid-template-rows: ${({ theme }) => theme.sizes.navH} 1fr;
    grid-template-columns: ${({ theme }) => theme.sizes.sidebarW} 1fr;
    grid-template-areas:
    "nav nav"
    "side main";
    height: 100vh;

    @media (max-width: ${Sizes.tablet}) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "nav"
        "main";
    }
`;