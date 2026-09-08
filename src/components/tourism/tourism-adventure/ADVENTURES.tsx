import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type AdventureOptionType = {
	title: string
	value: string
}

export type AdventureType = {
	id: number
	title: string
	description: string
	advent: string
	options: AdventureOptionType[]
	href: string
}

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
