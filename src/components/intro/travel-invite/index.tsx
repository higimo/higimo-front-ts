import { FunctionComponent } from 'preact'

import { PrecentationContainer } from '../../ui/precentation-container/PrecentationContainer'
import { TextContainer } from '../../ui/text-container'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'
import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'

import './style.css'

export const TravelInvite: FunctionComponent = () => {
	return (
		<PrecentationContainer className="travel-invite" id={ANCHOR_LINKS.travel}>
			<TextContainer>
				<h2 className="travel-invite__title"><a href={ROUTE_LINKS.tourismIndex}>Путешествую</a><sup>110 городов</sup></h2>
				<p>
					Я был во многих городах России. Рассказываю, что в них посмотреть, чем они хороши, строю маршрут, показываю фотографии.
				</p>
			</TextContainer>
		</PrecentationContainer>
	)
}
