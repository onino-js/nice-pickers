import * as d3 from 'd3';
const calculateAngle = (A, B) => {
    const deltaX = A.x - B.x;
    const deltaY = A.y - B.y;
    return Math.atan2(deltaY, deltaX);
};
const closestPointOnCircleEdge = (A, B, r) => {
    const a1 = B.x - A.x;
    const b1 = Math.pow((B.x - A.x), 2) + Math.pow((B.y - A.y), 2);
    const x = A.x + r * (a1 / Math.sqrt(b1));
    const a2 = B.y - A.y;
    const b2 = Math.pow((B.x - A.x), 2) + Math.pow((B.y - A.y), 2);
    const y = A.y + r * (a2 / Math.sqrt(b2));
    return { x, y };
};
const chartHeight = 300;
const chartWidth = 300;
const radius = 100;
const padding = { top: 5, bottom: 5, right: 5, left: 5 };
const valueToAngle = (value) => value + 180;
export const baseAngles = [
    { label: 'N', angle: -180 },
    { label: 'NW', angle: 135 },
    { label: 'W', angle: 90 },
    { label: 'SW', angle: 45 },
    { label: 'S', angle: 0 },
    { label: 'SE', angle: -45 },
    { label: 'E', angle: -90 },
    { label: 'NE', angle: -135 }
];
export const cardinalPointPickerRender = (container, value, onChange, possibleValues = baseAngles, cardinals = [
    { label: 'N', angle: 0 },
    { label: 'NE', angle: Math.PI / 4 },
    { label: 'E', angle: Math.PI / 2 },
    { label: 'SE', angle: (3 * Math.PI) / 4 },
    { label: 'O', angle: (3 * Math.PI) / 2 },
    { label: 'SO', angle: (5 * Math.PI) / 4 },
    { label: 'S', angle: Math.PI },
    { label: 'NO', angle: (7 * Math.PI) / 4 }
]) => {
    const angleToValue = (angle) => possibleValues.reduce((a, b) => Math.abs(a.angle - angle) < Math.abs(b.angle - angle) ? a : b, possibleValues[0]);
    const onDrag = () => {
        const closet = closestPointOnCircleEdge({ x: 0, y: 0 }, d3.event, radius);
        const angle = calculateAngle(closet, { x: 0, y: 0 }) + Math.PI / 2;
        d3.select(container)
            .select('.arrow')
            .attr('transform', `rotate(${angle * (180 / Math.PI)})`);
    };
    let dragEnd = () => {
        const closet = closestPointOnCircleEdge({ x: 0, y: 0 }, d3.event, radius);
        const angle = calculateAngle(closet, { x: 0, y: 0 }) + Math.PI / 2;
        const degree = Math.round((angle * (180 / Math.PI)) / 45) * 45 - 180;
        const pvGisAngle = degree < -180 ? degree + 360 : degree;
        d3.select(container)
            .select('.arrow')
            .transition()
            .duration(400)
            .attr('transform', `rotate(${valueToAngle(angleToValue(pvGisAngle).angle)})`);
        onChange(angleToValue(pvGisAngle).angle);
    };
    const textArc = d3
        .arc()
        .innerRadius(radius + 40)
        .outerRadius(radius + 40);
    d3.select(container)
        .selectAll('svg')
        .data(['svg'])
        .enter()
        .append('svg')
        .attr('viewBox', ` 0 0 ${chartHeight + padding.top + padding.bottom} ${chartWidth +
        padding.left +
        padding.right}`)
        .append('g')
        .attr('transform', `translate(${padding.left + chartWidth / 2},${padding.top +
        chartHeight / 2})`)
        .attr('class', 'orientation-selector')
        .each(function () {
        d3.select(this)
            .append('g')
            .attr('class', 'cardinals');
        const arrow = d3
            .select(this)
            .append('g')
            .attr('class', 'arrow')
            .attr('transform', `rotate(${valueToAngle(value)})`)
            .call(d3
            .drag()
            .on('drag', onDrag)
            .on('end', dragEnd));
        arrow
            .append('circle')
            .attr('r', radius)
            .attr('class', 'compass');
        arrow
            .append('path')
            .attr('d', 'M 0 0 L 0 -80 M12 -113 a 18,18 0 1,0 1,1');
    });
    const gCardinals = d3
        .select(container)
        .select('.cardinals')
        .call(d3.drag().on('start', dragEnd))
        .selectAll('.cardinal')
        .data(cardinals);
    gCardinals
        .enter()
        .append('text')
        .text((d) => d.label)
        .attr('x', d => textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[0])
        .attr('y', d => textArc.centroid({ startAngle: d.angle, endAngle: d.angle })[1])
        .attr('dy', '0.5em')
        .merge(gCardinals)
        .attr('class', (d) => d.angle === valueToAngle(value) * (Math.PI / 180)
        ? 'cardinal selected'
        : 'cardinal');
    d3.select(container)
        .select('.arrow')
        .transition()
        .duration(400)
        .attr('transform', `rotate(${valueToAngle(value)})`);
};
