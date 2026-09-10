import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { ObuchenieList } from 'components/obuchenie/obuchenie-list'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ObuchenieListPage: FunctionComponent = () => {
	usePageTitle('Обучение')

	const [ lectionList ] = useApi<LectionType[]>(API_ROUTE.lection)
	const isLoading = useLoadingState([lectionList.status])
	const isListEmpty = useEmptyDataState(lectionList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="obuchenie-page">
			<ObuchenieList lections={lectionList.data} />
		</div>
	)
}
