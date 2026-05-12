export type YaMapPolygon = {
	type: 'Polygon'
	coordinates: number[][][]
}

export type HigimoMapPoint = {
	coord: [number, number]
	title: string
	color: `#${string}` // hex
}

// TODO: [HIGH] Точка интереса дороги россии самые красивые
type CountryTitle = 'Россия' | 'Абхазия' | 'Эстония';
interface PovTitle {
	title: string;
}
interface PovCoord {
	coord: [number, number];
}
interface PovVisited {
	visited: boolean;
}
interface PovColor {
	color: `#${string}`;
}
interface PovDescription {
	description?: string;
}
interface GlobalAdministrativePosition {
	country: CountryTitle;
	region: string;
	okrug?: string;
	nearMoscow: boolean;
}
interface RussianAdmPosition {
	region: string;
	okrug?: string;
}
export interface Country extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited {
	type: 'страна';
	title: CountryTitle;
	country?: never;
	region?: never;
	okrug?: never;
	city?: never;
	population: number;
}
export interface SubjectFederation extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited {
	type: 'республика' | 'край' | 'область' | 'город федерального значения' | 'автономный область' | 'автономный округ';
	country: 'Россия';
	centerCity: string;
	area: number;
	population: number;
	okato: number;
	inside: string;
}
export interface AdmOrkugMoscow extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited {
	type: 'административный округ Москвы';
	country: 'Россия';
	area: number;
	population: number;
}
export interface TownMoscow extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited {
	type: 'поселение Москвы';
	country: 'Россия';
	area: number;
	population: number;
}
export interface DistrictMoscow extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited {
	type: 'район Москвы';
	country: 'Россия';
	moscowOkrug: string;
	population?: never;
}
export interface Castle extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited, GlobalAdministrativePosition {
	type: 'вымерший город' | 'крепость' | 'каньон' | 'парк' | 'монастырь' | 'каменоломни';
	city?: string;
	population: number;
}
export interface Town extends PovTitle, PovCoord, PovDescription, PovColor, PovVisited, GlobalAdministrativePosition {
	type: 'округ Москвы' | 'город' | 'деревня' | 'столица' | 'ЗАТО';
	population: number;
}
export interface Teatre extends PovTitle, PovCoord, PovDescription, PovVisited, RussianAdmPosition {
	type: 'театр';
	population?: never;
}
export interface Build extends PovTitle, PovCoord, PovDescription, PovVisited, RussianAdmPosition {
	type: 'здание';
	population?: never;
}
export interface Landmark extends PovTitle, PovCoord, PovDescription, PovVisited, RussianAdmPosition {
	type: 'достопримечательность';
	population?: never;
}
export interface Church extends PovTitle, PovCoord, PovDescription, PovVisited, RussianAdmPosition {
	type: 'церковь';
	population?: never;
}
export interface Memorial extends PovTitle, PovCoord, PovDescription, PovVisited, RussianAdmPosition {
	type: 'памятник';
	population?: never;
	bad: boolean;
}
export interface Placefield extends PovTitle, PovCoord, PovColor, PovVisited {
	type: 'местечко';
	country: CountryTitle;
	nearMoscow: boolean;
}
