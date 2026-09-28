import { NasheType } from 'api-types/nashe.types'
import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'
import { useScenesData } from 'hook/data/use-scenes-data'
import { useYearFilter } from 'hook/data/use-year-filter'
import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { NasheLineupItem } from 'components/data/concert/nashe-lineup-item'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../../tourism-style.css'
import './style.css'

export const NasheSinglePage: FunctionComponent = () => {
	const { params: { year } } = useRoute()
	const curYear = year ? parseInt(year, 10) : 2017

	const [ nasheFullData ] = useApi<NasheType[]>(API_ROUTE.nasheSingle({ year: curYear }))
	const filteredData = useYearFilter(nasheFullData.data, curYear)
	const { mainScene, secondScene } = useScenesData(filteredData)

	return (
		<Layout title={`Нашествие ${curYear}`}>
			<div className="nashe-single-page tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<LoadSuspense data={nasheFullData}>
					<EmptyData data={nasheFullData}>
						<NasheLineupItem
							curYear={curYear}
							mainScene={mainScene}
							secondScene={secondScene}
						/>
					</EmptyData>
				</LoadSuspense>


				<TextContainer>
					<TourismHeader secondary>Другие лайнапы</TourismHeader>

					<NasheLineupGallery />
				</TextContainer>
			</div>
		</Layout>
	)
}
