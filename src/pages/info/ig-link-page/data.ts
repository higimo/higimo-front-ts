import { EXTERNAL_LINKS } from "../../../dic/EXTERNAL_LINKS";

type LinkType = {
	href: string;
	title: string;
	description: string;
}
export const iglinksData: LinkType[] = [
	{
		href: EXTERNAL_LINKS.homePage,
		title: 'Хомяк',
		description: 'Личный сайт',
	},
	{
		href: EXTERNAL_LINKS.homeAnonsDeployCalendar,
		title: 'Календарь деплоя',
		description: 'Когда звёзды велят деплоить льву?',
	},
	{
		href: EXTERNAL_LINKS.techIntersection,
		title: 'Сайт «Техники → навыки → счастье»',
		description: 'Сайт техник',
	},
	{
		href: EXTERNAL_LINKS.canalEfficient,
		title: 'Канал «Техники → навыки → счастье»',
		description: 'Телеграм-канал с техниками дважды в неделю (в архиве)',
	},
] as const