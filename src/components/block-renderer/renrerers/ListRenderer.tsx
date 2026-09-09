import { FunctionComponent, h } from 'preact'
import { ListBlock, ListItemBlock } from 'components/block-renderer/types'

import { useMemo } from 'preact/hooks'

import { ListItemRenderer } from 'components/block-renderer/renrerers/ListItemRenderer'

import { isListItem } from 'components/block-renderer/utils/type-guard/is-list-item'

type ListRendererPropsType = ListBlock

export const ListRenderer: FunctionComponent<ListRendererPropsType> = ({ ordered, items }) => {
	if (items.length === 0) {
		return null
	}

	const listItems: ListItemBlock[] = useMemo(() => items.map(item => {
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
