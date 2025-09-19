import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'
import { ThingsIndex } from 'components/data/things/things-index/ThingsIndex'

export const ThingsIndexPage: FunctionComponent = () => {
	document.title = 'Мои вещи'

	return (
		<TextContainer>
			<h1>Мои вещи</h1>
			<ThingsIndex />
		</TextContainer>
	)
}
