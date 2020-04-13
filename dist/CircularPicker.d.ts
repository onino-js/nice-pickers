import * as React from "react";
interface ICircularPickerProps {
    value: number;
    onChange: (value: number) => void;
}
declare class CircularPicker extends React.Component<ICircularPickerProps> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    private renderer;
    render(): JSX.Element;
}
export default CircularPicker;
