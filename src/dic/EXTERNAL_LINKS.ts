import { KeyOf } from 'utils.type'

export const EXTERNAL_LINKS = {
	wikiIso3166: 'https://ru.wikipedia.org/wiki/ISO_3166-2:RU',

	homePage: 'https://higimo.ru',
	homePortfolio: 'https://higimo.ru/project/',
	homeAnonsDeployCalendar: 'https://higimo.ru/project/higimo/deploy-calendar/',

	socialVk: 'https://vk.com/higimo',
	socialVkPhoto: 'https://vk.com/albums16174219',
	socialTg: 'https://t.me/higimoblog',
	socialTgView: 'https://t.me/higimoview',
	socialTwitter: 'https://twitter.com/higimo',
	socialIg: 'https://www.instagram.com/higimo/',

	canalHigimo: 'https://t.me/higimoblog',
	canalRak: 'https://t.me/rakovarnya_2_0',
	canalRakAdmin: 'https://t.me/+GVbrz97BUDHS-Eh0',
	canalEfficient: 'https://t.me/efficient_and_happy',
	techIntersection: 'https://tech.intersection.team',
	canalScreen: 'https://t.me/screenshotil',
	contactMail: 'mailto:higimo@gmail.com',
	contactTg: 'https://t.me/higimo',
	github: 'https://github.com/higimo',
	serviceTimer: 'https://higimo.github.io/timer/build/',
	serviceDeploy: 'https://deploy-calendar.ru/',
	botRole: 'https://t.me/HeyRoleBot',
	botDoll: 'https://t.me/taskDollBot',
	wishlist: 'https://www.pinterest.at/higim0/список-желаний/',
	vatrikovskySchool: '#TODO',
	sweebe: 'https://sweebe.ru/',

	vatrikovsky: 'https://vatrikovsky.ru/',

	tourismReviewForm: 'https://forms.yandex.ru/u/5f4a4603153cbc6a3f2a4922/',
	tourismReviewEditForm: 'https://forms.yandex.ru/admin/5f4a4603153cbc6a3f2a4922/edit',

	alsHigimo: 'https://artlebedev.ru/higimo',
	alsAutomatus: 'https://www.artlebedev.ru/automation/',
	intersection: 'https://intersection.team/',
	kidguru: 'https://kidgu.ru/',

	reactJs: 'https://reactjs.org/',
	afishaDaily: 'https://daily.afisha.ru/',
	rTop: 'https://r-top.ru/',
	superjob: 'https://superjob.ru/',

	aboutMyshows: 'https://myshows.me/higimo',
	aboutKinopoisk: 'https://www.kinopoisk.ru/user/509833/votes/',
	aboutAnime: 'https://listanime.ru/userpage?userid=357&s=1&view=seen',
	aboutLivelib: 'https://www.livelib.ru/reader/higimo',
	aboutMusic: 'https://music.yandex.ru/playlists/lk.766ce6c9-b44f-4fd9-973d-5abde4646465',
} as const

export type ExternalLinksType = KeyOf<typeof EXTERNAL_LINKS>
