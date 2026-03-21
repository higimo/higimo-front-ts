import { ROUTE_LINKS } from './ROUTE_LINKS'

type ExcludeRouteType = typeof ROUTE_LINKS['projectDetail'] | typeof ROUTE_LINKS['projectDetail_CONST']
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
	| typeof ROUTE_LINKS['tourismNashe_CONST'] | typeof ROUTE_LINKS['petProjectEdit_CONST']
	| typeof ROUTE_LINKS['cinemaScriptDetail'] | typeof ROUTE_LINKS['login'] | typeof ROUTE_LINKS['adminIndex']
	| typeof ROUTE_LINKS['typo'] | typeof ROUTE_LINKS['TODO']
	| typeof ROUTE_LINKS['projectTable'] | typeof ROUTE_LINKS['projectTest'] | typeof ROUTE_LINKS['projectSandbox']

type RouteType = Exclude<typeof ROUTE_LINKS[keyof typeof ROUTE_LINKS], ExcludeRouteType>

export const globalRouter: Record<RouteType, string> = {
	[ROUTE_LINKS.index]: '🏠',

	[ROUTE_LINKS.projectIndex]: 'ТУДУ',

	[ROUTE_LINKS.accordIndex]: 'ТУДУ',

	[ROUTE_LINKS.nokiaIndex]: 'Нокиа',
	[ROUTE_LINKS.nokiaForm]: 'Добавить встречу',
	[ROUTE_LINKS.nokiaPeople]: 'Персоны',
	[ROUTE_LINKS.nokiaPeopleForm]: 'Добавить персону',
	[ROUTE_LINKS.nokiaStatistic]: 'Статистика',

	[ROUTE_LINKS.tourismIndex]: 'Путешествую',
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

	[ROUTE_LINKS.listListIndex]: 'Спискота',
	[ROUTE_LINKS.listListCreate]: 'Создать элемент',

	[ROUTE_LINKS.toolVkIndex]: 'ТУДУ',
	[ROUTE_LINKS.toolVkStaticAlbum]: 'ТУДУ',
	[ROUTE_LINKS.toolVkDownloadAlbum]: 'ТУДУ',
	[ROUTE_LINKS.toolVkAlbums]: 'ТУДУ',
	[ROUTE_LINKS.petProject]: 'ТУДУ',
	[ROUTE_LINKS.petProjectCreate]: 'ТУДУ',
	[ROUTE_LINKS.toolIndex]: 'ТУДУ',
	[ROUTE_LINKS.toolComoji]: 'ТУДУ',
	[ROUTE_LINKS.toolEmailer]: 'ТУДУ',
	[ROUTE_LINKS.toolMagic]: 'ТУДУ',

	[ROUTE_LINKS.cinemaIndex]: 'ТУДУ',
	[ROUTE_LINKS.cinemaScriptIndex]: 'ТУДУ',
	[ROUTE_LINKS.cinemaScriptDetail_CONST]: 'ТУДУ',

	[ROUTE_LINKS.resumeIndex]: 'ТУДУ',
	[ROUTE_LINKS.resumeHead]: 'ТУДУ',
	[ROUTE_LINKS.resumeTechProduct]: 'ТУДУ',
	[ROUTE_LINKS.resumeProduct]: 'ТУДУ',
	[ROUTE_LINKS.resumeProductStupid]: 'ТУДУ',
	[ROUTE_LINKS.resumeProductLegacy]: 'ТУДУ',

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
}
