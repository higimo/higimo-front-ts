import { AdventureType } from 'types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const ADVENTURES: AdventureType[] = [
	{
		id: 1,
		title: 'Путешествие с отцом',
		description: 'Путешествие по Волге, через Кавказ к Сочи и обратно через Липецк в Москву',
		advent: 'При предъявлении билета, позволяет пройти через рамки искателя радости без очереди',
		href: ROUTE_LINKS.tourismFatherTrack,
		options: [
			{
				title: 'транспорт',
				value: 'автомобиль',
			},
			{
				title: 'длит.',
				value: '9 дней',
			},
			{
				title: 'тип',
				value: 'семейный',
			},
		],
	},
] as const
