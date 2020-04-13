import React from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.css";
const WIDTH_DEFAULT = "300px";
const COLOR_DEFAULT = "primary";
const NO_SELECT_MESSAGE_DEFAULT = "Select one...";
let cx = classNames.bind(styles);
class Menu extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            collapsed: true,
            selectedValue: null,
            selectedLabel: ""
        };
        this.selectItem = (value, label) => {
            this.setState({
                selectedValue: value,
                selectedLabel: label,
                collapsed: true
            }, () => this.props.onSelect(value));
        };
    }
    render() {
        const { items, width, children } = this.props;
        return (React.createElement("div", { tabIndex: 0, role: "button", className: styles["container"], style: { width } },
            items &&
                items.map(({ value, label }, index) => (React.createElement("div", { tabIndex: index, role: "button", className: cx({
                        item: true,
                        selected: value === this.state.selectedValue
                    }), key: label + index, onClick: () => this.selectItem(value, label) }, label))),
            children));
    }
}
Menu.defaultProps = {
    width: WIDTH_DEFAULT,
    color: COLOR_DEFAULT,
    noSelectMessage: NO_SELECT_MESSAGE_DEFAULT,
    onSelect: () => { }
};
export default Menu;
