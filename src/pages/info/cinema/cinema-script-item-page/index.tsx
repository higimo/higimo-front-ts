import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { CinemaScriptItem } from 'components/data/cinema/cinema-script-item'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const CinemaScriptItemPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID }} = useRoute()
	const [ cinemaItem ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))

	return (
		<Layout title={cinemaItem.data?.title || 'Кино'} className="cinema-page">
			<LoadSuspense data={cinemaItem}>
				<EmptyData data={cinemaItem}>
					<CinemaScriptItem
						key={cinemaItem.data?.id ?? DEFAULT_ID}
						cinemaItem={cinemaItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
