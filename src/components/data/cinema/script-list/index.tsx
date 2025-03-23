import { FunctionComponent } from "preact";
import { CinemaType } from "../../../../types";

import useApi, { API_STATUS } from "../../../../hook/use-api"

import { Loading } from "../../../accord/accord-single";
import { NotFoundData } from "../../../ui/not-found-data";

import { ROUTE_LINKS } from "../../../../dic/ROUTE_LINKS";
import { API_ROUTE } from "../../../../api-route";

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
