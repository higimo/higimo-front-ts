import { ValueOf } from 'utils.type'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type ExcludeRouteType =
	// Шаблонные URI
	| typeof ROUTE_LINK['projectDetail'] | typeof ROUTE_LINK['projectDetail_CONST']
	| typeof ROUTE_LINK['accordDetail'] | typeof ROUTE_LINK['accordDetail_CONST']
	| typeof ROUTE_LINK['nokiaFormEdit'] | typeof ROUTE_LINK['nokiaFormEdit_CONST']
	| typeof ROUTE_LINK['nokiaPeopleDetail'] | typeof ROUTE_LINK['nokiaPeopleDetail_CONST']
	| typeof ROUTE_LINK['nokiaPeopleEdit'] | typeof ROUTE_LINK['nokiaPeopleEdit_CONST']
	| typeof ROUTE_LINK['tourismWalkDetail'] | typeof ROUTE_LINK['tourismWalkDetail_CONST']
	| typeof ROUTE_LINK['listListDetail'] | typeof ROUTE_LINK['listListDetail_CONST']
	| typeof ROUTE_LINK['listListEdit'] | typeof ROUTE_LINK['listListEdit_CONST']
	| typeof ROUTE_LINK['toolVkAlbumSingle'] | typeof ROUTE_LINK['toolVkAlbumSingle_CONST']
	| typeof ROUTE_LINK['learningDetail'] | typeof ROUTE_LINK['learningDetail_CONST']
	| typeof ROUTE_LINK['faqDetail'] | typeof ROUTE_LINK['faqDetail_CONST']
	| typeof ROUTE_LINK['faqFormEdit'] | typeof ROUTE_LINK['faqFormEdit_CONST']
	| typeof ROUTE_LINK['tourismNashe_CONST']
	| typeof ROUTE_LINK['petProjectEdit'] | typeof ROUTE_LINK['petProjectEdit_CONST']
	| typeof ROUTE_LINK['cinemaScriptDetail'] | typeof ROUTE_LINK['cinemaScriptDetail_CONST']
	| typeof ROUTE_LINK['libraryFormEdit'] | typeof ROUTE_LINK['libraryFormEdit_CONST']
	// Рабочие URI
	| typeof ROUTE_LINK['TODO']

type RouteType = Exclude<ValueOf<typeof ROUTE_LINK>, ExcludeRouteType>

export const BREADCRUMS_DIC: Record<RouteType, string> = {
	[ROUTE_LINK.index]:        '🏠',
	[ROUTE_LINK.higimoBlog]:   'Личный блог',
	[ROUTE_LINK.serviceIndex]: 'Сервисы',
	[ROUTE_LINK.typo]:         'Тестовая страница',
	[ROUTE_LINK.login]:        'Авторизоваться',
	[ROUTE_LINK.adminIndex]:   'Админка',

	[ROUTE_LINK.projectIndex]:      'Сделал',
	[ROUTE_LINK.projectTable]:      'Таблица сделанного',
	[ROUTE_LINK.projectTypography]: 'Типографика анонса',
	[ROUTE_LINK.projectSandbox]:    'Сэндбокс',

	[ROUTE_LINK.accordIndex]: 'Аккорды',

	[ROUTE_LINK.nokiaIndex]:      'Нокиа',
	[ROUTE_LINK.nokiaForm]:       'Добавить встречу',
	[ROUTE_LINK.nokiaPeople]:     'Персоны',
	[ROUTE_LINK.nokiaPeopleForm]: 'Добавить персону',
	[ROUTE_LINK.nokiaStatistic]:  'Статистика',

	[ROUTE_LINK.tourismIndex]:         'Путешествую',
	[ROUTE_LINK.tourismMaps]:          'Интерактивные карты',
	[ROUTE_LINK.tourismNashe]:         'Нашествие',
	[ROUTE_LINK.tourismNashe2017]:     'Нашествие 2017',
	[ROUTE_LINK.tourismNashe2018]:     'Нашествие 2018',
	[ROUTE_LINK.tourismChecklist]:     'Чеклист туриста',
	[ROUTE_LINK.tourismMapsRegion]:    'Карта регионов России',
	[ROUTE_LINK.tourismMapsMoscowWalkaround]: 'Обхожу Москву',
	[ROUTE_LINK.tourismMapsMoscowBar]: 'Московские бары',
	[ROUTE_LINK.tourismCityIndex]:     'Оценка городов',
	[ROUTE_LINK.tourismVisited]:       'Посещённые',
	[ROUTE_LINK.tourismFatherTrack]:   'Путешествие с отцом',
	[ROUTE_LINK.tourismMoscowMuseum]:  'Московские музеи',

	[ROUTE_LINK.listListDefault]: 'Спискота',
	[ROUTE_LINK.listListMain]:    'Спискота',
	[ROUTE_LINK.listListCreate]:  'Создать элемент',

	[ROUTE_LINK.toolVkIndex]:         'Фотографии ВК',
	[ROUTE_LINK.toolVkDownloadAlbum]: 'Скачать альбом',
	[ROUTE_LINK.toolVkAlbums]:        'Альбомы',

	[ROUTE_LINK.petProject]:       'Пробби',
	[ROUTE_LINK.petProjectCreate]: 'Создать проект',

	[ROUTE_LINK.comoji]:  'Комоджи (⌐■_■)',
	[ROUTE_LINK.emailer]: 'Эмайлер',
	[ROUTE_LINK.magic]:   'Магический шар',

	[ROUTE_LINK.cinemaIndex]:       'Кинолог',

	[ROUTE_LINK.resumeIndex]:        'Мои резюме',
	[ROUTE_LINK.resumeHowToWork]:    'Как работаю',
	[ROUTE_LINK.resumeLead]:         'Продакт-лид',
	[ROUTE_LINK.resumeTechProduct]:  'Тех продакт',
	[ROUTE_LINK.resumeProductSmart]: 'Продакт-менеджер',
	[ROUTE_LINK.resumeProductFull]:  'Продакт-менеджер',
	[ROUTE_LINK.resumeProduct]:      'Продакт',
	[ROUTE_LINK.response]:           'Отклики',

	[ROUTE_LINK.thingsIndex]:    'Мои вещи',
	[ROUTE_LINK.thingsNotebook]: 'Ноутбук',
	[ROUTE_LINK.thingsVelo]:     'Велосипед',

	[ROUTE_LINK.gameIndex]: 'Настольные игры',
	[ROUTE_LINK.igLink]:    'Главные ссылки',

	[ROUTE_LINK.learningIndex]: 'Обучение',
	[ROUTE_LINK.logism]:        'Логизмы',
	[ROUTE_LINK.demagog]:       'Сервис Демагог',
	[ROUTE_LINK.faqIndex]:      'FAQ',
	[ROUTE_LINK.faqForm]:       'Создание FAQ',

	[ROUTE_LINK.pron]:         'прон',
	[ROUTE_LINK.youtube]:      'Избранное ютуба',
	[ROUTE_LINK.links]:        'Избранные ссылки',

	[ROUTE_LINK.libraryIndex]: 'Домашняя библиотека',
	[ROUTE_LINK.libraryForm]:  'Админка домашней библиотеки',

	[ROUTE_LINK.nokiaPinarik]: 'Пинарик',

	[ROUTE_LINK.merchantIndex]:          'Магазин',
	[ROUTE_LINK.merchantCheckout]:       'Страница оплаты',
	[ROUTE_LINK.merchantPaymentPolicy]:  'Порядок оплаты',
	[ROUTE_LINK.merchantPersonalPolicy]: 'Политика обработки ПД',
	[ROUTE_LINK.merchantPaymentOferta]:  'Оферта',
	[ROUTE_LINK.merchantDonationOferta]: 'Донатная оферта',
}

export const isRouteType = (key: string): key is RouteType => {
	return key in BREADCRUMS_DIC
}
