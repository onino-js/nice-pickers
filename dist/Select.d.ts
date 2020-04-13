import React from "react";
interface ISelectProps<T> {
    width?: string;
    onSelect?: (e: T | null) => void;
    options?: {
        label: string;
        value: T;
    }[];
    noSelectMessage?: string;
}
declare class Select<T = any> extends React.Component<ISelectProps<T>> {
    constructor(props: ISelectProps<T>);
    private myRef;
    componentDidMount(): void;
    componentWillUnmount(): void;
    state: {
        collapsed: boolean;
        selectedValue: any;
        selectedLabel: string;
    };
    private selectItem;
    private toggleMenu;
    private closeMenu;
    private keyPress;
    private reset;
    static defaultProps: {
        width: string;
        color: string;
        noSelectMessage: string;
        onSelect: () => void;
    };
    render(): JSX.Element;
}
export default Select;
