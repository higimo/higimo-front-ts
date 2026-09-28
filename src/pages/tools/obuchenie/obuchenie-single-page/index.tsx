import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ObuchenieSingle } from 'components/obuchenie/obuchenie-single'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ObuchenieSinglePage: FunctionComponent = () => {
	const { params: { idcode } } = useRoute()

	const [ lectionDetail ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode: idcode || '' }))

	return (
		<Layout title={lectionDetail.data.name || 'Обучение'}>
			<div className="obuchenie-page">
				<LoadSuspense data={lectionDetail}>
					<EmptyData data={lectionDetail}>
						<ObuchenieSingle lection={lectionDetail.data} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
