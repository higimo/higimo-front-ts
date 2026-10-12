import { LinkDataType } from 'utils.type'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const TOURISM_MENU_LINK: LinkDataType[] = [
	{ href: ROUTE_LINK.tourismChecklist,            title: 'Чек-лист путешественника' },
	{ href: ROUTE_LINK.tourismVisited,              title: 'Посещённое' },
	{ href: ROUTE_LINK.tourismCityIndex,            title: 'Оценки городов' },
	{ href: ROUTE_LINK.tourismMapsMoscowWalkaround, title: 'Обхожу Москву' },
	{ href: ROUTE_LINK.tourismMapsMoscowBar,        title: 'Московские бары' },
	{ href: ROUTE_LINK.tourismNashe,                title: 'Нашествие' },
] as const
