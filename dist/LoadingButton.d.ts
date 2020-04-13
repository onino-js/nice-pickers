import React from "react";
interface ILoadingButtonProps {
    label: string;
    onClick?: () => void;
    color?: "primary" | "secondary" | "warning" | "danger" | "success";
    loading?: boolean;
}
declare const LoadingButton: React.FC<ILoadingButtonProps>;
export default LoadingButton;
