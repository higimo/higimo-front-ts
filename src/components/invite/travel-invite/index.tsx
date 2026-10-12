import { FunctionComponent } from 'preact'

import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'
import { TOURISM_MENU_LINK } from 'data/tourism/tourism-menu-link'

import './style.css'

export const TravelInvite: FunctionComponent = () => (
	<PrecentationContainer className="travel-invite" id={ANCHOR_LINK.travel}>
		<TextContainer>
			<h2 className="travel-invite__title">
				<a href={ROUTE_LINK.tourismIndex}>Путешествую</a><sup>150 населённых пунктов</sup>
			</h2>
			<p>
				Я был во многих городах России. Рассказываю, что в них посмотреть, чем они хороши, строю маршрут, показываю фотографии.
			</p>
			<div className="tourism-links">
				{TOURISM_MENU_LINK.map(tourismMenu => (
					<div className="tourism-links__item">
						<a href={tourismMenu.href as string}>{tourismMenu.title}</a>
					</div>
				))}
			</div>
		</TextContainer>
	</PrecentationContainer>
)
