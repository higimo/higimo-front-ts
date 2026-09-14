import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const aboutMeList: ToolDataType[] = [
	{
		name: 'сериалы',
		href: EXTERNAL_LINKS.aboutMyshows,
		description: '',
	},
	{
		name: 'кино',
		href: EXTERNAL_LINKS.aboutKinopoisk,
		description: '',
	},
	{
		name: 'аниме',
		href: EXTERNAL_LINKS.aboutAnime,
		description: '',
	},
	{
		name: 'книги',
		href: EXTERNAL_LINKS.aboutLivelib,
		description: '',
	},
	{
		name: 'домашняя библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: '',
	},
] as const
