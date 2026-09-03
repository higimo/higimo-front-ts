import { TextContainer } from 'components/ui/text-container'
import { FunctionComponent } from 'preact'

type ThingsNotebookPropsType = {
	data: [string, string][]
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
