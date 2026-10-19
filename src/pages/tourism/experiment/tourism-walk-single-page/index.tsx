import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Heading } from 'components/ui/heading/Heading'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismWalkItem } from 'components/tourism/tourism-ya-constructor/tourism-walk-item'
import { TourismWalkList } from 'components/tourism/tourism-ya-constructor/tourism-walk-list'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../../tourism-style.css'

export const TourismWalkSinglePage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID } } = useRoute()
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)

	const element = (yamapList.data || []).find(item => item.code === idcode)

	return (
		<Layout title={element?.name || 'Карта прогулки'} className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">{element?.name}</Heading>
			</TextContainer>

			<TourismWalkItem map={element?.map || ''} />

			<TextContainer>
				<Heading variant="tourism" level={2}>Другие карты</Heading>
				<LoadSuspense data={yamapList}>
					<EmptyData data={yamapList}>
						<TourismWalkList
							yamapList={yamapList.data ?? []}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
