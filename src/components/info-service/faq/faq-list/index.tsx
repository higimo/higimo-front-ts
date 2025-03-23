import { FunctionComponent } from 'preact'
import { FaqType } from '../../../../types'

import useApi, { API_STATUS } from '../../../../hook/use-api'

import { NotFoundData } from '../../../ui/not-found-data'
import { Loading } from '../../../accord/accord-single'

import { ROUTE_LINKS } from '../../../../dic/ROUTE_LINKS'
import { API_ROUTE } from '../../../../api-route'

import './style.css'

export const FaqList: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType>(API_ROUTE.faq)
	
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(faqList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === faqList.status && !faqList.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="faq-list">
			{faqList.data.map(({ id, name, code }) => (
				<a href={ROUTE_LINKS.faqDetail({ idcode: code })} className="faq-list__link" key={id}>
					<div className="faq-list__name">{name}</div>
				</a>
			))}
		</div>
	)
}
