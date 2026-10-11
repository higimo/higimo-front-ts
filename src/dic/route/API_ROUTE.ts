import { ValueOf } from 'utils.type'

import { generateLink } from 'utils/url-route/generate-link'

export const API_ROUTE = {
	login: '/api/v2/auth/login',
	authMe: '/api/v2/auth/me',

	accord: '/api/v2/accord',
	accordSingle: generateLink('/api/v2/accord/:idcode'),
	cinemaShort: '/api/v2/cinema',
	cinemaSingle: generateLink('/api/v2/cinema/:idcode'),
	nashe: '/api/v2/nashe',
	nasheSingle: generateLink('/api/v2/nashe/:year'),
	tableGame: '/api/v2/favorite/table-games',
	youtube: '/api/v2/favorite/youtubes',
	demagog: '/api/v2/demagog',

	faq: '/api/v2/faq',
	faqSingle: generateLink('/api/v2/faq/:idcode'),
	link: '/api/v2/links',
	pron: '/api/v2/pron',

	lection: '/api/v2/lection',
	lectionSingle: generateLink('/api/v2/lection/:idcode'),
	updateNews: '/api/v2/update-news/',

	projectIds: '/api/v2/project/project/ids',
	projectWorker: '/api/v2/project/authors',
	projectVendor: '/api/v2/project/vendor',
	projectProject: '/api/v2/project/project',
	projectProjectTable: '/api/v2/project/project/table',
	projectGroupedTags: '/api/v2/project/tags/groups/tags',
	projectSingle: generateLink('/api/v2/project/:vendorCode/:projectCode'),
	attachAuthor: '/api/v2/project/worker', // post
	attachAuthor_BAD_WAY: '/api/v2/project/credits', // post

	lib: '/api/v2/lib',
	libSingle: generateLink('/api/v2/lib/:id'),
	logism: '/api/v2/logism',
	logismSingle: '/api/v2/logism/single',

	comoji: '/api/v2/comoji',
	probbi: '/api/v2/probbi',
	probbiSingle: generateLink('/api/v2/probbi/:projectId'),
	yamap: '/api/v2/map/yamaps',
	moscowBars: '/api/v2/map/moscow-bar',
	lister: '/api/v2/lister/item',
	listerItemSingle: generateLink('/api/v2/lister/item/:id'),

	pinarik: '/api/v2/nokia/pinarik',
	pinarikSingle: generateLink('/api/v2/nokia/pinarik/:id'),

	nokiaMeeting: '/api/v2/nokia/meeting',
	nokiaRichMeeting: '/api/v2/nokia/meeting/rich',
	nokiaMeetingSingle: generateLink('/api/v2/nokia/meeting/:id'),
	nokiaSyncPersonForMeeting: generateLink('/api/v2/nokia/meeting/:meetingId/person/sync'),
	nokiaPerson: '/api/v2/nokia/people',
	nokiaSuggestPerson: '/api/v2/nokia/people',
	nokiaPersonSingle: generateLink('/api/v2/nokia/people/:id'),
	nokiaTopPerson: '/api/v2/nokia/people/top',
	nokiaTags: '/api/v2/nokia/tag',
	nokiaTagGroup: '/api/v2/nokia/tag/groups/list',
	nokiaStatistic: '/api/v2/nokia/meeting/statistic',

	merchantProducts: '/api/v2/products',
	merchantSingleProduct: generateLink('/api/v2/products/:productId'),

	paste: '/api/v2/paste/',
	pasteStatistic: '/api/v2/paste/statistic',
	pasteSingle: generateLink('/api/v2/paste/:id'),
} as const

export type ApiRouteType = Exclude<
	ValueOf<typeof API_ROUTE>,
	typeof API_ROUTE['accordSingle'] | typeof API_ROUTE['cinemaSingle']
> | ReturnType<typeof API_ROUTE['accordSingle']>
| ReturnType<typeof API_ROUTE['cinemaSingle']>
