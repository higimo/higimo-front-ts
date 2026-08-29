import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const ScriptList: FunctionComponent = () => {
	// TODO: унести в page
	const [ cinema ] = useApi<CinemaType[]>(API_ROUTE.cinemaShort)
	const isLoading = useLoadingState([cinema.status])
	const isListEmpty = useEmptyDataState(cinema.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<ul>
			{cinema.data.map(item => (
				<li><a href={ROUTE_LINKS.cinemaScriptDetail({ idcode: item.code })}>{item.title}</a></li>
			))}
		</ul>
	)
}
