import { LinkDataType } from "utils.type"

import { EXTERNAL_LINK } from "dic/route/EXTERNAL_LINK"

export const HIRING_LINK: LinkDataType[] = [
	{
		title: 'LinkedIn',
		href: EXTERNAL_LINK.linkedin,
	},
	{
		title: 'hh',
		href: EXTERNAL_LINK.hh,
	},
	{
		title: 'hirify',
		href: EXTERNAL_LINK.hirify,
	},
	{
		title: 'hirehi',
		href: EXTERNAL_LINK.hirehi,
	},
	{
		title: 'GetMatch',
		href: EXTERNAL_LINK.getmatch,
	},
	{
		title: 'Хабра карьера',
		href: EXTERNAL_LINK.habr,
	},
] as const
