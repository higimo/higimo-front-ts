import { YaMapType } from "../../../types"

import useApi, { API_STATUS } from "hook/use-api"

import { NotFoundData } from "components/ui/not-found-data"

import { Loading } from "components/ui/loading"

import 'pages/tourism/tourism-style.css'
import './style.css'
import { API_ROUTE } from "dic/api-route"
import { ROUTE_LINKS } from "dic/ROUTE_LINKS"

export const TourismWalkGallery = () => {
	const [ yamapList ] = useApi<YaMapType>(API_ROUTE.yamap)
			
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(yamapList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === yamapList.status && !yamapList.data.length) {
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
