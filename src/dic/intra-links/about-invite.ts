import { ToolDataType } from 'utils.type'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const aboutInviteList: ToolDataType[] = [
	{
		name: 'Мои вещи',
		href: ROUTE_LINKS.thingsIndex,
		description: 'Перепись предметов, чтобы не отсматривать их каждый раз'
	},
	{
		name: 'Кинолог',
		href: ROUTE_LINKS.cinemaIndex,
		description: 'Кусочки сценария, которые меня особенно зацепили. Например, неожиданный фашизм внутри «Звёздного десанта»'
	},
	{
		name: 'Избранные ссылки',
		href: ROUTE_LINKS.links,
		description: 'Ссылки, важнейшее в интернете'
	},
	{
		name: 'Избранный ютуб',
		href: ROUTE_LINKS.youtube,
		description: 'Избранные ссылки'
	},
	{
		name: 'FAQ',
		href: ROUTE_LINKS.faqIndex,
		description: 'Чтобы не искать и компилировать ответ на сложный вопрос каждый раз, я собираю их в специальную копилку'
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
] as const
