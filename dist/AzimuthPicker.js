import * as React from 'react';
import './AzimuthPicker.css';
import { cardinalPointPickerRender } from './AzimuthPickerRenderer';
import * as ReactDOM from 'react-dom';
class AzimuthPicker extends React.Component {
    componentDidMount() {
        cardinalPointPickerRender(ReactDOM.findDOMNode(this), this.props.value, this.props.onChange, this.props.angles);
    }
    componentDidUpdate() {
        cardinalPointPickerRender(ReactDOM.findDOMNode(this), this.props.value, this.props.onChange, this.props.angles);
    }
    render() {
        return React.createElement("div", { className: "cardinal-point-picker" });
    }
}
export default AzimuthPicker;
