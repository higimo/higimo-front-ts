import { FunctionComponent } from 'preact'
import { TableGameType } from 'api-types/table-game.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const TableGame: FunctionComponent = () => {
	const [ games ] = useApi<TableGameType[]>(API_ROUTE.tableGame)
	const isLoading = useLoadingState([games.status])
	const isListEmpty = useEmptyDataState(games.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<TextContainer>
			{games.data.map(({ id, name, text }) => (
				<div key={id} className="game-gallery__item">
					<div className="game-gallery__name">{name}</div>
					<div className="game-gallery__text" dangerouslySetInnerHTML={{ __html: text}} />
				</div>
			))}
		</TextContainer>
	)
}
