import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'
import { TourismWalkItem } from 'components/tourism/tourism-walk-item'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../tourism-style.css'

export const TourismWalkSinglePage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)

	const element = yamapList.data.find(item => item.code === idcode)
	usePageTitle(element?.name || 'Карта прогулки')

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
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
				<TourismWalkGallery
					yamapList={yamapList.data}
				/>
			</TextContainer>
		</div>
	)
}
