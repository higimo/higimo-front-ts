import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container/TextContainer'

export const ThingsNotebookPage: FunctionComponent = () => {
	const [ thingJsonData ] = useJsonApi<ThingsApiType[]>('/json/things/things-notebook.json')

	return (
		<Layout title="Ноутбук">
			<TextContainer>
				<h1>Ноутбук</h1>
				<p>Ультрабук ASUS ZenBook S UX391UA-ET084T</p>
				<LoadSuspense data={thingJsonData}>
					<EmptyData data={thingJsonData}>
						<table>
							<tbody>
								{thingJsonData.data && thingJsonData.data.map(([label, value], key) => (
									<tr key={key}><td>{label}</td><td>{value}</td></tr>
								))}
							</tbody>
						</table>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
