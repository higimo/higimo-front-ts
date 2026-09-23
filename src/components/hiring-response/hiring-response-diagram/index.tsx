import { FunctionComponent } from 'preact'
import { PasteStatisticApiType } from 'api-types/paste.types'

import { useEffect, useRef } from 'preact/hooks'

import { updateChart } from 'components/hiring-response/hiring-response-diagram/updateChart'

import './style.css'

type HiringResponseDiagramPropsType = {
	data: PasteStatisticApiType[]
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

		updateChart(svgRef.current, data, width, height)
	}, [svgRef, data, width, height])

	return (
		<div className="chart-wrapper">
			<svg
				ref={svgRef}
				viewBox={`0 0 ${width} ${height}`}
				preserveAspectRatio="xMidYMid meet">
			</svg>
		</div>
	)
}
