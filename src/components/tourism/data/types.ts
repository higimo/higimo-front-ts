import { BasePointType, Coord } from 'utils.type'

// TODO: [LIGHT] Добавить сюда все типы в директории и вынести файл выше

// TODO: [HIGH] Добавить типа "Самые красивые дороги России"
export type YaMapPolygon = {
	type: 'Polygon'
	// TODO: [LIGHT] исправить на Coord
	coordinates: number[][][]
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

