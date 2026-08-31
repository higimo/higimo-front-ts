import { FunctionComponent, h } from 'preact'

type ListRendererPropsType = {
	items: string[]
}

export const ListRenderer: FunctionComponent<ListRendererPropsType> = ({ items }) => (
	<ul>
		{items.map((item, idx) => h(
			'li',
			{
				key: idx,
				dangerouslySetInnerHTML: { __html: item },
			}
		))}
	</ul>
)
