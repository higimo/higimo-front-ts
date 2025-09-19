import { FunctionComponent } from 'preact';

import './style.css'
import { TextContainer } from '../text-container';

export const NotFoundData: FunctionComponent = () => (
	<TextContainer className="not-found-data">
		Не получилось загрузить данные
	</TextContainer>
)
