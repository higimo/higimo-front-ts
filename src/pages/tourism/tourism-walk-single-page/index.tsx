import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'
import { TourismWalkItem } from 'components/tourism/tourism-walk-item'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../tourism-style.css'

export const TourismWalkSinglePage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)

	const element = yamapList.data.find(item => item.code === idcode)

	return (
		<Layout title={element?.name || 'Карта прогулки'}>
			<div className="tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<TextContainer>
					<TourismHeader main>
						{element?.name}
					</TourismHeader>
				</TextContainer>

				<TourismWalkItem map={element?.map || ''} />

				<TextContainer>
					<TourismHeader secondary>
						Другие карты
					</TourismHeader>
					<LoadSuspense data={yamapList}>
						<EmptyData data={yamapList}>
							<TourismWalkGallery
								yamapList={yamapList.data}
							/>
						</EmptyData>
					</LoadSuspense>
				</TextContainer>
			</div>
		</Layout>
	)
}
