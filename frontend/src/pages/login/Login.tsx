import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/buttons/Button.tsx";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function Login() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleLogin = async () => {
        setErrors([]);
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (e: any) {
            const status = e?.response?.status;
            const message = e?.response?.data?.message;

            if (status === 422 && Array.isArray(message)) {
                setErrors(message);
            } else {
                setErrors(["Ocorreu um erro. Tente novamente."]);
            }
        }
    };

    const getFieldError = (field: string) =>
        errors.filter((e) => e.toLowerCase().includes(field)).join("; ");

    return (
        <Wrap>
            <Card>
                <Title>Entrar</Title>

                <TextInput
                    label="E-mail"
                    value={email}
                    onChange={(val) => setEmail(val ?? "")}
                    error={getFieldError("email")}
                />

                <TextInput
                    label="Senha"
                    value={password}
                    onChange={(val) => setPassword(val ?? "")}
                    error={getFieldError("password")}
                    obscured
                />

                {errors.length > 0 && !getFieldError("email") && !getFieldError("password") && (
                    <ErrorMessage>{errors[0]}</ErrorMessage>
                )}

                <Button onClick={handleLogin} disabled={loading}>
                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
                </Button>
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

const ErrorMessage = styled.p`
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.danger ?? "#e53e3e"};
`;