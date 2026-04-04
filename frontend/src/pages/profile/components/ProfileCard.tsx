import styled from "styled-components";
import {DateHelpers} from "../../../helpers/DateHelpers.ts";
import {StringHelpers} from "../../../helpers/StringHelpers.ts";
import type {User} from "../../../interfaces/entities.ts";

export function ProfileCard({ user }: {user: User}) {
    return (
        <HeroCard>
            <AvatarWrapper >
                <AvatarInitials>
                    {user ? StringHelpers.getInitials(user.name) : "?"}
                </AvatarInitials>
            </AvatarWrapper>

            <HeroInfo>
                <HeroName>{user!.name}</HeroName>
                <HeroEmail>{user!.email}</HeroEmail>
                <HeroBadge $active={user!.active === "active"}>
                    {user!.active === "active" ? "Ativo" : "Inativo"}
                </HeroBadge>
            </HeroInfo>

            <MetaGrid>
                <MetaItem>
                    <MetaLabel>Membro desde</MetaLabel>
                    <MetaValue>
                        {user!.createdAt ? DateHelpers.formatDateToMonthExtenso(user!.createdAt) : "—"}
                    </MetaValue>
                </MetaItem>
                <MetaItem>
                    <MetaLabel>Última atualização</MetaLabel>
                    <MetaValue>
                        {user!.updatedAt ? DateHelpers.formatDateToMonthExtenso(user!.updatedAt) : "—"}
                    </MetaValue>
                </MetaItem>
            </MetaGrid>
        </HeroCard>
    )
}

const HeroCard = styled.div`
    background: ${({ theme }) => theme.colors.bgCard};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    padding: 1.75rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem 1.25rem;
    }
`;

const AvatarWrapper = styled.div`
    position: relative;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    flex-shrink: 0;

    &:hover > div:last-of-type {
        opacity: 1;
    }
`;

const AvatarInitials = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentSoft};
    border: 2px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    user-select: none;
`;

const HeroInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
    min-width: 160px;
`;

const HeroName = styled.h1`
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
`;

const HeroEmail = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
`;

const HeroBadge = styled.span<{ $active: boolean }>`
    display: inline-block;
    margin-top: 0.3rem;
    padding: 0.2rem 0.75rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    width: fit-content;
    background: ${({ theme, $active }) =>
    $active ? theme.colors.successSoft : theme.colors.dangerSoft};
    color: ${({ theme, $active }) =>
    $active ? theme.colors.success : theme.colors.danger};
    border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.success + "40" : theme.colors.danger + "40"};
`;

const MetaGrid = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-left: auto;

    @media (max-width: 600px) {
        margin-left: 0;
        justify-content: center;
    }
`;

const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const MetaLabel = styled.span`
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaValue = styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
`;