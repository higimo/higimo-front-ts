import { FunctionComponent } from 'preact'

import { ThingsNotebook } from 'components/data/things/things-notebook/ThingsNotebook'
import { TextContainer } from 'components/ui/text-container'

export const ThingsNotebookPage: FunctionComponent = () => {
	document.title = 'Ноутбук'

	return (
		<TextContainer>
			<ThingsNotebook />
		</TextContainer>
	)
}
