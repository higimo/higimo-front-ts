import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type CinemaScriptListPropsType = {
	cinemaList: CinemaType[] | null
}

export const CinemaScriptList: FunctionComponent<CinemaScriptListPropsType> = ({
	cinemaList
}) => cinemaList && (
	<ul>
		{cinemaList.map(item => (
			<li key={item.id}>
				<a href={ROUTE_LINK.cinemaScriptDetail({ idcode: item.code })}>{item.title}</a>
			</li>
		))}
	</ul>
)
