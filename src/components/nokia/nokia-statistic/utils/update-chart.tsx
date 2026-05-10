import { MutableRef } from 'preact/hooks'

import { COLORS } from '../DICTIONARY'
import { loadD3Modules } from './load-d3-modules'
import { PrepareDataResult } from '../types'

export const MARGIN = { top: 40, right: 50, bottom: 150, left: 70 }
export const WIDTH = 1300
export const HEIGHT = 500

type updateChatPropsType = {
	viz: MutableRef<HTMLDivElement>;
	data: PrepareDataResult;
};
export const updateChart = ({ viz, data }: updateChatPropsType) => async () => {
	const origDataset = data[1];
	if (!viz.current || !Object.keys(origDataset).length) {
		return null;
	}

	try {
		const d3 = await loadD3Modules();

		d3.select(viz.current).selectAll('*').remove();

		const width = WIDTH - MARGIN.left - MARGIN.right;
		const height = HEIGHT - MARGIN.top - MARGIN.bottom;

		const category = data[0];

		var dataset = d3.stack()
			// @ts-ignore
			.keys(category)(origDataset)
			.map(
				(column) => {
					return column.map(d => ({
						data: d.data,
						x: d.data.date,
						y: d[1],
						y0: d[0],
						key: column.key,
						value: d.data[column.key],
					}));
				}
			);

		var y = d3.scaleLinear(
			[0, d3.max(dataset, d => d3.max(d, d => d.y)) as number],
			[height, 0]
		).nice();

		const x = d3.scaleBand(
			origDataset.map(d => d.date),
			[MARGIN.left, width - MARGIN.right]
		).padding(0.15);

		const color = d3.scaleOrdinal()
			.domain(category)
			.range(COLORS);

		const svg = d3
			.select(viz.current)
			.append('svg')
			.attr('width', WIDTH)
			.attr('height', HEIGHT)
			.attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`);

		const tooltip = d3.select(viz.current)
			.append('div')
			.attr('class', 'nokia-tooltip');

		var groups = svg
			.selectAll('g').data(dataset).enter()
			.append('g')
			// @ts-ignore
			.style('fill', d => color(d[0].key));

		groups.selectAll('rect')
			.data(d => d)
			.join('rect')
			.attr('transform', `translate(0, ${MARGIN.top})`)
			// @ts-ignore
			.attr('x', d => x(d.x))
			.attr('width', x.bandwidth())
			.attr('y', d => y(d.y))
			.attr('height', d => y(d.y0) - y(d.y))
			.on('mouseover', (event: any, d: any) => {
				// @ts-ignore
				d3.select(this).style('opacity', 0.8);

				tooltip.transition()
					.style('opacity', 1);

				tooltip.html(`
				  <div><strong>${d.key}</strong></div>
				  <div>${d.value || 0} — ${d3.timeFormat('%d.%m.%Y')(d.x)}</div>
				`)
					.style('left', (event.pageX + 10) + 'px')
					.style('top', (event.pageY - 28) + 'px');
			})
			.on('mouseout', function () {
				d3.select(this).style('opacity', 1);
				tooltip.transition()
					.style('opacity', 0);
			});

		svg.append('g')
			.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
			.call(d3.axisLeft(y));

		svg.append('g')
			.attr('transform', `translate(0,${height + MARGIN.top})`)
			.call(
				d3.axisBottom(x)
					.tickFormat(d3.timeFormat('%d.%m.%Y') as any)
			)
			.selectAll('text')
			.attr('transform', 'rotate(-90)')
			.style('text-anchor', 'end')
			.attr('dx', '-0.8em')
			.attr('dy', '-.5em');

		const legend = svg.append('g')
			.attr('transform', `translate(${width - MARGIN.right + 20}, ${MARGIN.top})`);

		category.forEach((category, i) => {
			const legendItem = legend.append('g')
				.attr('transform', `translate(0, ${i * 15})`)
				.style("font", "11px Sans-Serif");

			legendItem.append('rect')
				.attr('width', 13)
				.attr('height', 13)
				.attr('fill', color(category) as string);

			legendItem.append('text')
				.attr('x', 24)
				.attr('y', 9)
				.attr('dy', '0.35em')
				.text(category);
		});
	} catch (error) {
		console.error('Failed to load D3:', error);
	}
};
