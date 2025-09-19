import { FunctionComponent } from 'preact'
import { FaqType } from 'types'

import useApi, { API_STATUS } from 'hook/use-api'

import { Loading } from 'components/ui/loading'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { API_ROUTE } from 'dic/api-route'
import { NotFoundData } from 'components/ui/not-found-data'

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
