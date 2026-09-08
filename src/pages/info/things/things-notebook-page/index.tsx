import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Loading } from 'components/ui/loading'
import { ThingsNotebook } from 'components/data/things/things-notebook'

export const ThingsNotebookPage: FunctionComponent = () => {
	usePageTitle('Ноутбук')

	const data = useJsonApi<ThingsApiType[]>('/json/things/things-notebook.json')

	if (data === null) {
		return <Loading />
	}

	return (
		<ThingsNotebook data={data} />
	)
}
