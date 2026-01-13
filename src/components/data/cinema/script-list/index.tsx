import { FunctionComponent } from 'preact';
import { CinemaType } from 'types';

import useApi from 'hook/use-api';
import { useLoadingState } from 'hook/use-loading-state';
import { useEmptyDataState } from 'hook/use-empty-data-state';

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data';

import { API_ROUTE } from 'dic/api-route';
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS';

export const ScriptList: FunctionComponent = () => {
	const [ cinema ] = useApi<CinemaType>(API_ROUTE.cinemaShort)
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
