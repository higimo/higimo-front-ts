import { ListItem } from 'components/block-renderer/types'

// TODO: [LIGHT] вынести в отдельный файл функцию, положить в директорию /utils/type-guard/...
// и тогда переоформить тесты
export const isListItem = (item: string | ListItem): item is ListItem => {
	return typeof item !== 'string' && 'text' in item
}
