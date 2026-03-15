import styled, {css} from "styled-components";
import {useId, useState} from "react";

interface TextInputProps {
    value?: string | null;
    onChange?: (value: string | null) => void;
    label?: string;
    error?: string;
    hint?: string;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    disabled?: boolean;
    obscured?: boolean;
}

export function TextInput(props: TextInputProps) {
    const id = useId();
    const [raw, setRaw] = useState(props.value ?? "");
    const [focused, setFocused] = useState(false);

    const commit = (value: string | null) => {
        if (value == null) return props.onChange?.(null);
        setRaw(value);
        props.onChange?.(value);
    };

    return (
        <Wrap>
            {props.label && <Label htmlFor={id} $focused={focused}>{props.label}</Label>}
            <Row $focused={focused} $error={!!props.error}>
                {props.prefix && <Adorn>{props.prefix}</Adorn>}
                <Input
                    id={id}
                    type={props.obscured ? 'password' : 'text'}
                    inputMode="text"
                    value={raw }
                    placeholder={props.placeholder}
                    disabled={props.disabled}

                    onChange={e => {
                        setRaw(e.target.value);
                        props.onChange?.(e.target.value);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => { setFocused(false); commit(raw); }}
                />

                {props.suffix && <Adorn>{props.suffix}</Adorn>}
            </Row>
            {(props.error || props.hint) && <Hint $error={!!props.error}>{props.error ?? props.hint}</Hint>}
        </Wrap>
    )
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
    background: ${({theme}) => theme.colors.accentGlow};
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

const Hint = styled.span<{ $error: boolean }>`
  font-size: 12px;
  color: ${({ $error, theme }) => $error ? theme.colors.error : theme.colors.textMuted};
`;
