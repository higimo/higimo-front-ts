import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { CinemaScriptList } from 'components/data/cinema/cinema-index'
import { Loading } from 'components/ui/loading'
import { NotFoundPage } from 'pages/not-found-page'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const CinemaScriptPage: FunctionComponent = () => {
	usePageTitle('Кино')

	const [ cinema ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)
	const isLoading = useLoadingState([cinema.status])
	const isListEmpty = useEmptyDataState(cinema.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="cinema-page">
			<TextContainer>
				<h1>Коллекция сценариев</h1>
			</TextContainer>
			<CinemaScriptList scripts={cinema.data} />
		</div>
	)
}
