import { Fragment, FunctionComponent } from 'preact'

import { useContext, useRef, useEffect, MutableRef, useLayoutEffect, useMemo, useState, useCallback } from 'preact/hooks'

import { NokiaContext, NokiaContextType } from '../../../context/nokia'

// TODO lazyload
import * as d3 from 'd3'
// https://www.npmjs.com/package/@observablehq/plot

import '../nokia-style.css'
import { MeetingType } from '../../../types'
import { Tag } from '../../ui/tag'
import { TextContainer } from '../../ui/text-container'

const MARGIN = { top: 40, right: 50, bottom: 150, left: 70 }

const WIDTH = 1300
const HEIGHT = 500

const COLORS = [
	'#939EAA',
	'#232B35',
	'#0C81D7',
	'#007D34',
	'#E59488',
	'#CB88F2',
	'#F5DEB3',
	'#915AD9',
	'#EDC962',
	'#FAF0E6',
	'#47935A',
	'#A98307',
	'#C5CCAD',
	'#DC615C',
	'#89AC76',
	'#E79C59',
	'#AA5300',
]

const updateChart = ({ viz, data }: { viz: MutableRef<HTMLDivElement>, data: PrepareDataResult}) => () => {
	const origDataset = data[1]

	if (!viz.current || !Object.keys(origDataset).length) {
		return null
	}

	d3.select(viz.current).selectAll('*').remove()

	const width = WIDTH - MARGIN.left - MARGIN.right
	const height = HEIGHT - MARGIN.top - MARGIN.bottom

	const category = data[0]

	var dataset = d3.stack()
		.keys(category)(origDataset)
		.map(
			(column) => {
				return column.map(d => ({
					data: d.data,
					x: d.data.date,
					y: d[1],
					y0: d[0],
					key: column.key,
				}));
			}
		)

	var y = d3.scaleLinear(
		[0, d3.max(dataset, d => d3.max(d, d => d.y)) as number],
		[height, 0]
	).nice()

	const x = d3.scaleBand(
		origDataset.map(d => d.date),
		[MARGIN.left, width - MARGIN.right]
	).padding(0.15)

	const color = d3.scaleOrdinal()
		.domain(category)
		.range(COLORS);

	const svg = d3
		.select(viz.current)
		.append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
		.attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

	var groups = svg
		.selectAll('g').data(dataset).enter()
		.append('g')
			.style('fill', d => color(d[0].key))

	groups.selectAll('rect')
		.data(d => d)
		.join('rect')
		.attr('transform', `translate(0, ${MARGIN.top})`)
		.attr('x', d => x(d.x))
		.attr('width', x.bandwidth())
		.attr('y', d => y(d.y))
		.attr('height', d => y(d.y0) - y(d.y))

	svg.append('g')
		.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
		.call(d3.axisLeft(y))
		
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
			.attr('dy', '-.5em')

	const legend = svg.append('g')
		.attr('transform', `translate(${width - MARGIN.right + 20}, ${MARGIN.top})`)

	category.forEach((category, i) => {
		const legendItem = legend.append('g')
			.attr('transform', `translate(0, ${i * 15})`)
			.style("font", "11px Sans-Serif")

		legendItem.append('rect')
			.attr('width', 13)
			.attr('height', 13)
			.attr('fill', color(category) as string)

		legendItem.append('text')
			.attr('x', 24)
			.attr('y', 9)
			.attr('dy', '0.35em')
			.text(category)
	})
}

type ResultDatasetItem = {
    date: Date;
    [key: MeetingType['type']]: number | Date;
}
type PrepareDataResult = [string[], ResultDatasetItem[]];
const prepareData = (meeting: MeetingType[], selectedYearTag: number[], selectedTypeTag: string[]): PrepareDataResult => {
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

		const isSelectedYear = !selectedYearTag.includes(yearNumber) // Только выбранный год
		const isSelectedtype = !selectedTypeTag.includes(curMeeting.type) // Только выбранный год
		const isFailYear = yearNumber == 1970 // Пропускаем битый год
		const isFailType = !curMeeting.type.length // Пропускаем битые типы
		
		if (isSelectedYear || isFailYear || isFailType || isSelectedtype) {
			continue
		}
		
		const keyMonth = `${yearNumber}-${monthNumber}-01`
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

	const dataset = Object.keys(resultDataset).map((key) => ({
		date: new Date(key),
		...resultDataset[key]
	}))

	const sortedDataset = [...dataset].sort((a, b) => a.date.getTime() - b.date.getTime())
	const category = Object.keys(meetingTypeDic).sort((a, b) => a.localeCompare(b))

	return [
		category,
		sortedDataset,
	]
}

// TODO вынести к ui/tags
const useTags = <T,>(initialValue: T[]): [T[], (newTagsList: T[]) => () => void] => {
	const [selectedTags, setSelectedTags] = useState<T[]>(initialValue)

	const handleTagClick = useCallback((newTagsList: T[]) => () => {
		console.log('hig',newTagsList)
		if (newTagsList.length === 0) {
			setSelectedTags([])
			return
		}
		// Если много элементом — применяем как есть
		if (newTagsList.length > 1) {
			setSelectedTags(newTagsList)
			return
		}
		// Если один элемент: убираем, если есть в массиве, добавляем, если отсутствует
		const year = newTagsList[0]
		let newTagsSet = selectedTags.includes(year)
			? selectedTags.filter(y => y !== year)
			: [...selectedTags, year]
			setSelectedTags(newTagsSet)
	}, [setSelectedTags, selectedTags])

	return [
		selectedTags,
		handleTagClick,
	]
}

// TODO ховер на столбцы, чтоб понимать, что там за тип
// TODO теги по годам
export const NokiaStatistic: FunctionComponent = () => {
	const viz = useRef<HTMLDivElement>(null)
	const { richMeeting, meeting, fetchData } = useContext(NokiaContext) as NokiaContextType
	const [ selectedYearTag, handleYearTagClick ] = useTags<number>([])
	const [ selectedTypeTag, handleTypeTagClick ] = useTags<string>([])

	const yearDataset = useMemo(() => {
		const dataset = [...new Set(richMeeting.map(item => new Date(item.date * 1000).getFullYear()))]
			.filter(i => i != 1970)
			.sort((a, b) => a - b)
			handleYearTagClick(dataset)()
		return dataset
	}, [richMeeting])
	const typeDataset = useMemo(() => {
		const dataset = [...new Set(meeting.map(item => item.type))]
		handleTypeTagClick(dataset)()
		return dataset
	}, [meeting])

	useLayoutEffect(fetchData, [])
	
	useEffect(() => {
		updateChart({
			viz,
			data: prepareData(richMeeting, selectedYearTag, selectedTypeTag),
		})()
	}, [richMeeting, selectedYearTag, selectedTypeTag])

	return (
		<Fragment>
			<TextContainer>
				<Tag active={selectedYearTag.length === 0} onClick={handleYearTagClick([])}>Убрать все</Tag>
				<Tag
					active={selectedYearTag.length === yearDataset.length}
					onClick={handleYearTagClick(yearDataset)}
				>Всё</Tag>
				{yearDataset.map(year => (
					<Tag
						active={selectedYearTag.includes(year)}
						onClick={handleYearTagClick([year])}
					>{year}</Tag>
				))}
			</TextContainer>
			<TextContainer>
				<Tag active={selectedTypeTag.length === 0} onClick={handleTypeTagClick([])}>Убрать все</Tag>
				<Tag
					active={selectedTypeTag.length === typeDataset.length}
					onClick={handleTypeTagClick(typeDataset)}
				>Всё</Tag>
				{typeDataset.map(typeMeeting => (
					<Tag
						active={selectedTypeTag.includes(typeMeeting)}
						onClick={handleTypeTagClick([typeMeeting])}
					>{typeMeeting}</Tag>
				))}
			</TextContainer>
			<div
				ref={viz}
				style={{
					width: WIDTH,
					height: HEIGHT,
				}}
			/>
		</Fragment>
	)
}
