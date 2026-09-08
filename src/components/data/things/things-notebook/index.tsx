import { FunctionComponent } from 'preact'
import { ThingsApiType } from 'api-types/json-api.types'

import { TextContainer } from 'components/ui/text-container'

type ThingsNotebookPropsType = {
	data: ThingsApiType[]
}

export const ThingsNotebook: FunctionComponent<ThingsNotebookPropsType> = ({ data }) => (
	<TextContainer>
		<h1>Ноутбук</h1>
		<p>Ультрабук ASUS ZenBook S UX391UA-ET084T</p>
		<table>
			<tbody>
				{data.map(([label, value], i) => (
					<tr key={i}><td>{label}</td><td>{value}</td></tr>
				))}
			</tbody>
		</table>
	</TextContainer>
)
