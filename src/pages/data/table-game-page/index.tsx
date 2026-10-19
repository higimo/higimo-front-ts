import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TableGameList } from 'components/data/table-game-list'
import { TableGameType } from 'api-types/table-game.types'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/route/API_ROUTE'

export const TableGamePage: FunctionComponent = () => {
	const [ gameList ] = useApi<TableGameType[]>(API_ROUTE.tableGame)

	return (
		<Layout title="Настольные игры">
			<TextContainer>
				<h1>У меня есть такие настольные игры</h1>
			</TextContainer>

			<LoadSuspense data={gameList}>
				<EmptyData data={gameList}>
					<TableGameList
						gameList={gameList.data ?? []}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
