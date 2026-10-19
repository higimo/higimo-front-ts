import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { LogismList } from 'components/info-service/logism-list'
import { LogismType } from 'api-types/logism.types'

import { API_ROUTE } from 'dic/route/API_ROUTE'

export const LogismPage: FunctionComponent = () => {
	const [ logismList ] = useApi<LogismType[]>(API_ROUTE.logism)

	return (
		<Layout title="Логизмы">
			<LoadSuspense data={logismList}>
				<EmptyData data={logismList}>
					<LogismList
						logismList={logismList.data ?? []}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
