import { ChartDataType } from 'components/hiring-response/hiring-response-diagram/ChartDataType'

export const updateChart = async (
	svgRef: any,
	data: ChartDataType[],
	width: number,
	height: number
) => {
	const padding = { top: 8, bottom: 70, left: 32, right: 32 }

	try {
		const {
			select,
			scalePoint,
			max,
			scaleLinear,
			line,
			curveMonotoneX,
			area,
		} = await import('d3')

		const svg = select(svgRef)

		svg.selectAll('*').remove()

		const innerWidth = width - padding.left - padding.right
		const innerHeight = height - padding.top - padding.bottom

		const xScale = scalePoint()
			.domain(data.map(d => d.label))
			.range([0, innerWidth])
			.padding(0)

		const maxVal = max(data, d => d.value) || 1
		const yScale = scaleLinear()
			.domain([0, maxVal + maxVal * 0.15])
			.range([innerHeight, 0])

		// Линия
		const lineGenerator = line<ChartDataType>()
			.x(d => xScale(d.label)!)
			.y(d => yScale(d.value))
			.curve(curveMonotoneX)

		// Заливка под линией
		const areaGenerator = area<ChartDataType>()
			.x(d => xScale(d.label)!)
			.y0(yScale(0))
			.y1(d => yScale(d.value))
			.curve(curveMonotoneX)

		// Контейнер
		const chartGroup = svg.append('g')
			.attr('transform', `translate(${padding.left}, ${padding.top})`)

		// Градиент
		const defs = svg.append('defs')
		const gradient = defs.append('linearGradient')
			.attr('id', 'chartGradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '0%')
			.attr('y2', '100%')
		gradient.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', '#1a439b')
			.attr('stop-opacity', 0.9)
		gradient.append('stop')
			.attr('offset', '40%')
			.attr('stop-color', '#2a6cdb')
			.attr('stop-opacity', 0.7)
		gradient.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#6b9bf5')
			.attr('stop-opacity', 0.04)

		// Горизонтальная сетка
		const yTicks = yScale.ticks(5)
		chartGroup.append('g')
			.selectAll('line.grid-line')
			.data(yTicks)
			.enter()
			.append('line')
			.attr('class', 'grid-line')
			.attr('x1', 0)
			.attr('x2', innerWidth)
			.attr('y1', d => yScale(d))
			.attr('y2', d => yScale(d))
			.attr('stroke', '#dce6f5')
			.attr('stroke-width', 1)
			.attr('stroke-dasharray', '7 10')
			.attr('opacity', 0.8)

		// Подписи левой оси
		chartGroup.append('g')
			.selectAll('text.grid-label')
			.data(yTicks)
			.enter()
			.append('text')
			.attr('class', 'grid-label')
			.attr('x', -8)
			.attr('y', d => yScale(d) + 5)
			.attr('text-anchor', 'end')
			.attr('font-size', '12')
			.attr('fill', '#6b86b0')
			.text(d => d)

		// Подписи горизонтальной оси
		chartGroup.selectAll('text.day-label')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'day-label')
			.attr('x', d => xScale(d.label)!)
			.attr('y', height - 10)
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'central')
			.attr('transform', d => `rotate(-90, ${xScale(d.label)! - 3}, ${innerHeight + 65})`)
			.attr('font-size', '12')
			.attr('fill', '#4c6a9e')
			.attr('font-weight', '400')
			.text(d => d.label)

		// Заливка
		chartGroup.append('path')
			.datum(data)
			.attr('d', areaGenerator)
			.attr('fill', 'url(#chartGradient)')
			.attr('opacity', 0.35)

		// Линия
		chartGroup.append('path')
			.datum(data)
			.attr('d', lineGenerator)
			.attr('fill', 'none')
			.attr('stroke', '#1a439b')
			.attr('stroke-width', 3.5)
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round')

		// Точки и подписки
		chartGroup.selectAll('circle.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('cx', d => xScale(d.label)!)
			.attr('cy', d => yScale(d.value))
			.attr('r', 6)
			.attr('fill', '#ffffff')
			.attr('stroke', '#1a439b')
			.attr('stroke-width', 1)
			.attr('filter', 'drop-shadow(0 2px 3px rgba(26,67,155,0.20))')

		// Числа над точками
		chartGroup.selectAll('text.value-label')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'value-label')
			.attr('x', d => xScale(d.label)!)
			.attr('y', d => yScale(d.value) - 16)
			.attr('text-anchor', 'middle')
			.attr('font-size', '12')
			.attr('font-weight', '600')
			.attr('fill', '#0b1e4a')
			.text(d => d.value)
	} catch (error) {
		console.error('Failed to load D3:', error)
	}
}
