import { ValueOf } from 'utils.type'

import { ROUTE_LINKS } from './ROUTE_LINKS'

type ExcludeRouteType =
	// Шаблонные URI
	| typeof ROUTE_LINKS['projectDetail'] | typeof ROUTE_LINKS['projectDetail_CONST']
	| typeof ROUTE_LINKS['accordDetail'] | typeof ROUTE_LINKS['accordDetail_CONST']
	| typeof ROUTE_LINKS['nokiaFormEdit'] | typeof ROUTE_LINKS['nokiaFormEdit_CONST']
	| typeof ROUTE_LINKS['nokiaPeopleDetail'] | typeof ROUTE_LINKS['nokiaPeopleDetail_CONST']
	| typeof ROUTE_LINKS['nokiaPeopleEdit'] | typeof ROUTE_LINKS['nokiaPeopleEdit_CONST']
	| typeof ROUTE_LINKS['tourismWalkDetail'] | typeof ROUTE_LINKS['tourismWalkDetail_CONST']
	| typeof ROUTE_LINKS['listListDetail'] | typeof ROUTE_LINKS['listListDetail_CONST']
	| typeof ROUTE_LINKS['listListEdit'] | typeof ROUTE_LINKS['listListEdit_CONST']
	| typeof ROUTE_LINKS['toolVkAlbumSingle'] | typeof ROUTE_LINKS['toolVkAlbumSingle_CONST']
	| typeof ROUTE_LINKS['learningDetail'] | typeof ROUTE_LINKS['learningDetail_CONST']
	| typeof ROUTE_LINKS['faqDetail'] | typeof ROUTE_LINKS['faqDetail_CONST']
	| typeof ROUTE_LINKS['tourismNashe_CONST']
	| typeof ROUTE_LINKS['petProjectEdit'] | typeof ROUTE_LINKS['petProjectEdit_CONST']
	| typeof ROUTE_LINKS['cinemaScriptDetail'] | typeof ROUTE_LINKS['cinemaScriptDetail_CONST']
	// Рабочие URI
	| typeof ROUTE_LINKS['login'] | typeof ROUTE_LINKS['adminIndex']
	| typeof ROUTE_LINKS['typo'] | typeof ROUTE_LINKS['TODO']
	| typeof ROUTE_LINKS['projectTable']
	| typeof ROUTE_LINKS['projectTypography']
	| typeof ROUTE_LINKS['projectSandbox']

type RouteType = Exclude<ValueOf<typeof ROUTE_LINKS>, ExcludeRouteType>

export const BREADCRUMS_DIC: Record<RouteType, string> = {
	[ROUTE_LINKS.index]: '🏠',
	[ROUTE_LINKS.textarea]: 'textarea tool',
	[ROUTE_LINKS.serviceIndex]: 'Сервисы',

	[ROUTE_LINKS.projectIndex]: 'Сделал',

	[ROUTE_LINKS.accordIndex]: 'Аккорды',

	[ROUTE_LINKS.nokiaIndex]: 'Нокиа',
	[ROUTE_LINKS.nokiaForm]: 'Добавить встречу',
	[ROUTE_LINKS.nokiaPeople]: 'Персоны',
	[ROUTE_LINKS.nokiaPeopleForm]: 'Добавить персону',
	[ROUTE_LINKS.nokiaStatistic]: 'Статистика',

	[ROUTE_LINKS.tourismIndex]: 'Путешествую',
	[ROUTE_LINKS.tourismMaps]: 'Интерактивные карты',
	[ROUTE_LINKS.tourismNashe]: 'Нашествие',
	[ROUTE_LINKS.tourismNashe2017]: 'Нашествие 2017',
	[ROUTE_LINKS.tourismNashe2018]: 'Нашествие 2018',
	[ROUTE_LINKS.tourismChecklist]: 'Чеклист туриста',
	[ROUTE_LINKS.tourismMapsRegion]: 'Карта регионов России',
	[ROUTE_LINKS.tourismMapsMoscowWalkaround]: 'Обхожу Москву',
	[ROUTE_LINKS.tourismMapsMoscowBar]: 'Московские бары',
	[ROUTE_LINKS.tourismCityIndex]: 'Оценка городов',
	[ROUTE_LINKS.tourismVisited]: 'Посещённые',
	[ROUTE_LINKS.tourismFatherTrack]: 'Путешествие с отцом',
	[ROUTE_LINKS.tourismMoscowMuseum]: 'Московские музеи',

	[ROUTE_LINKS.listListIndex]: 'Спискота',
	[ROUTE_LINKS.listListCreate]: 'Создать элемент',

	[ROUTE_LINKS.toolVkIndex]: 'Фотографии ВК',
	[ROUTE_LINKS.toolVkDownloadAlbum]: 'Скачать альбом',
	[ROUTE_LINKS.toolVkAlbums]: 'Альбомы',

	[ROUTE_LINKS.petProject]: 'Пробби',
	[ROUTE_LINKS.petProjectCreate]: 'Создать проект',

	[ROUTE_LINKS.toolIndex]: 'Инструменты',
	[ROUTE_LINKS.toolComoji]: 'Комоджи (⌐■_■)',
	[ROUTE_LINKS.toolEmailer]: 'Эмайлер',
	[ROUTE_LINKS.toolMagic]: 'Магический шар',

	[ROUTE_LINKS.cinemaIndex]: 'Кинолог',
	[ROUTE_LINKS.cinemaScriptIndex]: 'Фрагменты сценариев',

	[ROUTE_LINKS.resumeIndex]: 'Мои резюме',
	[ROUTE_LINKS.resumeHowToWork]: 'Как работаю',
	[ROUTE_LINKS.resumeLead]: 'Продакт-лид',
	[ROUTE_LINKS.resumeTechProduct]: 'Тех продакт',
	[ROUTE_LINKS.resumeProductSmart]: 'Продакт-менеджер',
	[ROUTE_LINKS.resumeProduct]: 'Продакт',
	[ROUTE_LINKS.response]: 'Отклики',

	[ROUTE_LINKS.thingsIndex]: 'ТУДУ',
	[ROUTE_LINKS.thingsNotebook]: 'ТУДУ',
	[ROUTE_LINKS.thingsVelo]: 'ТУДУ',

	[ROUTE_LINKS.gameIndex]: 'ТУДУ',
	[ROUTE_LINKS.igLink]: 'ТУДУ',

	[ROUTE_LINKS.learningIndex]: 'ТУДУ',
	[ROUTE_LINKS.logism]: 'ТУДУ',
	[ROUTE_LINKS.demagog]: 'ТУДУ',
	[ROUTE_LINKS.faqIndex]: 'ТУДУ',

	[ROUTE_LINKS.pron]: 'прон',
	[ROUTE_LINKS.youtube]: 'Избранное ютуба',
	[ROUTE_LINKS.links]: 'Избранные ссылки',
	[ROUTE_LINKS.libraryIndex]: 'Домашняя библиотека',
	[ROUTE_LINKS.libraryAdmin]: 'ТУДУ',
	[ROUTE_LINKS.nokiaPinarik]: 'Пинарик',

	[ROUTE_LINKS.merchantIndex]: 'Магазин',
	[ROUTE_LINKS.merchantCheckout]: 'Страница оплаты',
	[ROUTE_LINKS.merchantPaymentPolicy]: 'Порядок оплаты',
	[ROUTE_LINKS.merchantPersonalPolicy]: 'Политика обработки ПД',
	[ROUTE_LINKS.merchantPaymentOferta]: 'Оферта',
	[ROUTE_LINKS.merchantDonationOferta]: 'Донатная оферта',
}

export const isRouteType = (key: string): key is RouteType => {
	return key in BREADCRUMS_DIC
}
