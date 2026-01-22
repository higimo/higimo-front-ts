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

import { usePageTitle } from 'hook/use-page-title'

export const CinemaScriptDetail: FunctionComponent = () => {
	const { params: { idcode }} = useRoute()
	const [ cinemaDetail ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))
	const isLoading = useLoadingState([cinemaDetail.status])
	const isListEmpty = useEmptyDataState(cinemaDetail.data)

	const currentCinema = cinemaDetail.data as unknown as CinemaType

	// console.log({
	// 	few: cinemaDetail.status,
	// 	isLoading,
	// 	isListEmpty
	// })

	usePageTitle(currentCinema.title || 'Кино')

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<TextContainer>
			<h1>Из фильма «{currentCinema.title}»</h1>
			<div
				dangerouslySetInnerHTML={{__html: currentCinema.text}}
			/>
		</TextContainer>
	)
}
