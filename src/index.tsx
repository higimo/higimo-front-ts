import { render } from 'preact'
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso'

import { Header } from 'components/ui/header/Header'
import { Footer } from 'components/ui/footer'

import { GlobalProvider } from './context/global'

import { AuthProvider } from './context/auth'

import { AccordGallery } from 'components/accord/accord-gallery'
import { AccordSingle } from 'components/accord/accord-single'
import { PrivateRoute } from 'components/util/private-route/PrivateRoute'

import { TestPage } from 'pages/test-page'
import { LoginPage } from 'pages/auth/login-page'
import { AdminPage } from 'pages/auth/admin-page'
import { NotFoundPage } from 'pages/not-found-page'

import { IndexPage } from 'pages/index-page'

import { ProjectIndexPage } from 'pages/project/project-index-page'
import { ProjectSinglePage } from 'pages/project/project-single-page'

import { ClockPage } from 'pages/test-page/tools/clock-page'
import { ComojiPage } from 'pages/test-page/tools/comoji-page'
import { DemagogPage } from 'pages/test-page/tools/demagog-page'
import { EmailerPage } from 'pages/test-page/tools/emailer-page'
import { FaqListPage } from 'pages/test-page/tools/faq/faq-list-page'
import { FaqSinglePage } from 'pages/test-page/tools/faq/faq-single-page'
import { FeedbackIndexPage } from 'pages/test-page/tools/feedback/feedback-page'
import { FeedbackSinglePage } from 'pages/test-page/tools/feedback/feedback-single-page'
import { MagicBallPage } from 'pages/test-page/tools/magic-ball-page'
import { ObuchenieListPage } from 'pages/test-page/tools/obuchenie/obuchenie-list-page'
import { ObuchenieSinglePage } from 'pages/test-page/tools/obuchenie/obuchenie-single-page'
import { PronPage } from 'pages/test-page/tools/pron-page'

import { LibAdminPage } from 'pages/test-page/tools/lib/lib-admin-page'
import { LibIndexPage } from 'pages/test-page/tools/lib/lib-index-page'

import { CinemaIndexPage } from 'pages/info/cinema-index-page'
import { CinemaScriptPage } from 'pages/info/cinema-script-page'
import { CinemaSinglePage } from 'pages/info/cinema-single-page'
import { GamePage } from 'pages/info/game-page'
import { IgLinkPage } from 'pages/info/ig-link-page'
import { LinksPage } from 'pages/info/links-page'
import { LogismPage } from 'pages/info/logism-page'
import { ThingsIndexPage } from 'pages/info/things/things-index-page'
import { ThingsNotebookPage } from 'pages/info/things/things-notebook-page'
import { ThingsVeloPage } from 'pages/info/things/things-velo-page'
import { YoutubePage } from 'pages/info/youtube-page'

import { PetProjectFormPage } from 'pages/test-page/tools/pet-project/pet-project-form-page'
import { PetProjectPage } from 'pages/test-page/tools/pet-project/pet-project-page'

import { ListListFormPage } from 'pages/tool/list-list-form-page'
import { ListListIndexPage } from 'pages/tool/list-list-index-page'

import { NokiaAddPersonPage } from 'pages/nokia/nokia-add-person-page'
import { NokiaFormPage } from 'pages/nokia/nokia-form-page'
import { NokiaIndexPage } from 'pages/nokia/nokia-index-page'
import { NokiaPeopleDetailCardPage } from 'pages/nokia/nokia-people-detail-card-page'
import { NokiaPeopleListPage } from 'pages/nokia/nokia-people-list-page'
import { NokiaStatisticPage } from 'pages/nokia/nokia-statistic-page'
import { PinarikPage } from 'pages/nokia/pinarik-page'

import { NasheIndexPage } from 'pages/tourism/nashe/nashe-page'
import { NasheSinglePage } from 'pages/tourism/nashe/nashe-single-page'
import { TourismChecklistPage } from 'pages/tourism/tourism-checklist-page'
import { TourismCityStarPage } from 'pages/tourism/tourism-city-star-page'
import { TourismFatherTrackPage } from 'pages/tourism/tourism-father-track-page'
import { TourismIndexPage } from 'pages/tourism/tourism-index'
import { TourismMoscowBarPage } from 'pages/tourism/tourism-ya-maps/tourism-moscow-bar'
import { TourismMoscowWalkaroundPage } from 'pages/tourism/tourism-ya-maps/tourism-moscow-walkaround-page'
import { TourismVisitedPage } from 'pages/tourism/tourism-visited-page'
import { TourismWalkSinglePage } from 'pages/tourism/tourism-walk-single-page'
import { TourismYaMapsRegionPage } from 'pages/tourism/tourism-ya-maps/tourism-ya-maps-region-page'

import { VkAlbumEditPage } from 'pages/vk/vk-album-edit-page'
import { VkAlbumListPage } from 'pages/vk/vk-album-list-page'
import { VkDownloadPage } from 'pages/vk/vk-download-page'
import { VkIndexPage } from 'pages/vk/vk-index-page'
import { VkStaticAlbumPage } from 'pages/vk/vk-static-album-page'

import { TextareaPage } from 'pages/textarea-page'

import { ResumePage } from 'pages/resume/resume-page'
import ResumeProduct2Page from 'pages/resume/resume-product2-page'

import { ToolIndexPage } from 'pages/test-page/tools/tool-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'
import { VkContextProvider } from './context/vk'

const ResumeProductPage = lazy(() => import('pages/resume/resume-product-page'))
const ResumeHeadPage = lazy(() => import('pages/resume/resume-head-page'))

// https://habr.com/ru/articles/321106/
// https://github.com/preactjs/signals/tree/main
// TODO vite.config.ts отделяет чанк с библиотекой, но не подгружает её асинхронно, так что для всех страни подгружается d3 и openapi

// https://github.com/antfu-collective/taze
// https://github.com/antfu/export-size
// https://icones.js.org/
// https://github.com/antfu/eslint-typegen
// https://unplugin.unjs.io/showcase/
// https://unstorage.unjs.io/

// https://www.npmjs.com/package/uncrypto/v/0.1.3 для нокии

// https://node-modules.dev/report/install-size это можно использовать для того, чтобы вычищать node_modules через пуллреквесты, самые большие в мусорку

// https://excalidraw.smallweb.run/d/drawing
// https://bsky.app/profile/jsr.io
// https://jsr.io/docs/introduction
// https://jsr.io/packages
// https://t.me/alexnozer_dev/207
// https://evilmartians.com/chronicles/how-to-make-your-open-source-popular
// https://mastodon.social/@sitnik_ru
// https://habr.com/ru/companies/jugru/articles/444652/
// https://mastodon.online/@vas3k
// http://paperjs.org/tutorials/

// TODO https://github.com/welldone-software/react-component-splitter кажется очень удобным

// TODO eslint

// TODO Добавить аналитику поблочную

// https://habr.com/ru/articles/673640/ добавить куда-то

// TODO интересный код событий для форм https://doka.guide/js/queuemicrotask/

// https://higimo.ru/vk/
// https://github.com/higimo/vk-photos-react/blob/master/src/scss/index.scss
// https://github.com/higimo/analytics
// https://github.com/higimo/list-new/blob/master/src/routes/list-list-add/index.js
// https://github.com/higimo/museum

// TODO: использовать Wouter

// TODO: Как настроить PWA на этом стеке?

// ### В ролях
// 1 Дима Уткин — руководитель продукта соискателей
// 182 Артём Сорокин — лид бекенда соискателей
// 185 Влад Алексеев — лид команды поиска
// 186 Андрей Дербенев — глава бекенда
// 187 Евгений Касьяненко — глава фронтенда
// 188 Серафима Павлова — лид фронтенда соискателей
// 189 Арсен Афаунов — фронтендер
// 190 Алексей Захаров — президент
// 191 Владимир — бекендер
// 192 Елена Никифорова — овнер соискателей
// 28 Наташа Эллин — руководитель продукта работодателей
// 32 Станислав Мавлютов — фронтендер
// 34 Иван Спиридонов — фронтендер
// 36 Влад Солодов — дизайнер
// 193 Ян Подвойский —
// 194 Сергей Слепнёв —
// 195 Евгений Кречко —

// TODO link #2196f3
// #3984d4 -- неплохой синий


// TODO: страницу для итогов года: скрин нокии и скрин обхожу Москву

// TODO Добавить подкаст Хорошие новости в Блоги
// TODO Добавить подкаст Кэмпа в Блоги
// TODO в портфолио бот Хигимору

{/* <h1>Конспект по верстке эмейлов</h1>
<p>
	Проследите за тем, чтобы письмо адекватно отображалось в Outlook, Gmail, Yandex и Mail.ru — этого достаточно
</p> */}




// TODO: ну пусть люди прям в списки могут заходить?
// TODO: показать иконки крепостей
// TODO: год посещения
// TODO: Список российских городов для посещения
// TODO: Города для посещений
// TODO: Список городов близ Москвы
// TODO: Показать на сайте
// TODO: Главные мечети посетил
// TODO: Преображенская крепость
// Вулканы
// Горелый
// TODO: Добавить регионы городов
// TODO: Был в 4 городах, в 5 заброшенных городах, в 30 крепостях
// 2025 год население
// TODO: искать: Регионы России Статистический сборник
// Научиться p3 express
// Купить книгу Цель: процесс непрерывного улучшения16+ Элияху Голдратт, Джефф Кокс
// Обхожу Метро https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B9_%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D0%BD%D0%B0
// 2022-03-10 Ушёл из Рамблера
// 2015-09-01 пришёл в Эртоп
// 2016-12-31 Ушёл из Эртоп

// TODO: Получается всё отсюда надо перенести на страницу
// TODO: Фильтровать точки здесь, а в дочерний с картой передавать точки, пусть рисует




export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary onError={(e) => console.log(e)}>
				<AuthProvider>
					<GlobalProvider>
						<VkContextProvider>
						<Header />
						<main>
							<Router>
								<Route path={ROUTE_LINKS.index} component={IndexPage} />

								<Route path="/textarea" component={TextareaPage} />

								{/* admin */}
								<Route path={ROUTE_LINKS.login} component={LoginPage} />
								<PrivateRoute path={ROUTE_LINKS.adminIndex} component={AdminPage} />

								<Route path={ROUTE_LINKS.typo} component={TestPage} />

								{/* Портфолио */}
								<Route path={ROUTE_LINKS.projectIndex} component={ProjectIndexPage} />
								<Route path={ROUTE_LINKS.projectDetail_CONST} component={ProjectSinglePage} />

								{/* Список списков */}
								<Route path={ROUTE_LINKS.listListDetail_CONST} component={ListListIndexPage} />
								<Route path={ROUTE_LINKS.listListCreate} component={ListListFormPage} />
								<PrivateRoute path={ROUTE_LINKS.listListEdit_CONST} component={ListListFormPage} />

								{/* Аккорды */}
								<Route path={ROUTE_LINKS.accordIndex} component={AccordGallery} />
								<Route path={ROUTE_LINKS.accordDetail_CONST} component={AccordSingle} />

								{/* Инфосервисы */}
								<Route path={ROUTE_LINKS.logism} component={LogismPage} />
								<Route path={ROUTE_LINKS.demagog} component={DemagogPage} />
								<Route path={ROUTE_LINKS.clock} component={ClockPage} />
								<Route path={ROUTE_LINKS.faqIndex} component={FaqListPage} />
								<Route path={ROUTE_LINKS.faqDetail_CONST} component={FaqSinglePage} />
								<Route path={ROUTE_LINKS.feedbackIndex} component={FeedbackIndexPage} />
								<Route path={ROUTE_LINKS.feedbackDetail_CONST} component={FeedbackSinglePage} />
								<Route path={ROUTE_LINKS.learningIndex} component={ObuchenieListPage} />
								<Route path={ROUTE_LINKS.learningDetail_CONST} component={ObuchenieSinglePage} />

								{/* Сервисы-развлекухи */}
								<Route path={ROUTE_LINKS.pron} component={PronPage} />
								<Route path={ROUTE_LINKS.youtube} component={YoutubePage} />
								<Route path={ROUTE_LINKS.links} component={LinksPage} />

								{/* Инфостраницы о себе */}
								<Route path={ROUTE_LINKS.resumeIndex} component={ResumePage} />
								<Route path={ROUTE_LINKS.resumeHead} component={ResumeHeadPage} />
								<Route path={ROUTE_LINKS.resumeProductLegacy} component={ResumeProductPage} />
								<Route path={ROUTE_LINKS.resumeProduct} component={ResumeProduct2Page} />
								<Route path={ROUTE_LINKS.gameIndex} component={GamePage} />
								<Route path={ROUTE_LINKS.thingsIndex} component={ThingsIndexPage} />
								<Route path={ROUTE_LINKS.thingsNotebook} component={ThingsNotebookPage} />
								<Route path={ROUTE_LINKS.thingsVelo} component={ThingsVeloPage} />
								<Route path={ROUTE_LINKS.igLink} component={IgLinkPage} />
								<Route path={ROUTE_LINKS.cinemaIndex} component={CinemaIndexPage} />
								<Route path={ROUTE_LINKS.cinemaScriptIndex} component={CinemaScriptPage} />
								<Route path={ROUTE_LINKS.cinemaScriptDetail_CONST} component={CinemaSinglePage} />

								{/* Сервисы о себе */}
								<Route path={ROUTE_LINKS.libraryIndex} component={LibIndexPage} />
								<PrivateRoute path={ROUTE_LINKS.libraryAdmin} component={LibAdminPage} />

								{/* TODO: /tool/vk не работает */}
								{/* <Route path="/tool/:path?/:subpath?/:subsubpath?" component={ToolPage} /> */}
								<Route path={ROUTE_LINKS.toolIndex} component={ToolIndexPage} />
								{/* TODO починить его, полностью не работает теперь */}
								<Route path={ROUTE_LINKS.toolEmailer} component={EmailerPage} />
								<Route path={ROUTE_LINKS.toolComoji} component={ComojiPage} />
								<Route path={ROUTE_LINKS.toolMagic} component={MagicBallPage} />
								<Route path={ROUTE_LINKS.petProject} component={PetProjectPage} />
								<Route path={ROUTE_LINKS.petProjectCreate} component={PetProjectFormPage} />
								<PrivateRoute path={ROUTE_LINKS.petProjectEdit_CONST} component={PetProjectFormPage} />


								{/* // TODO: Придумать, как подключать форму, но иметь все приколы контекста */}
								{/* TODO единый контекст на все урлы */}
								<PrivateRoute path={ROUTE_LINKS.nokiaIndex} component={NokiaIndexPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeople} component={NokiaPeopleListPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaForm} component={NokiaFormPage} />
								{/* TODO: пока не работает ни фронт, ни бэк */}
								<PrivateRoute path={ROUTE_LINKS.nokiaFormEdit_CONST} component={NokiaFormPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleDetail_CONST} component={NokiaPeopleDetailCardPage} />
								{/* TODO: пока не работает ни фронт, ни бэк */}
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleForm} component={NokiaAddPersonPage} />
								{/* TODO: пока не работает ни фронт, ни бэк */}
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleEdit_CONST} component={NokiaAddPersonPage} />
								{/* TODO: даже не проверял */}
								<PrivateRoute path={ROUTE_LINKS.nokiaStatistic} component={NokiaStatisticPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPinarik} component={PinarikPage} />

								{/* TODO В провайдер и единый роут? */}
								{/* TODO Не скачивает данные, обман! */}
								<Route path={ROUTE_LINKS.toolVkIndex} component={VkIndexPage} />
								<Route path={ROUTE_LINKS.toolVkStaticAlbum} component={VkStaticAlbumPage} />
								<Route path={ROUTE_LINKS.toolVkAlbums} component={VkAlbumListPage} />
								<Route path={ROUTE_LINKS.toolVkAlbumSingle_CONST} component={VkAlbumEditPage} />
								{/* TODO Не работает от слова совсем */}
								<Route path={ROUTE_LINKS.toolVkDownloadAlbum} component={VkDownloadPage} />


								{/* Туризм */}
								<Route path={ROUTE_LINKS.tourismIndex} component={TourismIndexPage} />

								<Route path={ROUTE_LINKS.tourismChecklist} component={TourismChecklistPage} />

								<Route path={ROUTE_LINKS.tourismVisited} component={TourismVisitedPage} />
								<Route path={ROUTE_LINKS.tourismFatherTrack} component={TourismFatherTrackPage} />

								<Route path={ROUTE_LINKS.tourismWalkDetail_CONST} component={TourismWalkSinglePage} />
								<Route path={ROUTE_LINKS.tourismMapsRegion} component={TourismYaMapsRegionPage} />
								<Route path={ROUTE_LINKS.tourismMapsMoscowWalkaround} component={TourismMoscowWalkaroundPage} />
								<Route path={ROUTE_LINKS.tourismMapsMoscowBar} component={TourismMoscowBarPage} />
								<Route path={ROUTE_LINKS.tourismCityIndex} component={TourismCityStarPage} />

								<Route path={ROUTE_LINKS.tourismNashe} component={NasheIndexPage} />
								<Route path={ROUTE_LINKS.tourismNashe_CONST} component={NasheSinglePage} />

								<Route default component={NotFoundPage} />
							</Router>
						</main>
						<Footer />
						</VkContextProvider>
					</GlobalProvider>
				</AuthProvider>
			</ErrorBoundary>
		</LocationProvider>
	)
}

render(<App />, document.getElementById('app'))
