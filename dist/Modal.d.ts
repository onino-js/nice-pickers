import React from "react";
interface IModalProps {
    color?: "primary" | "secondary" | "warning" | "danger" | "success";
    width?: string;
    show?: boolean;
    close?: () => void;
}
declare const Modal: React.FC<IModalProps>;
export default Modal;
