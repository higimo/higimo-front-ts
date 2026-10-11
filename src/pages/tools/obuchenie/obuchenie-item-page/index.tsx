import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ObuchenieItem } from 'components/obuchenie/obuchenie-item'

import { API_ROUTE } from 'dic/route/API_ROUTE'

export const ObuchenieItemPage: FunctionComponent = () => {
	const { params: { idcode } } = useRoute()

	const [ lectionItem ] = useApi<LectionType>(API_ROUTE.lectionSingle({ idcode: idcode || '' }))

	return (
		<Layout title={lectionItem.data?.name || 'Обучение'} className="obuchenie-page">
			<LoadSuspense data={lectionItem}>
				<EmptyData data={lectionItem}>
					<ObuchenieItem lectionItem={lectionItem.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
