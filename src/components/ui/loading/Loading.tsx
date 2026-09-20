import { FunctionComponent } from 'preact'

import { TextContainer } from 'components/ui/text-container'

export const Loading: FunctionComponent = () => (
	<TextContainer className="loading">
		Загружаю…
	</TextContainer>
)
