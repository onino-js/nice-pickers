import React from "react";
import classNames from "classnames/bind";
import styles from "./Drawer.module.css";
const OVERLAY_DEFAULT = true;
let cx = classNames.bind(styles);
const Drawer = ({ show, close, children, overlay = OVERLAY_DEFAULT }) => {
    let containerClasses = cx({
        "container": true,
        "active": show
    });
    let overlaylasses = cx({
        "click-layer": true,
        "active": show
    });
    let contentlasses = cx({
        "drawer-content": true,
        "active": show
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: containerClasses },
            React.createElement("div", { className: contentlasses }, children)),
        overlay && React.createElement("div", { className: overlaylasses, onClick: close })));
};
export default Drawer;
