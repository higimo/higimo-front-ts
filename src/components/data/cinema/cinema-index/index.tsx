import { FunctionComponent } from 'preact'


import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { TextContainer } from 'components/ui/text-container'
import { ScriptList } from '../script-list'

export const CinemaIndex: FunctionComponent = () => (
	<TextContainer>
		<h2><a href={ROUTE_LINKS.cinemaScriptIndex}>Сценарии</a></h2>
		<ScriptList />
	</TextContainer>
)
