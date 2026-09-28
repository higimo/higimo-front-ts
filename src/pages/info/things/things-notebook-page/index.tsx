import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ThingsNotebook } from 'components/data/things/things-notebook'

export const ThingsNotebookPage: FunctionComponent = () => {
	const [ data ] = useJsonApi<ThingsApiType[]>('/json/things/things-notebook.json')

	return (
		<Layout title="Ноутбук">
			<LoadSuspense data={data}>
				<EmptyData data={data}>
				</EmptyData>
			</LoadSuspense>
			<ThingsNotebook data={data.data} />
		</Layout>
	)
}
