import { FunctionComponent } from 'preact'
import { UpdateNewsType } from 'api-types/last-update.types'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { LastUpdates } from 'components/intro/last-updates'
import { Loading } from 'components/ui/loading/Loading'
import { NotFoundData } from 'components/ui/not-found-data/NotFoundData'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LastUpdatePage: FunctionComponent = () => {
	usePageTitle('Последние сообщения в блоге')

	const [ newsList ] = useApi<UpdateNewsType[]>(API_ROUTE.updateNews, { limit: 12 })
	const isLoading = useLoadingState([newsList.status])
	const isListEmpty = useEmptyDataState(newsList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<LastUpdates
			newsList={newsList.data}
		/>
	)
}
