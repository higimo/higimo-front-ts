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
import { NasheLineupList } from 'components/tourism/concert/nashe-lineup-list'
import { NasheLineupDetail } from 'components/tourism/concert/nashe-lineup-detail'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading/Heading'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../../tourism-style.css'
import './style.css'

export const NasheDetailPage: FunctionComponent = () => {
	const { params: { year } } = useRoute()
	const curYear = year ? parseInt(year, 10) : 2017

	const [ nasheList ] = useApi<NasheType[]>(API_ROUTE.nasheSingle({ year: curYear }))
	const nasheFiltred = useYearFilter(nasheList.data || [], curYear)
	const { mainScene, secondScene } = useScenesData(nasheFiltred)

	return (
		<Layout title={`Нашествие ${curYear}`} className="nashe-single-page tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<LoadSuspense data={nasheList}>
				<EmptyData data={nasheList}>
					<NasheLineupDetail
						curYear={curYear}
						mainScene={mainScene}
						secondScene={secondScene}
					/>
				</EmptyData>
			</LoadSuspense>


			<TextContainer>
				<Heading variant="tourism" level={2}>Другие лайнапы</Heading>

				<NasheLineupList />
			</TextContainer>
		</Layout>
	)
}
