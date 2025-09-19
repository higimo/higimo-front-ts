import { FunctionComponent } from "preact";
import { TextContainer } from "components/ui/text-container";

import { TourismChecklist } from "components/tourism/tourism-checklist";
import { Breadcrumps } from "components/ui/breadcrumps";
import { TourismMainMenu } from "components/tourism/tourism-main-menu";

import '../tourism-style.css'

export const TourismChecklistPage: FunctionComponent = () => {
	document.title = 'Чек-лист туриста'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Чек-лист туриста</h1>
			</TextContainer>
			<TourismChecklist />
		</div>
	)
}
