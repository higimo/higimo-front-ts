import { FunctionComponent } from 'preact';

import { TextContainer } from 'components/ui/text-container';

import './style.css'

export const NotFoundData: FunctionComponent = () => (
	<TextContainer className="not-found-data">
		Не получилось загрузить данные
	</TextContainer>
)
