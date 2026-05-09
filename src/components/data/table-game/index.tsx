import { FunctionComponent } from 'preact'
import { TableGameType } from 'api-types/table-game.types'

import { TextContainer } from 'components/ui/text-container'

import './style.css'

type TableGamePropsType = {
	games: TableGameType[]
}

export const TableGame: FunctionComponent<TableGamePropsType> = ({ games }) => (
	<TextContainer>
		{games.map(({ id, name, text }) => (
			<div key={id} className="game-gallery__item">
				<div className="game-gallery__name">{name}</div>
				<div className="game-gallery__text" dangerouslySetInnerHTML={{ __html: text}} />
			</div>
		))}
	</TextContainer>
)
