import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'

import { data } from './data'

import '../tourism-style.css'

export const TourismMapsPage: FunctionComponent = () => {
	usePageTitle('Карты путешествий')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />

			<TextContainer>
				<h1 className="tourism-header">Карты путешествий</h1>
			</TextContainer>

			<PrecentationContainer className="tourism-walk-anons">
				<TextContainer>
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
		</div>
	)
}
