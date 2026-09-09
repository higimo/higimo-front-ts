import { BasePointType, Coord, KeyOf, ValueOf } from 'utils.type'

// TODO: [HIGH] Добавить типа "Самые красивые дороги России"
export type YaMapPolygon = {
	type: 'Polygon'
	coordinates: Coord[][]
}

export type HigimoMapPoint = {
	coord: Coord
	title: string
	color: `#${string}` // hex
}

// TODO: [LIGHT] Перебрать типы
type CountryTitle = 'Россия' | 'Абхазия' | 'Эстония'

interface PovTitle extends BasePointType {
}

interface PovVisited {
	visited: boolean
}
interface PovColor {
	color: `#${string}`
}
interface PovDescription {
	description?: string
}
interface GlobalAdministrativePosition {
	country: CountryTitle
	region: string
	okrug?: string
	nearMoscow: boolean
}
interface RussianAdmPosition {
	region: string
	okrug?: string
}
export interface Country extends PovTitle, PovDescription, PovColor, PovVisited {
	type: 'страна'
	title: CountryTitle
	country?: never
	region?: never
	okrug?: never
	city?: never
	population: number
}
export interface SubjectFederation extends PovTitle, PovDescription, PovColor, PovVisited {
	type: 'республика' | 'край' | 'область' | 'город федерального значения' | 'автономная область' | 'автономный округ'
	country: 'Россия'
	centerCity: string
	area: number
	population: number
	okato: number
	inside: string
}
export interface AdmOrkugMoscow extends PovTitle, PovDescription, PovColor, PovVisited {
	type: 'административный округ Москвы'
	country: 'Россия'
	area: number
	population: number
}
export interface TownMoscow extends PovTitle, PovDescription, PovColor, PovVisited {
	type: 'поселение Москвы'
	country: 'Россия'
	area: number
	population: number
}
export interface DistrictMoscow extends PovTitle, PovDescription, PovColor, PovVisited {
	type: 'район Москвы'
	country: 'Россия'
	moscowOkrug: string
	population?: never
}
export interface Castle extends PovTitle, PovDescription, PovColor, PovVisited, GlobalAdministrativePosition {
	type: 'вымерший город' | 'крепость' | 'каньон' | 'парк' | 'монастырь' | 'каменоломни'
	city?: string
	population: number
}
export interface Town extends PovTitle, PovDescription, PovColor, PovVisited, GlobalAdministrativePosition {
	type: 'округ Москвы' | 'город' | 'деревня' | 'ЗАТО'
	population: number
}
export interface Teatre extends PovTitle, PovDescription, PovVisited, RussianAdmPosition {
	country: CountryTitle
	type: 'театр'
	population?: never
}
export interface Build extends PovTitle, PovDescription, PovVisited, RussianAdmPosition {
	country: CountryTitle
	type: 'здание'
	population?: never
}
export interface Landmark extends PovTitle, PovDescription, PovVisited, RussianAdmPosition {
	country: CountryTitle
	type: 'достопримечательность'
	population?: never
}
export interface Church extends PovTitle, PovDescription, PovVisited, RussianAdmPosition {
	country: CountryTitle
	type: 'церковь'
	population?: never
}
export interface Memorial extends PovTitle, PovDescription, PovVisited, RussianAdmPosition {
	country: CountryTitle
	type: 'памятник'
	population?: never
	bad: boolean
}
export interface Placefield extends PovTitle, PovColor, PovVisited {
	type: 'местечко'
	country: CountryTitle
	nearMoscow: boolean
}

export type PovType =
	| Country
	| SubjectFederation
	| AdmOrkugMoscow
	| TownMoscow
	| DistrictMoscow
	| Castle
	| Town
	| Teatre
	| Build
	| Landmark
	| Church
	| Memorial
	| Placefield


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

export const cityTypes = ['вымерший город', 'округ Москвы', 'город-спутник', 'город', 'деревня', 'ЗАТО'] as const
export const onlyPovTypes = ['крепость', 'каньон', 'парк', 'монастырь', 'каменоломни'] as const
export const subjectPederationTypes = ['республика', 'край', 'область', 'город федерального значения', 'автономный область', 'автономный округ'] as const

export type MoscowMuseumType = {
	name: string
	adress: string
}
