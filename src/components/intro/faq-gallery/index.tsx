import { FunctionComponent } from 'preact'
import { FaqType } from '../../../types'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { HorizontalMenu } from '../../ui/horizontal-menu'
import { MetroTile } from '../../ui/metro-tile'
import { NotFoundData } from '../../ui/not-found-data'
import { Loading } from '../../accord/accord-single'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../api-route'

import './style.css'

export const FaqGallery: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType>(API_ROUTE.faq, { limit: 6 })
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(faqList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === faqList.status && !faqList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="faq-gallery">
			<h2 className="faq-gallery__header">FAQ</h2>
			<HorizontalMenu className="faq-gallery__gallery">
				{faqList.data.map(({ id, name, code }) => (
					<MetroTile href={ROUTE_LINKS.faqDetail({ idcode: code })} className="faq-gallery__item" key={id}>
						<a href={ROUTE_LINKS.faqDetail({ idcode: code })} className="faq-gallery__link" key={id}>
							<div className="faq-gallery__name">{name}</div>
						</a>
					</MetroTile>
				))}
			</HorizontalMenu>
		</div>
	)
}
