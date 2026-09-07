import { FunctionComponent, h } from 'preact'
import { ListBlock, ListItem } from '../types'
import { isListItem } from 'components/block-renderer/type-guard.utils'
import { useMemo } from 'preact/hooks'
import { ListItemRenderer } from './ListItemRenderer'

type ListRendererPropsType = ListBlock

export const ListRenderer: FunctionComponent<ListRendererPropsType> = ({ ordered, items }) => {
	if (items.length === 0) {
		return null
	}

	const listItems: ListItem[] = useMemo(() => items.map(item => {
		if (isListItem(item)) {
			return item
		}
		return {
			text: item
		}
	}), [items])

	return h(
		ordered ? 'ol' : 'ul',
		null,
		listItems.map((item, index) =>
			<ListItemRenderer key={index} item={item} />
		)
	)
}
