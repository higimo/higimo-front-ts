import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'

export const RESUME_LINK: (LinkDataType)[] = [
	{
		title: 'Front HH',
		href: EXTERNAL_LINK.hhResume,
	},
	{
		title: 'Front [PDF]',
		href: EXTERNAL_LINK.pdfResume,
	},
	{
		title: 'Как работаю',
		href: EXTERNAL_LINK.resumeHowToWork,
	},
	{
		title: 'Senior Product',
		href: EXTERNAL_LINK.resumeProduct,
	},
	{
		title: 'Tech Product',
		href: EXTERNAL_LINK.resumeTechProduct,
	},
	{
		title: 'Lead Product',
		href: EXTERNAL_LINK.resumeLead,
	},
	{
		title: 'Product Smart',
		href: EXTERNAL_LINK.resumeProductSmart,
	},
] as const
