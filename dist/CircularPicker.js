import * as React from "react";
import styles from "./CircularPicker.module.css";
import { circularPickerRender } from "./circularPickerRenderer";
import * as ReactDOM from "react-dom";
class CircularPicker extends React.Component {
    constructor() {
        super(...arguments);
        this.renderer = () => {
            circularPickerRender(ReactDOM.findDOMNode(this));
        };
    }
    componentDidMount() {
        this.renderer();
    }
    componentDidUpdate() {
        this.renderer();
    }
    render() {
        return React.createElement("div", { className: styles["test-picker"] });
    }
}
export default CircularPicker;
