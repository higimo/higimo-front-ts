import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { CinemaScriptDetail } from 'components/data/cinema/cinema-script-detail'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const CinemaSinglePage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID }} = useRoute()
	const [ cinemaDetail ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))

	return (
		<Layout title={cinemaDetail.data.title || 'Кино'} className="cinema-page">
			<LoadSuspense data={cinemaDetail}>
				<EmptyData data={cinemaDetail}>
					<CinemaScriptDetail cinemaScript={cinemaDetail.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
