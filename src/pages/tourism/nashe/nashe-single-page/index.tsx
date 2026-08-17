import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useRoute } from 'preact-iso'
import { useScenesData } from 'hook/use-scenes-data'
import { useYearFilter } from 'hook/use-year-filter'
import useApi from 'hook/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { NasheLineupItem } from 'components/data/concert/nashe-lineup-item'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../../tourism-style.css'
import './style.css'

export const NasheSinglePage: FunctionComponent = () => {
	usePageTitle('Нашествие')

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
		<div className="nashe-single-page tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<NasheLineupItem
				curYear={curYear}
				mainScene={mainScene}
				secondScene={secondScene}
			/>

			<TextContainer>
				<TourismHeader secondary>
					Другие лайнапы
				</TourismHeader>
				<NasheLineupGallery />
			</TextContainer>
		</div>
	)
}
