import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ObuchenieList } from 'components/obuchenie/obuchenie-list'
import { LectionType } from 'api-types/lection.types'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { API_ROUTE } from 'dic/api-route'
import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'

export const ObuchenieListPage: FunctionComponent = () => {
	usePageTitle('Обучение')

	const [ lectionList ] = useApi<LectionType[]>(API_ROUTE.lection)
	const isLoading = useLoadingState([lectionList.status])
	const isListEmpty = useEmptyDataState(lectionList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="obuchenie-page">
			<ObuchenieList lections={lectionList.data} />
		</div>
	)
}
