import { AdventureType } from 'types'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const ADVENTURE: AdventureType[] = [
	{
		id: 1,
		title: 'Путешествие с отцом',
		description: 'Путешествие по Волге, через Кавказ к Сочи и обратно через Липецк в Москву',
		advent: 'При предъявлении билета, позволяет пройти через рамки искателя радости без очереди',
		href: ROUTE_LINK.tourismFatherTrack,
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
