import React from "react";
import classNames from "classnames/bind";
import styles from "./Select.module.css";
import { SelectArrow } from "./SelectArrow";
import { SelectCross } from "./SelectCross";
const WIDTH_DEFAULT = "300px";
const COLOR_DEFAULT = "primary";
const NO_SELECT_MESSAGE_DEFAULT = "Select one...";
let cx = classNames.bind(styles);
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            collapsed: true,
            selectedValue: null,
            selectedLabel: ""
        };
        this.selectItem = (value, label) => {
            this.setState({
                selectedValue: value,
                selectedLabel: label,
                collapsed: true,
            }, () => this.props.onSelect(value));
        };
        this.toggleMenu = () => {
            this.setState({
                collapsed: !this.state.collapsed
            });
        };
        this.closeMenu = () => {
            this.setState({
                collapsed: true
            });
        };
        this.keyPress = (e) => {
            if (e.which == 13 || e.keyCode == 13) {
                this.toggleMenu();
            }
        };
        this.reset = (e) => {
            e.preventDefault();
            this.setState({
                selectedValue: false,
                selectedLabel: false,
                collapsed: true
            }, () => this.props.onSelect(null));
        };
    }
    componentDidMount() {
        this.myRef.current.addEventListener("keyup", this.keyPress);
        this.myRef.current.addEventListener("focusout", this.closeMenu);
    }
    componentWillUnmount() {
        this.myRef.current.removeEventListener("keyup", this.keyPress);
        this.myRef.current.removeEventListener("focusout", this.closeMenu);
    }
    render() {
        const { options, width, noSelectMessage } = this.props;
        const optionsContainerClasses = cx({
            "options-container": true,
            [styles.collapsed]: this.state.collapsed
        });
        return (React.createElement("div", { tabIndex: 0, role: "button", className: styles["select-css"], style: { width }, ref: this.myRef },
            React.createElement("div", { className: styles["select-button"], onClick: this.toggleMenu }, this.state.selectedLabel || noSelectMessage),
            this.state.selectedLabel && React.createElement("div", { className: styles["cross-container"], onClick: this.reset },
                React.createElement(SelectCross, { size: 10 })),
            React.createElement("div", { className: styles["arrow-container"], onClick: this.toggleMenu },
                React.createElement(SelectArrow, { className: cx({
                        arrow: true,
                        "arrow-collapsed": this.state.collapsed
                    }), size: 12 })),
            React.createElement("div", { className: optionsContainerClasses }, options &&
                options.map(({ value, label }, index) => (React.createElement("span", { role: "option", className: cx({
                        option: true,
                        selected: value === this.state.selectedValue
                    }), key: label + index, onClick: () => this.selectItem(value, label) }, label))))));
    }
}
Select.defaultProps = {
    width: WIDTH_DEFAULT,
    color: COLOR_DEFAULT,
    noSelectMessage: NO_SELECT_MESSAGE_DEFAULT,
    onSelect: () => { }
};
export default Select;
