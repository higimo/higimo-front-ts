import { BasePointType, Coord, HexType, KeyOf, ValueOf } from 'utils.type'
// TODO: [HIGH] Добавить типа "Самые красивые дороги России"



/*******************************
 * Словари
 *******************************/

type CountryTitle = 'Россия' | 'Абхазия' | 'Эстония'

/*******************************
 * Расширяющие типы
 *******************************/
/**
 * Флаг посещённости
 */
interface PoiVisited {
	visited: boolean
}
/**
 * Цвет точки на карте
 */
interface PoiColor {
	color: HexType
}
/**
 * Описания точки интереса
 */
interface PoiDescription {
	description?: string
}
/**
 * Указание страны
 */
interface PoiCountry {
	country: CountryTitle
}
/**
 * Флаг возле Москвы
 */
interface PoiNearMoscow {
	nearMoscow: boolean
}

/*******************************
 * Простые типы
 *******************************/
export interface YaMapPolygon {
	type: 'Polygon'
	coordinates: Coord[][]
}

export interface SimpleMapPoint extends PoiColor {
	coord: Coord
	title: string
	color: HexType
}

/*******************************
 * Сложные расширения
 *******************************/

interface GlobalAdministrativePosition extends PoiCountry, PoiNearMoscow {
	region: string
	okrug?: string
}

interface RussianAdmPosition {
	region: string
	okrug?: string
}

/*******************************
 * Типы Place Of Interest POI
 *******************************/

export interface Country extends BasePointType, PoiDescription, PoiColor, PoiVisited {
	type: 'страна'
	title: CountryTitle
	country?: never
	region?: never
	okrug?: never
	city?: never
	/**
	 * В тысячах
	 */
	population: number
}
export interface SubjectFederation extends BasePointType, PoiDescription, PoiColor, PoiVisited {
	type: 'республика' | 'край' | 'область' | 'город федерального значения' | 'автономная область' | 'автономный округ'
	country: 'Россия'
	centerCity: string
	/**
	 * Квадратные километры
	 */
	area: number
	/**
	 * В тысячах
	 */
	population: number
	/**
	 * Номер ОКАТО
	 */
	okato: number
	/**
	 * Какие административные единицы содержит
	 */
	inside: string
}
export interface AdmOrkugMoscow extends BasePointType, PoiDescription, PoiColor, PoiVisited {
	type: 'административный округ Москвы'
	country: 'Россия'
	area: number
	population: number
}
export interface TownMoscow extends BasePointType, PoiDescription, PoiColor, PoiVisited {
	type: 'поселение Москвы'
	country: 'Россия'
	/**
	 * Квадратные километры
	 */
	area: number
	/**
	 * В тысячах
	 */
	population: number
}
export interface DistrictMoscow extends BasePointType, PoiDescription, PoiColor, PoiVisited {
	type: 'район Москвы'
	country: 'Россия'
	moscowOkrug: string
	population?: never
}
export interface Castle extends BasePointType, PoiDescription, PoiColor, PoiVisited, GlobalAdministrativePosition {
	type: 'вымерший город' | 'крепость' | 'каньон' | 'парк' | 'монастырь' | 'каменоломни'
	city?: string
	population: number
}
export interface Town extends BasePointType, PoiDescription, PoiColor, PoiVisited, GlobalAdministrativePosition {
	type: 'округ Москвы' | 'город' | 'деревня' | 'ЗАТО'
	population: number
}
export interface Teatre extends BasePointType, PoiDescription, PoiVisited, PoiCountry, RussianAdmPosition {
	type: 'театр'
	population?: never
}
export interface Build extends BasePointType, PoiDescription, PoiVisited, PoiCountry, RussianAdmPosition {
	type: 'здание'
	population?: never
}
export interface Landmark extends BasePointType, PoiDescription, PoiVisited, PoiCountry, RussianAdmPosition {
	type: 'достопримечательность'
	population?: never
}
export interface Church extends BasePointType, PoiDescription, PoiVisited, PoiCountry, RussianAdmPosition {
	type: 'церковь'
	population?: never
}
export interface Memorial extends BasePointType, PoiDescription, PoiVisited, PoiCountry, RussianAdmPosition {
	type: 'памятник'
	population?: never
}
export interface Placefield extends BasePointType, PoiColor, PoiVisited, PoiCountry, PoiNearMoscow {
	type: 'местечко'
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










// TODO: [MIDDLE] перебрать, это здесь не должно находиться
export const BAR_COLOR_MAPPING = {
	'Не посещал': '#F9FAFB',
	'Любимый': '#DC615C',
	'Хорошо': '#47935A',
	'Обычно': '#939EAA',
} as const
export const barColor = (mood: KeyOf<typeof BAR_COLOR_MAPPING>): ValueOf<typeof BAR_COLOR_MAPPING> => BAR_COLOR_MAPPING[mood]

// TODO: [BACKEND] Эту группировку унести на бекенд
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

// TODO: Вынести в утилиты
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
	// TODO: [MIDDLE] сделать нормальные типы тегов сразу
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
