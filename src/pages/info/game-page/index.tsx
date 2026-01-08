import { Fragment, FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { TextContainer } from 'components/ui/text-container'
import { TableGame } from 'components/data/table-game'

export const GamePage: FunctionComponent = () => {
	usePageTitle('Настольные игры')

	return (
		<Fragment>
			<TextContainer>
				<h1>У меня есть такие настольные игры</h1>
			</TextContainer>
			<TableGame />
		</Fragment>
	)
}
