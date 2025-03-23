import { Fragment, FunctionComponent } from 'preact'

import { TextContainer } from '../../../components/ui/text-container'
import { TableGame } from '../../../components/data/table-game'

export const GamePage: FunctionComponent = () => {
	document.title = 'Настольные игры'

	return (
		<Fragment>
			<TextContainer>
				<h1>У меня есть такие настольные игры</h1>
			</TextContainer>
			<TableGame />
		</Fragment>
	)
}
