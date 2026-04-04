import styled from "styled-components";
import type {ReactElement} from "react";

export function CardTitle({ children, title  }: { children: ReactElement, title: string}) {
    return(
        <Title>
            <TitleIcon>{children}</TitleIcon>
            {title}
        </Title>
    )
}

const Title = styled.h2`
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const TitleIcon = styled.span`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.accent};
`;