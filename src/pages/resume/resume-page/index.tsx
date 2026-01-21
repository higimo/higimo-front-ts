import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../resume-style.css'

export const ResumePage: FunctionComponent = () => {
	usePageTitle('Дмитрий Уткин в активном поиске')

	return (
		<PrecentationContainer className="resume-hero">
			<TextContainer>
				<h1>Моё резюме</h1>
				<ul>
					<li><a href={ROUTE_LINKS.resumeProduct}>Резюме продакт-менеджера</a></li>
					{/* <li><a href={ROUTE_LINKS.resumeProductLegacy}>Резюме продакт-менеджера</a></li> */}
					<li><a href={ROUTE_LINKS.resumeHead}>Резюме хеда продукта</a></li>
				</ul>
			</TextContainer>
		</PrecentationContainer>
	)
}
