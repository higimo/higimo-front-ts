import { render } from 'preact';
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso';

import { Header } from './components/ui/header/Header';
import { Footer } from './components/ui/footer';

import { GlobalProvider } from './context/global'

import { AuthProvider } from './context/auth'

import { AccordGallery } from './components/accord/accord-gallery';
import { AccordSingle } from './components/accord/accord-single';
import { PrivateRoute } from './components/util/private-route/PrivateRoute';

import { IndexPage } from './pages/index-page';
import { NotFoundPage } from './pages/not-found-page';
import { LoginPage } from './pages/auth/login-page';
import { AdminPage } from './pages/auth/admin-page';
import { IgLinkPage } from './pages/info/ig-link-page';
import { GamePage } from './pages/info/game-page';
import { LinksPage } from './pages/info/links-page';
import { LogismPage } from './pages/info/logism-page';
import { ThingsIndexPage } from './pages/info/things/things-index-page';
import { ThingsNotebookPage } from './pages/info/things/things-notebook-page';
import { ThingsVeloPage } from './pages/info/things/things-velo-page';
import { TestPage } from './pages/test-page';
import { ResumePage } from './pages/resume/resume-page';
import { CinemaScriptPage } from './pages/info/cinema-script-page';
import { CinemaSinglePage } from './pages/info/cinema-single-page';
import { CinemaIndexPage } from './pages/info/cinema-index-page';
import { YoutubePage } from './pages/info/youtube-page';
import { ProjectIndexPage } from './pages/project/project-index-page';
import { ProjectSinglePage } from './pages/project/project-single-page';
import { DemagogPage } from './pages/test-page/tools/demagog-page';
import { ClockPage } from './pages/test-page/tools/clock-page';
import { FaqListPage } from './pages/test-page/tools/faq/faq-list-page';
import { FaqSinglePage } from './pages/test-page/tools/faq/faq-single-page';
import { FeedbackIndexPage } from './pages/test-page/tools/feedback/feedback-page';
import { FeedbackSinglePage } from './pages/test-page/tools/feedback/feedback-single-page';
import { ObuchenieListPage } from './pages/test-page/tools/obuchenie/obuchenie-list-page';
import { ObuchenieSinglePage } from './pages/test-page/tools/obuchenie/obuchenie-single-page';
import { PronPage } from './pages/test-page/tools/pron-page';
import { PinarikPage } from './pages/test-page/tools/pinarik-page';
import { LibIndexPage } from './pages/test-page/tools/lib/lib-index-page';
import { LibAdminPage } from './pages/test-page/tools/lib/lib-admin-page';
import { ToolIndexPage } from './pages/test-page/tools/tool-page';
import { EmailerPage } from './pages/test-page/tools/emailer-page';
import { ComojiPage } from './pages/test-page/tools/comoji-page';
import { MagicBallPage } from './pages/test-page/tools/magic-ball-page';
import { PetProjectPage } from './pages/test-page/tools/pet-project/pet-project-page';
import { PetProjectFormPage } from './pages/test-page/tools/pet-project/pet-project-form-page';
import { ListListIndexPage } from './pages/tool/list-list-index-page';
import { ListListFormPage } from './pages/tool/list-list-form-page';
import { NokiaIndexPage } from './pages/nokia/nokia-index-page';
import { NokiaMessagePage } from './pages/nokia/nokia-message-page';
import { NokiaFormPage } from './pages/nokia/nokia-form-page';
import { NokiaPeopleListPage } from './pages/nokia/nokia-people-list-page';
import { NokiaAddPersonPage } from './pages/nokia/nokia-add-person-page';
import { NokiaPeopleDetailCardPage } from './pages/nokia/nokia-people-detail-card-page';
import { NokiaStatisticPage } from './pages/nokia/nokia-statistic-page';
import { NasheIndexPage } from './pages/tourism/nashe/nashe-page';
import { NasheSinglePage } from './pages/tourism/nashe/nashe-single-page';
import { TourismChecklistPage } from './pages/tourism/tourism-checklist-page';
import { TourismIndexPage } from './pages/tourism/tourism-index';
import { TourismWalkPage } from './pages/tourism/tourism-walk-index-page';
import { TourismYaMapsDiagramPage } from './pages/tourism/tourism-ya-maps/tourism-ya-maps-diagram-page';
import { TourismYaMapsIndexPage } from './pages/tourism/tourism-ya-maps/tourism-ya-maps-index-page';
import { TourismYaMapsManyPage } from './pages/tourism/tourism-ya-maps/tourism-ya-maps-many-page';
import { TourismYaMapsMoscowWalksPage } from './pages/tourism/tourism-ya-maps/tourism-ya-maps-moscow-walks-page';
import { TourismYaMapsRegionPage } from './pages/tourism/tourism-ya-maps/tourism-ya-maps-region-page';
import { TourismWalkSinglePage } from './pages/tourism/tourism-walk-single-page';
import { TourismCityStarPage } from './pages/tourism/tourism-city-star-page';

import { VkIndexPage } from './pages/vk/vk-index-page'
import { VkAlbumEditPage } from './pages/vk/vk-album-edit-page'
import { VkAlbumListPage } from './pages/vk/vk-album-list-page'
import { VkDownloadPage } from './pages/vk/vk-download-page'
import { VkStaticAlbumPage } from './pages/vk/vk-static-album-page'

import { ROUTE_LINKS } from './dic/ROUTE_LINKS';

import './style.css';
import { VkContextProvider } from './context/vk';
import { NokiaContextProvider } from './context/nokia';

const ResumeProductPage = lazy(() => import('./pages/resume/resume-product-page'))
const ResumeHeadPage = lazy(() => import('./pages/resume/resume-head-page'))

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

// TODO replace «from "(.*?)"» «from '$1'»
// TODO интересный код событий для форм https://doka.guide/js/queuemicrotask/

export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary onError={(e) => console.log(e)}>
				<AuthProvider>
					<GlobalProvider>
						<VkContextProvider>
						<NokiaContextProvider>
						<Header />
						<main>
							<Router>
								<Route path={ROUTE_LINKS.index} component={IndexPage} />

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
								<Route path={ROUTE_LINKS.resumeProduct} component={ResumeProductPage} />
								<Route path={ROUTE_LINKS.gameIndex} component={GamePage} />
								<Route path={ROUTE_LINKS.thingsIndex} component={ThingsIndexPage} />
								<Route path={ROUTE_LINKS.thingsNotebook} component={ThingsNotebookPage} />
								<Route path={ROUTE_LINKS.thingsVelo} component={ThingsVeloPage} />
								<Route path={ROUTE_LINKS.igLink} component={IgLinkPage} />
								<Route path={ROUTE_LINKS.cinemaIndex} component={CinemaIndexPage} />
								<Route path={ROUTE_LINKS.cinemaScriptIndex} component={CinemaScriptPage} />
								<Route path={ROUTE_LINKS.cinemaScriptDetail_CONST} component={CinemaSinglePage} />

								{/* Сервисы о себе */}
								<Route path={ROUTE_LINKS.pinarik} component={PinarikPage} />
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
								<PrivateRoute path={ROUTE_LINKS.nokiaMessage} component={NokiaMessagePage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaForm} component={NokiaFormPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaFormEdit_CONST} component={NokiaFormPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeople} component={NokiaPeopleListPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleForm} component={NokiaAddPersonPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleDetail_CONST} component={NokiaPeopleDetailCardPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleEdit_CONST} component={NokiaAddPersonPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaStatistic} component={NokiaStatisticPage} />

								{/* TODO В провайдер и единый роут? */}
								{/* TODO Не скачивает данные, обман! */}
								<Route path={ROUTE_LINKS.toolVkIndex} component={VkIndexPage} />
								<Route path={ROUTE_LINKS.toolVkStaticAlbum} component={VkStaticAlbumPage} />
								<Route path={ROUTE_LINKS.toolVkAlbums} component={VkAlbumListPage} />
								<Route path={ROUTE_LINKS.toolVkAlbumSingle_CONST} component={VkAlbumEditPage} />
								{/* TODO Не работает от слова совсем */}
								<Route path={ROUTE_LINKS.toolVkDownloadAlbum} component={VkDownloadPage} />


								<Route path={ROUTE_LINKS.tourismIndex} component={TourismIndexPage} />
								<Route path={ROUTE_LINKS.tourismNashe} component={NasheIndexPage} />
								<Route path={ROUTE_LINKS.tourismNashe_CONST} component={NasheSinglePage} />
								<Route path={ROUTE_LINKS.tourismWalkIndex} component={TourismWalkPage} />
								<Route path={ROUTE_LINKS.tourismWalkDetail_CONST} component={TourismWalkSinglePage} />
								<Route path={ROUTE_LINKS.tourismChecklist} component={TourismChecklistPage} />
								<Route path={ROUTE_LINKS.tourismMapsIndex} component={TourismYaMapsIndexPage} />
								<Route path={ROUTE_LINKS.tourismMapsDiagram} component={TourismYaMapsDiagramPage} />
								<Route path={ROUTE_LINKS.tourismMapsMany} component={TourismYaMapsManyPage} />
								<Route path={ROUTE_LINKS.tourismMapsRegion} component={TourismYaMapsRegionPage} />
								<Route path={ROUTE_LINKS.tourismMapsMoscowWalk} component={TourismYaMapsMoscowWalksPage} />
								<Route path={ROUTE_LINKS.tourismCityIndex} component={TourismCityStarPage} />

								<Route default component={NotFoundPage} />
							</Router>
						</main>
						<Footer />
						</NokiaContextProvider>
						</VkContextProvider>
					</GlobalProvider>
				</AuthProvider>
			</ErrorBoundary>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
