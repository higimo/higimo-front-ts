import { LinkDataType } from 'utils.type'

import { EXTERNAL_LINK } from 'dic/route/EXTERNAL_LINK'

export const IG_LINK_LIST: LinkDataType[] = [
	{
		href: EXTERNAL_LINK.homePage,
		title: 'Хомяк',
		description: 'Личный сайт',
	},
	{
		href: EXTERNAL_LINK.homeAnonsDeployCalendar,
		title: 'Календарь деплоя',
		description: 'Когда звёзды велят деплоить льву?',
	},
	{
		href: EXTERNAL_LINK.techIntersection,
		title: 'Сайт «Техники → навыки → счастье»',
		description: 'Сайт техник',
	},
	{
		href: EXTERNAL_LINK.canalEfficient,
		title: 'Канал «Техники → навыки → счастье»',
		description: 'Телеграм-канал с техниками дважды в неделю (в архиве)',
	},
] as const
