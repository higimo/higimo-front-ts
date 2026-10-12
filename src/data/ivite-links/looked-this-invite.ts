import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const LOOKED_THIS_INVITE: LinkDataType[] = [
	{
		title: 'Сериалы',
		href: EXTERNAL_LINK.aboutMyshows,
		description: '',
	},
	{
		title: 'Кино',
		href: EXTERNAL_LINK.aboutKinopoisk,
		description: '',
	},
	{
		title: 'Аниме',
		href: EXTERNAL_LINK.aboutAnime,
		description: '',
	},
	{
		title: 'Книги',
		href: EXTERNAL_LINK.aboutLivelib,
		description: '',
	},
	{
		title: 'Домашняя библиотека',
		href: ROUTE_LINK.libraryIndex,
		description: '',
	},
	{
		title: 'Я.Музыка',
		href: EXTERNAL_LINK.aboutMusic,
		description: '',
	},
	{
		title: 'Википедия',
		href: EXTERNAL_LINK.aboutWiki,
		description: '',
	},
] as const
