import { FunctionComponent } from 'preact'
import { PasteApiType } from '../../types'
import { useEffect, useRef } from 'preact/hooks'

type ChartDataType = {
	label: string
	value: number
}

const aggregateByDay = async (data: PasteApiType[]): Promise<ChartDataType[]> => {
	try {
		const {
			rollup,
		} = await import('d3');
		const grouped = rollup(
			data,
			(items) => items.length,
			(d) => d.date
		);

		return Array.from(
			grouped,
			([label, value]) => ({ label, value })
		).sort((a, b) => a.label.localeCompare(b.label));
	} catch (error) {
		console.error('Failed to load D3:', error);
		return []
	}
}

const updateChart = async (
	svgRef: any,
	data: ChartDataType[],
	width: number,
	height: number,
	padding: { top: number, bottom: number, left: number, right: number }
) => {
	try {
		const {
			select,
			scalePoint,
			max,
			scaleLinear,
			line,
			curveMonotoneX,
			area,
		} = await import('d3');

		const svg = select(svgRef.current)

		// Очистка предыдущего содержимого
		svg.selectAll('*').remove()

		const innerWidth = width - padding.left - padding.right
		const innerHeight = height - padding.top - padding.bottom

		// Масштабы
		const xScale = scalePoint()
			.domain(data.map(d => d.label))
			.range([0, innerWidth])
			.padding(0.5)

		const maxVal = max(data, d => d.value) || 1
		const yScale = scaleLinear()
			.domain([0, maxVal + maxVal * 0.15]) // небольшой отступ сверху
			.range([innerHeight, 0])

		// Генератор линии
		const lineGenerator = line()
			.x(d => xScale(d.label))
			.y(d => yScale(d.value))
			.curve(curveMonotoneX)

		// Генератор области (для заливки)
		const areaGenerator = area()
			.x(d => xScale(d.label))
			.y0(yScale(0))
			.y1(d => yScale(d.value))
			.curve(curveMonotoneX)

		// Основной контейнер с отступами
		const chartGroup = svg.append('g')
			.attr('transform', `translate(${padding.left},${padding.top})`)

		// ---- Градиент ----
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
			.attr('stop-opacity', 0.85)
		gradient.append('stop')
			.attr('offset', '40%')
			.attr('stop-color', '#2a6cdb')
			.attr('stop-opacity', 0.50)
		gradient.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#6b9bf5')
			.attr('stop-opacity', 0.08)

		// ---- Сетка (горизонтальные линии) ----
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
			.attr('stroke-dasharray', '4 5')
			.attr('opacity', 0.6)

		// Подписи к сетке (числа слева)
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
			.attr('font-weight', '450')
			.text(d => d)

		// ---- Заливка (область) ----
		chartGroup.append('path')
			.datum(data)
			.attr('d', areaGenerator)
			.attr('fill', 'url(#chartGradient)')
			.attr('opacity', 0.75)

		// ---- Линия ----
		chartGroup.append('path')
			.datum(data)
			.attr('d', lineGenerator)
			.attr('fill', 'none')
			.attr('stroke', '#1a439b')
			.attr('stroke-width', 3.5)
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round')

		// ---- Точки и числа над ними ----
		chartGroup.selectAll('circle.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('cx', d => xScale(d.label))
			.attr('cy', d => yScale(d.value))
			.attr('r', 6)
			.attr('fill', '#ffffff')
			.attr('stroke', '#1a439b')
			.attr('stroke-width', 3)
			.attr('filter', 'drop-shadow(0 2px 3px rgba(26,67,155,0.20))')

		// Числа над точками
		chartGroup.selectAll('text.value-label')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'value-label')
			.attr('x', d => xScale(d.label))
			.attr('y', d => yScale(d.value) - 16)
			.attr('text-anchor', 'middle')
			.attr('font-size', '14')
			.attr('font-weight', '600')
			.attr('fill', '#0b1e4a')
			.attr('letter-spacing', '0.2px')
			.text(d => d.value)

		// Подписи дней под точками
		chartGroup.selectAll('text.day-label')
			.data(data)
			.enter()
			.append('text')
			.attr('class', 'day-label')
			.attr('x', d => xScale(d.label))
			.attr('y', innerHeight + 22)
			.attr('text-anchor', 'middle')
			.attr('font-size', '13')
			.attr('fill', '#4c6a9e')
			.attr('font-weight', '450')
			.text(d => d.label)

		// Декоративная подпись "макс."
		chartGroup.append('text')
			.attr('x', innerWidth)
			.attr('y', -6)
			.attr('text-anchor', 'end')
			.attr('font-size', '12')
			.attr('fill', '#8aa2c9')
			.attr('font-weight', '450')
			.text(`макс. ${maxVal}`)
	} catch (error) {
		console.error('Failed to load D3:', error);
	}
}

type HiringResponseDiagramPropsType = {
	data: PasteApiType[]
	width?: number
	height?: number
	padding?: {
		top?: number
		bottom?: number
		left?: number
		right?: number
	}
}
export const HiringResponseDiagram: FunctionComponent<HiringResponseDiagramPropsType> = ({
	data,
	width = 920,
	height = 250,
	padding = { top: 30, bottom: 40, left: 48, right: 30 }
}) => {
	const svgRef = useRef(null)

	useEffect(() => {
		if (!svgRef.current) {
			return
		}

		aggregateByDay(data)
			.then(chartData => {
				// @ts-ignore
				updateChart(svgRef, chartData, width, height, padding)
			})

	}, [svgRef, data, width, height, padding])

	return (
		<div>
			<h2>График откликов</h2>
			<div className="chart-wrapper">
				<svg
					ref={svgRef}
					viewBox={`0 0 ${width} ${height}`}
					preserveAspectRatio="xMidYMid meet">
				</svg>
			</div>
		</div>
	)
}
