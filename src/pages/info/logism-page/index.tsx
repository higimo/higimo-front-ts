import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { LogismGallery } from 'components/logism/logism'
import { LogismType } from 'api-types/logism.types'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LogismPage: FunctionComponent = () => {
	usePageTitle('Логизмы')

	const [ logismList ] = useApi<LogismType[]>(API_ROUTE.logism)
	const isLoading = useLoadingState([logismList.status])
	const isListEmpty = useEmptyDataState(logismList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<LogismGallery logisms={logismList.data} />
	)
}
