import { FunctionComponent } from 'preact'
import { PronType } from 'api-types/pron.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { PronIndex } from 'components/info-service/pron'

import { API_ROUTE } from 'dic/API_ROUTE'

export const PronPage: FunctionComponent = () => {
	const [ pronList ] = useApi<PronType[]>(API_ROUTE.pron)

	return (
		<Layout title="pron">
			<LoadSuspense data={pronList}>
				<EmptyData data={pronList}>
					<PronIndex pronList={pronList.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
