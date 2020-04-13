import React from "react";
import styles from "./Input.module.css";
const LABEL_DEFAULT = "Placeholder";
const COLOR_DEFAULT = "primary";
const WIDTH_DEFAULT = "300px";
const Input = ({ label = LABEL_DEFAULT, color = COLOR_DEFAULT, width = WIDTH_DEFAULT, onChange, value }) => {
    return (React.createElement("div", { className: styles.container, style: { width } },
        React.createElement("input", { type: "text", onChange: onChange, required: true, value: value }),
        React.createElement("label", { className: styles.label },
            React.createElement("span", { className: styles["content-name"] }, label))));
};
export default Input;
