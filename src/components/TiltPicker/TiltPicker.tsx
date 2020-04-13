import * as React from 'react';
import './TiltPicker.css';
import { tiltPickerRender } from './TiltPickerRenderer';
import * as ReactDOM from 'react-dom';

interface IProps {
  angles?: number[];
  value: number;
  onChange: (value: number) => void;
}

export class TiltPicker extends React.Component<IProps> {
  public componentDidMount() {
    tiltPickerRender(
      ReactDOM.findDOMNode(this),
      this.props.value,
      this.props.onChange,
      this.props.angles
    );
  }

  public componentDidUpdate() {
    tiltPickerRender(
      ReactDOM.findDOMNode(this),
      this.props.value,
      this.props.onChange,
      this.props.angles
    );
  }

  public render() {
    return <div className="tile-picker" />;
  }
}
