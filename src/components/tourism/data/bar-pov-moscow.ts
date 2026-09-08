import { Coord, KeyOf, ValueOf } from 'utils.type'

export const BAR_COLOR_MAPPING = {
	'Не посещал': '#F9FAFB',
	'Любимый': '#DC615C',
	'Хорошо': '#47935A',
	'Обычно': '#939EAA',
} as const
export const barColor = (mood: KeyOf<typeof BAR_COLOR_MAPPING>): ValueOf<typeof BAR_COLOR_MAPPING> => BAR_COLOR_MAPPING[mood]

// TODO: [LIGHT] Эту группировку унести на бекенд
export const barTagsCategory = {
	'Отношение': ['Не посещал', 'Любимый', 'Хорошо', 'Обычно'],
	'Алкоголь': ['пиво', 'крафт', 'сидр', 'коктейли', 'настойки', 'минту', 'вино', 'отличный крафт'],
	'Еда': ['еда', 'бургер', 'отличный бургер', 'рёбрышки', 'орешки', 'чай'],
	'Прочее': ['музыка', 'стендап', 'ресторан', 'тусовка', 'интерьер', 'золотые настойки', 'франшиза']
} as const

type BarPovTagType = ValueOf<typeof barTagsCategory>[number]

const BAR_ICON_MAPPING = {
	'Бар/паб': 'islands#blueBarIcon',
	'Ресторан': 'islands#blueFoodIcon',
	'В сердечке': 'islands#blueHeartIcon',
} as const
type BarIconDictType = KeyOf<typeof BAR_ICON_MAPPING>
type BarIconColorType = ValueOf<typeof BAR_ICON_MAPPING>

export const barIcon = (barIconName: BarIconDictType): BarIconColorType => BAR_ICON_MAPPING[barIconName]

export type BarPovType = {
	id: number
	title: string
	type: 'bar-pub' | 'bar' | 'restoran' | 'gastro-pub' | 'cafe'
	link: string,
	coord: Coord
	icon: BarIconDictType
	color: KeyOf<typeof BAR_COLOR_MAPPING>
	rating?: string
	adress?: string
	description?: string
	// TODO: [LIGHT] сделать нормальные типы тегов сразу
	tags: BarPovTagType[]
}

type BarPovRealTagType = {
	id: number
	title: string
}

export type BarPovRealTags = Omit<BarPovType, 'tags'> & {
	tags: BarPovRealTagType[]
}
