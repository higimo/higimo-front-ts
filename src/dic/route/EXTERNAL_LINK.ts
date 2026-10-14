import { ROUTE_LINK } from "./ROUTE_LINK";

export const EXTERNAL_LINK = {
	wikiIso3166: 'https://ru.wikipedia.org/wiki/ISO_3166-2:RU',

	homePage:                'https://higimo.ru',
	homePortfolio:           'https://higimo.ru/project/',
	homeAnonsDeployCalendar: 'https://higimo.ru/project/higimo/deploy-calendar/',

	// Мои социальные сети
	socialVk:      'https://vk.com/higimo',
	socialVkPhoto: 'https://vk.com/albums16174219',
	socialTg:      'https://t.me/higimoblog',
	socialTwitter: 'https://twitter.com/higimo',
	socialIg:      'https://www.instagram.com/higimo/',

	// Мои внешниые социалки
	aboutMyshows:   'https://myshows.me/higimo',
	aboutKinopoisk: 'https://www.kinopoisk.ru/user/509833/votes/',
	aboutAnime:     'https://listanime.ru/userpage?userid=357&s=1&view=seen',
	aboutLivelib:   'https://www.livelib.ru/reader/higimo',
	aboutMusic:     'https://music.yandex.ru/playlists/lk.766ce6c9-b44f-4fd9-973d-5abde4646465',
	aboutWiki:      'https://ru.wikipedia.org/wiki/Участник:Higimo',
	wishlist:       'https://www.pinterest.at/higim0/список-желаний/',

	// Каналы в ТГ
	canalHigimo:    'https://t.me/higimoblog',
	canalRak:       'https://t.me/rakovarnya_2_0',
	canalRakAdmin:  'https://t.me/+GVbrz97BUDHS-Eh0',
	canalEfficient: 'https://t.me/efficient_and_happy',
	socialTgView:   'https://t.me/higimoview',
	canalScreen:    'https://t.me/screenshotil',

	// Контакты
	contactMail: 'mailto:higimo@gmail.com',
	contactTg:   'https://t.me/higimo',
	github:      'https://github.com/higimo',
	// socialVk

	// Боты
	botRole: 'https://t.me/HeyRoleBot',
	botDoll: 'https://t.me/taskDollBot',

	// Сервисы
	serviceTimer:  'https://higimo.github.io/timer/build/',
	serviceDeploy: 'https://deploy-calendar.ru/',

	// Хомяки
	// TODO: [FEATURE] показать их структурой
	vatrikovsky: 'https://vatrikovsky.ru/',
	lego:        'https://legostaev.ru/',
	lepekhin:    'https://lepekhin.ru/',
	ldwg:        'https://ldwg.ru/',
	voronej:     'https://narisoval.ru/',
	voronej2:    'https://napisal.ru/',
	ilyahov:     'https://maximilyahov.ru/',
	birman:      'https://ilyabirman.ru/',
	vas3k:       'https://vas3k.blog/',

	// Яндекс формы
	tourismReviewForm:     'https://forms.yandex.ru/u/5f4a4603153cbc6a3f2a4922/',
	tourismReviewEditForm: 'https://forms.yandex.ru/admin/5f4a4603153cbc6a3f2a4922/edit',

	// Мои проекты
	alsHigimo:         'https://artlebedev.ru/higimo',
	alsAutomatus:      'https://www.artlebedev.ru/automation/',
	intersection:      'https://intersection.team/',
	kidguru:           'https://kidgu.ru/',
	techIntersection:  'https://tech.intersection.team',
	sweebe:            'https://sweebe.ru/',
	goodNews:          'https://goodnewsforeveryone.mave.digital/',
	productCampPodcast:'https://productcamppodcast.mave.digital/',

	// Моя работа
	afishaDaily: 'https://daily.afisha.ru/',
	rTop:        'https://r-top.ru/',
	superjob:    'https://superjob.ru/',

	reactJs:     'https://reactjs.org/',

	// Поиск работы
	linkedin: 'https://www.linkedin.com/feed/',
	hh:       'https://hh.ru/search/vacancy?resume=52d43beeff10b0af7c0039ed1f623763446351&from=resumelist&hhtmFrom=applicant_profile',
	hirify:   'https://hirify.me/?grade=middle,senior,lead,head&sources=telegram,hirify,ru_global&specializations=frontend_dev',
	hirehi:   'https://hirehi.ru/',
	getmatch: 'https://getmatch.ru/vacancies?p=1&sa=any&pa=all&se=middle&se=senior&sp=js_frontend',
	habr:     'https://career.habr.com/vacancies?type=suitable',


	// Мои резюме
	hhResume:           'https://hh.ru/resume/52d43beeff10b0af7c0039ed1f623763446351',
	pdfResume:          'https://higimo.ru/utkin-frontend.pdf',
	resumeHowToWork:    `https://higimo.ru${ROUTE_LINK.resumeHowToWork}`,
	resumeProduct:      `https://higimo.ru${ROUTE_LINK.resumeProduct}`,
	resumeTechProduct:  `https://higimo.ru${ROUTE_LINK.resumeTechProduct}`,
	resumeLead:         `https://higimo.ru${ROUTE_LINK.resumeLead}`,
	resumeProductSmart: `https://higimo.ru${ROUTE_LINK.resumeProductSmart}`
} as const
