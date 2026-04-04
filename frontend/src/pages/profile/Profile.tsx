import { AppLayout } from "../../components/layout/AppLayout.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import {ProfileCard} from "./components/ProfileCard.tsx";
import {CardTitle} from "../../components/card/CardTitle.tsx";
import {TextInput} from "../../components/inputs/TextInput.tsx";
import {Button} from "../../components/buttons/Button.tsx";
import Api from "../../services/Api.ts";


export function ProfilePage() {
    const { user, getMe } = useAuth()

    const [profileForm, setProfileForm] = useState({ name: user!.name ?? "", email: user!.email ?? "" });
    const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "", });
    const [profileStatus, setProfileStatus] = useState<"idle" | "success" | "error">("idle");
    const [passwordStatus, setPasswordStatus] = useState<"idle" | "success" | "error">("idle");
    const [passwordError, setPasswordError] = useState("");

    async function handleProfileSave(e: React.FormEvent) {
        try{
            e.preventDefault();

            await Api.patch(`users/${user!.id}`, profileForm);
            await getMe()

            setProfileStatus("success");
            setTimeout(() => setProfileStatus("idle"), 2500);
        }catch (e) {
            setProfileStatus("error");
        }
    }

    async function handlePasswordSave(e: React.FormEvent) {
        try{
            e.preventDefault();
            setPasswordError("");
            if (passwordForm.next !== passwordForm.confirm) {
                setPasswordError("As senhas não coincidem.");
                setPasswordStatus("error");
                return;
            }
            await Api.patch(`/users/password/${user!.id}`, passwordForm);

            setPasswordStatus("success");
            setPasswordForm({ current: "", next: "", confirm: "" });
            setTimeout(() => setPasswordStatus("idle"), 2500);
        }catch (e: any) {
            setPasswordError(e.response.data.message);
            setPasswordStatus("error");
        }
    }

    return (
        <AppLayout active="profile">
            <PageWrapper>

                <ProfileCard user={user!} />

                <FormsRow>
                    <FormCard as="form" onSubmit={handleProfileSave}>
                        <CardTitle title="Dados Pessoais">
                            <PersonIcon />
                        </CardTitle>
                            <TextInput
                                label="Nome completo"
                                value={profileForm.name}
                                onChange={(value) =>
                                    setProfileForm((p) => ({ ...p, name: value ?? "" }))
                                }
                            />
                            <TextInput
                                label="E-mail"
                                value={profileForm.email}
                                onChange={(value) =>
                                    setProfileForm((p) => ({ ...p, email: value ?? "" }))
                                }

                            />

                        <FormFooter>
                            {profileStatus === "success" && (
                                <StatusMsg $type="success">✓ Dados salvos!</StatusMsg>
                            )}
                            {profileStatus === "error" && (
                                <StatusMsg $type="error">✗ Erro ao salvar.</StatusMsg>
                            )}
                            <Button type="submit">Salvar alterações</Button>
                        </FormFooter>
                    </FormCard>

                    <FormCard as="form" onSubmit={handlePasswordSave}>
                        <CardTitle title="Alterar senha">
                            <LockIcon />
                        </CardTitle>

                            <TextInput
                                label="Senha atual"
                                placeholder="••••••••"
                                obscured
                                value={passwordForm.current}
                                onChange={(value) =>
                                    setPasswordForm((p) => ({ ...p, current: value ?? "" }))
                                }
                            />

                            <TextInput
                                label="Nova senha"
                                placeholder="••••••••"
                                obscured
                                value={passwordForm.next}
                                onChange={(value) =>
                                    setPasswordForm((p) => ({ ...p, next: value ?? "" }))
                                }
                            />
                            <TextInput
                                label="Confirmar nova senha"
                                placeholder="••••••••"
                                value={passwordForm.confirm}
                                onChange={(value) =>
                                    setPasswordForm((p) => ({ ...p, confirm: value ?? ""}))
                                }
                                obscured
                            />

                        <FormFooter>
                            {passwordStatus === "success" && (
                                <StatusMsg $type="success">✓ Senha alterada!</StatusMsg>
                            )}
                            {passwordStatus === "error" && (
                                <StatusMsg $type="error">✗ {passwordError}</StatusMsg>
                            )}
                            <Button type="submit">Alterar senha</Button>
                        </FormFooter>
                    </FormCard>
                </FormsRow>

            </PageWrapper>
        </AppLayout>
    );
}

function PersonIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

const PageWrapper = styled.div`
    padding: 2rem 2.5rem;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: ${fadeUp} 0.35s ease both;

    @media (max-width: 600px) {
        padding: 1.25rem 1rem;
    }
`;

const FormsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

const FormCard = styled.div`
    background: ${({ theme }) => theme.colors.bgCard};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: ${fadeUp} 0.4s ease both;
`;

const FormFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.25rem;
    flex-wrap: wrap;
`;

const StatusMsg = styled.span<{ $type: "success" | "error" }>`
    font-size: 0.82rem;
    font-weight: 600;
    color: ${({ theme, $type }) =>
    $type === "success" ? theme.colors.success : theme.colors.danger};
    animation: ${fadeIn} 0.2s ease;
`;