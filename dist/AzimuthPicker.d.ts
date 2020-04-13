import * as React from 'react';
import './AzimuthPicker.css';
import { AngleValue } from './AzimuthPickerRenderer';
interface IAzimuthPickerProps {
    angles?: AngleValue[];
    value: number;
    onChange: (value: number) => void;
}
declare class AzimuthPicker extends React.Component<IAzimuthPickerProps> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export default AzimuthPicker;
