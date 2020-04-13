import * as React from "react";
import styles from "./CircularPicker.module.css"
import { circularPickerRender } from "./circularPickerRenderer";
import * as ReactDOM from "react-dom";

interface ICircularPickerProps {
  value: number;
  /** User function to trigger on user select. */
  onChange: (value: number) => void;
}

class CircularPicker extends React.Component<ICircularPickerProps> {
  public componentDidMount() {
    this.renderer();
  }

  public componentDidUpdate() {
    this.renderer();
  }

  private renderer = () => {
    circularPickerRender(
      ReactDOM.findDOMNode(this),
    );
  };

  public render() {
    return   <div className={styles["test-picker"]}/>
  }
}

export default CircularPicker;