import { ListItemBlock } from 'components/block-renderer/types'

export const isListItem = (item: string | ListItemBlock): item is ListItemBlock =>
	typeof item !== 'string' && 'text' in item
