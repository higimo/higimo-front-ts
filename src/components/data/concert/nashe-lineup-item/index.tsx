import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useRoute } from 'preact-iso'
import { useScenesData } from 'hook/use-scenes-data'
import { useYearFilter } from 'hook/use-year-filter'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NasheType } from 'components/data/concert/types'
import { ScheduleTable } from 'components/data/concert/schedule-table'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const NasheLineupItem = () => {
	const { params: { year } } = useRoute()
	const curYear = year ? parseInt(year, 10) : 2017

	const [ nasheFullData ] = useApi<NasheType[]>(API_ROUTE.nasheSingle({ year: curYear.toString() }))
	const filteredData = useYearFilter(nasheFullData.data, curYear)
	const { mainScene, secondScene } = useScenesData(filteredData)

	const isLoading = useLoadingState([nasheFullData.status])
	const isListEmpty = useEmptyDataState(filteredData)

	usePageTitle(`Нашествие ${curYear}`)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="nashe-lineup">
			<TextContainer>
				<h1>Нашествие {curYear}</h1>
				<p>★ — посетил</p>
			</TextContainer>

			<ScheduleTable data={mainScene} title="Главная сцена" />
			<ScheduleTable data={secondScene} title="Сцена 2.0" />
		</div>
	)
}
