import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { ThingsNotebook } from 'components/data/things/things-notebook'
import { TextContainer } from 'components/ui/text-container'
import { useJsonApi } from 'hook/use-json-api'
import { Loading } from 'components/ui/loading'

export const ThingsNotebookPage: FunctionComponent = () => {
	usePageTitle('Ноутбук')

	// TODO: вынести в отдельный тип
	const data = useJsonApi<[string, string][]>('/json/things/things-notebook.json')

	if (data === null) {
		return <Loading />
	}

	return (
		<TextContainer>
			<ThingsNotebook data={data} />
		</TextContainer>
	)
}
