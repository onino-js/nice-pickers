import React from "react";
import classNames from "classnames/bind";
import styles from "./Switch.module.css";
const COLOR_DEFAULT = "primary";
const ON_TOGGLE_DEFAULT = () => { };
const DEFAULT_CHECKED_DEFAULT = false;
let cx = classNames.bind(styles);
const Switch = ({ onToggle = ON_TOGGLE_DEFAULT, checked, color = COLOR_DEFAULT, defaultChecked = DEFAULT_CHECKED_DEFAULT }) => {
    let sliderClasses = cx({
        slider: true,
        [color]: true
    });
    return (React.createElement("label", { className: styles.switch },
        React.createElement("input", { type: "checkbox", onChange: (e) => onToggle(e.currentTarget.checked), checked: checked, defaultChecked: defaultChecked }),
        React.createElement("span", { className: sliderClasses })));
};
export default Switch;
