import { FunctionComponent } from "preact";

import { TextContainer } from "../../ui/text-container";

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

import './style.css'

export const TourismMainMenu: FunctionComponent = () => (
	<div className="tourism-main-menu">
		<TextContainer className="">
			<div className="tourism-main-menu__links">
				<a href={ROUTE_LINKS.tourismChecklist}>Чек-лист путешественника</a>
				<a href={ROUTE_LINKS.tourismNashe}>Нашествие</a>
				<a href={ROUTE_LINKS.tourismMapsIndex}>Я.Карты</a>
				<a href={ROUTE_LINKS.tourismCityIndex}>Оценки городов</a>
			</div>
		</TextContainer>
	</div>
)