import React from "react";
interface IMenuProps<T> {
    width?: string;
    onSelect?: (e: T | null) => void;
    items?: {
        label: string;
        value: T;
    }[];
    noMenuMessage?: string;
}
declare class Menu<T = any> extends React.Component<IMenuProps<T>> {
    state: {
        collapsed: boolean;
        selectedValue: any;
        selectedLabel: string;
    };
    private selectItem;
    static defaultProps: {
        width: string;
        color: string;
        noSelectMessage: string;
        onSelect: () => void;
    };
    render(): JSX.Element;
}
export default Menu;
