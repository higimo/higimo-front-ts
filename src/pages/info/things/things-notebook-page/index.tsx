import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { ThingsNotebook } from 'components/data/things/things-notebook/ThingsNotebook'
import { TextContainer } from 'components/ui/text-container'

export const ThingsNotebookPage: FunctionComponent = () => {
	usePageTitle('Ноутбук')

	return (
		<TextContainer>
			<ThingsNotebook />
		</TextContainer>
	)
}
