import { generateLink } from './ROUTE_LINKS'

export const API_ROUTE = {
	login: '/api/v1/auth/login',
	
	accord: '/api/v2/accord',
	accordSingle: generateLink<'idcode'>('/api/v2/accord/:idcode'),
	cinemaShort: '/api/v2/cinema',
	cinemaSingle: generateLink<'idcode'>('/api/v2/cinema/:idcode'),
	nashe: '/api/v2/nashe',
	nasheSingle: generateLink<'year'>('/api/v2/nashe/:year'),
	tableGame: '/api/v2/favorite/table-games',
	youtube: '/api/v2/favorite/youtubes',
	demagog: '/api/v2/demagog',

	faq: '/api/v2/faq',
	faqSingle: generateLink<'idcode'>('/api/v2/faq/:idcode'),
	feedback: '/api/v2/feedback',
	feedbackBlock: generateLink<'idcode'>('/api/v2/feedback/:idcode'),
	link: '/api/v2/links',
	pron: '/api/v2/pron',

	lection: '/api/v2/lection',
	lectionSingle: generateLink<'idcode'>('/api/v2/lection/:idcode'),
	updateNews: '/api/v2/update-news/',

	projectIds: '/api/v2/project/project/ids',
	projectWorker: '/api/v2/project/authors',
	projectVendor: '/api/v2/project/vendor',
	projectProject: '/api/v2/project/project',
	projectTags: '/api/v2/project/tags',
	projectSingle: generateLink<'vendorCode' | 'projectCode'>('/api/v2/project/:vendorCode/:projectCode'),
	attachAuthor: '/api/v2/project/worker', // post
	attachAuthor_BAD_WAY: '/api/v2/project/credits', // post

	lib: '/api/v2/lib',
	logism: '/api/v2/logism',
	logismSingle: '/api/v2/logism/single',

	pinarik: '/api/v1/pinarik',
	comoji: '/api/v2/comoji',
	probbi: '/api/v1/probbi',
	probbiSingle: generateLink<'projectId'>('/api/v1/probbi/:projectId'),
	yamap: '/api/v2/map/yamaps',
	lister: '/api/v2/lister/item',
	listerItemSingle: generateLink<'id'>('/api/v2/lister/item/:id'),

	nokiaPerson: '/api/v1/nokia/people',
	nokiaRichMeeting: '/api/v1/nokia/rich-meeting',
	nokiaPeopleMeeting: '/api/v1/nokia/people-meeting',
	nokiaPeople: '/api/v1/nokia/people',
	nokiaMeeting: '/api/v1/nokia/meeting',
	nokiaTags: '/api/v1/nokia/tag',
	nokiaPeopleTag: '/api/v1/nokia/people-tag',
	nokiaPeopleSingle: generateLink<'id'>('/api/v1/nokia/people/:id'),
	nokiaMeetingSingle: generateLink<'id'>('/api/v1/nokia/meeting/:id'),

	// TODO: оказывается, есть в проекте /api/v1, которые не через это работают — исправь
} as const

export type ApiRouteType = Exclude<
	typeof API_ROUTE[keyof typeof API_ROUTE],
	typeof API_ROUTE['accordSingle'] | typeof API_ROUTE['cinemaSingle']
> | ReturnType<typeof API_ROUTE['accordSingle']>
| ReturnType<typeof API_ROUTE['cinemaSingle']>