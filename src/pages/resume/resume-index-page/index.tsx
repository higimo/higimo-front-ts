import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { PrecentationContainer } from 'components/ui/precentation-container/PrecentationContainer'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../resume-style.css'
import { OnlyAdmin } from 'components/util/only-admin'

export const ResumeIndexPage: FunctionComponent = () => {
	usePageTitle('Мои резюме')

	return (
		<PrecentationContainer className="resume-hero">
			<TextContainer>
				<h1>Мои резюме</h1>
				<ul>
					<li><a href={ROUTE_LINKS.resumeProductStupid}>Резюме продакт-менеджера</a></li>
					<li><a href={ROUTE_LINKS.resumeTechProduct}>Резюме tech продакт-менеджера</a></li>
				</ul>
				<p>
					<a href={ROUTE_LINKS.resumeHowToWork}>Как подхожу к работе</a>
				</p>
			</TextContainer>
			<OnlyAdmin>
				<TextContainer>
					<p>
						Скрытые резюме
					</p>
					<ul>
						<li><a href={ROUTE_LINKS.resumeHead}>head</a></li>
						<li><a href={ROUTE_LINKS.resumeProduct}>smart</a></li>
					</ul>
				</TextContainer>
			</OnlyAdmin>
		</PrecentationContainer>
	)
}
