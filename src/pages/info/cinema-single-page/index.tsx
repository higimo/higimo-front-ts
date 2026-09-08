import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { CinemaScriptDetail } from 'components/data/cinema/cinema-script-detail'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const CinemaSinglePage: FunctionComponent = () => {
	const { params: { idcode }} = useRoute()
	const [ cinemaDetail ] = useApi<CinemaType>(API_ROUTE.cinemaSingle({ idcode }))
	const isLoading = useLoadingState([cinemaDetail.status])
	const isListEmpty = useEmptyDataState(cinemaDetail.data)

	const currentCinema = cinemaDetail.data

	usePageTitle(currentCinema.title || 'Кино')

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="cinema-page">
			<CinemaScriptDetail cinemaScript={cinemaDetail.data} />
		</div>
	)
}
