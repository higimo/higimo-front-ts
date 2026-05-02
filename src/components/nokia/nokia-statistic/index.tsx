import { Fragment, FunctionComponent } from 'preact'
import { NokiaMeetingStatisticType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRef, useEffect, useMemo } from 'preact/hooks'
import { useTags } from 'hook/use-tags'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'
import { HEIGHT, updateChart, WIDTH } from 'components/nokia/nokia-statistic/updateChart'

import { prepareData } from 'components/nokia/nokia-statistic/prepareData'

import '../nokia-style.css'

// TODO: [MEDIUM] https://www.npmjs.com/package/@observablehq/plot

export const NokiaStatistic: FunctionComponent = () => {
	const viz = useRef<HTMLDivElement>(null)

	const [meetingStatistic] = useApi<NokiaMeetingStatisticType[]>(API_ROUTE.nokiaStatistic)
	const isLoadingMeetingStatistic = useLoadingState([meetingStatistic.status])
	const isEmptyMeetingStatistic = useEmptyDataState(meetingStatistic.data)

	// TODO: [MEDIUM] удобные теги, кажись, может их в портфолио и списке людей нокии использовать?
	const [ selectedYearTag, handleYearTagClick ] = useTags<number>([])
	const [ selectedTypeTag, handleTypeTagClick ] = useTags<string>([])

	const statistic = meetingStatistic.data || []

	const yearDataset = useMemo(() => {
		const dataset = [...new Set(statistic.map(item => new Date(item.date * 1000).getFullYear()))]
			.filter(i => i != 1970)
			.sort((a, b) => a - b)
			handleYearTagClick(dataset)()
		return dataset
	}, [statistic])
	const typeDataset = useMemo(() => {
		const dataset = [...new Set(statistic.map(item => item.type))]
		handleTypeTagClick(dataset)()
		return dataset
	}, [statistic])

	useEffect(() => {
		updateChart({
			viz,
			data: prepareData(statistic, selectedYearTag, selectedTypeTag),
		})()
	}, [statistic, selectedYearTag, selectedTypeTag])

	if (isLoadingMeetingStatistic) {
		return <Loading />
	}
	if (isEmptyMeetingStatistic) {
		return <NotFoundPage />
	}

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
				className="nokia-graphic"
			/>
		</Fragment>
	)
}
