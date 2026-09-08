import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import useApi from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TourismBulletList } from '../tourism-bullet-list'
import { TourismBulletListItem } from '../tourism-bullet-list-item'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../../../pages/tourism/tourism-style.css'

export const TourismWalkGallery: FunctionComponent = () => {
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<TourismBulletList>
			{yamapList.data.map(item => (
				<TourismBulletListItem
					className="tourism-walk-gallery__item"
					href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}
					title={item.name}
				/>
			))}
		</TourismBulletList>
	)
}
