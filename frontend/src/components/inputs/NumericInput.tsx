import { useState, useId } from "react";
import styled, { css } from "styled-components";

interface NumericInputProps {
    mode?: "integer" | "decimal";
    value?: number | null;
    onChange?: (value: number | null) => void;
    label?: string;
    error?: string;
    hint?: string;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    decimalPlaces?: number;
    disabled?: boolean;
}

export default function NumericInput({ mode = "integer", value, onChange, label, error,
    hint, prefix, suffix, placeholder, min,  max, step = 1, decimalPlaces = 2, disabled = false,  }: NumericInputProps) {
    const id = useId();

    const format = (n: number, mode: string, dp: number) => mode === "decimal" ? n.toFixed(dp) : String(n);

    const [raw, setRaw] = useState(value != null ? format(value, mode, decimalPlaces) : "");
    const [focused, setFocused] = useState(false);

    const parse = (raw: string, mode: string): number | null => {
        const s = raw.replace(",", ".");
        const n = mode === "integer" ? parseInt(s, 10) : parseFloat(s);
        return !s || s === "-" || isNaN(n) ? null : n;
    };

    const limiter = (n: number, min?: number, max?: number) => Math.min(Math.max(n, min ?? -Infinity), max ?? Infinity);

    const sanitize = (v: string, mode: string) => {
        if (mode === "integer") return v.replace(/(?!^-)[^0-9]/g, "");
        const s = v.replace(",", ".").replace(/[^0-9.\-]/g, "").split(".");
        return s.length > 2 ? s[0] + "." + s.slice(1).join("") : s.join(".");
    };

    const commit = (n: number | null) => {
        if (n == null) return onChange?.(null);
        const v = limiter(n, min, max);
        setRaw(format(v, mode, decimalPlaces));
        onChange?.(v);
    };

    const step_ = (dir: 1 | -1) => commit((parse(raw, mode) ?? 0) + dir * step);

    return (
        <Wrap>
            {label && <Label htmlFor={id} $focused={focused}>{label}</Label>}

            <Row $focused={focused} $error={!!error}>
                <Btn type="button" onClick={() => step_(-1)} disabled={disabled} aria-label="Decrementar">−</Btn>

                {prefix && <Adorn>{prefix}</Adorn>}

                <Input
                    id={id}
                    type="text"
                    inputMode={mode === "decimal" ? "decimal" : "numeric"}
                    value={raw}
                    placeholder={placeholder ?? (mode === "decimal" ? "0.00" : "0")}
                    disabled={disabled}
                    onChange={e => {
                        const v = sanitize(e.target.value, mode);
                        setRaw(v);
                        const n = parse(v, mode);
                        onChange?.(n != null ? limiter(n, min, max) : null);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => { setFocused(false); commit(parse(raw, mode)); }}
                    onKeyDown={e => {
                        if (e.key === "ArrowUp")   { e.preventDefault(); step_(1);  }
                        if (e.key === "ArrowDown") { e.preventDefault(); step_(-1); }
                    }}
                />

                {suffix && <Adorn>{suffix}</Adorn>}

                <Btn type="button" onClick={() => step_(1)} disabled={disabled} aria-label="Incrementar">+</Btn>
            </Row>

            {(error || hint) && <Hint $error={!!error}>{error ?? hint}</Hint>}
        </Wrap>
    );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label<{ $focused: boolean }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $focused, theme }) => $focused ? theme.colors.accent : theme.colors.textSecondary};
  transition: color 0.15s;
`;

const Row = styled.div<{ $focused: boolean; $error: boolean }>`
    display: flex;
    align-items: center;
    height: 42px;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.15s;
    background: ${({theme}) => theme.colors.bgCard};
    border: 1.5px solid ${({$focused, $error, theme}) =>
    $error ? theme.colors.danger : $focused ? theme.colors.accent : theme.colors.border};
    box-shadow: 0 0 0 3px ${({$focused, $error, theme}) =>
    $focused ? ($error ? "rgba(255,92,92,0.2)" : theme.colors.accentGlow) : "transparent"};

    ${({$focused, theme}) => $focused && css`background: ${theme.colors.bgHover};`}
    ${css`opacity: 1;`}
    &:has(&input:disabled) {
        opacity: 0.5;
    }
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  text-align: right;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-family: "DM Mono", "Fira Code", monospace;
  font-variant-numeric: tabular-nums;
  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  &:disabled { cursor: not-allowed; }
`;

const Adorn = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  padding: 0 6px;
  user-select: none;
`;

const Btn = styled.button`
    width: 36px;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: ${({theme}) => theme.colors.textMuted};
    font-size: 18px;
    cursor: pointer;
    transition: all 0.12s;
    flex-shrink: 0;

    &:first-child {
        border-right: 1px solid ${({theme}) => theme.colors.border};
    }

    &:last-child {
        border-left: 1px solid ${({theme}) => theme.colors.border};
    }

    &:hover:not(&:disabled) {
        background: ${({theme}) => theme.colors.accentSoft};
        color: ${({theme}) => theme.colors.accent};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const Hint = styled.span<{ $error: boolean }>`
  font-size: 12px;
  color: ${({ $error, theme }) => $error ? theme.colors.error : theme.colors.textMuted};
`;
