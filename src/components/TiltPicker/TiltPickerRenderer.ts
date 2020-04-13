import * as d3 from 'd3';

export interface Point {
  x: number;
  y: number;
}

const calculateAngle = (A: Point, B: Point) => {
  const deltaX = A.x - B.x;
  const deltaY = A.y - B.y;
  return Math.atan2(deltaY, deltaX);
};

const closestPointOnCircleEdge = (A: Point, B: Point, r: number) => {
  const a1 = B.x - A.x;
  const b1 = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;
  const x = A.x + r * (a1 / Math.sqrt(b1));
  const a2 = B.y - A.y;
  const b2 = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;
  const y = A.y + r * (a2 / Math.sqrt(b2));
  return { x, y };
};

const possibleAngles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

const chartHeight = 300;

const chartWidth = 300;

const toRadianAngle = (deg: number): number =>
  Math.PI / 2 - (Math.PI / 180) * deg;

export const tiltPickerRender = function(
  container: any,
  value: number,
  onChange: (a: number) => void,
  possibleAngle: number[] = possibleAngles
) {
  const MAX: number = d3.max(possibleAngle, d => d) || 90;

  const MIN: number = d3.min(possibleAngle, d => d) || 0;
  const onDrag = () => {
    const closest = closestPointOnCircleEdge(
      { x: 0, y: 0 },
      d3.event,
      sliderArcRadius - 0.5
    );

    const dragAngle =
      180 - (calculateAngle({ x: 0, y: 0 }, closest) * 180) / Math.PI;
    const uxAngle = dragAngle > 180 ? 0 : dragAngle;
    if (uxAngle > MIN && uxAngle < MAX) {
      d3.select(container)
        .select('.slider-dot')
        .attr('cx', closest.x)
        .attr('cy', closest.y)
        .each((d: any) => {
          d.angle = toRadianAngle(uxAngle);
        });
    }
  };
  const onDrop = function() {
    const closest = closestPointOnCircleEdge(
      { x: 0, y: 0 },
      d3.event,
      sliderArcRadius - 0.5
    );

    const dragAngle =
      180 - (calculateAngle({ x: 0, y: 0 }, closest) * 180) / Math.PI;
    const uxAngle = dragAngle > 180 ? 0 : dragAngle;
    const nearest = possibleAngle.reduce(
      (a, b) => (Math.abs(a - uxAngle) < Math.abs(b - uxAngle) ? a : b),
      possibleAngle[0]
    );
    onChange(nearest);
    animateMove(nearest);
  };

  function animateMove(value: number) {
    // onChange(value);
    d3.select(container)
      .select('.slider-dot')
      .transition()
      .duration(300)
      .attrTween('cx', (e: any) => {
        const end = toRadianAngle(value);
        const start = e.angle;

        return (i: number) => {
          const angle = start + (end - start) * i;
          e.angle = angle;
          return sliderArc
            .centroid({ startAngle: angle, endAngle: angle })[0]
            .toString();
        };
      })
      .attrTween('cy', (e: any) => {
        const end = toRadianAngle(value);
        const start = e.angle;

        return (i: number) => {
          const angle = start + (end - start) * i;
          e.angle = angle;
          return sliderArc
            .centroid({ startAngle: angle, endAngle: angle })[1]
            .toString();
        };
      })
      .on('end', function(e: any) {
        e.angle = toRadianAngle(value);
        const position = sliderArc.centroid({
          startAngle: toRadianAngle(value),
          endAngle: toRadianAngle(value)
        });
        d3.select(this)
          .attr('cx', position[0])
          .attr('cy', position[1]);
      });
  }

  d3.select(container)
    .selectAll('svg')
    .data(['svg'])
    .enter()
    .append('svg')
    // .style("height", chartHeight + padding.top + padding.bottom)
    // .style("width", chartWidth + padding.left + padding.right)
    .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`)
    .append('g')
    .attr('transform', `translate(40,260)`)
    .attr('class', 'angle-selector')
    .append('circle')
    .attr('r', '8px')
    .attr('class', 'base');

  const numbersRadius = 240;
  const selectableArcRadius = 170;

  const sliderArcRadius = 200;
  const arc = d3
    .arc<{ startAngle: number; endAngle: number }>()
    .outerRadius(selectableArcRadius)
    .innerRadius(0);

  const bigArc = d3
    .arc<{ startAngle: number; endAngle: number }>()
    .outerRadius(numbersRadius)
    .innerRadius(numbersRadius);

  const sliderArc = d3
    .arc<{ startAngle: number; endAngle: number }>()
    .outerRadius(sliderArcRadius)
    .innerRadius(sliderArcRadius - 1);

  const possiblesArc = d3
    .select(container)
    .select('.angle-selector')
    .selectAll('.angles')
    .data(possibleAngle);
  // @ts-ignore
  possiblesArc
    .enter()
    .append('g')
    .attr('class', 'angles')
    .each(function(d: any) {
      // @ts-ignore
      d3.select(this)
        .append('path')
        .attr('d', arc({
          startAngle: toRadianAngle(d),
          endAngle: toRadianAngle(d)
        }) as string);
      const centreBigArc = bigArc.centroid({
        startAngle: toRadianAngle(d),
        endAngle: toRadianAngle(d)
      });
      d3.select(this)
        .append('text')
        .text(`${d} °`)
        .attr('x', centreBigArc[0])
        .attr('y', centreBigArc[1])
        .attr('dy', '0.3em');
    })
    // @ts-ignore
    .merge(possiblesArc)
    .each(function(d: any) {
      // @ts-ignore
      d3.select(this)
        .select('path')
        .attr('d', arc({
          startAngle: toRadianAngle(d),
          endAngle: toRadianAngle(d)
        }) as string);
      const centreBigArc = bigArc.centroid({
        startAngle: toRadianAngle(d),
        endAngle: toRadianAngle(d)
      });
      // @ts-ignore
      d3.select(this)
        .select('text')
        .text(`${d} °`)
        .attr('x', centreBigArc[0])
        .attr('y', centreBigArc[1])
        .attr('dy', '0.3em');
      // @ts-ignore
      const g = d3.select(this);
      if (d === value) {
        g.attr('class', 'angles selected');
      } else {
        g.attr('class', 'angles');
      }
    })
    .on('click', (d: any) => {
      onChange(d);

      animateMove(d);
    });

  d3.select(container)
    .select('.base')
    .raise();

  d3.select(container)
    .select('.angles.selected')
    .raise();
  const slider = d3
    .select(container)
    .select('.angle-selector')
    .selectAll('.slider')
    .data([{ value }]);

  slider
    .enter()
    .append('g')
    .attr('class', 'slider')
    .each(function() {
      // @ts-ignore
      d3.select(this)
        .append('path')
        .attr('class', 'slider-background')
        .call(
          // @ts-ignore
          d3.drag().on('start', onDrop)
        )
        .attr('d', sliderArc({
          startAngle: toRadianAngle(MIN),
          endAngle: toRadianAngle(MAX)
        }) as string);

      const centreBigArc = bigArc.centroid({
        startAngle: toRadianAngle(value),
        endAngle: toRadianAngle(value)
      });
      const closest = closestPointOnCircleEdge(
        { x: 0, y: 0 },
        {
          x: centreBigArc[0],
          y: centreBigArc[1]
        },
        sliderArcRadius - 0.5
      );
      d3.select(this)
        .append('circle')
        .attr('class', 'slider-dot')
        .attr('cx', closest.x)
        .attr('cy', closest.y)

        .attr('r', '17px')
        .datum({ angle: toRadianAngle(value) });
    });

  d3.select(container)
    .select('.slider-dot')
    .call(
      // @ts-ignore
      d3
        .drag()
        .on('drag', onDrag)
        .on('end', onDrop)
    );
  animateMove(value);
};
