import { LectionType } from 'types'

import markdownit from 'markdown-it'

import useApi from 'hook/use-api'
import { useRoute } from 'preact-iso'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

export const ObuchenieSingle = () => {
	const { params: { idcode } } = useRoute()
	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode }))
	const isLoading = useLoadingState([lectionDetail.status])
	const isListEmpty = useEmptyDataState(lectionDetail.data)

	const currentLection = lectionDetail.data as unknown as LectionType

	usePageTitle(currentLection.name)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundPage />
	}

	var md = new markdownit({
		html: true,
		linkify: true,
		typographer: true
	})

	return (
		<div className="test">
			<TextContainer>
				<h1>{currentLection.name}</h1>
			</TextContainer>
			<TextContainer>
				<div
					className="container"
					dangerouslySetInnerHTML={{__html: md.render(currentLection.text || '')}}
				/>
			</TextContainer>
		</div>
	)
}
