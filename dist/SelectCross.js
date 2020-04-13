import React from "react";
const DEFAULT_FILL = "#FFFFFF";
const DEFAULT_SIZE = 16;
export const SelectCross = ({ className, fill = DEFAULT_FILL, size = DEFAULT_SIZE }) => (React.createElement("svg", { width: size, height: size, viewBox: "0 0 132 132", className: className },
    React.createElement("path", { fill: fill, d: "m13.1-0.149c-6.89e-4 1.7e-4 -0.0014 3.5e-4 -0.0021 5.2e-4 -5.38 3e-3 -10.2 3.27-12.3 8.26-2.02 4.99-0.823 10.7 3.04 14.5l43.6 43.6-43.6 43.6c-3.42 3.33-4.78 8.24-3.57 12.8 1.21 4.61 4.82 8.22 9.43 9.43 4.61 1.21 9.52-0.151 12.8-3.57 0 0 43.6-43.6 43.6-43.6l43.6 43.6c3.32 3.44 8.24 4.82 12.9 3.61 4.63-1.21 8.24-4.82 9.45-9.45 1.21-4.63-0.169-9.55-3.61-12.9l-43.6-43.6s43.6-43.6 43.6-43.6c3.91-3.8 5.09-9.62 2.96-14.6-2.13-5.02-7.12-8.23-12.6-8.07-3.44 0.103-6.7 1.54-9.09 4l-43.6 43.6-43.6-43.6c-2.49-2.56-5.92-4.01-9.49-4.01" })));
