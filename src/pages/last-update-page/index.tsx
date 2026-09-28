import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { LastUpdates } from 'components/blog/last-updates'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LastUpdatePage: FunctionComponent = () => {
	const [ newsList ] = useApi<UpdateNewsType[]>(API_ROUTE.updateNews, { limit: 12 })

	return (
		<Layout title="Последние сообщения в блоге">
			<LoadSuspense data={newsList}>
				<EmptyData data={newsList}>
					<LastUpdates
						newsList={newsList.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
