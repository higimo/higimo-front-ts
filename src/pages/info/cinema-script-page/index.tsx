import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { CinemaScriptList } from 'components/data/cinema/cinema-index'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const CinemaScriptPage: FunctionComponent = () => {
	const [ cinemaList ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)

	return (
		<Layout title="Кино" className="cinema-page">
			<TextContainer>
				<h1>Коллекция сценариев</h1>
			</TextContainer>

			<LoadSuspense data={cinemaList}>
				<EmptyData data={cinemaList}>
					<CinemaScriptList cinemaList={cinemaList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
