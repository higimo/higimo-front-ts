import { FunctionComponent } from "preact";

import { Loading } from 'components/ui/loading'
import { NotFoundData } from "components/ui/not-found-data";
import { API_ROUTE } from "dic/api-route";
import { ROUTE_LINKS } from "dic/ROUTE_LINKS";
import useApi, { API_STATUS } from "hook/use-api";
import { CinemaType } from "types";

export const ScriptList: FunctionComponent = () => {
	const [ cinema ] = useApi<CinemaType>(API_ROUTE.cinemaShort)

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(cinema.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === cinema.status && !cinema.data.length) {
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
