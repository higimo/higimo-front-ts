import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// TODO: надо сделать base тип
export type ResumeLinkType = {
	href: string
	title: string
	copy: string
	pdf?: string
}

export const RESUME_LINK: ResumeLinkType[] = [
	{
		href: 'https://hh.ru/resume/52d43beeff10b0af7c0039ed1f623763446351',
		copy: 'https://hh.ru/resume/52d43beeff10b0af7c0039ed1f623763446351',
		title: 'Front HH',
	},
	{
		href: 'https://higimo.ru/utkin-frontend.pdf',
		copy: 'https://higimo.ru/utkin-frontend.pdf',
		title: 'Front [PDF]',
	},
	{
		href: ROUTE_LINK.resumeHowToWork,
		copy: `https://higimo.ru${ROUTE_LINK.resumeHowToWork}`,
		title: 'Как работаю',
	},
	{
		href: ROUTE_LINK.resumeProduct,
		copy: `https://higimo.ru${ROUTE_LINK.resumeProduct}`,
		title: 'Senior Product',
	},
	{
		href: ROUTE_LINK.resumeTechProduct,
		copy: `https://higimo.ru${ROUTE_LINK.resumeTechProduct}`,
		title: 'Tech Product',
	},
	{
		href: ROUTE_LINK.resumeLead,
		copy: `https://higimo.ru${ROUTE_LINK.resumeLead}`,
		title: 'Lead Product',
	},
	{
		href: ROUTE_LINK.resumeProductSmart,
		copy: `https://higimo.ru${ROUTE_LINK.resumeProductSmart}`,
		title: 'Product Smart',
	},
] as const
