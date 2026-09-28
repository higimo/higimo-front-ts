import { Fragment, FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TableGame } from 'components/data/table-game'
import { TableGameType } from 'api-types/table-game.types'
import { TextContainer } from 'components/ui/text-container'

import { API_ROUTE } from 'dic/API_ROUTE'

export const GamePage: FunctionComponent = () => {
	const [ games ] = useApi<TableGameType[]>(API_ROUTE.tableGame)

	return (
		<Layout title="Настольные игры">
			<Fragment>
				<TextContainer>
					<h1>У меня есть такие настольные игры</h1>
				</TextContainer>

				<LoadSuspense data={games}>
					<EmptyData data={games}>
						<TableGame games={games.data} />
					</EmptyData>
				</LoadSuspense>
			</Fragment>
		</Layout>
	)
}
