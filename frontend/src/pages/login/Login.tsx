import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/buttons/Button.tsx";
import {TextInput} from "../../components/inputs/TextInput.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

export function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Wrap>
            <Card>
                <Title>Entrar</Title>

                <TextInput
                    label="E-mail"
                    value={email}
                    onChange={(val) => setEmail(val ?? "")}
                />

                <TextInput
                    label="Senha"
                    onChange={(val) => setPassword(val ?? "")}
                    value={password}
                    obscured
                />

                <Button onClick={() => login(email, password)} >Entrar</Button>
            </Card>
        </Wrap>
    );
}

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.bg};
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${({ theme }) => theme.colors.bgCard};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 32px;
    width: 100%;
    max-width: 380px;
`;

const Title = styled.h1`
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
`;