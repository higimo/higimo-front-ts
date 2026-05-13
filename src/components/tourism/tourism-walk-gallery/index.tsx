import { YaMapType } from 'api-types/yamap.types'

import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { TileElement } from 'components/ui/tile-element'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../../../pages/tourism/tourism-style.css'
import './style.css'

export const TourismWalkGallery = () => {
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	const halfList = Math.ceil(yamapList.data.length / 2)

	return (
		<div className="tourism-walk-gallery">
			<TextContainer>
				<h3>Конструктор карт</h3>
			</TextContainer>
			<div className="tourism-walk-gallery__list">
				<div className="tourism-walk-gallery__column">
					{yamapList.data.slice(0, halfList).map(item => (
						<TileElement
							className="tourism-walk-gallery__item"
							href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}
							name={item.name}
							description=""
						/>
					))}
				</div>
				<div className="tourism-walk-gallery__column">
					{yamapList.data.slice(halfList).map(item => (
						<TileElement
							className="tourism-walk-gallery__item"
							href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}
							name={item.name}
							description=""
						/>
					))}
				</div>
			</div>
		</div>
	)
}
