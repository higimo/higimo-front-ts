import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { CinemaScriptList } from 'components/data/cinema/cinema-script-list'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/route/API_ROUTE'

export const CinemaListPage: FunctionComponent = () => {
	// TODO: [BACKEND] перевести на markdown API
	const [ cinemaList ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)

	return (
		<Layout title="Кино" className="cinema-page">
			<TextContainer>
				<h1>Я и фильмы</h1>
			</TextContainer>

			<TextContainer>
				<h2>Коллекция сценариев</h2>
			</TextContainer>

			<TextContainer>
				<p>
					Иногда, я встречаю кусочки в сценариях, которые поразили меня в самое сердце.
					Это не значит, что я с ними согласен. Это значит, что я не равнодушен к ним.
				</p>
				<LoadSuspense data={cinemaList}>
					<EmptyData data={cinemaList}>
						<CinemaScriptList
							cinemaList={cinemaList.data ?? []}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				{/* TODO: [BACKEND] показать оценки фильмов и аниме */}
				Однажды, я выведу здесь оценки фильмов
			</TextContainer>
		</Layout>
	)
}
