import { generateLink } from './ROUTE_LINKS'

export const API_ROUTE = {
	accord: '/api/v2/accord',
	accordSingle: generateLink<'idcode'>('/api/v2/accord/:idcode'),
	cinemaShort: '/api/v2/cinema',
	cinemaSingle: generateLink<'idcode'>('/api/v2/cinema/:idcode'),
	nashe: '/api/v2/nashe',
	nasheSingle: generateLink<'year'>('/api/v2/nashe/:year'),
	tableGame: '/api/v2/favorite/table-games',
	demagog: '/api/v2/demagog',
	
	faq: '/api/v2/faq',
	faqSingle: generateLink<'idcode'>('/api/v2/faq/:idcode'),
	feedback: '/api/v2/feedback',
	feedbackBlock: generateLink<'idcode'>('/api/v2/feedback/:idcode'),
	link: '/api/v1/links',
	pron: '/api/v1/pron',
	
	lection: '/api/v1/lection',
	lectionSingle: generateLink<'idcode'>('/api/v1/lection/:idcode'),
	logismSingle: '/api/v1/logism/single',
	updateNews: '/api/v1/update-news/',

	projectIds: '/api/v1/project/project/ids',
	projectWorker: '/api/v1/project/worker',
	projectVendor: '/api/v1/project/vendor',
	projectProject: '/api/v1/project/project',
	
	youtube: '/api/v1/youtube',
	lib: '/api/v1/lib',
	logism: '/api/v1/logism',
	
	pinarik: '/api/v1/pinarik',
	comoji: '/api/v1/comoji',
	probbi: '/api/v1/probbi',
	probbiSingle: generateLink<'projectId'>('/api/v1/probbi/:projectId'),
	yamap: '/api/v1/ya-map',
	lister: '/api/v1/lister/item',
} as const

export type ApiRouteType = Exclude<
	typeof API_ROUTE[keyof typeof API_ROUTE],
	typeof API_ROUTE['accordSingle'] | typeof API_ROUTE['cinemaSingle']
> | ReturnType<typeof API_ROUTE['accordSingle']>
| ReturnType<typeof API_ROUTE['cinemaSingle']>