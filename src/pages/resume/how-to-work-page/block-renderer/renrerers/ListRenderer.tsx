import { FunctionComponent } from 'preact'

type ListRendererPropsType = {
	items: string[]
}

export const ListRenderer: FunctionComponent<ListRendererPropsType> = ({ items }) => (
	<ul>
		{items.map((item, idx) => (
			<li key={idx}>{item}</li>
		))}
	</ul>
)
