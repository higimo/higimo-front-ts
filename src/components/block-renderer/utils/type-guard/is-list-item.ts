import { ListItem } from 'components/block-renderer/types'

export const isListItem = (item: string | ListItem): item is ListItem => {
	return typeof item !== 'string' && 'text' in item
}
