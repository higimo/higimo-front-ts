import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { ObuchenieSingle } from 'components/obuchenie/obuchenie-single'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ObuchenieSinglePage: FunctionComponent = () => {
	usePageTitle('Обучение')

	const { params: { idcode } } = useRoute()
	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode: idcode || '' }))
	const isLoading = useLoadingState([lectionDetail.status])
	const isListEmpty = useEmptyDataState(lectionDetail.data)

	const currentLection = lectionDetail.data
	usePageTitle(currentLection.name)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="obuchenie-page">
			<ObuchenieSingle lection={lectionDetail.data} />
		</div>
	)
}
