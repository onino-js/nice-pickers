export interface Point {
    x: number;
    y: number;
}
export interface AngleValue {
    [key: string]: any;
    angle: number;
    label: string;
}
export declare const baseAngles: {
    label: string;
    angle: number;
}[];
export declare const cardinalPointPickerRender: (container: any, value: number, onChange: (a: number) => void, possibleValues?: AngleValue[], cardinals?: AngleValue[]) => void;
