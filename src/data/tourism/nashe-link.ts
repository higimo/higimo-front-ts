import { LinkDataType } from 'utils.type'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const NASHE_LINK: LinkDataType[] = [
	{
		href: ROUTE_LINK.tourismNashe2017,
		title: '2017',
	},
	{
		href: ROUTE_LINK.tourismNashe2018,
		title: '2018',
	},
] as const
