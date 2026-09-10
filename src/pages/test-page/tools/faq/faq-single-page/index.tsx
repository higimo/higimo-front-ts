import { FaqType } from 'api-types/faq.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { FaqSingle } from 'components/info-service/faq/faq-single'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const FaqSinglePage: FunctionComponent = () => {
	const { params: { idcode = ''} } = useRoute()
	const [ faqDetail ] = useApi<FaqType>(API_ROUTE.faqSingle({ idcode }))
	const isLoading = useLoadingState([faqDetail.status])
	const isListEmpty = useEmptyDataState(faqDetail.data)

	const currentElement = faqDetail.data

	usePageTitle(currentElement?.name, 'FAQ')

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="faq-page">
			<FaqSingle faq={faqDetail.data} />
		</div>
	)
}
