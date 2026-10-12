import { LinkDataType } from 'utils.type'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const TOURISM_EXPERIMENT_MAP_LIST: LinkDataType[] = [
	{
		title: 'Проект обхожу Москву',
		href: ROUTE_LINK.tourismMapsMoscowWalkaround,
	},
	{
		title: 'Московские бары',
		href: ROUTE_LINK.tourismMapsMoscowBar,
	},
	{
		title: 'Посещённые регионы России',
		href: ROUTE_LINK.tourismMapsRegion,
	},
	{
		title: 'Список музеев Москвы',
		href: ROUTE_LINK.tourismMoscowMuseum,
	},
] as const
