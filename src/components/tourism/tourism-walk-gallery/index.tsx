import { YaMapType } from '../../../types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { NotFoundData } from 'components/ui/not-found-data'
import { Loading } from 'components/ui/loading'

import { API_ROUTE } from 'dic/api-route'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import 'pages/tourism/tourism-style.css'
import './style.css'

export const TourismWalkGallery = () => {
	const [ yamapList ] = useApi<YaMapType>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)
			
	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="tourism-walk-gallery">
			<h3>Конструктор карт</h3>
			<ul className="tourism-walk-gallery__list">
				{yamapList.data.map(item => (
					<li className="tourism-walk-gallery__item">
						<a href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}>
							{item.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
