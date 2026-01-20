import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { ScriptList } from 'components/data/cinema/script-list'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const CinemaIndex: FunctionComponent = () => (
	<TextContainer>
		<h2><a href={ROUTE_LINKS.cinemaScriptIndex}>Сценарии</a></h2>
		<ScriptList />
	</TextContainer>
)
