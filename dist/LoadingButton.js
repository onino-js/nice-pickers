import React from "react";
import classNames from "classnames/bind";
import styles from "./LoadingButton.module.css";
const LABEL_DEFAULT = "";
const ON_CLICK_DEFAULT = () => { };
const COLOR_DEFAULT = "primary";
const LOADING_DEFAULT = false;
let cx = classNames.bind(styles);
const LoadingButton = ({ label = LABEL_DEFAULT, onClick = ON_CLICK_DEFAULT, color = COLOR_DEFAULT, loading = LOADING_DEFAULT }) => {
    const buttonClasses = cx({
        button: true,
        [color]: true
    });
    let spinContainerClasses = cx({
        "spin-container": true,
        active: loading
    });
    let spinClasses = cx({
        spin: true,
        active: loading
    });
    return (React.createElement("button", { className: buttonClasses, onClick: onClick },
        label,
        React.createElement("div", { className: spinContainerClasses },
            React.createElement("div", { className: spinClasses }))));
};
export default LoadingButton;
