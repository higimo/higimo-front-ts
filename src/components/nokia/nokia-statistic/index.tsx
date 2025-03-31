import { FunctionComponent } from 'preact'

import { useContext, useRef, useEffect, MutableRef, useLayoutEffect } from 'preact/hooks'

import { NokiaContext, NokiaContextType } from '../../../context/nokia'

// TODO lazyload
import * as d3 from 'd3'

import '../nokia-style.css'
import { MeetingType } from '../../../types'

const WIDTH = 500
const HEIGHT = 500

const updateChart = ({ viz, data }: { viz: MutableRef<HTMLDivElement>, data: PrepareDataResult}) => () => {
	const origDataset = data[1]
	if (!viz.current || !Object.keys(origDataset).length) {
		return null
	}

	var margin = { top: 20, right: 50, bottom: 100, left: 30 }

	var width = WIDTH - margin.left - margin.right
	var height = HEIGHT - margin.top - margin.bottom

	var svg = d3
		.select(viz.current)
		.append('svg')
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	var colors = ['#b33040', '#b33040', '#d25c4d', '#f2b447', '#d9d574', '#d9e514', '#e9d574']

	var dataset = d3.stack()
		.keys(['online', 'net', 'offline', 'work', 'game', 'sex'])(origDataset)
		.map(
			column => column.map(d => ({
				data: d.data,
				x: d.data.date,
				y: d[1],
				y0: d[0],
			}))
		)

	var y = d3.scaleLinear(
		[ 0, d3.max(dataset, d => d3.max(d, d => d.y) ) ],
		[ height, 0 ]
	)

	var x = d3.scaleLinear(
		[
			d3.min(dataset, d => d3.min(d, d => d.x) ),
			d3.max(dataset, d => d3.max(d, d => d.x) )
		],
		[ 0, width ]
	)

	var groups = svg
		.selectAll('g.cost')
		.data(dataset)
		.enter()
		.append('g')
		.attr('class', 'cost')
		.style('fill', (d, i) => colors[i])

	groups
		.selectAll('rect')
		.data(d => d)
		.enter()
		.append('rect')
		.attr('x', (d, i) => x(d.x) )
		.attr('width', d => Math.round(width / d3.max(dataset, d => d.length)))
		.attr('y', d => y(d.y) )
		.attr('height', d => y(d.y0) - y(d.y) )

	svg.append('g')
		.call(d3.axisLeft(y))

	svg.append('g')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(
			d3.axisBottom(x)
				.tickValues(d3.timeMonth.every(1).range(d3.min(origDataset, o => o.date), d3.max(origDataset, o => o.date)))
				.tickFormat(d => new Date(d).toLocaleDateString())
		)
		.selectAll('text')
			.style('text-anchor', 'end')
			.attr('dx', '-1.2em')
			.attr('dy', '-0.5em')
			.attr('transform', 'rotate(-65)')
}

type ResultDatasetItem = {
    date: Date;
    [key: MeetingType['type']]: number | Date;
}
type PrepareDataResult = [string[], ResultDatasetItem[]];
const prepareData = (meeting: MeetingType[]): PrepareDataResult => {
	let meetingTypeDic: { [key: MeetingType['type']]: number } = {}
	let resultDataset: {
		[key: string]: {
			[key: MeetingType['type']]: number
		}
	} = {}
	for (let curMeeting of meeting) {
		const date = new Date(parseInt(curMeeting.date + '000', 10))
		const monthNumber = ('0' + (date.getMonth() + 1)).slice(-2)
		const yearNumber = date.getFullYear()
		const keyMonth = `${yearNumber}-${monthNumber}-01`

		// Если не определён тип, или кривая дата, шагаем дальше
		if (yearNumber < 2021 || !curMeeting.type.length) {
			continue
		}

		if (!resultDataset[keyMonth]) {
			resultDataset[keyMonth] = {
			}
		}
		if (!resultDataset[keyMonth][curMeeting.type]) {
			resultDataset[keyMonth][curMeeting.type] = 0
		}
		meetingTypeDic[curMeeting.type] = 1
		resultDataset[keyMonth][curMeeting.type] += 1
	}

	return [
		Object.keys(meetingTypeDic),
		Object.keys(resultDataset).map((key) => ({
			date: new Date(key),
			...resultDataset[key]
		}))
	]
}

// TODO теги по годам
export const NokiaStatistic: FunctionComponent = () => {
	const viz = useRef<HTMLDivElement>(null)

	const { richMeeting, fetchData } = useContext(NokiaContext) as NokiaContextType

	useLayoutEffect(fetchData, [])
	
	useEffect(() => {
		updateChart({
			viz,
			data: prepareData(richMeeting),
		})()
	}, [richMeeting])

	return (
		<div
			ref={viz}
			style={{
				width: WIDTH,
				height: HEIGHT,
			}}
		/>
	)
}
