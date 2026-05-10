import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { CityStarsIntro } from 'components/tourism/city-stars-intro'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismNashestviePreview } from 'components/tourism/tourism-nashestvie-preview'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../tourism-style.css'
import './style.css'

import listImg from './img/list.svg'
import passportImg from './img/passport.svg'
import russiaImg from './img/russia.svg'


// TODO: [HARD] хотелось бы так оформить своё посещённое https://www.tema.ru/travel/
export const TourismIndexPage: FunctionComponent = () => {
	usePageTitle('Туризм')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />

			<TextContainer>
				<h1 className="tourism-header">Путешествия</h1>
			</TextContainer>

			<PrecentationContainer className="tourism-father">
				<TextContainer>
					<p>
						<a
							href={ROUTE_LINKS.tourismFatherTrack}
							className="tourism-father__link"
						>
							Грядущее путешествие с отцом
						</a>
					</p>
				</TextContainer>
			</PrecentationContainer>

			<PrecentationContainer className="tourism-visited-anons">
				<TextContainer>
					<img className="tourism-visited-anons__icon" src={passportImg} />
					<a href={ROUTE_LINKS.tourismVisited} className="tourism-visited-anons__link">Списки посещения и статистика</a>
				</TextContainer>
				<div className="tourism-visited-anons__image">
					<img src={russiaImg} />
				</div>
			</PrecentationContainer>

			<PrecentationContainer className="tourism-walk-anons">
				<TextContainer>
					<h2><img className="tourism-visited-anons__icon--mini" src={listImg} /> Другие списки</h2>
				</TextContainer>
				<TourismExperimentMaps />
				<TourismWalkGallery />
			</PrecentationContainer>

			<PrecentationContainer>
				<CityStarsIntro />
			</PrecentationContainer>

			<PrecentationContainer>
				<TourismNashestviePreview />
			</PrecentationContainer>
		</div>
	)
}
