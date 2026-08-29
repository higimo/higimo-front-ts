import { Fragment, FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TableGame } from 'components/data/table-game'
import { TableGameType } from 'api-types/table-game.types'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const GamePage: FunctionComponent = () => {
	usePageTitle('Настольные игры')

	const [ games ] = useApi<TableGameType[]>(API_ROUTE.tableGame)
	const isLoading = useLoadingState([games.status])
	const isListEmpty = useEmptyDataState(games.data)

	// TODO: [MEDIUM] вынести в компонент DataWrapper,
	// который показывает потомка,
	// или ошибки если условия выполнены.
	// В него же можно внедрить usePageTitle
	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<Fragment>
			<TextContainer>
				<h1>У меня есть такие настольные игры</h1>
			</TextContainer>
			<TableGame games={games.data} />
		</Fragment>
	)
}
