// TODO: надо документировать, сложно читается
export const generateLink = <T extends string>(link: string) => (params: Record<T, string>) => Object.keys(params)
	.reduce((carryLink, key) => carryLink.replace(`:${key}`, params[key]), link) as `/api/v2/${string}`

const ROUTE_PROJECT_LINKS = Object.freeze({
	projectIndex: '/project/',
	projectTable: '/project/table',
	projectTest: '/project/test',
	projectSandbox: '/project/sandbox',
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

	nokiaForm: '/nokia/meeting/',
	nokiaFormEdit_CONST: '/nokia/meeting/:meetingId/',
	nokiaFormEdit: generateLink<'meetingId'>('/nokia/meeting/:meetingId/'),

	nokiaPeople: '/nokia/people/',
	nokiaPeopleForm: '/nokia/people/add/',
	nokiaPeopleDetail_CONST: '/nokia/people/:personId/',
	nokiaPeopleDetail: generateLink<'personId'>('/nokia/people/:personId/'),
	nokiaPeopleEdit_CONST: '/nokia/people/:personId/edit/',

	nokiaPeopleEdit: generateLink<'personId'>('/nokia/people/:personId/edit/'),
	nokiaStatistic: '/nokia/statistic/',
	nokiaPinarik: '/nokia/pinarik/',
})

const ROUTE_TOURISM_LINKS = Object.freeze({
	tourismIndex: '/tourism/',
	tourismMaps: '//tourism/maps/', // TODO: надо название хлебной крошки, надо саму страницу
	tourismNashe: '/tourism/nashe/',
	tourismNashe_CONST: '/tourism/nashe/:year/',
	tourismNashe2017: '/tourism/nashe/2017/',
	tourismNashe2018: '/tourism/nashe/2018/',
	tourismWalkDetail: generateLink<'idcode'>('/tourism/walk/:idcode/'),
	tourismWalkDetail_CONST: '/tourism/walk/:idcode/',
	tourismChecklist: '/tourism/checklist/',
	tourismMapsRegion: '/tourism/maps/region/',
	tourismMapsMoscowWalkaround: '/tourism/maps/moscow-walkaround/',
	tourismMapsMoscowBar: '/tourism/maps/moscow-bar/',
	tourismCityIndex: '/tourism/city/',
	tourismVisited: '/tourism/visited/',
	tourismFatherTrack: '/tourism/father-track/',
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
	resumeHead: '/resume/product-lead/',
	resumeHowToWork: '/resume/how-to-work/',
	resumeProduct: '/resume/product-smart/',
	resumeProductStupid: '/resume/product/',
	resumeTechProduct: '/resume/tech-product/',
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

// Инфосервисы
const ROUTE_INFO_SERVICE_LINKS = Object.freeze({
	...ROUTE_SHARE_KNOWLEDGE_LINKS,
	logism: '/logism/',
	demagog: '/demagog/',
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
})

export const ROUTE_LINKS = {
	index: '/',
	serviceIndex: '/service',

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
	TODO_VATRIKOVSKY_SCHOOL: '#',
} as const

export type RouteLinksType = keyof typeof ROUTE_LINKS
