import { CinemaType } from 'api-types/cinema.types'
import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type CinemaScriptListPropsType = {
	cinemaList: CinemaType[] | null
}

export const CinemaScriptList: FunctionComponent<CinemaScriptListPropsType> = ({
	cinemaList
}) => cinemaList && (
	<TextContainer>
		<p>
			Иногда, я встречаю кусочки в сценариях, которые поразили меня в самое сердце.
			Это не значит, что я с ними согласен. Это значит, что я не равнодушен к ним.
		</p>
		<ul>
			{cinemaList.map(item => (
				<li><a href={ROUTE_LINKS.cinemaScriptDetail({ idcode: item.code })}>{item.title}</a></li>
			))}
		</ul>
	</TextContainer>
)
