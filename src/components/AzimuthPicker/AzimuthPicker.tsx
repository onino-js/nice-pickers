import * as React from 'react';
import './AzimuthPicker.css';
import { AngleValue, cardinalPointPickerRender } from './AzimuthPickerRenderer';
import * as ReactDOM from 'react-dom';

interface IAzimuthPickerProps {
  angles?: AngleValue[];
  value: number;
  onChange: (value: number) => void;
}

class AzimuthPicker extends React.Component<IAzimuthPickerProps> {
  public componentDidMount() {
    cardinalPointPickerRender(
      ReactDOM.findDOMNode(this),
      this.props.value,
      this.props.onChange,
      this.props.angles
    );
  }

  public componentDidUpdate() {
    cardinalPointPickerRender(
      ReactDOM.findDOMNode(this),
      this.props.value,
      this.props.onChange,
      this.props.angles
    );
  }

  public render() {
    return <div className="cardinal-point-picker" />;
  }
}

export default AzimuthPicker
