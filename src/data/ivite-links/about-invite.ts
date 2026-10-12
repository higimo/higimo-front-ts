import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const ABOUT_INVITE: LinkDataType[] = [
	{
		title: '☝ Логизмы',
		href: ROUTE_LINK.logism,
		description: 'Цитаты друзей, знаменитостей, чтобы помнить и направлять себя'
	},
	{
		title: 'Мои вещи',
		href: ROUTE_LINK.thingsIndex,
		description: 'Перепись предметов, чтобы не отсматривать их каждый раз'
	},
	{
		title: 'Избранный ютуб',
		href: ROUTE_LINK.youtube,
		description: 'Избранные ссылки'
	},
	{
		title: 'Избранные ссылки',
		href: ROUTE_LINK.links,
		description: 'Ссылки, важнейшее в интернете'
	},
	{
		title: 'Кинолог',
		href: ROUTE_LINK.cinemaIndex,
		description: 'Кусочки сценария, которые меня особенно зацепили. Например, неожиданный фашизм внутри «Звёздного десанта»'
	},
	{
		title: 'Резюме',
		href: ROUTE_LINK.resumeIndex,
		description: 'На случай важных переговоров'
	},
	{
		title: 'Библиотека',
		href: ROUTE_LINK.libraryIndex,
		description: 'Книг многовато, чтобы случайно не купить повтор — переписал их'
	},
	{
		title: 'Оценка городов',
		href: ROUTE_LINK.tourismCityIndex,
		description: 'Города где был, оцениваю по собственной системе'
	},
	{
		title: 'Список желаний',
		href: EXTERNAL_LINK.wishlist,
		description: 'Всё есть, подарков не нужно. Но вдруг когда-то сюда добавлю'
	},
	{
		title: 'Настольные игры',
		href: ROUTE_LINK.gameIndex,
		description: 'Настолки, которые есть внутри моей компании, когда хочется поиграть, чтоб не спрашивать что ещё есть.'
	},
] as const
