import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ObuchenieList } from 'components/obuchenie/obuchenie-list'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ObuchenieListPage: FunctionComponent = () => {
	const [ lectionList ] = useApi<LectionType[]>(API_ROUTE.lection)

	return (
		<Layout title="Обучение" className="obuchenie-page">
			<LoadSuspense data={lectionList}>
				<EmptyData data={lectionList}>
					<ObuchenieList lections={lectionList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
