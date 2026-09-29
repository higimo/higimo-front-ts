import { Coord, HexType } from 'utils.type'
import {
	AdmOrkugMoscow,
	Build,
	Castle,
	Church,
	Country,
	DistrictMoscow,
	Landmark,
	Memorial,
	Placefield,
	SimpleMapPoint,
	SubjectFederation,
	Teatre,
	Town,
	TownMoscow,
	YaMapPolygon,
} from 'api-types/tourism.types'

/**
 * Этот файл только для проверки типов
 * Очень важно оставлять console.log(), чтобы TS не ругал неиспользуемые переменные
 */


const coord: Coord = [54, 56]
const color: HexType = '#f0f'

const polygon: YaMapPolygon = {
	type: 'Polygon',
	coordinates: [
		[
			[54, 56],
			[54, 56]
		]
	],
}
console.log(polygon)

const mapPoint: SimpleMapPoint = {
	title: 'Бар',
	color,
	coord,
}
console.log(mapPoint)

const countries: Country[] = [
	{ // С описанием
		type: 'страна',
		title: 'Абхазия',
		color,
		coord,
		population: 41,
		visited: false,
		description: 'ewfe'
	},
	{ // Без описания
		type: 'страна',
		title: 'Россия',
		color,
		coord,
		population: 41,
		visited: true,
	},
	// Перечисление всех вариантов
	{ title: 'Россия', type: 'страна', color, coord, population: 41, visited: true, },
	{ title: 'Абхазия', type: 'страна', color, coord, population: 41, visited: true, },
	{ title: 'Эстония', type: 'страна', color, coord, population: 41, visited: true, },
]
console.log(countries)


const subjectFederation: SubjectFederation[] = [
	{ // С описанием
		type: 'область',
		title: 'Ниждегородская область',
		centerCity: 'Нижний Новгород',
		color,
		area: 4141,
		population: 310,
		okato: 130,
		inside: '42 муниципальных района, 10 городских округов',
		country: 'Россия',
		coord,
		visited: false,
		description: 'Описание'
	},
	{ // Без описания
		type: 'область',
		title: 'Ниждегородская область',
		centerCity: 'Нижний Новгород',
		color,
		area: 4141,
		population: 310,
		okato: 130,
		inside: '42 муниципальных района, 10 городских округов',
		country: 'Россия',
		coord,
		visited: false,
	},
	// Проверка всех типов
	{ type: 'область', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
	{ type: 'автономная область', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
	{ type: 'автономный округ', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
	{ type: 'город федерального значения', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
	{ type: 'край', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
	{ type: 'республика', title: '', centerCity: '', color: '#', area: 1, population: 1, okato: 1, inside: '', country: 'Россия', coord, visited: false },
]
console.log(subjectFederation)

const admOrkugMoscow: AdmOrkugMoscow[] = [
	{ // С описанием
    	type: 'административный округ Москвы',
		title: 'ЗАО',
		coord,
    	country: 'Россия',
    	area: 12,
    	population: 100,
		color,
		description: 'desr',
		visited: true,
	},
	{ // Без описания
    	type: 'административный округ Москвы',
		title: 'ЗАО',
		coord,
    	country: 'Россия',
    	area: 12,
    	population: 100,
		color,
		visited: true,
	},
]
console.log(admOrkugMoscow)

const townMoscow: TownMoscow[] = [
	{
		type: 'поселение Москвы',
		title: 'Внуковское',
		country: 'Россия',
		coord,
    	area: 1,
    	population: 1,
		color,
		description: 'desr',
		visited: true,
	}
]
console.log(townMoscow)

const districtMoscow: DistrictMoscow[] = [
	{
    	type: 'район Москвы',
		title: 'Арбат',
    	country: 'Россия',
		coord,
    	moscowOkrug: 'Центральный административный округ',
		color,
		description: 'desr',
		visited: true,
	}
]
console.log(districtMoscow)

const castle: Castle[] = [
	{
		type: 'вымерший город', // | 'крепость' | 'каньон' | 'парк' | 'монастырь' | 'каменоломни',
		title: 'Гоор',
		city: 'Гоор', // ?: string | undefined,
		coord,
		color,
		description: 'desr',
		population: 1,
		visited: true,
		country: 'Россия',
		region: 'Дагестан',
		okrug: 'Округ', // ?: string
		nearMoscow: true
	}
]
console.log(castle)

const town: Town[] = [
	{
		type: 'округ Москвы', // | 'город' | 'деревня' | 'ЗАТО',
		title: 'aaa',
		coord,
		color,
		description: 'desr',
		visited: true,
		population: 1,
		country: 'Россия',
		region: 'Москва',
		nearMoscow: true,
	}
]
console.log(town)

const teatre: Teatre[] = [
	{
		country: 'Россия',
		type: 'театр',
		title: 'aaa',
		coord,
		description: 'desr',
		visited: true,
		region: 'Нижегородская область',
	}
]
console.log(teatre)

const build: Build[] = [
	{
		country: 'Россия',
		type: 'здание',
		title: 'aaa',
		coord,
		description: 'desr',
		visited: true,
		region: 'Нижегородская область',
	}
]
console.log(build)

const landmark: Landmark[] = [
	{
		country: 'Россия',
		title: 'aaa',
		coord,
		type: 'достопримечательность',
		description: 'desr',
		visited: true,
		region: 'Нижегородская область',
	}
]
console.log(landmark)

const church: Church[] = [
	{
		country: 'Россия',
		type: 'церковь',
		title: 'aaa',
		coord,
		description: 'desr',
		visited: true,
		region: 'Нижегородская область',
	}
]
console.log(church)

const memorial: Memorial[] = [
	{
		country: 'Россия',
		type: 'памятник',
		title: 'aaa',
		coord,
		description: 'desr',
		visited: true,
		region: 'Нижегородская область',
	}
]
console.log(memorial)

const placefield: Placefield[] = [
	{
		type: 'местечко',
		title: 'aaa',
		coord,
		country: 'Россия',
		nearMoscow: true,
		color,
		visited: true,
	}
]
console.log(placefield)
