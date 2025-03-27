export const generateLink = <T extends string>(link: string) => (params: Record<T, string>) => Object.keys(params)
	.reduce((carryLink, key) => carryLink.replace(`:${key}`, params[key]), link) as `/api/v1/${string}`

const ROUTE_PROJECT_LINKS = Object.freeze({
	projectIndex: '/project/',
	projectDetail_CONST: '/project/:vendor/:project/',
	projectDetail: generateLink<'vendor' | 'project'>('/project/:vendor/:project/'),
})

const ROUTE_ACCORD_LINKS = Object.freeze({
	accordIndex: '/accord/',
	accordDetail_CONST: '/accord/:idcode/',
	accordDetail: generateLink<'idcode'>('/accord/:idcode/'),
})

const ROUTE_NOKIA_LINKS = Object.freeze({
	// href: '/nokia/',
	nokiaIndex: '/nokia/',
	nokiaMessage: '/nokia/message/',
	nokiaForm: '/nokia/form/',
	nokiaFormEdit_CONST: '/nokia/form/:meetingId/',
	nokiaFormEdit: generateLink<'meetingId'>('/nokia/form/:meetingId/'),
	nokiaPeople: '/nokia/people/',
	nokiaPeopleForm: '/nokia/people/add/',
	nokiaPeopleDetail_CONST: '/nokia/people/:personId/',
	nokiaPeopleDetail: generateLink<'personId'>('/nokia/people/:personId/'),
	nokiaPeopleEdit_CONST: '/nokia/people/:personId/edit/',
	nokiaPeopleEdit: generateLink<'personId'>('/nokia/people/:personId/edit/'),
	nokiaStatistic: '/nokia/statistic/',
})

const ROUTE_TOURISM_LINKS = Object.freeze({
	tourismIndex: '/tourism/',
	tourismNashe: '/tourism/nashe/',
	tourismNashe_CONST: '/tourism/nashe/:year/',
	tourismNashe2017: '/tourism/nashe/2017/',
	tourismNashe2018: '/tourism/nashe/2018/',
	tourismWalkIndex: '/tourism/walk/',
	tourismWalkDetail: generateLink<'idcode'>('/tourism/walk/:idcode/'),
	tourismWalkDetail_CONST: '/tourism/walk/:idcode/',
	tourismChecklist: '/tourism/checklist/',
	tourismMapsIndex: '/tourism/maps/',
	tourismMapsRegion: '/tourism/maps/region/',
	tourismMapsMoscowWalk: '/tourism/maps/moscow-walk/',
	tourismMapsDiagram: '/tourism/maps/diagram/',
	tourismMapsMany: '/tourism/maps/many/',
	tourismCityIndex: '/tourism/city/',
})

const ROUTE_LIST_LIST_LINKS = Object.freeze({
	listListIndex: '/list-list/main/',
	listListDetail_CONST: '/list-list/:idcode/',
	listListDetail: generateLink<'idcode'>('/list-list/:idcode/'),
	listListCreate: '/list-list/create/',
	listListEdit_CONST: '/list-list/edit/:idcode/',
	listListEdit: generateLink<'idcode'>('/list-list/edit/:idcode/'),
})

const ROUTE_VK_LINKS = Object.freeze({
	toolVkIndex: '/tool/vk/',
	toolVkStaticAlbum: '/tool/vk/static-album/',
	toolVkDownloadAlbum: '/tool/vk/download-album/',
	toolVkAlbums: '/tool/vk/albums/',
	toolVkAlbumSingle_CONST: '/tool/vk/albums/:albumId/',
	toolVkAlbumSingle: generateLink<'albumId'>('/tool/vk/albums/:albumId/'),
})

const ROUTE_PETPROJECT_LINKS = Object.freeze({
	petProject: '/tool/pet-project/',
	petProjectCreate: '/tool/pet-project/create/',
	petProjectEdit_CONST: '/tool/pet-project/:projectId/edit/',
})

const ROUTE_TOOL_LINKS = Object.freeze({
	toolIndex: '/tool/',
	toolComoji: '/tool/comoji/',
	toolEmailer: '/tool/emailer/',
	toolMagic: '/tool/magic/',

	...ROUTE_VK_LINKS,
	...ROUTE_PETPROJECT_LINKS,
	...ROUTE_LIST_LIST_LINKS,
})

const ROUTE_CINEMA_LINKS = Object.freeze({
	cinemaIndex: '/cinema/',
	cinemaScriptIndex: '/cinema/script/',
	cinemaScriptDetail_CONST: '/cinema/script/:idcode/',
	cinemaScriptDetail: generateLink<'idcode'>('/cinema/script/:idcode/'),
})

const ROUTE_RESUME_LINKS = Object.freeze({
	resumeIndex: '/resume/',
	resumeHead: '/resume/head/',
	resumeProduct: '/resume/product/',
})

const ROUTE_THINGS_LINKS = Object.freeze({
	thingsIndex: '/things/',
	thingsNotebook: '/things/notebook/',
	thingsVelo: '/things/velo/',
})

// Инфостраницы о себе
const ROUTE_ABOUT_ME_LINKS = Object.freeze({
	...ROUTE_RESUME_LINKS,
	...ROUTE_THINGS_LINKS,
	...ROUTE_CINEMA_LINKS,

	gameIndex: '/game/',
	igLink: '/ig-link/',
})

// Делюсь знаниями
const ROUTE_SHARE_KNOWLEDGE_LINKS = Object.freeze({
	learningIndex: '/obuchenie/',
	learningDetail_CONST: '/obuchenie/:idcode/',
	learningDetail: generateLink<'idcode'>('/obuchenie/:idcode/'),
})

const ROUTE_FEEDBACK_LINKS = Object.freeze({
	feedbackIndex: '/feedback/',
	feedbackDetail_CONST: '/feedback/:idcode/',
	feedbackDetail: generateLink<'idcode'>('/feedback/:idcode/'),
})

// Инфосервисы
const ROUTE_INFO_SERVICE_LINKS = Object.freeze({
	...ROUTE_SHARE_KNOWLEDGE_LINKS,
	...ROUTE_FEEDBACK_LINKS,
	logism: '/logism/',
	demagog: '/demagog/',
	clock: '/clock/',
	faqIndex: '/faq/',
	faqDetail_CONST: '/faq/:idcode/',
	faqDetail: generateLink<'idcode'>('/faq/:idcode/'),
})

// Сервисы-развлекухи
const ROUTE_FUNNY_LINKS = Object.freeze({
	pron: '/pron/',
	youtube: '/youtube/',
	links: '/links/',
})

const ROUTE_LIBRARY_LINKS = Object.freeze({
	libraryIndex: '/lib/',
	libraryAdmin: '/lib/admin/',
})

// Сервисы о себе
const ROUTE_SERVICE_ABOUT_ME_LINKS = Object.freeze({
	...ROUTE_LIBRARY_LINKS,
	pinarik: '/pinarik/',
})

export const ROUTE_LINKS = {
	index: '/',

	...ROUTE_PROJECT_LINKS,
	...ROUTE_ACCORD_LINKS,
	...ROUTE_ABOUT_ME_LINKS,
	...ROUTE_SERVICE_ABOUT_ME_LINKS,
	...ROUTE_NOKIA_LINKS,
	...ROUTE_TOURISM_LINKS,
	...ROUTE_TOOL_LINKS,
	...ROUTE_INFO_SERVICE_LINKS,
	...ROUTE_FUNNY_LINKS,

	adminIndex: '/admin/',
	login: '/login/',
	typo: '/typo/',
	TODO: '#',
} as const

export type RouteLinksType = keyof typeof ROUTE_LINKS
