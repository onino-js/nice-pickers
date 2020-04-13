import * as d3 from "d3";
import styles from "./CircularPicker.module.css";
import { paths } from "./icons/icon-paths";
const CHART_HEIGHT = 400;
const CHART_WIDTH = 400;
const RADIUS = 100;
const SECONDARY_CIRCLE_RADIUS = 60;
const MAIN_CIRCLE_RADIUS = 60;
const NB_OF_CIRCLES = 5;
let circlesData = new Array(NB_OF_CIRCLES)
    .fill(0)
    .map((d, i) => ({
    index: i,
    angle: (2 * (i) * Math.PI) / (NB_OF_CIRCLES)
}));
export const circularPickerRender = (container) => {
    let pickerState = false;
    const firestRenderer = d3.select(container)
        .selectAll("svg")
        .data(["svg"])
        .enter()
        .append("svg")
        .attr("viewBox", ` 0 0 ${CHART_HEIGHT} ${CHART_WIDTH}`)
        .append("g")
        .attr("transform", `translate(${CHART_WIDTH / 2},${CHART_HEIGHT / 2})`);
    d3.select(container)
        .select("svg")
        .append('defs')
        .append('filter')
        .attr('id', 'truc')
        .attr('color-interpolation-filters', "sRGB")
        .append('feGaussianBlur')
        .attr('id', 'truc2')
        .attr('stdDeviation', 3);
    const textArc = d3
        .arc()
        .innerRadius(RADIUS + 40)
        .outerRadius(RADIUS + 40);
    const lines = d3
        .select(container)
        .select("g")
        .selectAll(styles["line"])
        .data(circlesData)
        .enter()
        .append("line")
        .attr("class", styles["line"])
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y1", 0);
    const circles = firestRenderer
        .selectAll('.' + styles["secondary-circle"])
        .data(circlesData)
        .enter()
        .append('g')
        .attr('class', styles['moving-group'])
        .each(function (d, i) {
        d3.select(this)
            .append("circle")
            .attr("class", styles["secondary-circle"])
            .attr("r", SECONDARY_CIRCLE_RADIUS)
            .attr('filter', 'url(#truc)');
        d3.select(this)
            .append('svg')
            .attr("viewBox", ` 0 0 120 120`)
            .attr('height', 70)
            .attr('width', 70)
            .attr('x', -35)
            .attr('y', -35)
            .append("path")
            .attr('d', paths[i]);
    });
    const mainCircle = d3
        .select(container)
        .select("g")
        .selectAll(styles["main-circle"])
        .data(["main-circle"])
        .enter()
        .append("circle")
        .attr("class", styles["main-circle"])
        .attr("r", MAIN_CIRCLE_RADIUS)
        .attr('filter', 'url(#truc)');
    document.addEventListener('click', (e) => {
        var isClickInside = container.contains(e.target);
        if (!isClickInside) {
            pickerState && startTransition();
        }
    });
    mainCircle.on("click", () => {
        startTransition();
    });
    circles.on("click", e => {
        startTransition();
    });
    const startTransition = () => {
        d3.select(container)
            .selectAll('.' + styles['moving-group'])
            .transition()
            .duration(500)
            .delay((d, i) => 30 * i)
            .attr("transform", d => pickerState
            ? 'translate(0,0)'
            :
                `translate(${textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[0]}, ${textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[1]})`);
        lines
            .transition()
            .duration(500)
            .delay((d, i) => 30 * i)
            .attr("x2", d => pickerState
            ? 0
            :
                textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[0])
            .attr("y2", d => pickerState
            ? 0
            :
                textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[1]);
        pickerState = !pickerState;
    };
};
