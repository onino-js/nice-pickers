import React from "react";
import style from "./Modal.module.css";
const WIDTH_DEFAULT = "300px";
const Modal = ({ width = WIDTH_DEFAULT, show, close, children, }) => {
    return (React.createElement("div", { className: style.container, style: { display: show ? "flex" : "none" } },
        React.createElement("div", { className: style["click-layer"], onClick: close }),
        React.createElement("div", { className: style["modal-content"] }, children)));
};
export default Modal;
