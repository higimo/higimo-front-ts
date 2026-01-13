import { ROUTE_LINKS } from 'dic/ROUTE_LINKS';
import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS';

export const aboutMeList = [
	{
		title: 'сериалы',
		url: EXTERNAL_LINKS.aboutMyshows,
	},
	{
		title: 'кино',
		url: EXTERNAL_LINKS.aboutKinopoisk,
	},
	{
		title: 'аниме',
		url: EXTERNAL_LINKS.aboutAnime,
	},
	{
		title: 'книги',
		url: EXTERNAL_LINKS.aboutLivelib,
	},
	{
		title: 'домашняя библиотека',
		url: ROUTE_LINKS.libraryIndex,
	},
] as const