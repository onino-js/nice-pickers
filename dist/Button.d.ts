import React from "react";
interface IButtonProps {
    label: string;
    onClick?: () => void;
    color?: "primary" | "secondary" | "warning" | "danger" | "success";
    disabled?: boolean;
}
declare const Button: React.FC<IButtonProps>;
export default Button;
