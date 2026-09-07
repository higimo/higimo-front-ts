import { ChartDataType } from 'components/hiring-response/hiring-response-diagram/ChartDataType'
import { FunctionComponent } from 'preact'
import { PasteApiType } from 'api-types/paste.types'

import { useEffect, useRef } from 'preact/hooks'

import { aggregateByDay } from 'components/hiring-response/hiring-response-diagram/aggregateByDay'
import { updateChart } from 'components/hiring-response/hiring-response-diagram/updateChart'

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
