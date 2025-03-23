import { YaMapType } from "../../../types"

import useApi, { API_STATUS } from "../../../hook/use-api"

import { TextContainer } from "../../ui/text-container"
import { NotFoundData } from "../../ui/not-found-data"
import { Loading } from "../../accord/accord-single"

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS"
import { API_ROUTE } from "../../../api-route"

import './style.css'

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
			<TextContainer>
				<div className="tourism-walk-gallery__list">
					{yamapList.data.map(item => (
						<div className="tourism-walk-gallery__item">
							<a href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}>
								{item.name}
							</a>
						</div>
					))}
				</div>
			</TextContainer>
		</div>
	)
}
