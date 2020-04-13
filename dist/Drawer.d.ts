import React from "react";
interface IDrawerProps {
    show?: boolean;
    close?: () => void;
    overlay?: boolean;
}
declare const Drawer: React.FC<IDrawerProps>;
export default Drawer;
