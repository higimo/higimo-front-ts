import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ObuchenieSingle } from 'components/obuchenie/obuchenie-single'
import { LectionType } from 'api-types/lection.types'
import { Loading } from 'components/ui/loading'
import { API_ROUTE } from 'dic/API_ROUTE'
import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { NotFoundPage } from 'pages/not-found-page'
import { useRoute } from 'preact-iso'


export const ObuchenieSinglePage: FunctionComponent = () => {
	usePageTitle('Обучение')
	const { params: { idcode } } = useRoute()
	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode }))
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
