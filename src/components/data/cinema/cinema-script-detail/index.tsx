import { FunctionComponent } from 'preact'
import { CinemaType } from 'types'

import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'

export const CinemaScriptDetail: FunctionComponent = () => {
	const { params: { idcode }} = useRoute()
	const [ cinemaDetail ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))
	const isLoading = useLoadingState([cinemaDetail.status])
	const isListEmpty = useEmptyDataState(cinemaDetail.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundPage />
	}

	document.title = cinemaDetail.data[0].title

	return (
		<TextContainer>
			<h1>Из фильма «{cinemaDetail.data[0].title}»</h1>
			<div
				dangerouslySetInnerHTML={{__html: cinemaDetail.data[0].text}}
			/>
		</TextContainer>
	)
}
