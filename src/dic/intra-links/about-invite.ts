import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const aboutInviteList: ToolDataType[] = [
	{
		name: '☝ Логизмы',
		href: ROUTE_LINKS.logism,
		description: 'Цитаты друзей, знаменитостей, чтобы помнить и направлять себя'
	},
	{
		name: 'Мои вещи',
		href: ROUTE_LINKS.thingsIndex,
		description: 'Перепись предметов, чтобы не отсматривать их каждый раз'
	},
	{
		name: 'Избранный ютуб',
		href: ROUTE_LINKS.youtube,
		description: 'Избранные ссылки'
	},
	{
		name: 'Избранные ссылки',
		href: ROUTE_LINKS.links,
		description: 'Ссылки, важнейшее в интернете'
	},
	{
		name: 'Кинолог',
		href: ROUTE_LINKS.cinemaIndex,
		description: 'Кусочки сценария, которые меня особенно зацепили. Например, неожиданный фашизм внутри «Звёздного десанта»'
	},
	{
		name: 'Резюме',
		href: ROUTE_LINKS.resumeIndex,
		description: 'На случай важных переговоров'
	},
	{
		name: 'Библиотека',
		href: ROUTE_LINKS.libraryIndex,
		description: 'Книг многовато, чтобы случайно не купить повтор — переписал их'
	},
	{
		name: 'Оценка городов',
		href: ROUTE_LINKS.tourismCityIndex,
		description: 'Города где был, оцениваю по собственной системе'
	},
	{
		name: 'Список желаний',
		href: EXTERNAL_LINKS.wishlist,
		description: 'Всё есть, подарков не нужно. Но вдруг когда-то сюда добавлю'
	},
	{
		name: 'Настольные игры',
		href: ROUTE_LINKS.gameIndex,
		description: 'Настолки, которые есть внутри моей компании, когда хочется поиграть, чтоб не спрашивать что ещё есть.'
	},
] as const
