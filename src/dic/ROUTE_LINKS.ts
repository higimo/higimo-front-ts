import { KeyOf } from 'utils.type'

import { generateLink } from 'utils/url-route/generate-link'

const ROUTE_PROJECT_LINKS = Object.freeze({
	projectIndex:        '/project/',
	projectTable:        '/project/table',
	projectTypography:   '/project/typo',
	projectSandbox:      '/project/sandbox',
	projectDetail_CONST: '/project/:vendor/:project/',

	projectDetail: generateLink('/project/:vendor/:project/'),
})

const ROUTE_ACCORD_LINKS = Object.freeze({
	accordIndex:        '/accord/',
	accordDetail_CONST: '/accord/:idcode/',

	accordDetail: generateLink('/accord/:idcode/'),
})

const ROUTE_NOKIA_LINKS = Object.freeze({
	nokiaIndex:              '/nokia/',
	nokiaForm:               '/nokia/meeting/',
	nokiaFormEdit_CONST:     '/nokia/meeting/:meetingId/',
	nokiaPeople:             '/nokia/people/',
	nokiaPeopleForm:         '/nokia/people/add/',
	nokiaPeopleDetail_CONST: '/nokia/people/:personId/',
	nokiaPeopleEdit_CONST:   '/nokia/people/:personId/edit/',
	nokiaStatistic:          '/nokia/statistic/',
	nokiaPinarik:            '/nokia/pinarik/',

	nokiaFormEdit:     generateLink('/nokia/meeting/:meetingId/'),
	nokiaPeopleDetail: generateLink('/nokia/people/:personId/'),
	nokiaPeopleEdit:   generateLink('/nokia/people/:personId/edit/'),
})

const ROUTE_TOURISM_LINKS = Object.freeze({
	tourismIndex:                '/tourism/',
	tourismNashe:                '/tourism/nashe/',
	tourismNashe_CONST:          '/tourism/nashe/:year/',
	tourismNashe2017:            '/tourism/nashe/2017/',
	tourismNashe2018:            '/tourism/nashe/2018/',
	tourismWalkDetail_CONST:     '/tourism/walk/:idcode/',
	tourismChecklist:            '/tourism/checklist/',
	tourismMaps:                 '/tourism/maps/',
	tourismMapsRegion:           '/tourism/maps/region/',
	tourismMapsMoscowWalkaround: '/tourism/maps/moscow-walkaround/',
	tourismMapsMoscowBar:        '/tourism/maps/moscow-bar/',
	tourismCityIndex:            '/tourism/city/',
	tourismVisited:              '/tourism/visited/',
	tourismMoscowMuseum:         '/tourism/moscow-museum/',
	tourismFatherTrack:          '/tourism/father-track/',

	tourismWalkDetail: generateLink('/tourism/walk/:idcode/'),
})

const ROUTE_LIST_LIST_LINKS = Object.freeze({
	listListIndex:        '/list-list/main/',
	listListDetail_CONST: '/list-list/:idcode/',
	listListCreate:       '/list-list/create/',
	listListEdit_CONST:   '/list-list/edit/:idcode/',

	listListDetail: generateLink('/list-list/:idcode/'),
	listListEdit:   generateLink('/list-list/edit/:idcode/'),
})

const ROUTE_VK_LINKS = Object.freeze({
	toolVkIndex:             '/service/vk/',
	toolVkDownloadAlbum:     '/service/vk/download-album/',
	toolVkAlbums:            '/service/vk/albums/',
	toolVkAlbumSingle_CONST: '/service/vk/albums/:albumId/',

	toolVkAlbumSingle: generateLink('/service/vk/albums/:albumId/'),
})

const ROUTE_PETPROJECT_LINKS = Object.freeze({
	petProject:           '/service/pet-project/',
	petProjectCreate:     '/service/pet-project/create/',
	petProjectEdit_CONST: '/service/pet-project/:projectId/edit/',
	petProjectEdit:       generateLink('/service/pet-project/:projectId/edit/'),
})

const ROUTE_TOOL_LINKS = Object.freeze({
	// TODO: перенести в /service/
	// TODO: после переноса поставить редирект
	serviceIndex: '/service/',
	comoji:  '/service/comoji/',
	emailer: '/service/emailer/',
	magic:   '/service/magic/',

	...ROUTE_VK_LINKS,
	...ROUTE_PETPROJECT_LINKS,
	...ROUTE_LIST_LIST_LINKS,
})

const ROUTE_CINEMA_LINKS = Object.freeze({
	cinemaIndex:              '/cinema/',
	cinemaScriptIndex:        '/cinema/script/',
	cinemaScriptDetail_CONST: '/cinema/script/:idcode/',

	cinemaScriptDetail: generateLink('/cinema/script/:idcode/'),
})

const ROUTE_RESUME_LINKS = Object.freeze({
	resumeIndex:         '/resume/',
	resumeProduct:       '/resume/product/',
	resumeLead:          '/resume/product-lead/',
	resumeTechProduct:   '/resume/tech-product/',
	resumeHowToWork:     '/resume/how-to-work/',
	resumeProductFull:   '/resume/product-full/',
	resumeProductSmart:  '/resume/product-smart/',
	response:            '/response/',
})

const ROUTE_THINGS_LINKS = Object.freeze({
	thingsIndex:    '/things/',
	thingsNotebook: '/things/notebook/',
	thingsVelo:     '/things/velo/',
})

// Инфостраницы о себе
const ROUTE_ABOUT_ME_LINKS = Object.freeze({
	...ROUTE_RESUME_LINKS,
	...ROUTE_THINGS_LINKS,
	...ROUTE_CINEMA_LINKS,

	gameIndex: '/game/',
	igLink:    '/ig-link/',
})

// Делюсь знаниями
const ROUTE_SHARE_KNOWLEDGE_LINKS = Object.freeze({
	learningIndex:        '/obuchenie/',
	learningDetail_CONST: '/obuchenie/:idcode/',

	learningDetail: generateLink('/obuchenie/:idcode/'),
})

// Инфосервисы
const ROUTE_INFO_SERVICE_LINKS = Object.freeze({
	...ROUTE_SHARE_KNOWLEDGE_LINKS,

	logism:          '/logism/',
	demagog:         '/demagog/',
	faqIndex:        '/faq/',
	faqDetail_CONST: '/faq/:idcode/',

	faqDetail: generateLink('/faq/:idcode/'),
})

// Сервисы-развлекухи
const ROUTE_FUNNY_LINKS = Object.freeze({
	pron:    '/pron/',
	youtube: '/youtube/',
	links:   '/links/',
})

const ROUTE_LIBRARY_LINKS = Object.freeze({
	libraryIndex: '/lib/',
	libraryAdmin: '/lib/admin/',
})

// Сервисы о себе
const ROUTE_SERVICE_ABOUT_ME_LINKS = Object.freeze({
	...ROUTE_LIBRARY_LINKS,
})

// Магазин
const ROUTE_MERCHANT_LINKS = Object.freeze({
	merchantIndex: '/merchant/',
	merchantCheckout:'/checkout/',
	merchantPaymentPolicy:'/merchant/payment-policy/',
	merchantPersonalPolicy:'/merchant/personal-policy/',
	merchantPaymentOferta:'/merchant/payment-oferta/',
	merchantDonationOferta:'/merchant/donation-oferta/',
})

export const ROUTE_LINKS = {
	index:        '/',

	...ROUTE_PROJECT_LINKS,
	...ROUTE_ACCORD_LINKS,
	...ROUTE_ABOUT_ME_LINKS,
	...ROUTE_SERVICE_ABOUT_ME_LINKS,
	...ROUTE_NOKIA_LINKS,
	...ROUTE_TOURISM_LINKS,
	...ROUTE_TOOL_LINKS,
	...ROUTE_INFO_SERVICE_LINKS,
	...ROUTE_FUNNY_LINKS,
	...ROUTE_MERCHANT_LINKS,

	adminIndex: '/admin/',
	login:      '/login/',
	typo:       '/typo/',
	textarea:   '/textarea/',
	TODO:       '#',
} as const

export type RouteLinksType = KeyOf<typeof ROUTE_LINKS>
