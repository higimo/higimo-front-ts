import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { TextContainer } from 'components/ui/text-container'

type ThingsNotebookPropsType = {
	thingJsonData: ThingsApiType[] | null
}

export const ThingsNotebook: FunctionComponent<ThingsNotebookPropsType> = ({
	thingJsonData
}) => thingJsonData && (
	<TextContainer>
		<h1>Ноутбук</h1>
		<p>Ультрабук ASUS ZenBook S UX391UA-ET084T</p>
		<table>
			<tbody>
				{thingJsonData.map(([label, value], i) => (
					<tr key={i}><td>{label}</td><td>{value}</td></tr>
				))}
			</tbody>
		</table>
	</TextContainer>
)
