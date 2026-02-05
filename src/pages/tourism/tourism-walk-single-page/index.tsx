import { FunctionComponent } from 'preact'
import { YaMapType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { TourismWalkItem } from 'components/tourism/tourism-walk-item'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

import '../tourism-style.css'

export const TourismWalkSinglePage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)

	const element = yamapList.data.find(item => item.code === idcode)
	usePageTitle(element.name || 'Карта прогулки')

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
				<h1>{element.name}</h1>
			</TextContainer>
			<TourismWalkItem map={element.map} />
			<TextContainer>
				<h2>Другие карты</h2>
				<TourismWalkGallery />
			</TextContainer>
		</div>
	)
}
