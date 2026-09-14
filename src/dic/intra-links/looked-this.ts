import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const aboutMeList: ToolDataType[] = [
	{
		name: 'Сериалы',
		href: EXTERNAL_LINKS.aboutMyshows,
		description: '',
	},
	{
		name: 'Кино',
		href: EXTERNAL_LINKS.aboutKinopoisk,
		description: '',
	},
	{
		name: 'Аниме',
		href: EXTERNAL_LINKS.aboutAnime,
		description: '',
	},
	{
		name: 'Книги',
		href: EXTERNAL_LINKS.aboutLivelib,
		description: '',
	},
	{
		name: 'Домашняя библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: '',
	},
	{
		name: 'Я.Музыка',
		href: EXTERNAL_LINKS.aboutMusic,
		description: '',
	},
	{
		name: 'Википедия',
		href: EXTERNAL_LINKS.aboutWiki,
		description: '',
	},
] as const
