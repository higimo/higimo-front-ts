import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ObuchenieDetail } from 'components/obuchenie/obuchenie-detail'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const ObuchenieDetailPage: FunctionComponent = () => {
	const { params: { idcode = DEFAULT_ID } } = useRoute()

	const [ lectionItem ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode: idcode }))

	return (
		<Layout title={lectionItem.data?.name || 'Обучение'} className="obuchenie-page">
			<LoadSuspense data={lectionItem}>
				<EmptyData data={lectionItem}>
					<ObuchenieDetail
						lectionItem={lectionItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
