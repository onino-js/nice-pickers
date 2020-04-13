import React from "react";
interface ISwitchProps {
    color?: "primary" | "secondary" | "warning" | "danger" | "success";
    onToggle?: (e: boolean) => void;
    checked?: boolean;
    defaultChecked?: boolean;
}
declare const Switch: React.FC<ISwitchProps>;
export default Switch;
