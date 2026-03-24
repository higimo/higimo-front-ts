export const BAR_COLOR_MAPPING = {
	'Не посещал': '#F9FAFB',
	'Любимый': '#DC615C',
	'Хорошо': '#47935A',
	'Обычно': '#939EAA',
} as const
type BarMoodDictType = keyof typeof BAR_COLOR_MAPPING
type BarMoodColorType = typeof BAR_COLOR_MAPPING[keyof typeof BAR_COLOR_MAPPING]
export const barColor = (mood: BarMoodDictType): BarMoodColorType => BAR_COLOR_MAPPING[mood]

export const barTagsCategory = {
	'Отношение': ['Не посещал', 'Любимый', 'Хорошо', 'Обычно'],
	'Алкоголь': ['пиво', 'крафт', 'сидр', 'коктейли', 'настойки', 'минту', 'вино', 'отличный крафт'],
	'Еда': ['еда', 'бургер', 'отличный бургер', 'рёбрышки', 'орешки', 'чай'],
	'Прочее': ['музыка', 'стендап', 'ресторан', 'тусовка', 'интерьер', 'золотые настойки', 'франшиза']
} as const

type BarPovTagType = typeof barTagsCategory[keyof typeof barTagsCategory][number]

const BAR_ICON_MAPPING = {
	'Бар/паб': 'islands#blueBarIcon',
	'Ресторан': 'islands#blueFoodIcon',
	'В сердечке': 'islands#blueHeartIcon',
} as const
type BarIconDictType = keyof typeof BAR_ICON_MAPPING
type BarIconColorType = typeof BAR_ICON_MAPPING[keyof typeof BAR_ICON_MAPPING]

export const barIcon = (barIconName: BarIconDictType): BarIconColorType => BAR_ICON_MAPPING[barIconName]

export type BarPovType = {
	title: string
	type: 'bar-pub' | 'bar' | 'restoran' | 'gastro-pub' | 'cafe'
	link: string,
	coord: [number, number]
	icon: BarIconDictType
	color: BarMoodDictType
	rating?: string
	adress?: string
	description?: string
	tags: BarPovTagType[]
}
