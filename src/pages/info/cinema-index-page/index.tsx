import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { CinemaScriptList } from 'components/data/cinema/cinema-index'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const CinemaIndexPage: FunctionComponent = () => {
	usePageTitle('Кино')

	// TODO: [BACKEND] перевести на markdown API
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
				<h1>Я и фильмы</h1>
			</TextContainer>

			<TextContainer>
				<h2><a href={ROUTE_LINKS.cinemaScriptIndex}>Сценарии</a></h2>
			</TextContainer>

			<CinemaScriptList scripts={cinema.data} />

			<TextContainer>
				{/* TODO: [BACKEND] показать оценки фильмов и аниме */}
				Однажды, я выведу здесь оценки фильмов
			</TextContainer>
		</div>
	)
}
