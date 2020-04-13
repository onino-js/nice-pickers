import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";
let cx = classNames.bind(styles);
const LABEL_DEFAULT = "";
const ON_CLICK_DEFAULT = () => { };
const COLOR_DEFAULT = "primary";
const DISABLED_DEFAULT = false;
const Button = ({ label = LABEL_DEFAULT, onClick = ON_CLICK_DEFAULT, color = COLOR_DEFAULT, disabled = DISABLED_DEFAULT }) => {
    let classes = cx({
        "button": true,
        [color]: true,
        "disabled": disabled
    });
    return (React.createElement("button", { className: classes, onClick: onClick, disabled: disabled }, label));
};
export default Button;
