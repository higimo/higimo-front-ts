import { FunctionComponent } from 'preact'
import { PronType } from 'api-types/pron.types'

import { usePageTitle } from 'hook/use-page-title'
import useApi from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'

import { PronIndex } from 'components/info-service/pron'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/API_ROUTE'

export const PronPage: FunctionComponent = () => {
	usePageTitle('pron')
	const [ pronList ] = useApi<PronType[]>(API_ROUTE.pron)
	const isLoading = useLoadingState([pronList.status])
	const isListEmpty = useEmptyDataState(pronList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return <PronIndex prons={pronList.data} />
}
