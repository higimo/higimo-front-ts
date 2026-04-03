type MerchantProductType = {
	id: string // uuid
	name: string
	image: string
	description: string
}
export const PRDOUCT: Record<string, MerchantProductType> = {
	COFFEE: {
		id: 'J89',
		image: '/assert/product/COFFEE.jpg',
		name: 'Подарить автору чашку кофе',
		description: 'Лучший способ поблагодарить меня — помочь оплатить сервер или угостить стаканчиком кофе',
	},
	BEER: {
		id: 'M9',
		image: '/assert/product/BEER.jpg',
		name: 'Стакан пива',
		description: 'Лучший способ поблагодарить меня — помочь оплатить сервер или угостить кружеой пива',
	},
	DOLOR: {
		id: 'M9',
		image: '/assert/product/DOLOR.jpg',
		name: 'Один долор',
		description: 'Лучший способ поблагодарить меня — помочь оплатить сервер своим долором',
	},
	NOKIA_MONTH: {
		id: 'M9',
		image: '/assert/product/NOKIA.jpg',
		name: 'Купите доступ в Нокиа на месяц',
		description: 'Лучший способ поблагодарить меня — помочь оплатить сервер или угостить стаканчиком кофе',
	},
	NOKIA_YEAR: {
		id: 'M9',
		image: '/assert/product/NOKIA.jpg',
		name: 'Купите доступ в Нокиа на месяц',
		description: 'Лучший способ поблагодарить меня — помочь оплатить сервер или угостить стаканчиком кофе',
	},
} as const
