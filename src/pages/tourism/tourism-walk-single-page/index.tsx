import { FunctionComponent } from 'preact'
import { YaMapType } from 'types'

import { useRoute } from 'preact-iso'
import useApi, { API_STATUS } from 'hook/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { TourismWalkItem } from 'components/tourism/tourism-walk-item'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../tourism-style.css'
import { Loading } from 'components/ui/loading'
import { API_ROUTE } from 'dic/api-route'
import { NotFoundPage } from 'pages/not-found-page'

export const TourismWalkSinglePage: FunctionComponent = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ yamapList ] = useApi<YaMapType>(API_ROUTE.yamap)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(yamapList.status)) {
		return <Loading />
	}

	if (yamapList.status === API_STATUS.LOADED && !yamapList.data.length) {
		return <NotFoundPage />
	}

	const element = yamapList.data.find(item => item.code === idcode)
	document.title = element.name
	
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
