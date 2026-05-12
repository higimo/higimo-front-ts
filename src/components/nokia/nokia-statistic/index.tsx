import { NokiaMeetingStatisticType } from 'api-types/nokia.types'
import { Fragment, FunctionComponent } from 'preact'

import { useTags } from 'hook/use-tags'
import { useEffect, useMemo, useRef } from 'preact/hooks'

import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { prepareData } from 'components/nokia/nokia-statistic/utils/prepare-data'
import { updateChart } from 'components/nokia/nokia-statistic/utils/update-chart'

import { HEIGHT, WIDTH } from 'components/nokia/nokia-statistic/utils/update-chart'

import 'components/nokia/nokia-style.css'

// TODO: [HARD] https://www.npmjs.com/package/@observablehq/plot
type NokiaStatisticPropsType = {
	meetingStatistic: NokiaMeetingStatisticType[]
}
export const NokiaStatistic: FunctionComponent<NokiaStatisticPropsType> = ({ meetingStatistic }) => {
	const viz = useRef<HTMLDivElement>(null)

	// TODO: [USE_TAGS] useSmartTag как бы его внедрить?
	const [ selectedYearTag, handleYearTagClick ] = useTags<number>([])
	const [ selectedTypeTag, handleTypeTagClick ] = useTags<string>([])

	const yearDataset = useMemo(() => {
		const dataset = Array.from(
				new Set(meetingStatistic.map(item => new Date(item.date * 1000).getFullYear()))
			)
			.filter(i => i != 1970)
			.sort((a, b) => a - b)
			handleYearTagClick(dataset)()
		return dataset
	}, [meetingStatistic])
	const typeDataset = useMemo(() => {
		const dataset = Array.from(new Set(meetingStatistic.map(item => item.type)))
		handleTypeTagClick(dataset)()
		return dataset
	}, [meetingStatistic])

	useEffect(() => {
		updateChart({
			// @ts-ignore
			viz,
			data: prepareData(meetingStatistic, selectedYearTag, selectedTypeTag),
		})()
	}, [meetingStatistic, selectedYearTag, selectedTypeTag])

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
				className="nokia-graphic"
				style={{
					width: WIDTH,
					height: HEIGHT,
				}}
			/>
		</Fragment>
	)
}
