type LinkType = {
	href: string;
	title: string;
	description: string;
}
export const iglinksData: LinkType[] = [
	{
		href: 'https://higimo.ru',
		title: 'Хомяк',
		description: 'Личный сайт',
	},
	{
		href: 'https://higimo.ru/project/higimo/deploy-calendar/',
		title: 'Календарь деплоя',
		description: 'Когда звёзды велят деплоить льву?',
	},
	{
		href: 'https://tech.intersection.team/',
		title: 'Сайт «Техники → навыки → счастье»',
		description: 'Сайт техник',
	},
	{
		href: 'https://t.me/efficient_and_happy',
		title: 'Канал «Техники → навыки → счастье»',
		description: 'Телеграм-канал с техниками дважды в неделю (в архиве)',
	},
] as const