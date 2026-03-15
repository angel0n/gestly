import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

export default function Button({ variant = "primary", size = "md", loading = false,
    icon, children, disabled, ...props }: ButtonProps) {
    return (
        <Base $variant={variant} $size={size} disabled={disabled || loading} {...props}>
            {loading ? <Spinner /> : icon}
            {children}
        </Base>
    );
}

const variants = {
    primary: css`
        background: ${({theme}) => theme.colors.accent};
        color: #fff;

        &:hover:not(&:disabled) {
            filter: brightness(1.15);
        }
    `,
    secondary: css`
        background: ${({theme}) => theme.colors.accentSoft};
        color: ${({theme}) => theme.colors.accent};
        border: 1.5px solid ${({theme}) => theme.colors.accent};

        &:hover:not(&:disabled) {
            background: ${({theme}) => theme.colors.accentGlow};
        }
    `,
    ghost: css`
        background: transparent;
        color: ${({theme}) => theme.colors.textSecondary};
        border: 1.5px solid ${({theme}) => theme.colors.border};

        &:hover:not(&:disabled) {
            background: ${({theme}) => theme.colors.bgHover};
            color: ${({theme}) => theme.colors.textPrimary};
            border-color: ${({theme}) => theme.colors.borderLight};
        }
    `,
    danger: css`
        background: ${({theme}) => theme.colors.dangerSoft};
        color: ${({theme}) => theme.colors.danger};
        border: 1.5px solid ${({theme}) => theme.colors.danger};

        &:hover:not(&:disabled) {
            background: rgba(255, 92, 92, 0.2);
        }
    `,
};

const sizes = {
    sm: css`height: 32px; padding: 0 12px; font-size: 12px;`,
    md: css`height: 40px; padding: 0 16px; font-size: 13px;`,
    lg: css`height: 48px; padding: 0 22px; font-size: 15px;`,
};

const Base = styled.button<{ $variant: ButtonProps["variant"]; $size: ButtonProps["size"] }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1.5px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;

    ${({$size = "md"}) => sizes[$size]}
    ${({$variant = "primary"}) => variants[$variant]}
    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    &:active:not(&:disabled) {
        transform: scale(0.97);
    }
`;

const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;
