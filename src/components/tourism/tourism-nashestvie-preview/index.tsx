import { FunctionComponent } from "preact";

import { TextContainer } from "../../ui/text-container";

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

export const TourismNashestviePreview: FunctionComponent = () => (
	<TextContainer className="tourism-nashestvie-preview">
		<h2>Нашествие</h2>
		<p>
			Путешествия — не только города, но и фестивали радости.
		</p>
		<p>
			<a href={ROUTE_LINKS.tourismNashe}>Лайнапы нашествия</a>
		</p>
	</TextContainer>
)