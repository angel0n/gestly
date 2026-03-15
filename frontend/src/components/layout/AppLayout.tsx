import styled from "styled-components";
import {NavBar} from "./NavBar.tsx";
import {SideBar} from "./SideBar.tsx";
import {MainContent} from "./MainContent.tsx";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayoutComponent>
            <NavBar />
            <SideBar />
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
`;