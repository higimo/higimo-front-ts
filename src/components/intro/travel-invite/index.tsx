import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { tourismMenuLinks } from 'components/tourism/tourism-main-menu/data'

import './style.css'

export const TravelInvite: FunctionComponent = () => {
	return (
		<PrecentationContainer className="travel-invite" id={ANCHOR_LINKS.travel}>
			<TextContainer>
				{/* TODO: tourism header */}
				<h2 className="travel-invite__title">
					<a href={ROUTE_LINKS.tourismIndex}>Путешествую</a><sup>150 населённых пунктов</sup>
				</h2>
				<p>
					Я был во многих городах России. Рассказываю, что в них посмотреть, чем они хороши, строю маршрут, показываю фотографии.
				</p>
				<div className="tourism-links">
					{tourismMenuLinks.map(tourismMenu => (
						<div className="tourism-links__item">
							<a href={tourismMenu.href}>{tourismMenu.title}</a>
						</div>
					))}
				</div>
			</TextContainer>
		</PrecentationContainer>
	)
}
