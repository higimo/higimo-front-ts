import { generateLink } from 'utils/url-route/generate-link'

const ROUTE_PROJECT_LINK = Object.freeze({
	projectIndex:        '/project/',
	projectTable:        '/project/table',
	projectTypography:   '/project/typo',
	projectSandbox:      '/project/sandbox',
	projectDetail_CONST: '/project/:vendor/:project/',

	projectDetail: generateLink('/project/:vendor/:project/'),
})

const ROUTE_ACCORD_LINK = Object.freeze({
	accordIndex:        '/accord/',
	accordDetail_CONST: '/accord/:idcode/',

	accordDetail: generateLink('/accord/:idcode/'),
})

const ROUTE_NOKIA_LINK = Object.freeze({
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

const ROUTE_TOURISM_LINK = Object.freeze({
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

const ROUTE_LIST_LIST_LINK = Object.freeze({
	listListDefault:      '/list-list/',
	listListMain:         '/list-list/main/',
	listListDetail_CONST: '/list-list/:idcode/',
	listListCreate:       '/list-list/create/',
	listListEdit_CONST:   '/list-list/edit/:idcode/',

	listListDetail: generateLink('/list-list/:idcode/'),
	listListEdit:   generateLink('/list-list/edit/:idcode/'),
})

const ROUTE_VK_LINK = Object.freeze({
	toolVkIndex:             '/service/vk/',
	toolVkDownloadAlbum:     '/service/vk/download-album/',
	toolVkAlbums:            '/service/vk/albums/',
	toolVkAlbumSingle_CONST: '/service/vk/albums/:albumId/',

	toolVkAlbumSingle: generateLink('/service/vk/albums/:albumId/'),
})

const ROUTE_PETPROJECT_LINK = Object.freeze({
	petProject:           '/service/pet-project/',
	petProjectCreate:     '/service/pet-project/create/',
	petProjectEdit_CONST: '/service/pet-project/:projectId/edit/',
	petProjectEdit:       generateLink('/service/pet-project/:projectId/edit/'),
})

const ROUTE_TOOL_LINK = Object.freeze({
	serviceIndex: '/service/',
	comoji:  '/service/comoji/',
	emailer: '/service/emailer/',
	magic:   '/service/magic/',

	...ROUTE_VK_LINK,
	...ROUTE_PETPROJECT_LINK,
	...ROUTE_LIST_LIST_LINK,
})

const ROUTE_CINEMA_LINK = Object.freeze({
	cinemaIndex:              '/cinema/',
	cinemaScriptDetail_CONST: '/cinema/:idcode/',

	cinemaScriptDetail: generateLink('/cinema/script/:idcode/'),
})

const ROUTE_RESUME_LINK = Object.freeze({
	resumeIndex:         '/resume/',
	resumeProduct:       '/resume/product/',
	resumeLead:          '/resume/product-lead/',
	resumeTechProduct:   '/resume/tech-product/',
	resumeHowToWork:     '/resume/how-to-work/',
	resumeProductFull:   '/resume/product-full/',
	resumeProductSmart:  '/resume/product-smart/',
	response:            '/response/',
})

const ROUTE_THINGS_LINK = Object.freeze({
	thingsIndex:    '/things/',
	thingsNotebook: '/things/notebook/',
	thingsVelo:     '/things/velo/',
})

// Инфостраницы о себе
const ROUTE_ABOUT_ME_LINK = Object.freeze({
	...ROUTE_RESUME_LINK,
	...ROUTE_THINGS_LINK,
	...ROUTE_CINEMA_LINK,

	gameIndex: '/game/',
	igLink:    '/ig-link/',
})

// Делюсь знаниями
const ROUTE_SHARE_KNOWLEDGE_LINK = Object.freeze({
	learningIndex:        '/obuchenie/',
	learningDetail_CONST: '/obuchenie/:idcode/',

	learningDetail: generateLink('/obuchenie/:idcode/'),
})

// Инфосервисы
const ROUTE_INFO_SERVICE_LINK = Object.freeze({
	...ROUTE_SHARE_KNOWLEDGE_LINK,

	logism:          '/logism/',
	demagog:         '/demagog/',

	faqIndex:          '/faq/',
	faqDetail_CONST:   '/faq/:idcode/',
	faqDetail:         generateLink('/faq/:idcode/'),
	faqForm:           '/faq/form/',
	faqFormEdit_CONST: '/faq/form/:idcode/',
	faqFormEdit:       generateLink('/faq/form/:idcode/'),
})

// Сервисы-развлекухи
const ROUTE_FUNNY_LINK = Object.freeze({
	pron:    '/pron/',
	youtube: '/youtube/',
	links:   '/links/',
})

const ROUTE_LIBRARY_LINK = Object.freeze({
	libraryIndex: '/lib/',
	libraryForm: '/lib/form/',
	libraryFormEdit_CONST: '/lib/form/:id',
	libraryFormEdit: generateLink('/lib/form/:id'),
})

// Сервисы о себе
const ROUTE_SERVICE_ABOUT_ME_LINK = Object.freeze({
	...ROUTE_LIBRARY_LINK,
})

// Магазин
const ROUTE_MERCHANT_LINK = Object.freeze({
	merchantIndex: '/merchant/',
	merchantCheckout:'/checkout/',
	merchantPaymentPolicy:'/merchant/payment-policy/',
	merchantPersonalPolicy:'/merchant/personal-policy/',
	merchantPaymentOferta:'/merchant/payment-oferta/',
	merchantDonationOferta:'/merchant/donation-oferta/',
})

export const ROUTE_LINK = {
	index:      '/',
	higimoBlog: '/higimoblog',

	...ROUTE_PROJECT_LINK,
	...ROUTE_ACCORD_LINK,
	...ROUTE_ABOUT_ME_LINK,
	...ROUTE_SERVICE_ABOUT_ME_LINK,
	...ROUTE_NOKIA_LINK,
	...ROUTE_TOURISM_LINK,
	...ROUTE_TOOL_LINK,
	...ROUTE_INFO_SERVICE_LINK,
	...ROUTE_FUNNY_LINK,
	...ROUTE_MERCHANT_LINK,

	adminIndex: '/admin/',
	login:      '/login/',
	typo:       '/typo/',
	TODO:       '#',
} as const
