import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { FaqList } from 'components/info-service/faq/faq-list'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

export const FaqListPage: FunctionComponent = props => {
	usePageTitle('Статьи')

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
		<div className="faq-page">
			<FaqList faqs={faqList.data} />
		</div>
	)
}
