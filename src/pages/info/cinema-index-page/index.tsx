import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { CinemaScriptList } from 'components/data/cinema/cinema-index'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const CinemaIndexPage: FunctionComponent = () => {
	// TODO: [BACKEND] перевести на markdown API
	const [ cinemaList ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)

	return (
		<Layout title="Кино" className="cinema-page">
			<TextContainer>
				<h1>Я и фильмы</h1>
			</TextContainer>

			<TextContainer>
				<h2><a href={ROUTE_LINKS.cinemaScriptIndex}>Сценарии</a></h2>
			</TextContainer>

			<LoadSuspense data={cinemaList}>
				<EmptyData data={cinemaList}>
					<CinemaScriptList cinemaList={cinemaList.data} />
				</EmptyData>
			</LoadSuspense>

			<TextContainer>
				{/* TODO: [BACKEND] показать оценки фильмов и аниме */}
				Однажды, я выведу здесь оценки фильмов
			</TextContainer>
		</Layout>
	)
}
