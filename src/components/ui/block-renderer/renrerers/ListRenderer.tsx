import { FunctionComponent, h } from 'preact'
import { ListBlock, ListItemBlock } from 'components/ui/block-renderer/types'

import { useMemo } from 'preact/hooks'

import { ListItemRenderer } from 'components/ui/block-renderer/renrerers/ListItemRenderer'

import { isListItem } from 'utils/types/is-list-item'

export const ListRenderer: FunctionComponent<ListBlock> = ({ ordered, items }) => {
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
		listItems.map((item, key) =>
			<ListItemRenderer key={key} item={item} />
		)
	)
}
