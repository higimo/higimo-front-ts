import { ChartDataType } from 'components/hiring-response/chart.types'
import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useEffect, useRef } from 'preact/hooks'

import { aggregateByDay } from 'components/hiring-response/hiring-response-diagram/aggregate-by-day'
import { updateChart } from 'components/hiring-response/hiring-response-diagram/updateChart'

import './style.css'

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
	height = 270,
}) => {
	// TODO: [LIGHT] а я там сделал paste/statistic, добавить эндпоинт в сервис
	const svgRef = useRef(null)

	useEffect(() => {
		if (!svgRef.current) {
			return
		}

		(async () => {
			const chartData: ChartDataType[] = await aggregateByDay(data)
			updateChart(svgRef.current, chartData, width, height)
		})()
	}, [svgRef, data, width, height])

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
