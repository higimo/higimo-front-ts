import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const FaqList: FunctionComponent = () => {
	const [ faqList ] = useApi<FaqType[]>(API_ROUTE.faq)
	const isLoading = useLoadingState([faqList.status])
	const isListEmpty = useEmptyDataState(faqList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
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
