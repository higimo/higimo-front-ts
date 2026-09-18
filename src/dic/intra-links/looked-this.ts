import { IntroLinkDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const aboutMeList: IntroLinkDataType[] = [
	{
		title: 'Сериалы',
		href: EXTERNAL_LINKS.aboutMyshows,
		description: '',
	},
	{
		title: 'Кино',
		href: EXTERNAL_LINKS.aboutKinopoisk,
		description: '',
	},
	{
		title: 'Аниме',
		href: EXTERNAL_LINKS.aboutAnime,
		description: '',
	},
	{
		title: 'Книги',
		href: EXTERNAL_LINKS.aboutLivelib,
		description: '',
	},
	{
		title: 'Домашняя библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: '',
	},
	{
		title: 'Я.Музыка',
		href: EXTERNAL_LINKS.aboutMusic,
		description: '',
	},
	{
		title: 'Википедия',
		href: EXTERNAL_LINKS.aboutWiki,
		description: '',
	},
] as const
