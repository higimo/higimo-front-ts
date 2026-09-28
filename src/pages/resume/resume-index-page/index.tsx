import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { OnlyAdmin } from 'components/util/only-admin'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../resume-style.css'

export const ResumeIndexPage: FunctionComponent = () => (
	<Layout title="Мои резюме">
		<PrecentationContainer className="resume-hero">
			<TextContainer>
				<h1>Мои резюме</h1>
				<ul>
					<li><a href={ROUTE_LINKS.resumeProduct}>Резюме продакт-менеджера</a></li>
					<li><a href={ROUTE_LINKS.resumeTechProduct}>Резюме tech продакт-менеджера</a></li>
					<li><a href={ROUTE_LINKS.resumeLead}>Резюме Product Lead</a></li>
				</ul>
				<p>
					<a href={ROUTE_LINKS.resumeHowToWork}>Как подхожу к работе</a>
				</p>
			</TextContainer>
			<OnlyAdmin>
				<hr />
				<TextContainer>
					<h2>Скрытые резюме</h2>
					<ul>
						<li><a href={ROUTE_LINKS.resumeProductSmart}>smart</a></li>
						<li><a href={ROUTE_LINKS.resumeProductFull}>full value</a></li>
					</ul>
				</TextContainer>
			</OnlyAdmin>
		</PrecentationContainer>
	</Layout>
)
