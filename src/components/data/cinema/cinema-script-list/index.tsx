import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type CinemaScriptListPropsType = {
	cinemaList: CinemaType[] | null
}

export const CinemaScriptList: FunctionComponent<CinemaScriptListPropsType> = ({
	cinemaList
}) => cinemaList && (
	<ul>
		{cinemaList.map(item => (
			<li><a href={ROUTE_LINK.cinemaScriptDetail({ idcode: item.code })}>{item.title}</a></li>
		))}
	</ul>
)
