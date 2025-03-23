import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../components/ui/text-container'
import { ScriptList } from '../../../components/data/cinema/script-list'

export const CinemaScriptPage: FunctionComponent = () => {
	document.title = 'Кино'

	return (
		<div className="cinema-page">
			<TextContainer>
				<h1>Сценарии</h1>
				<p>
					Иногда, я&nbsp;встречаю кусочки в&nbsp;сценариях, которые поразили меня в&nbsp;самое сердце.
					Это не&nbsp;значит, что я&nbsp;с&nbsp;ними согласен. Это значит, что я&nbsp;не&nbsp;равнодушен к&nbsp;ним.
				</p>
				<ScriptList />
			</TextContainer>
		</div>
	)
}
