import { generateLink } from './ROUTE_LINKS'

export const API_ROUTE = {
	login: '/api/v2/auth/login',
	authMe: '/api/v2/auth/me',

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
	link: '/api/v2/links',
	pron: '/api/v2/pron',

	lection: '/api/v2/lection',
	lectionSingle: generateLink<'idcode'>('/api/v2/lection/:idcode'),
	updateNews: '/api/v2/update-news/',

	projectIds: '/api/v2/project/project/ids',
	projectWorker: '/api/v2/project/authors',
	projectVendor: '/api/v2/project/vendor',
	projectProject: '/api/v2/project/project',
	projectProjectTable: '/api/v2/project/project/table',
	projectGroupedTags: '/api/v2/project/tags/groups/tags',
	projectSingle: generateLink<'vendorCode' | 'projectCode'>('/api/v2/project/:vendorCode/:projectCode'),
	attachAuthor: '/api/v2/project/worker', // post
	attachAuthor_BAD_WAY: '/api/v2/project/credits', // post

	lib: '/api/v2/lib',
	logism: '/api/v2/logism',
	logismSingle: '/api/v2/logism/single',

	comoji: '/api/v2/comoji',
	probbi: '/api/v2/probbi',
	probbiSingle: generateLink<'projectId'>('/api/v2/probbi/:projectId'),
	yamap: '/api/v2/map/yamaps',
	moscowBars: '/api/v2/map/moscow-bar',
	lister: '/api/v2/lister/item',
	listerItemSingle: generateLink<'id'>('/api/v2/lister/item/:id'),

	pinarik: '/api/v2/nokia/pinarik',
	nokiaMeeting: 'api/v2/nokia/meeting',
	nokiaRichMeeting: '/api/v2/nokia/meeting/rich',
	nokiaMeetingSingle: generateLink<'id'>('/api/v2/nokia/meeting/:id'),
	nokiaSyncPersonForMeeting: generateLink<'meetingId'>('/api/v2/nokia/meeting/:meetingId/person/sync'),
	nokiaPerson: '/api/v2/nokia/people',
	nokiaPersonSingle: generateLink<'id'>('/api/v2/nokia/people/:id'),
	nokiaTopPerson: '/api/v2/nokia/people/top',
	nokiaTags: '/api/v2/nokia/tag',
	nokiaTagGroup: '/api/v2/nokia/tag/groups/list',
	nokiaStatistic: '/api/v2/nokia/meeting/statistic',
} as const

export type ApiRouteType = Exclude<
	typeof API_ROUTE[keyof typeof API_ROUTE],
	typeof API_ROUTE['accordSingle'] | typeof API_ROUTE['cinemaSingle']
> | ReturnType<typeof API_ROUTE['accordSingle']>
| ReturnType<typeof API_ROUTE['cinemaSingle']>
