import React, { ChangeEvent } from "react";
interface IInputProps {
    label: string;
    color?: "primary" | "secondary" | "warning" | "danger" | "success";
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    width?: string;
}
declare const Input: React.FC<IInputProps>;
export default Input;
