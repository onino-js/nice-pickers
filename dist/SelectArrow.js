import React from "react";
const DEFAULT_FILL = "#FFFFFF";
const DEFAULT_SIZE = 16;
export const SelectArrow = ({ className, fill = DEFAULT_FILL, size = DEFAULT_SIZE }) => (React.createElement("svg", { width: size, height: size, viewBox: "0 0 132 132", className: className },
    React.createElement("path", { fill: fill, d: "m66 26.4a13.2 13.2 0 0 0-9.16 3.87l-52.9 52.9a13.2 13.2 0 1 0 18.7 18.7l43.6-43.6 43.6 43.6a13.2 13.2 0 1 0 18.7-18.7l-52.9-52.9a13.2 13.2 0 0 0-9.55-3.87z" })));
