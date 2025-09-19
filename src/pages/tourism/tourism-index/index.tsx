import { FunctionComponent } from "preact"

import { TextContainer } from "components/ui/text-container"
import { TourismWalkGallery } from "components/tourism/tourism-walk-gallery"
import { TourismNashestviePreview } from "components/tourism/tourism-nashestvie-preview"
import { TourismMainMenu } from "components/tourism/tourism-main-menu"
import { Breadcrumps } from "components/ui/breadcrumps"
import { CityStarsIntro } from "components/tourism/city-stars-intro"

import { ROUTE_LINKS } from "dic/ROUTE_LINKS"

import '../tourism-style.css'
import './style.css'
import { PrecentationContainer } from "components/ui/precentation-container/PrecentationContainer"

import listImg from './img/list.svg'
import passportImg from './img/passport.svg'
import russiaImg from './img/russia.svg'

// TODO: Добавить общий словарь роутов страниц и сделать галереи-карточек, как на главной хотя бы
// https://www.tema.ru/travel/

const data = [
	{
		href: ROUTE_LINKS.tourismMapsMoscowWalkaround,
		title: 'Проект обхожу Москву',
	},
	{
		href: ROUTE_LINKS.tourismMapsMoscowBar,
		title: 'Московские бары',
	},
	{
		href: ROUTE_LINKS.tourismMapsRegion,
		title: 'Посещённые регионы России',
	},
] as const

export const TourismIndexPage: FunctionComponent = () => {
	document.title = 'Туризм'

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
					<h3>Эксперименты в Я.Картах</h3>
					<ul className="tourism-walk-gallery__list">
						{data.map(item => (
							<li className="tourism-walk-gallery__item">
								<a href={item.href}>{item.title}</a>
							</li>
						))}
					</ul>
					<TourismWalkGallery />
				</TextContainer>
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
