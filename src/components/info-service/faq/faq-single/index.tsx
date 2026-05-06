import { FunctionComponent } from 'preact'
import { FaqType } from 'api-types/faq.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

export const FaqSingle: FunctionComponent = () => {
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
			<TextContainer>
				<h1>{currentElement.name}</h1>
			</TextContainer>
			<TextContainer>
				<div
					className="container"
					dangerouslySetInnerHTML={{__html: currentElement.text}}
				/>
			</TextContainer>
		</div>
	)
}
