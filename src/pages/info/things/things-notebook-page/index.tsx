import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { ThingsNotebook } from 'components/data/things/things-notebook'

export const ThingsNotebookPage: FunctionComponent = () => {
	const [ thingJsonData ] = useJsonApi<ThingsApiType[]>('/json/things/things-notebook.json')

	return (
		<Layout title="Ноутбук">
			<LoadSuspense data={thingJsonData}>
				<EmptyData data={thingJsonData}>
					<ThingsNotebook thingJsonData={thingJsonData.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
