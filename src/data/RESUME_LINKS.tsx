import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export type ResumeLinkType = {
	href: string
	title: string
	copy: string
	pdf?: string
}

export const RESUME_LINKS: ResumeLinkType[] = [
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
		href: ROUTE_LINKS.resumeHowToWork,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeHowToWork}`,
		title: 'Как работаю',
	},
	{
		href: ROUTE_LINKS.resumeProduct,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeProduct}`,
		title: 'Senior Product',
	},
	{
		href: ROUTE_LINKS.resumeTechProduct,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeTechProduct}`,
		title: 'Tech Product',
	},
	{
		href: ROUTE_LINKS.resumeLead,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeLead}`,
		title: 'Lead Product',
	},
	{
		href: ROUTE_LINKS.resumeProductSmart,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeProductSmart}`,
		title: 'Product Smart',
	},
] as const
