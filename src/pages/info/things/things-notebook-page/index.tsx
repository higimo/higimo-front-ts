import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ThingsNotebook } from 'components/data/things/things-notebook'

export const ThingsNotebookPage: FunctionComponent = () => {
	usePageTitle('Ноутбук')

	const [ data ] = useJsonApi<ThingsApiType[]>('/json/things/things-notebook.json')
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}
	if (isError) {
		return <NotFoundData />
	}

	return (
		<ThingsNotebook data={data.data} />
	)
}
