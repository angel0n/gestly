import styled from "styled-components";

type MainContentProps = {
    children: React.ReactNode;
}
export function MainContent({ children }: MainContentProps): React.ReactElement {
    return(
        <Main>
            {children}
        </Main>
    )
}

const Main = styled.main`
    grid-area: main;
    overflow-y: auto;
    padding: 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: ${({ theme }) => theme.colors.bg};
`;