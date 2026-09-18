import { render } from 'preact'
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso'

import { Footer } from 'components/ui/footer'
import { Header } from 'components/ui/header'
import { ToastContainer } from 'toast'

import { GlobalProvider }    from './context/global'

import { AccordGallery } from 'components/accord/accord-gallery'
import { AccordSingle }  from 'components/accord/accord-single'
import { PrivateRoute }  from 'components/util/private-route'

import { IndexPage }   from 'pages/index-page'
import { ServicePage } from 'pages/service-page'

import { ProjectIndexPage }  from 'pages/project/project-index-page'
import { ProjectSinglePage } from 'pages/project/project-single-page'
// TODO: [MEDUIM] Отключить из продакшен-сборки
const PortfolioSandbox  = lazy(() => import('pages/project/portfolio-sandbox'))
const ProjectTablePage  = lazy(() => import('pages/project/project-table-page'))
const ProjectTypographyPage = lazy(() => import('pages/project/project-typography'))

import { ComojiPage }          from 'pages/tools/comoji-page'
import { DemagogPage }         from 'pages/tools/demagog-page'
import { EmailerPage }         from 'pages/tools/emailer-page'
import { FaqListPage }         from 'pages/tools/faq/faq-list-page'
import { FaqSinglePage }       from 'pages/tools/faq/faq-single-page'
import { MagicBallPage }       from 'pages/tools/magic-ball-page'
import { ObuchenieListPage }   from 'pages/tools/obuchenie/obuchenie-list-page'
import { ObuchenieSinglePage } from 'pages/tools/obuchenie/obuchenie-single-page'
import { PronPage }            from 'pages/tools/pron-page'

import { LibAdminPage } from 'pages/tools/lib/lib-admin-page'
import { LibIndexPage } from 'pages/tools/lib/lib-index-page'

import { CinemaIndexPage }    from 'pages/info/cinema-index-page'
import { CinemaScriptPage }   from 'pages/info/cinema-script-page'
import { CinemaSinglePage }   from 'pages/info/cinema-single-page'
import { GamePage }           from 'pages/info/game-page'
import { IgLinkPage }         from 'pages/info/ig-link-page'
import { LinksPage }          from 'pages/info/links-page'
import { LogismPage }         from 'pages/info/logism-page'
import { ThingsIndexPage }    from 'pages/info/things/things-index-page'
import { ThingsNotebookPage } from 'pages/info/things/things-notebook-page'
import { ThingsVeloPage }     from 'pages/info/things/things-velo-page'
import { YoutubePage }        from 'pages/info/youtube-page'

import { PetProjectFormPage } from 'pages/tools/pet-project/pet-project-form-page'
import { PetProjectPage }     from 'pages/tools/pet-project/pet-project-page'

import { ListListFormPage }  from 'pages/tool/list-list-form-page'
import { ListListIndexPage } from 'pages/tool/list-list-index-page'

import { NokiaAddPersonPage }        from 'pages/nokia/nokia-add-person-page'
import { NokiaIndexPage }            from 'pages/nokia/nokia-index-page'
import { NokiaMeetingFormPage }      from 'pages/nokia/nokia-form-page'
import { NokiaPeopleDetailCardPage } from 'pages/nokia/nokia-people-detail-card-page'
import { NokiaPeopleListPage }       from 'pages/nokia/nokia-people-list-page'
import { NokiaStatisticPage }        from 'pages/nokia/nokia-statistic-page'
import { PinarikPage }               from 'pages/nokia/pinarik-page'

import { NasheIndexPage }              from 'pages/tourism/nashe/nashe-page'
import { NasheSinglePage }             from 'pages/tourism/nashe/nashe-single-page'
import { TourismChecklistPage }        from 'pages/tourism/tourism-checklist-page'
import { TourismCityStarPage }         from 'pages/tourism/tourism-city-star-page'
import { TourismIndexPage }            from 'pages/tourism/tourism-index'
import { TourismMoscowBarPage }        from 'pages/tourism/tourism-ya-maps/tourism-moscow-bar'
import { TourismMoscowWalkaroundPage } from 'pages/tourism/tourism-ya-maps/tourism-moscow-walkaround-page'
import { TourismVisitedPage }          from 'pages/tourism/tourism-visited-page'
import { TourismWalkSinglePage }       from 'pages/tourism/tourism-walk-single-page'
import { TourismYaMapsRegionPage }     from 'pages/tourism/tourism-ya-maps/tourism-ya-maps-region-page'
import { TourismMapsPage }             from 'pages/tourism/tourism-maps-page'
import { TourismMoscowMuseumPage }     from 'pages/tourism/tourism-moscow-museum-page'
import { TourismFatherTrackPage }      from 'pages/tourism/tourism-father-track-page'

import { VkAlbumEditPage }   from 'pages/vk/vk-album-edit-page'
import { VkAlbumListPage }   from 'pages/vk/vk-album-list-page'
import { VkDownloadPage }    from 'pages/vk/vk-download-page'
import { VkIndexPage }       from 'pages/vk/vk-index-page'

import { ResumeIndexPage }         from 'pages/resume/resume-index-page'
import { ResumeProductPage }       from 'pages/resume/resume-product-page'
import { ResumeTechProductPage }   from 'pages/resume/resume-tech-product'
import { ResumeProductLeadPage }   from 'pages/resume/resume-product-lead-page'
import { HowToWorkPage }           from 'pages/resume/how-to-work-page'
import { ResumeProductSmartPage }  from 'pages/resume/resume-product-smart-page'
import { ResumeProductFullValuePage } from 'pages/resume/resume-full-value-page'

import { HiringResponsePage } from 'pages/hiring-response/hiring-response-page'

import { AdminPage }     from 'pages/auth/admin-page'
import { LoginPage }     from 'pages/auth/login-page'
import { TestPage }      from 'pages/test-page'
import { TextareaPage }  from 'pages/textarea-page'
import { ToolPage }      from 'pages/tool/tool-page'

import { DonationOfertaPage } from 'pages/merchant/donation-oferta-page'
import { MerchantPage }       from 'pages/merchant/merchant-page'
import { PaymentOfertaPage }  from 'pages/merchant/payment-oferta-page'
import { PaymentPage }        from 'pages/merchant/payment-page'
import { PaymentPolicyPage }  from 'pages/merchant/payment-policy-page'
import { PersonalPolicyPage } from 'pages/merchant/personal-policy-page'

import { NotFoundPage } from 'pages/not-found-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary onError={(e) => console.log(e)}>
					<GlobalProvider>
						<Header />
						<main>
							<Router>
								<Route path={ROUTE_LINKS.index} component={IndexPage} />
								<Route path={ROUTE_LINKS.serviceIndex} component={ServicePage} />

								{/* Магазин */}
								<Route path={ROUTE_LINKS.merchantIndex} component={MerchantPage} />
								<Route path={ROUTE_LINKS.merchantCheckout} component={PaymentPage} />
								<Route path={ROUTE_LINKS.merchantPaymentPolicy} component={PaymentPolicyPage} />
								<Route path={ROUTE_LINKS.merchantPersonalPolicy} component={PersonalPolicyPage} />
								<Route path={ROUTE_LINKS.merchantPaymentOferta} component={PaymentOfertaPage} />
								<Route path={ROUTE_LINKS.merchantDonationOferta} component={DonationOfertaPage} />

								<Route path={ROUTE_LINKS.textarea} component={TextareaPage} />

								{/* admin */}
								<Route path={ROUTE_LINKS.login} component={LoginPage} />
								<PrivateRoute path={ROUTE_LINKS.adminIndex} component={AdminPage} />
								<PrivateRoute path="/admin/tool/:path?/:subpath?/:subsubpath?" component={ToolPage} />
								<PrivateRoute path={ROUTE_LINKS.typo} component={TestPage} />

								{/* Секретные разработки не для продакшена */}
								<Route path={ROUTE_LINKS.projectTypography} component={ProjectTypographyPage} />
								<Route path={ROUTE_LINKS.projectSandbox} component={PortfolioSandbox} />
								<PrivateRoute path={ROUTE_LINKS.projectTable} component={ProjectTablePage} />

								{/* Портфолио */}
								<Route path={ROUTE_LINKS.projectIndex} component={ProjectIndexPage} />
								<Route path={ROUTE_LINKS.projectDetail_CONST} component={ProjectSinglePage} />

								{/* Список списков */}
								<Route path={ROUTE_LINKS.listListCreate} component={ListListFormPage} />
								<Route path={ROUTE_LINKS.listListDetail_CONST} component={ListListIndexPage} />
								<PrivateRoute path={ROUTE_LINKS.listListEdit_CONST} component={ListListFormPage} />

								{/* Аккорды */}
								<Route path={ROUTE_LINKS.accordIndex} component={AccordGallery} />
								<Route path={ROUTE_LINKS.accordDetail_CONST} component={AccordSingle} />

								{/* Инфосервисы */}
								<Route path={ROUTE_LINKS.logism} component={LogismPage} />
								<Route path={ROUTE_LINKS.demagog} component={DemagogPage} />
								<Route path={ROUTE_LINKS.faqIndex} component={FaqListPage} />
								<Route path={ROUTE_LINKS.faqDetail_CONST} component={FaqSinglePage} />
								<Route path={ROUTE_LINKS.learningIndex} component={ObuchenieListPage} />
								<Route path={ROUTE_LINKS.learningDetail_CONST} component={ObuchenieSinglePage} />

								{/* Сервисы-развлекухи */}
								<Route path={ROUTE_LINKS.pron} component={PronPage} />
								<Route path={ROUTE_LINKS.youtube} component={YoutubePage} />
								<Route path={ROUTE_LINKS.links} component={LinksPage} />

								{/* Резюме */}
								<Route path={ROUTE_LINKS.resumeIndex} component={ResumeIndexPage} />
								<Route path={ROUTE_LINKS.resumeProduct} component={ResumeProductPage} />
								<Route path={ROUTE_LINKS.resumeTechProduct} component={ResumeTechProductPage} />
								<Route path={ROUTE_LINKS.resumeLead} component={ResumeProductLeadPage} />
								<Route path={ROUTE_LINKS.resumeHowToWork} component={HowToWorkPage} />
								<Route path={ROUTE_LINKS.resumeProductSmart} component={ResumeProductSmartPage} />
								<Route path={ROUTE_LINKS.resumeProductFull} component={ResumeProductFullValuePage} />
								<Route path={ROUTE_LINKS.response} component={HiringResponsePage} />

								{/* Инфостраницы о себе */}
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
								<Route path={ROUTE_LINKS.emailer} component={EmailerPage} />
								<Route path={ROUTE_LINKS.comoji} component={ComojiPage} />
								<Route path={ROUTE_LINKS.magic} component={MagicBallPage} />
								<Route path={ROUTE_LINKS.petProject} component={PetProjectPage} />
								<PrivateRoute path={ROUTE_LINKS.petProjectCreate} component={PetProjectFormPage} />
								<PrivateRoute path={ROUTE_LINKS.petProjectEdit_CONST} component={PetProjectFormPage} />


								{/* Nokia / Sweebe */}
								<PrivateRoute path={ROUTE_LINKS.nokiaIndex} component={NokiaIndexPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeople} component={NokiaPeopleListPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaForm} component={NokiaMeetingFormPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaFormEdit_CONST} component={NokiaMeetingFormPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleForm} component={NokiaAddPersonPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleDetail_CONST} component={NokiaPeopleDetailCardPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPeopleEdit_CONST} component={NokiaAddPersonPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaStatistic} component={NokiaStatisticPage} />
								<PrivateRoute path={ROUTE_LINKS.nokiaPinarik} component={PinarikPage} />


								{/* VK тулы */}
								<Route path={ROUTE_LINKS.toolVkIndex} component={VkIndexPage} />
								<Route path={ROUTE_LINKS.toolVkAlbums} component={VkAlbumListPage} />
								<Route path={ROUTE_LINKS.toolVkAlbumSingle_CONST} component={VkAlbumEditPage} />
								<Route path={ROUTE_LINKS.toolVkDownloadAlbum} component={VkDownloadPage} />


								{/* Туризм */}
								<Route path={ROUTE_LINKS.tourismIndex} component={TourismIndexPage} />
								<Route path={ROUTE_LINKS.tourismChecklist} component={TourismChecklistPage} />
								<Route path={ROUTE_LINKS.tourismCityIndex} component={TourismCityStarPage} />
								<Route path={ROUTE_LINKS.tourismFatherTrack} component={TourismFatherTrackPage} />
								<Route path={ROUTE_LINKS.tourismMaps} component={TourismMapsPage} />
								<Route path={ROUTE_LINKS.tourismMapsMoscowBar} component={TourismMoscowBarPage} />
								<Route path={ROUTE_LINKS.tourismMapsMoscowWalkaround} component={TourismMoscowWalkaroundPage} />
								<Route path={ROUTE_LINKS.tourismMapsRegion} component={TourismYaMapsRegionPage} />
								<Route path={ROUTE_LINKS.tourismNashe_CONST} component={NasheSinglePage} />
								<Route path={ROUTE_LINKS.tourismNashe} component={NasheIndexPage} />
								<Route path={ROUTE_LINKS.tourismVisited} component={TourismVisitedPage} />
								<Route path={ROUTE_LINKS.tourismMoscowMuseum} component={TourismMoscowMuseumPage} />
								<Route path={ROUTE_LINKS.tourismWalkDetail_CONST} component={TourismWalkSinglePage} />

								<Route default component={NotFoundPage} />
							</Router>
						</main>
						<div id="vk_api_transport" />
						<ToastContainer />
						<Footer />
					</GlobalProvider>
			</ErrorBoundary>
		</LocationProvider>
	)
}

// @ts-ignore
render(<App />, document.getElementById('app'))
